import React, { ReactElement } from 'react';
import { Position } from './position';

type CollisionZone = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'monster' | 'collision' | 'teleport';
};

type InteractiveElement = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'door' | 'npc';
  data?: any; // Données spécifiques à l'élément
  onInteract?: (element: InteractiveElement) => void;
};

// Context pour partager les données de la carte
type MapContextType = {
  checkCollision: (
    position: Position,
    size: { width: number; height: number },
  ) => CollisionZone | undefined;
  mapData: MapData;
  onCollisionDetected?: (collision: CollisionZone) => void;
};

type MapData = {
  id: string;
  name: string;
  backgroundImage: string;
  backgroundClass?: string;
  collisions: CollisionZone[];
  interactiveElements: InteractiveElement[];
  spawnPoints?: Position[];
};
