import React from 'react';
import style from './cameraBoundary.module.scss';
import { Position } from '../../types/position';

interface CameraBoundaryProps {
  tokenPosition: Position;
}
// creation de la props token position qui va récupérer la pos du joueur
const CameraBoundary = ({ tokenPosition }: CameraBoundaryProps) => {
  const CIRCLE_SIZE = 100; // Taille du cercle en pixels

  return (
    <div
      className={style.cameraBoundary}
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

export default CameraBoundary;
// BUG mineur: Le cercle n'est pas parfaitement centré avec le centre du playerToken
