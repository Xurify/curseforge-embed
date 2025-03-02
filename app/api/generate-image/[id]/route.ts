import { NextRequest } from 'next/server';
import { CurseForgeAPI } from '@/app/lib/curseforge-api';
import { generateCurseForgeImage } from '@/app/utils/serverImageGenerator';

// Define the params type for Next.js API routes
interface Params {
  id: string;
}

/**
 * API route that generates an image of a CurseForge project by ID
 * Example usage: /api/generate-image/238222?size=default&format=png
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    // Get the project ID from the path
    const projectId = parseInt(params.id, 10);
    
    if (isNaN(projectId)) {
      return new Response('Invalid project ID', { status: 400 });
    }
    
    // Get query parameters
    const { searchParams } = request.nextUrl;
    const size = searchParams.get('size') as 'default' | 'small' | null || 'default';
    const format = searchParams.get('format') as 'png' | 'jpeg' | null || 'png';
    
    // Fetch project data
    const projectData = await CurseForgeAPI.getProject(projectId);
    
    // Generate image
    const imageBuffer = await generateCurseForgeImage(projectData, size, { format });
    
    // Return the image with appropriate headers
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
        'Content-Disposition': `inline; filename="curseforge-${projectId}.${format}"`,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response(`Failed to generate image: ${(error as Error).message}`, {
      status: 500,
    });
  }
} 