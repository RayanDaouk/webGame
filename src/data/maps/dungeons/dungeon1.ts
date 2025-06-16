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
};

export default dungeon1;
