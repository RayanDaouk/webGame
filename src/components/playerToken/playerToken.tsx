import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import style from './playerToken.module.scss';
import { Position } from '../../types/position';

interface PlayerTokenProps {
  givenChangedPos?: (position: Position) => void;
  position: Position;
  cameraPosition?: Position;
}

const PlayerToken = ({ givenChangedPos, position, cameraPosition }: PlayerTokenProps) => {
  const [tokenPosition, setTokenPosition] = useState(position);
  const [isMoving, setIsMoving] = useState(false);
  const [startMousePos, setStartMousePos] = useState({ x: 0, y: 0 });
  const [startTokenPos, setStartTokenPos] = useState({ x: 0, y: 0 });
  const [movementClass, setMovementClass] = useState('');

  // Using useRef to limite rerenders of component
  const moveDirection = useRef({ x: 0, y: 0 });
  const targetDirection = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0); // Delta time calculation
  const currentMousePos = useRef({ x: 0, y: 0 });

  // Joystick parameters
  const MIN_MOVE_SPEED = 0.003; // px/ms - min speed
  const MOVE_SPEED = 0.0056; // px/ms - max speed 0.0056  //db
  const currentSpeed = useRef(MIN_MOVE_SPEED); // Smooth speed
  const MAX_DISTANCE = 20; // Joystick stretch distance with mouse
  const DEAD_ZONE = 1; // dead zone to prevent micro-movement
  const SMOOTHING_FACTOR = 0.8; // on ms, change this value to modify joystick sensibility
  const SPEED_SMOOTHING = 0.85; // 1 is more smooth, 0 is instant

  // Convert mouse coordinate to map pos
  const getMapMousePosition = (clientX: number, clientY: number) => {
    const camera = cameraPosition || { x: 0, y: 0 };
    return {
      x: clientX + camera.x,
      y: clientY + camera.y
    };
  };

  // Movement animation
  const animate = (currentTime: number) => {
    if (isMoving) {
      // Delta time calculation, 16 = 1 frame = 1000ms ÷ 60 fps
      const deltaTime =
        lastFrameTime.current === 0 ? 16 : currentTime - lastFrameTime.current;
      lastFrameTime.current = currentTime;

      // Convert current mouse post to map coordinations
      const mapMousePos = getMapMousePosition(currentMousePos.current.x, currentMousePos.current.y);

      // calculate the direction for each frame (simulate real time)
      const virtualStickCenterX =
        startMousePos.x + (tokenPosition.x - startTokenPos.x);
      const virtualStickCenterY =
        startMousePos.y + (tokenPosition.y - startTokenPos.y);

      const deltaX = mapMousePos.x - virtualStickCenterX;
      const deltaY = mapMousePos.y - virtualStickCenterY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const clampedDistance = Math.min(distance, MAX_DISTANCE);
      if (distance > DEAD_ZONE) {
        targetDirection.current = {
          x: (deltaX / distance) * clampedDistance,
          y: (deltaY / distance) * clampedDistance,
        };
      } else {
        targetDirection.current = { x: 0, y: 0 };
        setMovementClass('');
      }
      // --

      // Smoothing target direction (not depend framerate to prevent broken animation during lag)
      const smoothingAmount =
        1 - Math.pow(1 - SMOOTHING_FACTOR, deltaTime / 16);
      moveDirection.current.x +=
        (targetDirection.current.x - moveDirection.current.x) * smoothingAmount;
      moveDirection.current.y +=
        (targetDirection.current.y - moveDirection.current.y) * smoothingAmount;

      // Apply movement if you exceed dead zone
      const currentMagnitude = Math.sqrt(
        moveDirection.current.x * moveDirection.current.x +
          moveDirection.current.y * moveDirection.current.y,
      );

      const hasNoTarget =
        targetDirection.current.x === 0 && targetDirection.current.y === 0;
      const isFullyStopped =
        Math.abs(moveDirection.current.x) < 0.0001 &&
        Math.abs(moveDirection.current.y) < 0.0001;

      if (isMoving && hasNoTarget && isFullyStopped) {
        // Player token is stopped during animation
        setMovementClass('');
      }

      if (currentMagnitude > DEAD_ZONE) {
        // Calculate distance between player token and mouse (on map coordinates)
        const realDistanceToMouse = Math.sqrt(
          (mapMousePos.x - tokenPosition.x) ** 2 +
          (mapMousePos.y - tokenPosition.y) ** 2,
        );

        // Calculate speed depend current distance with mouse
        // The closer the token is to the mouse, the slower it becomes
        const clampedRealDistance = Math.min(realDistanceToMouse, MAX_DISTANCE);
        const speedRatio = Math.max(clampedRealDistance / MAX_DISTANCE, 0);
        const targetSpeed =
          MIN_MOVE_SPEED + (MOVE_SPEED - MIN_MOVE_SPEED) * speedRatio;

        // Smoothing speed for transition
        const speedSmoothingAmount =
          1 - Math.pow(1 - SPEED_SMOOTHING, deltaTime / 16);
        currentSpeed.current +=
          (targetSpeed - currentSpeed.current) * speedSmoothingAmount;

        // Class depend current speed
        if (currentSpeed.current >= 0.007 && currentSpeed.current <= 0.01) {
          setMovementClass('sprint');
        } else if (
          currentSpeed.current >= 0.0056 &&
          currentSpeed.current <= 0.0069
        ) {
          setMovementClass('run');
        } else if (
          currentSpeed.current >= 0.003 &&
          currentSpeed.current <= 0.0055
        ) {
          setMovementClass('walk');
        }

        setTokenPosition((prevPos) => {
          const newPos = {
            x:
              prevPos.x +
              moveDirection.current.x * currentSpeed.current * deltaTime,
            y:
              prevPos.y +
              moveDirection.current.y * currentSpeed.current * deltaTime,
          };

          // Callback to give current pos
          if (givenChangedPos) {
            givenChangedPos(newPos);
          }

          return newPos;
        });
      }
    }

    if (isMoving) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMoving) {
        currentMousePos.current = { x: e.clientX, y: e.clientY };

        // Convert mouse pos to map coordinates
        const mapMousePos = getMapMousePosition(e.clientX, e.clientY);

        // Place virtual joystick on center of player token
        const virtualStickCenterX =
          startMousePos.x + (tokenPosition.x - startTokenPos.x);
        const virtualStickCenterY =
          startMousePos.y + (tokenPosition.y - startTokenPos.y);

        // Calculate direction depend position of player token (map coordination)
        const deltaX = mapMousePos.x - virtualStickCenterX;
        const deltaY = mapMousePos.y - virtualStickCenterY;

        // Limit distance of joystick
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const clampedDistance = Math.min(distance, MAX_DISTANCE);

        // Normalize direction & apply limitation
        if (distance > DEAD_ZONE) {
          targetDirection.current = {
            x: (deltaX / distance) * clampedDistance,
            y: (deltaY / distance) * clampedDistance,
          };
        } else {
          // Mouse on joystick dead zone during animation? Player token stopped.
          targetDirection.current = { x: 0, y: 0 };
          setMovementClass('');
        }
      }
    };

    const handleMouseUp = () => {
      setIsMoving(false);
      setMovementClass(''); // Reset classes of token
      moveDirection.current = { x: 0, y: 0 };
      targetDirection.current = { x: 0, y: 0 };
      currentSpeed.current = MIN_MOVE_SPEED; // Reset speed
      lastFrameTime.current = 0; // Reset timer

      // Cancel frame animation
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };

    if (isMoving) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      // Start animation
      animationFrameId.current = requestAnimationFrame(animate);
    }

    setTokenPosition(position);
    // Clean up to prevent multiple events and frames
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [
    isMoving,
    startMousePos.x,
    startMousePos.y,
    tokenPosition.x,
    tokenPosition.y,
    startTokenPos.x,
    startTokenPos.y,
    position,
    cameraPosition,
  ]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMoving(true);

    // Convert mouse initial pos to map coordinate
    const mapMousePos = getMapMousePosition(e.clientX, e.clientY);
    setStartMousePos({ x: mapMousePos.x, y: mapMousePos.y });
    setStartTokenPos({ x: tokenPosition.x, y: tokenPosition.y }); // Save actual pos of token
    currentMousePos.current = { x: e.clientX, y: e.clientY }; // Get mouse pos (viewport coordinates)
    lastFrameTime.current = 0; // Restart timer

    // Prevent selection
    e.preventDefault();
  };

  return (
    <div
      className={clsx(style.token, style[movementClass])}
      onMouseDown={handleMouseDown}
      style={{
        left: `${tokenPosition.x}px`,
        top: `${tokenPosition.y}px`,
        cursor: isMoving ? 'grabbing' : 'grab',
      }}
    ></div>
  );
};

export default PlayerToken;
