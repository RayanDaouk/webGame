import { Position } from "./position";

export interface CollisionBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type?: 'wall' | 'obstacle' | 'barrier' | 'custom';
}

export interface MapPortal {
  id: string;
  targetMapId: string;
  position: Position;
  label: string;
  size?: { width: number; height: number };
  spawnPosition: Position;
}

export interface MapData {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor?: string;
  backgroundImage?: string;
  portals?: MapPortal[];
  collisions?: CollisionBox[];
  // autres propriétés spécifiques à chaque map
}


