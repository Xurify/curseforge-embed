import { CurseForgeProject } from '@/app/types/curseforge';

export type SupportedComponents = 'CurseForgeEmbedImageSkeleton';
export type ImageFormat = 'png' | 'jpeg';
export type ViewportPreset = 'desktop' | 'mobile' | 'tablet';
export type ComponentSize = 'default' | 'small';

export interface ComponentProps {
  CurseForgeEmbedImageSkeleton: {
    data: CurseForgeProject;
    size?: ComponentSize;
  };
}

export interface RenderOptions {
  format?: ImageFormat;
  quality?: number;
  viewport?: ViewportPreset;
  customViewport?: {
    width: number;
    height: number;
  };
}

export interface RenderComponentRequest {
  componentName: SupportedComponents;
  props: ComponentProps[SupportedComponents];
  options?: RenderOptions;
} 