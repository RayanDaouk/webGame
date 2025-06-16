import { MapData } from '../types/map';

// Type pour les fonctions de chargement
type MapLoader = () => Promise<{ default: MapData }>;

// Registry avec lazy loading
export const MAP_REGISTRY: Record<string, MapLoader> = {
  'village-1': () => import('./maps/villages/village1'),
  'village-2': () => import('./maps/villages/village2'),
  'dungeon-1': () => import('./maps/dungeons/dungeon1'),
  'dungeon-2': () => import('./maps/dungeons/dungeon2'),
  'forest-1': () => import('./maps/forests/forest1'),
};

// Fonctions utilities
// export const getMapList = (): string[] => Object.keys(MAP_REGISTRY);
type MapID = keyof typeof MAP_REGISTRY;
export const getMapList = (): MapID[] => Object.keys(MAP_REGISTRY) as MapID[];
// async (mapId: string): Promise<MapData> signifie:

export const loadMap = async (mapId: string): Promise<MapData> => {
  const loader = MAP_REGISTRY[mapId]; //  Get from map register (MAP_REGISTRY)
  // Fct to load target map
  if (!loader) {
    throw new Error(`Map avec l'ID "${mapId}" introuvable dans le registry`);
  }

  try {
    const module = await loader(); //  Call loader, type:
    // () => import('./maps/villages/village1') donc une promise
    return module.default; // return map object
    // (default export module), donc un MapData.
  } catch (error) { // Error detection
    throw new Error(`Erreur lors du chargement de la map "${mapId}": ${error}`);
  }
};

// fct to get basic map info without full datas of map
export const getMapInfo = async (
  mapId: string,
): Promise<{ id: string; name: string }> => {
  const mapData = await loadMap(mapId);
  return { id: mapData.id, name: mapData.name };
};

// Function for loading several maps per category
export const getMapsByCategory = (category: string): string[] => {
  return getMapList().filter((id) => id.startsWith(category));
};
