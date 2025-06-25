import React from 'react';
import styles from './collision.module.scss';
import { CollisionPolygon } from '../../types/map';
import { Position } from '../../types/position';

interface Props {
  mapRef: React.RefObject<HTMLDivElement | null>;
  currentMapId: string;
  playerPosition: Position;
  collisionBoxes: CollisionPolygon[];
}

const Collision = ({ mapRef, collisionBoxes }: Props) => {
  return (
    <svg
      className={styles.collisionOverlay}
      width="100%"
      height="100%"
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      {/* Draw each polygon */}
      {collisionBoxes.map((poly, index) => (
        <polygon
          key={poly.id || index}
          points={poly.points.map(p => `${p.x},${p.y}`).join(' ')}
          className={styles.collision}
        />
      ))}
    </svg>
  );
};

export default Collision;
