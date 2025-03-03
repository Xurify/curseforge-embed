import { CurseForgeProject } from '../types/curseforge';

type SupportedComponents = 'CurseForgeEmbedImageSkeleton';
type ImageFormat = 'png' | 'jpeg';
type ComponentSize = 'default' | 'small';
type ViewportPreset = 'desktop' | 'mobile' | 'tablet';

interface ComponentProps {
  CurseForgeEmbedImageSkeleton: {
    data: CurseForgeProject;
    size?: ComponentSize;
  };
}

interface GenerateImageOptions {
  format?: ImageFormat;
  deviceScaleFactor?: number;
  quality?: number; // JPEG quality (1-100)
  viewport?: ViewportPreset;
  customViewport?: {
    width: number;
    height: number;
  };
}

// Default options for high-quality image generation
const DEFAULT_OPTIONS: Required<Omit<GenerateImageOptions, 'customViewport'>> = {
  format: 'png',
  deviceScaleFactor: 4, // Increased for sharper rendering
  quality: 100, // Maximum quality for JPEG
  viewport: 'desktop',
};

// Vercel Hobby plan timeout (10 seconds)
const VERCEL_TIMEOUT = 9000; // Setting to 9s to allow for some buffer

/**
 * Generate a component image on the server side
 * Can be used in API routes
 * 
 * Note: This is optimized for Vercel deployment:
 * - Includes timeout handling for Vercel's limits
 * - Removes filesystem operations
 * - Uses high-quality rendering settings
 * - Supports mobile and tablet viewports
 */
export async function generateComponentImage<T extends SupportedComponents>(
  componentName: T,
  props: ComponentProps[T],
  options: Partial<GenerateImageOptions> = {}
): Promise<Buffer> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  
  // Merge with default options
  const finalOptions: Required<Omit<GenerateImageOptions, 'customViewport'>> & Pick<GenerateImageOptions, 'customViewport'> = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  
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
      options: finalOptions,
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
 * Note: This is optimized for high-quality image generation
 */
export async function generateCurseForgeImage(
  data: CurseForgeProject,
  size: ComponentSize = 'default',
  options: Partial<GenerateImageOptions> = {}
): Promise<Buffer> {
  return generateComponentImage(
    'CurseForgeEmbedImageSkeleton',
    { data, size },
    {
      ...DEFAULT_OPTIONS,
      ...options,
    }
  );
}

/**
 * Generate a mobile-optimized CurseForge component image
 * This is a convenience wrapper that uses mobile viewport settings
 */
export async function generateCurseForgeMobileImage(
  data: CurseForgeProject,
  size: ComponentSize = 'small',
  options: Partial<GenerateImageOptions> = {}
): Promise<Buffer> {
  return generateComponentImage(
    'CurseForgeEmbedImageSkeleton',
    { data, size },
    {
      ...DEFAULT_OPTIONS,
      viewport: 'mobile',
      ...options,
    }
  );
} 