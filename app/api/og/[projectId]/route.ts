import { NextRequest } from 'next/server';
import { CurseForgeAPI } from '@/app/lib/curseforge-api';

interface OGImageOptions {
  theme?: 'dark' | 'light';
  format?: 'png' | 'jpeg';
  size?: 'default' | 'small';
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }>; }
) {
  try {
    const { projectId } = await params;
    const searchParams = request.nextUrl.searchParams;

    const options: OGImageOptions = {
      theme: searchParams.get('theme') as 'dark' | 'light' || undefined,
      format: searchParams.get('format') as 'png' | 'jpeg' || undefined,
      size: searchParams.get('size') as 'default' | 'small' || undefined,
    };

    const data = await CurseForgeAPI.getProject(Number(projectId));

    const renderRequest = {
      componentName: 'ProjectBadgeOG' as const,
      props: {
        data,
        theme: options.theme || 'dark',
        size: options.size || 'default',
      },
      options: {
        format: options.format || 'png',
        viewport: options.size === 'small' ? {
          width: 600,
          height: 120,
        } : 'og' as const,
      }
    };

    const response = await fetch(new URL('/api/render-component', process.env.NEXT_PUBLIC_APP_URL), {
      method: 'POST',
      body: JSON.stringify(renderRequest),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to render image: ${response.statusText}`);
    }

    const image = await response.blob();
    const contentType = options.format === 'jpeg' ? 'image/jpeg' : 'image/png';

    return new Response(image, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response(
      `Failed to generate OG image: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { status: 500 }
    );
  }
} 