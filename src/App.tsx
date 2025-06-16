import React, { useRef, useState } from 'react';
import PlayerToken from './components/playerToken/playerToken';
import CurrentMap from './components/currentmap/currentMap';
import CameraBoundary from './components/cameraBoundary/cameraBoundary';
import CameraScroller from './components/cameraScroller/cameraScroller';

function App() {
  const [tokenPosition, setTokenPosition] = useState({ x: 0, y: 0 }); //db
  const [currentMapId, setCurrentMapId] = useState('village-1'); //db

  const playerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleMapChange = (newMapId: string) => {
    setCurrentMapId(newMapId);
  };

  const handlePortalClick = (
    targetMapId: string,
    spawnPosition:{ x: number; y: number
    }) => {
    setCurrentMapId(targetMapId);
    setTokenPosition(spawnPosition);
  };

  return (
    <div className="game-container">
      <div className="hud">
        Interface - Carte actuelle: {currentMapId}
        <div>
          <h3>Navigation manuelle</h3>
          <button onClick={() => handlePortalClick('village-1', { x: 100, y: 100 })}>
            Village Prairies
          </button>
          <button onClick={() => handlePortalClick('dungeon-1', { x: 200, y: 300 })}>
            Crypte Sombre
          </button>
        </div>
      </div>
      <CameraScroller
      playerPosition= {tokenPosition}
      mapRef={mapRef}
      />
      <CurrentMap
        mapRef={mapRef}
        currentMapId={currentMapId}
        onMapChange={handleMapChange}
        onPortalClick={handlePortalClick} // <-- Portals transmitions
      >
        <PlayerToken
          givenChangedPos={setTokenPosition}
          position={tokenPosition}
        />
        <CameraBoundary tokenPosition={tokenPosition} />
      </CurrentMap>
    </div>
  );
}

export default App;
