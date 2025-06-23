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
  collisions: [
    {
      id: 'village-house-1',
      x: 200,
      y: 50,
      width: 100,
      height: 25,
      type: 'wall'
    },
    {
      id: 'village-well',
      x: 350,
      y: 200,
      width: 80,
      height: 40,
      type: 'obstacle'
    },
    {
      id: 'village-fence',
      x: 100,
      y: 400,
      width: 300,
      height: 15,
      type: 'barrier'
    },
    {
      id: 'village-tree-1',
      x: 600,
      y: 150,
      width: 50,
      height: 50,
      type: 'obstacle'
    }
  ]
};

export default village1;
