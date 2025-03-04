import puppeteer, { Browser, Page } from 'puppeteer';
import { NextRequest } from 'next/server';
import { CurseForgeProject } from '@/app/types/curseforge';
import { CurseForgeAPI } from '@/app/lib/curseforge-api';

type SupportedComponents = 'CurseForgeEmbedImageSkeleton' | 'ProjectBadgeOG';
type ImageFormat = 'png' | 'jpeg';
type ViewportPreset = 'desktop' | 'mobile' | 'tablet' | 'og';

interface ComponentProps {
  CurseForgeEmbedImageSkeleton: {
    data: CurseForgeProject;
    size?: 'default' | 'small';
  };
  ProjectBadgeOG: {
    data: CurseForgeProject;
    theme?: 'dark' | 'light';
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

// Get viewport dimensions based on preset
function getViewportDimensions(viewport: ViewportPreset): { width: number; height: number } {
  switch (viewport) {
    case 'og':
      return { width: 1200, height: 630 };
    case 'mobile':
      return { width: 375, height: 135 };
    case 'tablet':
      return { width: 768, height: 135 };
    case 'desktop':
    default:
      return { width: 600, height: 135 };
  }
}

// Helper to render the Project Badge OG component
function getProjectBadgeOGHtml(data: CurseForgeProject, theme: 'dark' | 'light' = 'dark', size: 'default' | 'small' = 'default') {
  const isSmall = size === 'small';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
          }
          
          @media (-webkit-min-device-pixel-ratio: 2) {
            * {
              -webkit-font-smoothing: subpixel-antialiased;
            }
          }

          body {
            width: ${isSmall ? '600' : '1200'}px;
            height: ${isSmall ? '120' : '630'}px;
            background: ${theme === 'dark' ? '#1A1A1A' : '#F8F9F9'};
          }

          .container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: ${isSmall ? '0' : '60px'};
            gap: ${isSmall ? '0' : '40px'};
          }

          .badge {
            width: 100%;
            max-width: ${isSmall ? '100%' : '600px'};
            height: 120px;
            background: ${theme === 'dark' ? '#2D2D2D' : '#FFFFFF'};
            border: 2px solid ${theme === 'dark' ? '#404040' : '#E3E6E8'};
            border-radius: 8px;
            overflow: hidden;
            box-shadow: ${theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)'};
          }

          .content {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 30px;
            gap: 24px;
          }

          .project-icon {
            width: 80px;
            height: 80px;
            border-radius: 6px;
            flex-shrink: 0;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }

          .info {
            flex: 1;
            min-width: 0;
            line-height: 1.4;
          }

          .title {
            color: ${theme === 'dark' ? '#FFFFFF' : '#242729'};
            font-size: 28px;
            font-weight: 500;
            margin-bottom: 8px;
            letter-spacing: -0.3px;
          }

          .stats {
            display: flex;
            align-items: center;
            gap: 24px;
            color: ${theme === 'dark' ? '#9BA0A4' : '#6A737C'};
            font-size: 20px;
            letter-spacing: -0.2px;
          }

          .stat {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .icon {
            width: 24px;
            height: 24px;
            stroke-width: 2px;
          }

          .curseforge-logo {
            width: 40px;
            height: 40px;
            color: #F16436;
            flex-shrink: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="badge">
            <div class="content">
              <img 
                src="${data.thumbnail}" 
                alt="" 
                class="project-icon"
              />
              
              <div class="info">
                <div class="title">${data.title}</div>
                <div class="stats">
                  <span class="stat">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    ${CurseForgeAPI.formatNumber(data.downloads.total)}
                  </span>

                  <span class="stat">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                    ${data.download.versions[0]}
                  </span>
                </div>
              </div>

              <svg class="curseforge-logo" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z"/>
              </svg>
            </div>
          </div>
          ${isSmall ? '' : `
          <div class="powered-by">
            Powered by
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z"/>
            </svg>
            CurseForge
          </div>
          `}
        </div>
      </body>
    </html>
  `;
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
    const viewportDimensions = customViewport || getViewportDimensions(viewport);

    const sanitizedComponentName = componentName.replace(/[^a-zA-Z0-9]/g, '');
    
    const browser = await getBrowser();
    page = await browser.newPage();
    
    try {
      await page.setViewport({
        ...viewportDimensions,
        deviceScaleFactor: viewport === 'og' ? 2 : deviceScaleFactor,
        isMobile: viewport === 'mobile',
        hasTouch: viewport === 'mobile' || viewport === 'tablet',
      });

      // For OG images, we render directly without going through the render-page route
      if (componentName === 'ProjectBadgeOG') {
        const { data, theme = 'dark', size = 'default' } = props as ComponentProps['ProjectBadgeOG'];
        await page.setContent(getProjectBadgeOGHtml(data, theme, size));
      } else {
        await page.addStyleTag({
          content: `
            * {
              box-sizing: border-box;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
              font-smooth: always;
            }
            
            @media (-webkit-min-device-pixel-ratio: 2) {
              * {
                -webkit-font-smoothing: subpixel-antialiased;
              }
            }
            
            body {
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
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

        const url = new URL('/api/render-page', process.env.NEXT_PUBLIC_APP_URL);
        url.searchParams.set('component', sanitizedComponentName);
        url.searchParams.set('props', JSON.stringify(props));
        
        await page.goto(url.toString(), { 
          waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
          timeout: 8000,
        });
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // For OG images, we screenshot the entire page
      const element = componentName === 'ProjectBadgeOG' 
        ? await page.$('body')
        : await page.$('#component-container');

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
        omitBackground: format === 'png' && componentName !== 'ProjectBadgeOG',
        ...(componentName !== 'ProjectBadgeOG' && {
          clip: {
            x: Math.floor(boundingBox.x),
            y: Math.floor(boundingBox.y),
            width: Math.ceil(boundingBox.width),
            height: Math.ceil(boundingBox.height)
          }
        })
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
  process.on('beforeExit', async () => {
    if (browser) {
      await browser.close();
      browser = null;
    }
  });
} 