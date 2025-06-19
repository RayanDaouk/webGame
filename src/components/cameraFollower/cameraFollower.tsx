import React, { useEffect, useRef, RefObject } from 'react';
import { Position } from '../../types/position';

interface CameraFollowerProps {
  playerPosition: Position;
  mapRef: RefObject<HTMLDivElement | null>;
  smoothing?: number; // Facteur de lissage (0 = instantané, 1 = très lent)
  offsetX?: number; // Décalage horizontal (pour centrer différemment)
  offsetY?: number; // Décalage vertical
}

const CameraFollower: React.FC<CameraFollowerProps> = ({
  playerPosition,
  mapRef,
  smoothing = 0.1,
  offsetX = 0,
  offsetY = 0,
}) => {
  const currentCameraPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const isFirstUpdate = useRef(true);

  useEffect(() => {
    const updateCamera = () => {
      if (!mapRef.current) return;

      const map = mapRef.current;

      // Use viewport size
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight - 60; // -60px For HUD, will be deleted for next step

      // Map size
      const mapWidth = map.offsetWidth;
      const mapHeight = map.offsetHeight;

      // Get playerPosition to fix it & currently, depend HUD size
      const targetCameraX = playerPosition.x - viewportWidth / 2 + offsetX;
      const targetCameraY = playerPosition.y - viewportHeight / 2 + offsetY;

      // Camera limite to not leave from map
      const maxCameraX = Math.max(0, mapWidth - viewportWidth);
      const maxCameraY = Math.max(0, mapHeight - viewportHeight);

      const clampedTargetX = Math.max(0, Math.min(targetCameraX, maxCameraX));
      const clampedTargetY = Math.max(0, Math.min(targetCameraY, maxCameraY));

      // First update for instant pos (it will be evolved with DB save)
      if (isFirstUpdate.current) {
        currentCameraPos.current = { x: clampedTargetX, y: clampedTargetY };
        isFirstUpdate.current = false;
      } else {
        // Smoothing camera
        currentCameraPos.current.x += (clampedTargetX - currentCameraPos.current.x) * smoothing;
        currentCameraPos.current.y += (clampedTargetY - currentCameraPos.current.y) * smoothing;
      }
      map.style.transform = `translate(-${currentCameraPos.current.x}px, -${currentCameraPos.current.y}px)`;

      // Continue animation
      animationFrameId.current = requestAnimationFrame(updateCamera);
    };

    // Start animation
    animationFrameId.current = requestAnimationFrame(updateCamera);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [playerPosition.x, playerPosition.y, smoothing, offsetX, offsetY, mapRef]);
  return null;
};

export default CameraFollower;
