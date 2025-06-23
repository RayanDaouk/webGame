import React, { useEffect, useRef, RefObject } from 'react';
import { Position } from '../../types/position';

interface CameraFollowerProps {
  playerPosition: Position;
  mapRef: RefObject<HTMLDivElement | null>;
  smoothing?: number; // 0 = instant, 1 = very smoothing
  offsetX?: number; // Horizontal gap to decenter camera from playerToken
  offsetY?: number; // Vertical gap
  onCameraPositionChange?: (position: Position) => void;
}

const CameraFollower: React.FC<CameraFollowerProps> = ({
  playerPosition,
  mapRef,
  smoothing = 0.1,
  offsetX = 0,
  offsetY = 0,
  onCameraPositionChange,
}) => {
  const currentCameraPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const isFirstUpdate = useRef(true);
  const lastReportedPos = useRef({ x: 0, y: 0 });

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

      // Center camera and match with playerPosition
      const targetCameraX = playerPosition.x - viewportWidth / 2 + offsetX;
      const targetCameraY = playerPosition.y - viewportHeight / 2 + offsetY;

      // Camera limite to not leave from map
      const maxCameraX = Math.max(0, mapWidth - viewportWidth);
      const maxCameraY = Math.max(0, mapHeight - viewportHeight);
      // ClampedTarget automatically offsets playerToken when the camera is at the limits of the map
      const clampedTargetX = Math.max(0, Math.min(targetCameraX, maxCameraX)); // Bottom right border
      const clampedTargetY = Math.max(0, Math.min(targetCameraY, maxCameraY)); // top left border

      // For First update fix camera on tokenPlayer instantly
      if (isFirstUpdate.current) {
        currentCameraPos.current = { x: clampedTargetX, y: clampedTargetY };
        isFirstUpdate.current = false;
      } else {
        // Smoothing camera (reduce distance per frame, exemple: 100 × 0.1 = 10)
        currentCameraPos.current.x += (clampedTargetX - currentCameraPos.current.x) * smoothing;
        currentCameraPos.current.y += (clampedTargetY - currentCameraPos.current.y) * smoothing;
      }

      map.style.transform = `translate(-${currentCameraPos.current.x}px, -${currentCameraPos.current.y}px)`;


      const deltaX = Math.abs(currentCameraPos.current.x - lastReportedPos.current.x);
      const deltaY = Math.abs(currentCameraPos.current.y - lastReportedPos.current.y);
      // Given current map pos to parent - only if pos has changed (prevent infinity loop)
      if (onCameraPositionChange && (deltaX > 0.5 || deltaY > 0.5 || isFirstUpdate.current)) {
        onCameraPositionChange({
          x: currentCameraPos.current.x,
          y: currentCameraPos.current.y
        });
        lastReportedPos.current = {
          x: currentCameraPos.current.x,
          y: currentCameraPos.current.y
        };
      }

      // Continue animation
      animationFrameId.current = requestAnimationFrame(updateCamera);
    };

    // Start animation
    animationFrameId.current = requestAnimationFrame(updateCamera);

    // Cleanup to prevent useEffect duplication
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [playerPosition.x, playerPosition.y, smoothing, offsetX, offsetY, mapRef, onCameraPositionChange]);

  return null;
};

export default CameraFollower;
