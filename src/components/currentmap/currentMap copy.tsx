import React, { ReactNode, RefObject, useEffect, useState } from 'react';
import { loadMap } from '../../data/mapRegistry';
import { MapData } from '../../types/map';
import MapPortalComponent from '../mapPortal/mapPortal';
import { Position } from '../../types/position';

interface Props {
  mapRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
  currentMapId: string;
  onMapChange: (
    newMapId: string,
    spawnPosition?: {
      x: number;
      y: number;
    },
  ) => void;
}

const CurrentMap = ({ mapRef, children, currentMapId, onMapChange }: Props) => {
  const [currentMap, setCurrentMap] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Test ajout Rayan
  const [spawnPos, setSpawnPos] = useState();

  useEffect(() => {
    const loadCurrentMap = async () => {
      setLoading(true);
      setError(null);

      try {
        const mapData = await loadMap(currentMapId);
        setCurrentMap(mapData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        console.error('Erreur chargement map:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentMap();
  }, [currentMapId]);

  const handlePortalClick = (
    targetMapId: string,
    spawnPosition: {
      x: number;
      y: number;
    },
  ) => {
    onMapChange(targetMapId, spawnPosition);
  };

  if (loading) {
    return <div>Chargement de la carte...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!currentMap) {
    return <div>Aucune carte chargée</div>;
  }

  return (
    <div
      ref={mapRef}
      style={{
        width: `${currentMap.width}px`,
        height: `${currentMap.height}px`,
        position: 'relative',
        backgroundColor: currentMap.backgroundColor,
      }}
    >
      {children}

      {/* Affichage des portails */}
      {currentMap.portals?.map((portal) => (
        <MapPortalComponent
          key={portal.id}
          portal={portal}
          onPortalClick={(targetMapId) =>
            handlePortalClick(targetMapId, portal.spawnPosition)
          }
        />
      ))}
    </div>
  );
};

export default CurrentMap;
