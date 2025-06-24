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
  isPlayerCentered?: boolean;
}

export const useCollision = (config: CollisionConfig) => {
  const { playerSize, collisionBoxes, isPlayerCentered = false } = config;
  const previousPosition = useRef<Position>({ x: 0, y: 0 });

  // Detect collision between player and box
  const checkCollision = useCallback((playerPos: Position, collisionBox: CollisionBox): boolean => {
    let playerLeft: number;
    let playerTop: number;

    if (isPlayerCentered) {
      // if playerToken is centered, adapte:
      playerLeft = playerPos.x - playerSize.width / 2;
      playerTop = playerPos.y - playerSize.height / 2;
    } else {
      playerLeft = playerPos.x;
      playerTop = playerPos.y;
    }

    // calculate PlayerToken collision
    const playerRight = playerLeft + playerSize.width;
    const playerBottom = playerTop + playerSize.height;
    // Calculate box collision
    const boxLeft = collisionBox.x;
    const boxRight = collisionBox.x + collisionBox.width;
    const boxTop = collisionBox.y;
    const boxBottom = collisionBox.y + collisionBox.height;

    // Collision AABB detection
    return (
      playerLeft < boxRight &&
      playerRight > boxLeft &&
      playerTop < boxBottom &&
      playerBottom > boxTop
    );
  }, [playerSize, isPlayerCentered]);

  // Checking all collisions on current map
  const checkAllCollisions = useCallback((playerPos: Position): boolean => {
    return collisionBoxes.some(box => checkCollision(playerPos, box));
  }, [collisionBoxes, checkCollision]);

  // Checking if pos of PlayerToken is on a collisionBoxe
  const validatePosition = useCallback((newPos: Position): Position => {
    if (!checkAllCollisions(newPos)) {
      previousPosition.current = newPos;
      return newPos; // no match? => can move.
    }

    // If collision, try to slide along borders
    const prevPos = previousPosition.current;

    // Try to move X only (keep previous Y)
    const posWithOldY = { x: newPos.x, y: prevPos.y };
    if (!checkAllCollisions(posWithOldY)) {
      previousPosition.current = posWithOldY;
      return posWithOldY;
    }

    // Try to move y only (keep previous X)
    const posWithOldX = { x: prevPos.x, y: newPos.y };
    if (!checkAllCollisions(posWithOldX)) {
      previousPosition.current = posWithOldX;
      return posWithOldX;
    }

    // X and y are stuck? Keep current pos.
    return prevPos;
  }, [checkAllCollisions]);

  // Update pos ref
  const updatePreviousPosition = useCallback((position: Position) => {
    previousPosition.current = position;
  }, []);

  return {
    validatePosition,
    updatePreviousPosition,
    checkCollision: checkAllCollisions
  };
};
