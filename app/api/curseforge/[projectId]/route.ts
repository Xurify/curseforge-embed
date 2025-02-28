import { NextRequest, NextResponse } from 'next/server';
import { CurseForgeAPI } from '@/app/lib/curseforge-api';

const DEFAULT_REVALIDATE_SECONDS = 3600;

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  const { projectId } = await params;

  const searchParams = request.nextUrl.searchParams;
  const revalidate = parseInt(searchParams.get('revalidate') || String(DEFAULT_REVALIDATE_SECONDS));
  
  try {
    const data = await CurseForgeAPI.getProject(projectId, { revalidate });

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': `s-maxage=${revalidate}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error(`Error fetching CurseForge project ${projectId}:`, error);
    
    return NextResponse.json(
      { error: 'Failed to fetch CurseForge project' },
      { status: 500 }
    );
  }
} 