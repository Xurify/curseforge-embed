export interface CurseForgeMember {
  title: string;
  username: string;
  id: number;
}

export interface CurseForgeFile {
  id: number;
  url: string;
  display: string;
  name: string;
  type: string;
  version: string;
  filesize: number;
  versions: string[];
  downloads: number;
  uploaded_at: string;
}

export interface CurseForgeProject {
  id: number;
  title: string;
  summary: string;
  description: string;
  game: string;
  type: string;
  urls: {
    curseforge: string;
    project: string;
  };
  thumbnail: string;
  created_at: string;
  downloads: {
    monthly: number;
    total: number;
  };
  license: string;
  donate: string;
  categories: string[];
  members: CurseForgeMember[];
  links: any[];
  files: CurseForgeFile[];
  versions: Record<string, CurseForgeFile[]>;
  download: CurseForgeFile;
} 