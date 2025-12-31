const ASSETS_BASE = '/assets';

export const ASSET_PATHS = {
  ORES: `${ASSETS_BASE}/ores`,
  TOOLS: `${ASSETS_BASE}/tools`,
  RESOURCES: `${ASSETS_BASE}/resources`,
  SOUNDS: `${ASSETS_BASE}/sounds`,
} as const;


export const getOrePath = (filename: string) => 
  `${ASSET_PATHS.ORES}/${filename}`;

export const getToolPath = (filename: string) => 
  `${ASSET_PATHS.TOOLS}/${filename}`;

export const getResourcePath = (filename: string) => 
  `${ASSET_PATHS.RESOURCES}/${filename}`;

export const getSoundPath = (filename: string) => 
  `${ASSET_PATHS.SOUNDS}/${filename}`;