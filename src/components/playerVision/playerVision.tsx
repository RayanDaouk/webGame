import React from 'react';
import style from './playerVision.module.scss';
import { Position } from '../../types/position';

interface PlayerVisionProps {
  tokenPosition: Position;
  givenVisionSize: (number: number) => void;
}

const PlayerVision = ({ tokenPosition, givenVisionSize }: PlayerVisionProps) => {

  const circleSize = 100; // db
  givenVisionSize(circleSize / 2); // Radius

  return (
    <div
      className={style.playerVision}
      style={{
        position: 'absolute',
        left: `${tokenPosition.x - circleSize / 2}px`,
        top: `${tokenPosition.y - circleSize / 2}px`,
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default PlayerVision;
// BUG mineur: Le cercle n'est pas parfaitement centré avec le centre du playerToken
