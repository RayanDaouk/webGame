import React from 'react';
import { MapPortal } from '../../types/map';
import clsx from 'clsx';
import  Style  from './mapPortal.module.scss';


interface MapPortalProps {
  portal: MapPortal;
  isInPlayerVision: boolean;
  onPortalClick: (targetMapId: string) => void;
}

const MapPortalComponent = ({ portal, isInPlayerVision, onPortalClick }: MapPortalProps) => {
  const defaultSize = { width: 100, height: 30 };
  const size = portal.size || defaultSize;

  return (
    <button
      className={clsx(
        Style.portal,
        isInPlayerVision && Style['on-player-vision']
      )}
      onClick={() => onPortalClick(portal.targetMapId)}
      style={{
        left: `${portal.position.x}px`,
        top: `${portal.position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#45a049';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#4CAF50';
      }}
    >
      {portal.label}
    </button>
  );
};

export default MapPortalComponent;
