import React from 'react';
import { MapPortal } from '../../types/map';

interface MapPortalProps {
  portal: MapPortal;
  onPortalClick: (targetMapId: string) => void;
}

const MapPortalComponent = ({ portal, onPortalClick }: MapPortalProps) => {
  const defaultSize = { width: 100, height: 30 };
  const size = portal.size || defaultSize;

  return (
    <button
      onClick={() => onPortalClick(portal.targetMapId)}
      style={{
        position: 'absolute',
        left: `${portal.position.x}px`,
        top: `${portal.position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        zIndex: 10,
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
