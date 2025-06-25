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
      position: { x: 200, y: 200 },
      label: 'Sortir du donjon',
      size: { width: 120, height: 40 },
      spawnPosition: { x: 400, y: 300 }
    }
  ],
  collisions: [
    {
      id: 'dungeon-wall-north',
      points: [
        { x: 100, y: 100 },
        { x: 300, y: 100 },
        { x: 300, y: 130 },
        { x: 100, y: 130 }
      ]
    },
    {
      id: 'dungeon-wall-east',
      points: [
        { x: 500, y: 150 },
        { x: 530, y: 150 },
        { x: 530, y: 300 },
        { x: 500, y: 300 }
      ]
    },
    {
      id: 'dungeon-pillar-1',
      points: [
        { x: 300, y: 400 },
        { x: 340, y: 400 },
        { x: 340, y: 440 },
        { x: 300, y: 440 }
      ]
    },
    {
      id: 'dungeon-pillar-2',
      points: [
        { x: 450, y: 400 },
        { x: 490, y: 400 },
        { x: 490, y: 440 },
        { x: 450, y: 440 }
      ]
    },
    {
      id: 'dungeon-altar',
      points: [
        { x: 250, y: 600 },
        { x: 370, y: 600 },
        { x: 370, y: 680 },
        { x: 250, y: 680 }
      ]
    }
  ]
};

export default dungeon1;
