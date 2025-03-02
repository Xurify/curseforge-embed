import { getMockCurseForgeProject } from '../utils/mockData';
import { CurseForgeEmbedImageSkeleton } from '../components/CurseForgeEmbedImageSkeleton';

export const dynamic = 'force-dynamic'; // Don't cache this page

export default function ServerGeneratedImagesPage() {
  const mockData = getMockCurseForgeProject();
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Server-Generated Component Images</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Original Component</h2>
        <div className="border border-gray-200 p-4 rounded-lg mb-4 max-w-2xl">
          <CurseForgeEmbedImageSkeleton data={mockData} size="default" />
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">API-Generated Images</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Default Size (PNG)</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden max-w-2xl">
            <img
              src="/api/generate-image/238222?size=default&format=png"
              alt="API-generated component (default size)"
              className="w-full"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            URL: <code>/api/generate-image/238222?size=default&format=png</code>
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Small Size (JPEG)</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xl">
            <img
              src="/api/generate-image/238222?size=small&format=jpeg"
              alt="API-generated component (small size)"
              className="w-full"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            URL: <code>/api/generate-image/238222?size=small&format=jpeg</code>
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">How to Use Server-Side Generation</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">1. Direct Image Usage</h3>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
              {`// In an <img> tag
<img 
  src="/api/generate-image/238222?size=default&format=png"
  alt="Component"
/>`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">2. Programmatic Usage</h3>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
              {`// Fetch the image programmatically
const response = await fetch(
  '/api/generate-image/238222?size=default&format=png'
);
const imageBlob = await response.blob();

// Or with additional options
const url = new URL('/api/generate-image/238222', window.location.origin);
url.searchParams.set('size', 'small');
url.searchParams.set('format', 'jpeg');
const response = await fetch(url);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 