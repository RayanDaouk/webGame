import React, { RefObject } from "react";
import { Position } from "../../types/position";
import style from './collision.module.scss';

interface CollisionBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CollisionProps {
  mapRef: RefObject<HTMLDivElement | null>;
  currentMapId: string;
  playerPosition: Position;
  collisionBoxes: CollisionBox[];
}

const Collision = ({ mapRef, currentMapId, playerPosition, collisionBoxes }: CollisionProps) => {
  return (
    <div className="collision-container">
      {/* Rendu visuel des boîtes de collision */}
      {collisionBoxes.map((box) => (
        <div
          key={box.id}
          className={style.collision}
          style={{
            left: `${box.x}px`,
            top: `${box.y}px`,
            width: `${box.width}px`,
            height: `${box.height}px`,
            position: 'absolute',
          }}
        />
      ))}
    </div>
  );
};

export default Collision;
