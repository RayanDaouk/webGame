import { MapData } from '../../../types/map';

export const dungeon1: MapData = {
  id: 'dungeon-1',
  name: 'Crypte Sombre',
  width: 2400,
  height: 1600,
  backgroundColor: '#2F2F2F',
  portals: [
    {
      id: 'to-village-1',
      targetMapId: 'village-1',
      position: { x: 200, y: 200 }, // Position du bouton sur cette map
      label: 'Sortir du donjon',
      size: { width: 120, height: 40 },
      spawnPosition: { x: 400, y: 300 }, // Position où le joueur apparaît dans targetMapId
    },
  ],
};

export default dungeon1;
