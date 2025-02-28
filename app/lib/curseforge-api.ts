import { CurseForgeProject } from '../types/curseforge';

/**
 * CurseForge API wrapper
 * Based on the cfwidget.com API: https://api.cfwidget.com/
 */
export class CurseForgeAPI {
  private static baseUrl = 'https://api.cfwidget.com';
  
  /**
   * Fetch a project by its ID
   * @param projectId The CurseForge project ID
   * @param options Optional fetch configuration
   * @returns Promise with the project data
   */
  static async getProject(
    projectId: number | string,
    options: { revalidate?: number } = {}
  ): Promise<CurseForgeProject> {
    const { revalidate = 3600 } = options;
    
    const response = await fetch(`${this.baseUrl}/${projectId}`, {
      next: { revalidate }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch project data: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
  
  /**
   * Format a file size in bytes to a human-readable string
   * @param bytes File size in bytes
   * @returns Formatted file size string
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }
  
  /**
   * Format a number with compact notation
   * @param num The number to format
   * @returns Formatted number string
   */
  static formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  }
  
  /**
   * Format a date string to a readable format
   * @param dateString ISO date string
   * @returns Formatted date string
   */
  static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
} 