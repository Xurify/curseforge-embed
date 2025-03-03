import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import { NextRequest } from 'next/server';
import { CurseForgeAPI } from '@/app/lib/curseforge-api';

let browser: Browser | null = null;

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
    });
  }
  return browser;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  let page: Page | null = null;
  
  try {
    const { projectId } = await params;
    const theme = request.nextUrl.searchParams.get('theme') || 'dark';
    
    // Fetch project data
    const data = await CurseForgeAPI.getProject(Number(projectId));
    
    // Initialize browser and page
    const browser = await getBrowser();
    page = await browser.newPage();
    
    // Set viewport and device scale factor for high-quality rendering
    await page.setViewport({
      width: 208,
      height: 58,
      deviceScaleFactor: 4,
    });

    // Inject styles and render component
    await page.setContent(`
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
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            }
            
            @media (-webkit-min-device-pixel-ratio: 2) {
              * {
                -webkit-font-smoothing: subpixel-antialiased;
              }
            }

            body {
              width: 208px;
              height: 58px;
              background: transparent;
            }

            .badge {
              height: 58px;
              background: ${theme === 'dark' ? '#2D2D2D' : '#F8F9F9'};
              border: 1px solid ${theme === 'dark' ? '#404040' : '#E3E6E8'};
              border-radius: 3px;
              overflow: hidden;
              box-shadow: ${theme === 'dark' ? '0 1px 3px rgba(0,0,0,0.2)' : '0 1px 2px rgba(0,0,0,0.05)'};
            }

            .content {
              display: flex;
              align-items: center;
              height: 100%;
              padding: 0 10px;
              gap: 10px;
            }

            .project-icon {
              width: 32px;
              height: 32px;
              border-radius: 3px;
              flex-shrink: 0;
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
            }

            .info {
              flex: 1;
              min-width: 0;
              line-height: 1.4;
              padding-top: 1px;
            }

            .title {
              color: ${theme === 'dark' ? '#E1E3E5' : '#242729'};
              font-size: 13px;
              font-weight: 400;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 2px;
              letter-spacing: -0.1px;
            }

            .stats {
              display: flex;
              align-items: center;
              gap: 12px;
              color: ${theme === 'dark' ? '#9BA0A4' : '#6A737C'};
              font-size: 11px;
              letter-spacing: 0;
            }

            .stat {
              display: flex;
              align-items: center;
              gap: 4px;
            }

            .icon {
              width: 12px;
              height: 12px;
              stroke-width: 2.5px;
            }

            .curseforge-logo {
              width: 16px;
              height: 16px;
              color: #F16436;
              flex-shrink: 0;
            }
          </style>
        </head>
        <body>
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
        </body>
      </html>
    `);

    // Take screenshot
    const element = await page.$('.badge');
    if (!element) {
      throw new Error('Badge element not found');
    }

    const screenshot = await element.screenshot({
      type: 'png',
      omitBackground: true,
    });

    await page.close();
    page = null;

    return new Response(screenshot, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    if (page) {
      await page.close();
      page = null;
    }
    console.error('Error generating badge:', error);
    return new Response('Failed to generate badge', { status: 500 });
  }
} 