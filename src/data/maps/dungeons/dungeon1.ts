import { MapData } from '../../../types/map';
// Are you lost? Get more infos on village1.ts :)
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
      spawnPosition: { x: 400, y: 300 },
    },
  ],
  collisions: [
    {
      id: 'dungeon-wall-north',
      x: 100,
      y: 100,
      width: 200,
      height: 30,
      type: 'wall'
    },
    {
      id: 'dungeon-wall-east',
      x: 500,
      y: 150,
      width: 30,
      height: 150,
      type: 'wall'
    },
    {
      id: 'dungeon-pillar-1',
      x: 300,
      y: 400,
      width: 40,
      height: 40,
      type: 'obstacle'
    },
    {
      id: 'dungeon-pillar-2',
      x: 450,
      y: 400,
      width: 40,
      height: 40,
      type: 'obstacle'
    },
    {
      id: 'dungeon-altar',
      x: 250,
      y: 600,
      width: 120,
      height: 80,
      type: 'obstacle'
    }
  ]
};

export default dungeon1;
