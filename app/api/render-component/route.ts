import puppeteer, { Browser, Page } from 'puppeteer';
import { NextRequest } from 'next/server';
import { CurseForgeProject } from '@/app/types/curseforge';

type SupportedComponents = 'CurseForgeEmbedImageSkeleton';
type ImageFormat = 'png' | 'jpeg';
type ViewportPreset = 'desktop' | 'mobile' | 'tablet';

interface ComponentProps {
  CurseForgeEmbedImageSkeleton: {
    data: CurseForgeProject;
    size?: 'default' | 'small';
  };
}

interface RenderOptions {
  format?: ImageFormat;
  quality?: number;
  deviceScaleFactor?: number;
  viewport?: ViewportPreset;
  customViewport?: {
    width: number;
    height: number;
  };
}

interface RenderComponentRequest {
  componentName: SupportedComponents;
  props: ComponentProps[SupportedComponents];
  options?: RenderOptions;
}

let browser: Browser | null = null;

// Helper to get or initialize the browser with high-quality settings
async function getBrowser(): Promise<Browser> {
  if (!browser || !browser.isConnected()) {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--font-render-hinting=none',
        '--disable-gpu-vsync',
      ],
      defaultViewport: null,
    });
  }
  return browser;
}

export async function POST(request: NextRequest) {
  let page: Page | null = null;
  
  try {
    const data = await request.json() as RenderComponentRequest;
    const { componentName, props, options = {} } = data;
    
    if (!componentName) {
      return new Response('Component name is required', { status: 400 });
    }

    const {
      format = 'png',
      quality = 100,
      deviceScaleFactor = 4,
      viewport = 'desktop',
      customViewport,
    } = options;

    // Get viewport dimensions
    const viewportDimensions = customViewport || {
      width: 600,
      height: 135
    };

    const sanitizedComponentName = componentName.replace(/[^a-zA-Z0-9]/g, '');
    
    const browser = await getBrowser();
    page = await browser.newPage();
    
    try {
      await page.setViewport({
        ...viewportDimensions,
        deviceScaleFactor,
        isMobile: viewport === 'mobile',
        hasTouch: viewport === 'mobile' || viewport === 'tablet',
      });

      await page.addStyleTag({
        content: `
          * {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-smooth: always;
          }
          
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            * {
              -webkit-font-smoothing: subpixel-antialiased;
            }
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
          }
          
          #component-container {
            width: 100%;
            padding: 0;
          }
          
          h2 {
            margin: 0 0 0.25rem 0;
            line-height: 1.2;
            font-size: ${viewport === 'mobile' ? '0.875rem' : '1rem'};
          }
          
          p {
            margin: 0 0 0.5rem 0;
            line-height: 1.5;
            font-size: ${viewport === 'mobile' ? '0.75rem' : '0.875rem'};
          }
          
          .flex-gap {
            gap: ${viewport === 'mobile' ? '0.5rem' : '0.75rem'} !important;
          }
          
          .component-title {
            margin-top: 0 !important;
            margin-bottom: 0.25rem !important;
            padding: 0 !important;
          }
          
          .component-description {
            margin-top: 0 !important;
            margin-bottom: 0.5rem !important;
            padding: 0 !important;
          }

          img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }

          @media (max-width: 480px) {
            body {
              font-size: 14px;
            }
            
            h2 {
              font-size: 0.875rem;
            }
            
            p {
              font-size: 0.75rem;
            }
          }
        `
      });

      const url = new URL('/api/render-page', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
      url.searchParams.set('component', sanitizedComponentName);
      url.searchParams.set('props', JSON.stringify(props));
      
      await page.goto(url.toString(), { 
        waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
        timeout: 8000,
      });
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const element = await page.$('#component-container');
      if (!element) {
        throw new Error('Component container not found');
      }
      
      const boundingBox = await element.boundingBox();
      if (!boundingBox) {
        throw new Error('Could not determine component dimensions');
      }

      // Take screenshot with high-quality settings
      const screenshot = await element.screenshot({
        type: format,
        quality: format === 'jpeg' ? quality : undefined,
        omitBackground: format === 'png',
        clip: {
          x: Math.floor(boundingBox.x),
          y: Math.floor(boundingBox.y),
          width: Math.ceil(boundingBox.width),
          height: Math.ceil(boundingBox.height)
        }
      });

      await page.close();
      page = null;
      
      return new Response(screenshot, {
        headers: {
          'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
          'Content-Disposition': `inline; filename="component.${format}"`,
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          'X-Image-Quality': `${deviceScaleFactor}x`,
          'X-Viewport': viewport,
          'X-Viewport-Size': `${viewportDimensions.width}x${viewportDimensions.height}`,
        },
      });
    } catch (err) {
      if (page) {
        await page.close();
        page = null;
      }
      throw err;
    }
  } catch (error) {
    if (page) {
      await page.close();
      page = null;
    }
    console.error('Error rendering component:', error);
    return new Response(
      `Failed to render component: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { status: 500 }
    );
  }
}

// Register a cleanup function for serverless environments
if (process.env.NODE_ENV === 'production') {
  // In production, clean up the browser instance when the serverless function is about to be frozen
  process.on('beforeExit', async () => {
    if (browser) {
      await browser.close();
      browser = null;
    }
  });
} 