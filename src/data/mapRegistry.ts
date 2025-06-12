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

// Fonctions utilitaires
export const getMapList = (): string[] => Object.keys(MAP_REGISTRY);

export const loadMap = async (mapId: string): Promise<MapData> => {
  const loader = MAP_REGISTRY[mapId];
  if (!loader) {
    throw new Error(`Map avec l'ID "${mapId}" introuvable dans le registry`);
  }

  try {
    const module = await loader();
    return module.default;
  } catch (error) {
    throw new Error(`Erreur lors du chargement de la map "${mapId}": ${error}`);
  }
};

// Fonction pour obtenir les infos de base sans charger la map complète
export const getMapInfo = async (
  mapId: string,
): Promise<{ id: string; name: string }> => {
  const mapData = await loadMap(mapId);
  return { id: mapData.id, name: mapData.name };
};

// Fonction pour charger plusieurs maps par catégorie
export const getMapsByCategory = (category: string): string[] => {
  return getMapList().filter((id) => id.startsWith(category));
};
