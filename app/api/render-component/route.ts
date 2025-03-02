import { NextRequest, NextResponse } from 'next/server';
import puppeteer, { Browser } from 'puppeteer';

// Define the expected request body structure
interface RenderComponentRequest {
  componentName: string;
  props: Record<string, any>;
  options: {
    format: 'png' | 'jpeg';
    quality?: number;
    width?: number;
    height?: number;
    deviceScaleFactor?: number;
  };
}

let browser: Browser | null = null;

// Helper to get or initialize the browser
async function getBrowser() {
  if (!browser || !browser.isConnected()) {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  return browser;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as RenderComponentRequest;
    const { componentName, props, options } = data;
    
    // Validate input
    if (!componentName) {
      return NextResponse.json({ error: 'Component name is required' }, { status: 400 });
    }

    // Set defaults for options
    const {
      format = 'png',
      quality = 90,
      width = 600,
      height = 700,
      deviceScaleFactor = 4,
    } = options || {};

    // Sanitize component name to prevent directory traversal
    const sanitizedComponentName = componentName.replace(/[^a-zA-Z0-9]/g, '');
    
    // Get browser instance
    const browser = await getBrowser();
    const page = await browser.newPage();
    
    try {
      // Set viewport with high DPI for better quality
      await page.setViewport({
        width,
        height,
        deviceScaleFactor,
      });

      // Add extra CSS for sharper text rendering
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

      // Construct the URL for the render page with component details
      const url = new URL('/api/render-page', process.env.NEXT_PUBLIC_APP_URL);
      url.searchParams.set('component', sanitizedComponentName);
      url.searchParams.set('props', JSON.stringify(props));
      
      // Navigate to the render page
      await page.goto(url.toString(), { waitUntil: 'networkidle0' });
      
      // Extra wait to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Select the component container
      const element = await page.$('#component-container');
      if (!element) {
        throw new Error('Component container not found');
      }
      
      // Get bounding box for precise capture
      const boundingBox = await element.boundingBox();
      if (!boundingBox) {
        throw new Error('Could not determine component dimensions');
      }

      // Take screenshot
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

      // Close the page
      await page.close();
      
      // Return the image with appropriate headers
      return new NextResponse(screenshot, {
        headers: {
          'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
          'Content-Disposition': `inline; filename="component.${format}"`,
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    } catch (err) {
      await page.close();
      throw err;
    }
  } catch (error) {
    console.error('Error rendering component:', error);
    return NextResponse.json(
      { error: 'Failed to render component', details: (error as Error).message },
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