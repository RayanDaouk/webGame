import React from 'react';
import style from './playerVision.module.scss';
import { Position } from '../../types/position';

interface PlayerVisionProps {
  tokenPosition: Position;
}

const PlayerVision = ({ tokenPosition }: PlayerVisionProps) => {
  const CIRCLE_SIZE = 100;

  return (
    <div
      className={style.playerVision}
      style={{
        position: 'absolute',
        left: `${tokenPosition.x - CIRCLE_SIZE / 2}px`,
        top: `${tokenPosition.y - CIRCLE_SIZE / 2}px`,
        width: `${CIRCLE_SIZE}px`,
        height: `${CIRCLE_SIZE}px`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default PlayerVision;
// BUG mineur: Le cercle n'est pas parfaitement centré avec le centre du playerToken
