import { MapData } from '../../../types/map';

export const village1: MapData = {
  id: 'village-1',
  name: 'Village de Prairies',
  width: 1920,
  height: 1080,
  backgroundColor: '#8FBC8F',
  portals: [
    {
      id: 'to-dungeon-1',
      targetMapId: 'dungeon-1',
      position: { x: 400, y: 300 }, // Position of portal on map
      label: 'Entrer dans la Crypte',
      size: {
        width: 120,
        height: 40,
      },
      spawnPosition: {
        x: 200,
        y: 200,
      }, // Position where player spawn on targetMapId
    },
  ],
};

export default village1;
