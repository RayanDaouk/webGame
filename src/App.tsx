import React, { useRef, useState } from 'react';
import PlayerToken from './components/playerToken/playerToken';
import CurrentMap from './components/currentmap/currentMap';
import PlayerVision from './components/playerVision/playerVision';
import CameraFollower from './components/cameraFollower/cameraFollower';
import { Position } from './types/position';

function App() {
  const [tokenPosition, setTokenPosition] = useState({ x: 400, y: 300 }); //db
  const [currentMapId, setCurrentMapId] = useState('village-1'); //db
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 }); // Shared with playerToken
  const [playerVisionScope, setPlayerVisionScope] = useState<number>(0);

  const playerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleMapChange = (newMapId: string) => {
    setCurrentMapId(newMapId);
  };

  const handlePortalClick = (
    targetMapId: string,
    spawnPosition: { x: number; y: number }
  ) => {
    setCurrentMapId(targetMapId);
    setTokenPosition(spawnPosition);
  };

  // Get camera pos
  const handleCameraPositionChange = (position: Position) => {
    setCameraPosition(position);
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
      <CameraFollower
        playerPosition={tokenPosition}
        mapRef={mapRef}
        smoothing={0.1}
        onCameraPositionChange={handleCameraPositionChange} // Up current new camera pos
      />
      <CurrentMap
        mapRef={mapRef}
        currentMapId={currentMapId}
        getPlayerVisionScope={playerVisionScope}
        playerPosition={tokenPosition}
        onMapChange={handleMapChange}
        onPortalClick={handlePortalClick} // <-- Portals transmitions
      >
        <PlayerToken
          givenChangedPos={setTokenPosition}
          position={tokenPosition}
          cameraPosition={cameraPosition} // get current new camera pos
        />
        <PlayerVision tokenPosition={tokenPosition} givenVisionSize={setPlayerVisionScope} />
      </CurrentMap>
    </div>
  );
}

export default App;
