import { NextRequest } from 'next/server';
import { CurseForgeEmbedImageSkeleton } from '@/app/components/CurseForgeEmbedImageSkeleton';
import { CurseForgeProject } from '@/app/types/curseforge';
import { headers } from 'next/headers';

// Component registry to map component names to actual components
const componentRegistry = {
  CurseForgeEmbedImageSkeleton,
};

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const componentName = searchParams.get('component');
  const propsJson = searchParams.get('props');
  
  if (!componentName || !propsJson) {
    return new Response('Missing component name or props', {
      status: 400,
    });
  }
  
  let props;
  try {
    props = JSON.parse(propsJson);
  } catch (e) {
    return new Response('Invalid props JSON', {
      status: 400,
    });
  }
  
  // Get the component from the registry
  const Component = componentRegistry[componentName as keyof typeof componentRegistry];
  if (!Component) {
    return new Response(`Component ${componentName} not found`, {
      status: 404,
    });
  }
  
  // Render the component
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Component Renderer</title>
        <style>
          * {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: transparent;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.5;
          }
          
          #component-container {
            display: block;
            width: 100%;
            padding: 0;
          }
          
          h2 {
            margin: 0 0 0.25rem 0;
            line-height: 1.2;
          }
          
          p {
            margin: 0 0 0.5rem 0;
            line-height: 1.5;
          }
          
          svg {
            shape-rendering: geometricPrecision;
          }
        </style>
      </head>
      <body>
        <div id="component-container">
          ${renderToStaticMarkup(<Component {...props} />)}
        </div>
      </body>
    </html>
  `;
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

// Helper function to render React components to HTML
function renderToStaticMarkup(component: React.ReactElement): string {
  try {
    // In Next.js App Router, we need to use React's renderToStaticMarkup
    const ReactDOMServer = require('react-dom/server');
    return ReactDOMServer.renderToStaticMarkup(component);
  } catch (error) {
    console.error('Error rendering component to HTML:', error);
    return '';
  }
} 