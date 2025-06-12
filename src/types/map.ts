import { Position } from "./position";

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
  // autres propriétés spécifiques à chaque map
}

