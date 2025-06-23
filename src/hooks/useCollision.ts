import { useRef, useCallback } from 'react';
import { Position } from '../types/position';

interface CollisionBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CollisionConfig {
  playerSize: { width: number; height: number };
  collisionBoxes: CollisionBox[];
  // Nouveau paramètre pour indiquer si le token est centré
  isPlayerCentered?: boolean;
}

export const useCollision = (config: CollisionConfig) => {
  const { playerSize, collisionBoxes, isPlayerCentered = false } = config;
  const previousPosition = useRef<Position>({ x: 0, y: 0 });

  // Fonction pour détecter la collision entre le joueur et une boîte
  const checkCollision = useCallback((playerPos: Position, collisionBox: CollisionBox): boolean => {
    let playerLeft: number;
    let playerTop: number;

    if (isPlayerCentered) {
      // Si le token est centré, ajuster la position
      playerLeft = playerPos.x - playerSize.width / 2;
      playerTop = playerPos.y - playerSize.height / 2;
    } else {
      // Si la position correspond au coin supérieur gauche
      playerLeft = playerPos.x;
      playerTop = playerPos.y;
    }

    const playerRight = playerLeft + playerSize.width;
    const playerBottom = playerTop + playerSize.height;

    const boxLeft = collisionBox.x;
    const boxRight = collisionBox.x + collisionBox.width;
    const boxTop = collisionBox.y;
    const boxBottom = collisionBox.y + collisionBox.height;

    // Détection de collision AABB
    return (
      playerLeft < boxRight &&
      playerRight > boxLeft &&
      playerTop < boxBottom &&
      playerBottom > boxTop
    );
  }, [playerSize, isPlayerCentered]);

  // Fonction pour vérifier la collision avec toutes les boîtes
  const checkAllCollisions = useCallback((playerPos: Position): boolean => {
    return collisionBoxes.some(box => checkCollision(playerPos, box));
  }, [collisionBoxes, checkCollision]);

  // Fonction principale pour valider une position
  const validatePosition = useCallback((newPos: Position): Position => {
    if (!checkAllCollisions(newPos)) {
      previousPosition.current = newPos;
      return newPos; // Pas de collision, position valide
    }

    // En cas de collision, on essaie de "glisser" le long des bords
    const prevPos = previousPosition.current;

    // Essayer de bouger seulement en X (garder Y précédent)
    const posWithOldY = { x: newPos.x, y: prevPos.y };
    if (!checkAllCollisions(posWithOldY)) {
      previousPosition.current = posWithOldY;
      return posWithOldY;
    }

    // Essayer de bouger seulement en Y (garder X précédent)
    const posWithOldX = { x: prevPos.x, y: newPos.y };
    if (!checkAllCollisions(posWithOldX)) {
      previousPosition.current = posWithOldX;
      return posWithOldX;
    }

    // Si aucune direction ne fonctionne, rester à la position précédente
    return prevPos;
  }, [checkAllCollisions]);

  // Fonction pour mettre à jour la position de référence
  const updatePreviousPosition = useCallback((position: Position) => {
    previousPosition.current = position;
  }, []);

  return {
    validatePosition,
    updatePreviousPosition,
    checkCollision: checkAllCollisions
  };
};
