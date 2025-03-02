import { CurseForgeProject } from '../types/curseforge';

/**
 * Generate mock CurseForge project data for testing
 */
export function getMockCurseForgeProject(overrides: Partial<CurseForgeProject> = {}): CurseForgeProject {
  const defaultData: CurseForgeProject = {
    id: 238222,
    title: 'JEI - Just Enough Items',
    summary: 'View Items and Recipes for Minecraft',
    description: 'JEI is an item and recipe viewing mod for Minecraft, built from the ground up for stability and performance.',
    game: 'Minecraft',
    type: 'Mod',
    urls: {
      curseforge: 'https://www.curseforge.com/minecraft/mc-mods/jei',
      project: 'https://minecraft.curseforge.com/projects/jei',
    },
    thumbnail: 'https://media.forgecdn.net/avatars/thumbnails/29/69/256/256/635838945588716414.jpeg',
    created_at: '2015-09-22T10:15:09Z',
    downloads: {
      monthly: 5200000,
      total: 150000000,
    },
    license: 'MIT',
    donate: 'https://www.patreon.com/mezz',
    categories: ['Cosmetic', 'API and Library', 'Utility'],
    members: [
      {
        title: 'Owner',
        username: 'mezz',
        id: 783214,
      }
    ],
    links: [],
    files: [
      {
        id: 3854084,
        url: 'https://edge.forgecdn.net/files/3854/84/jei-1.18.2-9.7.2.281.jar',
        display: 'jei-1.18.2-9.7.2.281.jar',
        name: 'jei-1.18.2-9.7.2.281.jar',
        type: 'Release',
        version: '9.7.2.281',
        filesize: 822241,
        versions: ['1.18.2'],
        downloads: 12500000,
        uploaded_at: '2022-04-21T18:30:00Z',
      }
    ],
    versions: {
      '1.18.2': [
        {
          id: 3854084,
          url: 'https://edge.forgecdn.net/files/3854/84/jei-1.18.2-9.7.2.281.jar',
          display: 'jei-1.18.2-9.7.2.281.jar',
          name: 'jei-1.18.2-9.7.2.281.jar',
          type: 'Release',
          version: '9.7.2.281',
          filesize: 822241,
          versions: ['1.18.2'],
          downloads: 12500000,
          uploaded_at: '2022-04-21T18:30:00Z',
        }
      ]
    },
    download: {
      id: 3854084,
      url: 'https://edge.forgecdn.net/files/3854/84/jei-1.18.2-9.7.2.281.jar',
      display: 'jei-1.18.2-9.7.2.281.jar',
      name: 'jei-1.18.2-9.7.2.281.jar',
      type: 'Release',
      version: '9.7.2.281',
      filesize: 822241,
      versions: ['1.18.2'],
      downloads: 12500000,
      uploaded_at: '2022-04-21T18:30:00Z',
    },
  };

  return {
    ...defaultData,
    ...overrides,
  };
} 