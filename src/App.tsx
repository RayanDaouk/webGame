import React, { useRef, useState } from 'react';
import PlayerToken from './components/playerToken/playerToken';
import CurrentMap from './components/currentmap/currentMap';
import CameraBoundary from './components/cameraBoundary/cameraBoundary';

function App() {
  const [tokenPosition, setTokenPosition] = useState({ x: 0, y: 0 });
  const [currentMapId, setCurrentMapId] = useState('village-1');

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
    <>
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
      <CurrentMap
        mapRef={mapRef}
        currentMapId={currentMapId}
        onMapChange={handleMapChange}
        onPortalClick={handlePortalClick} // <-- à transmettre aux portails
      >
        <PlayerToken
          givenChangedPos={setTokenPosition}
          position={tokenPosition} // <-- important
        />
        <CameraBoundary tokenPosition={tokenPosition} />
      </CurrentMap>
    </>
  );
}

export default App;
