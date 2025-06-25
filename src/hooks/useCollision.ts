import { useRef } from 'react';
import { Position } from '../types/position';

// Nouvelle structure : chaque "box" est un polygone défini par une série de points
type Point = { x: number; y: number };

interface CollisionPolygon {
  id?: string;
  points: Point[];
}

interface UseCollisionProps {
  playerSize: { width: number; height: number };
  collisionBoxes: CollisionPolygon[];
  isPlayerCentered: boolean;
}

export function useCollision({
  playerSize,
  collisionBoxes,
  isPlayerCentered
}: UseCollisionProps) {
  // Position précédente du joueur stockée entre les frames
  const previousPositionRef = useRef<Position>({ x: 0, y: 0 });

  // Fonction de base pour tester si un point est à l'intérieur d'un polygone
  // via l’algorithme du rayon (ray-casting algorithm)
  const isPointInPolygon = (point: Point, polygon: Point[]): boolean => {
    let inside = false;
    const { x, y } = point;
    const len = polygon.length;

    for (let i = 0, j = len - 1; i < len; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;

      const intersect =
        yi > y !== yj > y &&
        x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
  };

  // Détermine si la nouvelle position est en collision avec un ou plusieurs polygones
const isColliding = (position: Position): boolean => {
  const offsetX = isPlayerCentered ? playerSize.width / 2 : 0;
  const offsetY = isPlayerCentered ? playerSize.height / 2 : 0;

  // Coins du joueur autour de sa position
  const topLeft: Point = { x: position.x - offsetX, y: position.y - offsetY };
  const topRight: Point = { x: position.x + offsetX, y: position.y - offsetY };
  const bottomLeft: Point = { x: position.x - offsetX, y: position.y + offsetY };
  const bottomRight: Point = { x: position.x + offsetX, y: position.y + offsetY };

  const pointsToTest = [topLeft, topRight, bottomLeft, bottomRight];

  return collisionBoxes.some(polygon =>
    pointsToTest.some(point => isPointInPolygon(point, polygon.points))
  );
};

  // Fonction principale de validation de position: elle vérifie la collision et ajuste la position si nécessaire
  const validatePosition = (newPosition: Position): Position => {
    if (!isColliding(newPosition)) {
      return newPosition;
    } else {
      // Si la position est invalide (collision), on revient à la position précédente connue
      return previousPositionRef.current;
    }
  };

  // Permet de mettre à jour la référence de position précédente
  const updatePreviousPosition = (position: Position) => {
    previousPositionRef.current = position;
  };

  // Ce hook expose les fonctions nécessaires à l’extérieur
  return {
    validatePosition,
    updatePreviousPosition
  };
}
