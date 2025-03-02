import { NextRequest, NextResponse } from 'next/server';
import puppeteer, { Browser, Page } from 'puppeteer';
import { CurseForgeProject } from '@/app/types/curseforge';

type SupportedComponents = 'CurseForgeEmbedImageSkeleton';
type ImageFormat = 'png' | 'jpeg';
type ComponentProps = {
  CurseForgeEmbedImageSkeleton: {
    data: CurseForgeProject;
    size?: 'default' | 'small';
  };
};

interface RenderOptions {
  format: ImageFormat;
  quality?: number;
  width?: number;
  height?: number;
  deviceScaleFactor?: number;
}

interface RenderComponentRequest {
  componentName: SupportedComponents;
  props: ComponentProps[SupportedComponents];
  options: RenderOptions;
}

let browser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browser || !browser.isConnected()) {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  return browser;
}

export async function POST(request: NextRequest) {
  let page: Page | null = null;
  
  try {
    const data = await request.json() as RenderComponentRequest;
    const { componentName, props, options } = data;
    
    if (!componentName) {
      return NextResponse.json({ error: 'Component name is required' }, { status: 400 });
    }

    const {
      format = 'png',
      quality = 90,
      width = 600,
      height = 700,
      deviceScaleFactor = 4,
    } = options || {};

    // Sanitize component name to prevent directory traversal
    const sanitizedComponentName = componentName.replace(/[^a-zA-Z0-9]/g, '');
    
    const browser = await getBrowser();
    page = await browser.newPage();
    
    try {
      await page.setViewport({
        width,
        height,
        deviceScaleFactor,
      });

      await page.addStyleTag({
        content: `
          * {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.5;
          }
          
          h2 {
            margin: 0 0 0.25rem 0;
            line-height: 1.2;
            font-size: 1.125rem;
          }
          
          p {
            margin: 0 0 0.5rem 0;
            line-height: 1.5;
          }
          
          .flex-gap {
            gap: 0.75rem !important;
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
        `
      });

      const url = new URL('/api/render-page', process.env.NEXT_PUBLIC_APP_URL);
      url.searchParams.set('component', sanitizedComponentName);
      url.searchParams.set('props', JSON.stringify(props));
      
      await page.goto(url.toString(), { waitUntil: 'networkidle0' });
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const element = await page.$('#component-container');
      if (!element) {
        throw new Error('Component container not found');
      }
      
      const boundingBox = await element.boundingBox();
      if (!boundingBox) {
        throw new Error('Could not determine component dimensions');
      }

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
      
      return new NextResponse(screenshot, {
        headers: {
          'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
          'Content-Disposition': `inline; filename="component.${format}"`,
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
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
    return NextResponse.json(
      { 
        error: 'Failed to render component', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
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