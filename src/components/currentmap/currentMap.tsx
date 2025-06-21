import React, { ReactNode, RefObject, useEffect, useState } from 'react';
import { loadMap } from '../../data/mapRegistry';
import { MapData } from '../../types/map';
import MapPortalComponent from '../mapPortal/mapPortal';
import { Position } from '../../types/position';

interface Props {
  mapRef: RefObject<HTMLDivElement | null>; // DOm ref for map
  children: ReactNode; // Render children => compo playerToken
  currentMapId: string;
  getPlayerVisionScope: number;
  playerPosition: Position;
  onMapChange: ( // Called when player change map
    newMapId: string,
    spawnPosition?: {
      x: number;
      y: number;
    },
  ) => void;
  onPortalClick: (targetMapId: string, spawnPosition: { x: number; y: number }) => void;
}

const CurrentMap = ({ mapRef, children, currentMapId, getPlayerVisionScope, playerPosition, onMapChange, onPortalClick  }: Props) => {
  const [currentMap, setCurrentMap] = useState<MapData | null>(null); // Actual data map (loaded from ID)
  const [loading, setLoading] = useState(false); // Render during loading
  const [error, setError] = useState<string | null>(null); // Errors on map gestion

  // Distance calculation beteween 2 points
  const calculateDistance = (pos1: Position, pos2: Position): number => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  // Portal is on PlayerVision?
  const isPortalInVision = (portalPosition: Position, playerPosition: Position, visionRadius: number): boolean => {
    const distance = calculateDistance(portalPosition, playerPosition);
    return distance <= visionRadius;
  };

  useEffect(() => { // Hook useEffect :called each time the currentMapId changes and is passed as a parameter to be tracked
    const loadCurrentMap = async () => { // Async load map
      setLoading(true); // Init loading
      setError(null); // Reset errors

      try {
        const mapData = await loadMap(currentMapId); // loading datas map
        setCurrentMap(mapData); // (see mapRegistry.ts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        console.error('Erreur chargement map:', err);
      } finally {
        setLoading(false); //Success or not, loading is finished
      }
    };

    loadCurrentMap();
  }, [currentMapId]); // Tracked by useEffect

  const handlePortalClick = (  // Called when portal is clicked
    targetMapId: string,
    spawnPosition: {
      x: number;
      y: number;
    },
  ) => {
    onMapChange(targetMapId, spawnPosition); // Send parent to load new map
  };

  if (loading) { // If map is long to loading (not instant), show loading in render
    return <div>Chargement de la carte...</div>;
  }

  if (error) { // Show error
    return <div>Erreur : {error}</div>;
  }

  if (!currentMap) { // If don't found map
    return <div>Aucune carte chargée</div>;
  }

  return (
    <div
    className='current-map'
      ref={mapRef} // Container map ref on DOM
      style={{
        width: `${currentMap.width}px`, // Dynamic width for map
        height: `${currentMap.height}px`,
        position: 'relative', // need it to fix portals on maps
        backgroundColor: currentMap.backgroundColor,
      }}
    >
      {children}

      {/* Rendered portals */}
      {currentMap.portals?.map((portal) => (
        <MapPortalComponent
          key={portal.id} // Unique key/map
          portal={portal} // Portal datas
          isInPlayerVision={isPortalInVision(portal.position, playerPosition, getPlayerVisionScope)}
          onPortalClick={() => onPortalClick(portal.targetMapId, portal.spawnPosition)}
        />
      ))}
    </div>
  );
};

export default CurrentMap;
//Get PlayerVision size to hide the portal if it is outside playerVision (switch class)
