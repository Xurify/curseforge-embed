'use client';

import { useState, useEffect } from 'react';
import { getMockCurseForgeProject } from '../utils/mockData';
import { CurseForgeEmbedImageSkeleton } from '../components/CurseForgeEmbedImageSkeleton';
import { CurseForgeProject } from '../types/curseforge';

type SupportedComponents = 'CurseForgeEmbedImageSkeleton';
type ImageFormat = 'png' | 'jpeg';
type ComponentSize = 'default' | 'small';

interface ComponentProps {
  data: CurseForgeProject;
  size: ComponentSize;
}

interface ImageOptions {
  format: ImageFormat;
  quality: number;
  width: number;
  height: number;
  deviceScaleFactor: number;
}

interface FormState {
  componentName: SupportedComponents;
  props: ComponentProps;
  options: ImageOptions;
}

export default function ComponentToImagePage() {
  const [formState, setFormState] = useState<FormState>({
    componentName: 'CurseForgeEmbedImageSkeleton',
    props: {
      data: getMockCurseForgeProject(),
      size: 'default',
    },
    options: {
      format: 'png',
      quality: 90,
      width: 550,
      height: 800,
      deviceScaleFactor: 4,
    },
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewJson, setPreviewJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setPreviewJson(JSON.stringify(formState.props, null, 2));
  }, [formState.props]);
  
  const updatePropsFromJson = (jsonString: string) => {
    try {
      const parsedProps = JSON.parse(jsonString) as ComponentProps;
      setFormState((prev) => ({
        ...prev,
        props: parsedProps,
      }));
      setError(null);
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
  };
  
  const handleOptionsChange = (field: keyof ImageOptions, value: ImageOptions[keyof ImageOptions]) => {
    setFormState((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [field]: value,
      },
    }));
  };
  
  const handlePropChange = (field: keyof ComponentProps, value: ComponentProps[keyof ComponentProps]) => {
    setFormState((prev) => ({
      ...prev,
      props: {
        ...prev.props,
        [field]: value,
      },
    }));
  };
  
  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/render-component', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (e) {
      setError(`Error generating image: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const downloadImage = () => {
    if (!imageUrl) return;
    
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `component.${formState.options.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem', color: '#333' }}>React Component to Image Generator</h1>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Left column: Configuration */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ marginBottom: '1rem', color: '#444' }}>Component Settings</h2>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Component Size
              </label>
              <select 
                value={formState.props.size}
                onChange={(e) => handlePropChange('size', e.target.value as ComponentSize)}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.25rem'
                }}
              >
                <option value="default">Default</option>
                <option value="small">Small</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Component Props (JSON)
              </label>
              <textarea
                value={previewJson}
                onChange={(e) => setPreviewJson(e.target.value)}
                onBlur={() => updatePropsFromJson(previewJson)}
                style={{ 
                  width: '100%',
                  height: '300px',
                  padding: '0.5rem',
                  fontFamily: 'monospace',
                  border: error ? '1px solid #e53e3e' : '1px solid #ccc',
                  borderRadius: '0.25rem'
                }}
              />
              {error && <p style={{ color: '#e53e3e', marginTop: '0.5rem' }}>{error}</p>}
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ marginBottom: '1rem', color: '#444' }}>Image Options</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Format
              </label>
              <select 
                value={formState.options.format}
                onChange={(e) => handleOptionsChange('format', e.target.value as ImageFormat)}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.25rem'
                }}
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
              </select>
            </div>
            
            {formState.options.format === 'jpeg' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Quality ({formState.options.quality}%)
                </label>
                <input 
                  type="range" 
                  min="10" 
                  max="100"
                  value={formState.options.quality}
                  onChange={(e) => handleOptionsChange('quality', parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            )}
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Device Scale Factor ({formState.options.deviceScaleFactor}x)
              </label>
              <input 
                type="range" 
                min="1" 
                max="4" 
                step="0.5"
                value={formState.options.deviceScaleFactor}
                onChange={(e) => handleOptionsChange('deviceScaleFactor', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Width (px)
                </label>
                <input 
                  type="number" 
                  value={formState.options.width}
                  onChange={(e) => handleOptionsChange('width', parseInt(e.target.value))}
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '0.25rem'
                  }}
                />
              </div>
              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Height (px)
                </label>
                <input 
                  type="number" 
                  value={formState.options.height}
                  onChange={(e) => handleOptionsChange('height', parseInt(e.target.value))}
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '0.25rem'
                  }}
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={generateImage}
            disabled={isGenerating}
            style={{
              backgroundColor: '#F16436',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              padding: '0.75rem 1.5rem',
              fontWeight: 'bold',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              opacity: isGenerating ? 0.7 : 1,
              transition: 'all 0.2s ease',
            }}
          >
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
        
        {/* Right column: Preview */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ marginBottom: '1rem', color: '#444' }}>Preview</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#555' }}>Component</h3>
            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <CurseForgeEmbedImageSkeleton 
                data={formState.props.data}
                size={formState.props.size} 
              />
            </div>
          </div>
          
          {imageUrl && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#555' }}>
                Generated Image
                <button
                  onClick={downloadImage}
                  style={{
                    marginLeft: '1rem',
                    backgroundColor: '#4A5568',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    padding: '0.25rem 0.75rem',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                  }}
                >
                  Download
                </button>
              </h3>
              <div style={{ border: '1px solid #E5E3E0', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <img 
                  src={imageUrl} 
                  alt="Generated component" 
                  style={{ maxWidth: '100%', display: 'block' }} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 