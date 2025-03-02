import { CurseForgeProject } from '../types/curseforge';

interface GenerateImageOptions {
  format?: 'png' | 'jpeg';
  deviceScaleFactor?: number;
}

// Vercel Hobby plan timeout (10 seconds)
const VERCEL_TIMEOUT = 9000; // Setting to 9s to allow for some buffer

/**
 * Generate a component image on the server side
 * Can be used in API routes
 * 
 * Note: This is optimized for Vercel deployment:
 * - Includes timeout handling for Vercel's limits
 * - Removes filesystem operations
 * - Simplified options for better performance
 */
export async function generateComponentImage(
  componentName: string,
  props: Record<string, any>,
  options: GenerateImageOptions = {}
): Promise<Buffer> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Image generation timed out')), VERCEL_TIMEOUT);
  });

  const generatePromise = fetch(`${appUrl}/api/render-component`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      componentName,
      props,
      options: {
        ...options,
        deviceScaleFactor: options.deviceScaleFactor || 1,
      },
    }),
  }).then(async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to generate image: ${errorData.error || response.statusText}`);
    }
    return Buffer.from(await response.arrayBuffer());
  });
  
  return Promise.race([generatePromise, timeoutPromise]);
}

/**
 * Generate a CurseForge component image 
 * This is a convenience wrapper for the specific component
 * 
 * Note: This is optimized for direct API usage and avoids filesystem operations
 */
export async function generateCurseForgeImage(
  data: CurseForgeProject,
  size: 'default' | 'small' = 'default',
  options: GenerateImageOptions = {}
): Promise<Buffer> {
  return generateComponentImage(
    'CurseForgeEmbedImageSkeleton',
    { data, size },
    {
      format: 'png',
      deviceScaleFactor: 1,
      ...options,
    }
  );
} 