/** @jsxImportSource react */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { ReactElement } from 'react';
import { CurseForgeProject } from '@/app/types/curseforge';
import { CurseForgeAPI } from '@/app/lib/curseforge-api';

type SupportedComponents = 'CurseForgeEmbedImageSkeleton';
type ImageFormat = 'png' | 'jpeg';
type ViewportPreset = 'desktop' | 'mobile' | 'tablet';

// Common device viewport presets with constrained widths
const VIEWPORT_PRESETS = {
  desktop: { width: 600, height: 135 },
  mobile: { width: 320, height: 160 },
  tablet: { width: 480, height: 170 },
} as const;

interface ComponentProps {
  CurseForgeEmbedImageSkeleton: {
    data: CurseForgeProject;
    size?: 'default' | 'small';
  };
}

interface RenderOptions {
  format?: ImageFormat;
  quality?: number;
  viewport?: ViewportPreset;
  customViewport?: {
    width: number;
    height: number;
  };
}

interface RenderComponentRequest {
  componentName: SupportedComponents;
  props: ComponentProps[SupportedComponents];
  options?: RenderOptions;
}

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as RenderComponentRequest;
    const { componentName, props, options = {} } = data;
    
    if (!componentName) {
      return new Response('Component name is required', { status: 400 });
    }

    const {
      format = 'png',
      viewport = 'desktop',
      customViewport,
    } = options;

    // Get viewport dimensions
    const { data: projectData, size = 'default' } = props;
    const viewportDimensions = customViewport || {
      width: VIEWPORT_PRESETS[viewport].width,
      height: size === 'small' ? 100 : VIEWPORT_PRESETS[viewport].height
    };

    // Render the CurseForge component
    if (componentName === 'CurseForgeEmbedImageSkeleton') {
      const element: ReactElement = (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            backgroundColor: 'white',
            border: '1px solid #E5E3E0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div style={{ 
            padding: size === 'small' ? '10px' : '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ 
              display: 'flex',
              gap: '12px', 
              alignItems: 'flex-start' 
            }}>
              <img
                src={projectData.thumbnail}
                alt={projectData.title}
                width={size === 'small' ? 48 : 64}
                height={size === 'small' ? 48 : 64}
                style={{
                  borderRadius: '6px',
                }}
              />
              <div style={{ 
                flex: 1, 
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <h2
                  style={{
                    margin: '0',
                    fontSize: size === 'small' ? '16px' : '18px',
                    color: '#141414',
                    lineHeight: 1.2,
                  }}
                >
                  {projectData.title}
                </h2>
                {size === 'default' && (
                  <p
                    style={{
                      margin: '0',
                      fontSize: '14px',
                      color: '#6D7072',
                      lineHeight: 1.5,
                    }}
                  >
                    {projectData.summary}
                  </p>
                )}
                <div
                  style={{
                    display: 'flex',
                    gap: size === 'small' ? '8px' : '12px',
                    fontSize: size === 'small' ? '12px' : '14px',
                    color: '#6D7072',
                  }}
                >
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center', 
                    gap: '6px' 
                  }}>
                    <svg
                      width={size === 'small' ? 14 : 16}
                      height={size === 'small' ? 14 : 16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F16436"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {CurseForgeAPI.formatNumber(projectData.downloads.total)}
                  </div>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center', 
                    gap: '6px' 
                  }}>
                    <svg
                      width={size === 'small' ? 14 : 16}
                      height={size === 'small' ? 14 : 16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F16436"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {CurseForgeAPI.formatDate(projectData.download.uploaded_at)}
                  </div>
                </div>
              </div>
            </div>
            {size === 'default' && projectData.categories.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {projectData.categories.map((category) => (
                  <span
                    key={category}
                    style={{
                      padding: '4px 12px',
                      backgroundColor: '#F9F7F5',
                      color: '#6D7072',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              height: '3px',
              width: '100%',
              background: 'linear-gradient(to right, #F16436, rgba(241, 100, 54, 0.7))',
            }}
          />
        </div>
      );

      return new ImageResponse(element, {
        width: viewportDimensions.width,
        height: viewportDimensions.height,
        headers: {
          'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    }

    return new Response('Unsupported component', { status: 400 });
  } catch (error) {
    console.error('Error rendering component:', error);
    return new Response(
      `Failed to render component: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { status: 500 }
    );
  }
} 