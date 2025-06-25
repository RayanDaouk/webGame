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
      points: [
        { x: 200, y: 50 },
        { x: 250, y: 10 },
        { x: 300, y: 50 },
        { x: 300, y: 75 },
        { x: 200, y: 75 }
      ]
    },
    {
      id: 'village-well',
      points: [
        { x: 350, y: 200 },
        { x: 430, y: 200 },
        { x: 430, y: 240 },
        { x: 350, y: 240 }
      ]
    },
    {
      id: 'village-fence',
      points: [
        { x: 100, y: 400 },
        { x: 400, y: 400 },
        { x: 400, y: 415 },
        { x: 100, y: 415 }
      ]
    },
    {
      id: 'village-tree-1',
      points: [
        { x: 600, y: 150 },
        { x: 650, y: 150 },
        { x: 650, y: 200 },
        { x: 600, y: 200 }
      ]
    }
  ]
};

export default village1;
