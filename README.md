# React Component to Image Generator

This Next.js application allows you to convert React components to images using Puppeteer. It provides a server-side API for rendering components as images and a client-side interface for customization.

## Features

- 🖼️ Convert React components to PNG or JPEG images
- 🎛️ Customize component props through an intuitive UI
- ⚙️ Control image format, dimensions, and quality
- 📥 View and download generated images
- 📱 Responsive design that works across devices
- 🔍 High-DPI image support for retina displays

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd curseforge-embed
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the project root with the following contents:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000/component-to-image](http://localhost:3000/component-to-image) in your browser to access the component-to-image generator.

## Production

Build the application for production:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm run start
# or
yarn start
```

## API Usage

### Rendering a Component as an Image

```typescript
// Example API request
const response = await fetch('/api/render-component', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    componentName: 'CurseForgeEmbedImageSkeleton',
    props: {
      data: {
        /* Your CurseForge project data */
      },
      size: 'default', // or 'small'
    },
    options: {
      format: 'png', // or 'jpeg'
      quality: 90, // for JPEG only
      width: 800, 
      height: 600,
      deviceScaleFactor: 2, // for high-DPI images
    },
  }),
});

// The response will be the image in the requested format
const imageBlob = await response.blob();
```

## Serverless Deployment Considerations

When deploying to serverless environments (Vercel, Netlify, etc.), keep in mind:

1. **Cold Start Times**: Puppeteer initialization can take time, which may lead to longer cold start times.

2. **Memory Limits**: Serverless functions often have memory limits (e.g., 1GB on Vercel). Rendering large or complex components may hit these limits.

3. **Execution Timeouts**: Consider that the rendering process might exceed the timeout limits of some serverless platforms (typically 10-60 seconds).

4. **Puppeteer Configuration**: You may need to configure Puppeteer differently for specific platforms. Refer to:
   - [Puppeteer on Vercel](https://github.com/vercel/vercel/tree/main/examples/puppeteer)
   - [Puppeteer with AWS Lambda](https://github.com/puppeteer/puppeteer/blob/main/docs/browsers-api.md)

5. **Caching**: Implement caching strategies to avoid re-rendering the same components with the same props.

## Adding New Components

To add new components to the generator:

1. Add your component to the `componentRegistry` in `app/api/render-page/route.tsx`.
2. Update the client-side page to include options specific to your component.
3. Ensure your component is compatible with server-side rendering.

## License

MIT
