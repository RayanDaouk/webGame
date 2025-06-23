import React, { useRef, useState, useCallback, useEffect } from 'react';
import PlayerToken from './components/playerToken/playerToken';
import CurrentMap from './components/currentmap/currentMap';
import PlayerVision from './components/playerVision/playerVision';
import CameraFollower from './components/cameraFollower/cameraFollower';
import Collision from './components/collision/collision';
import { useCollision } from './hooks/useCollision'; // Import du hook
import { Position } from './types/position';
import { CollisionBox } from './types/map';
import { loadMap } from './data/mapRegistry';

function App() {
  const [tokenPosition, setTokenPosition] = useState({ x: 400, y: 300 });
  const [currentMapId, setCurrentMapId] = useState('village-1');
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });
  const [playerVisionScope, setPlayerVisionScope] = useState<number>(0);
  const [currentMapCollisions, setCurrentMapCollisions] = useState<CollisionBox[]>([]);

  const playerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  // Configuration du hook de collision
  const collision = useCollision({
    playerSize: { width: 40, height: 40 }, // Taille exacte du token (40x40 d'après le CSS)
    collisionBoxes: currentMapCollisions,
    isPlayerCentered: true // IMPORTANT : true car transform: translate(-50%, -50%)
  });

  // Charger les collisions de la carte actuelle
  useEffect(() => {
    const loadMapCollisions = async () => {
      try {
        const mapData = await loadMap(currentMapId);
        setCurrentMapCollisions(mapData.collisions || []);
      } catch (error) {
        console.error('Erreur lors du chargement des collisions:', error);
        setCurrentMapCollisions([]);
      }
    };

    loadMapCollisions();
  }, [currentMapId]);

  // Initialiser la position de référence dans le hook de collision
  useEffect(() => {
    collision.updatePreviousPosition(tokenPosition);
  }, [collision, tokenPosition]);

  // Gestionnaire de position du joueur avec validation via le hook
  const handlePlayerPositionChange = useCallback((newPosition: Position) => {
    // Utiliser le hook de collision pour valider la position
    const validatedPosition = collision.validatePosition(newPosition);
    setTokenPosition(validatedPosition);

    // Mettre à jour la position de référence dans le hook
    collision.updatePreviousPosition(validatedPosition);
  }, [collision]);

  const handleMapChange = (newMapId: string) => {
    setCurrentMapId(newMapId);
  };

  const handlePortalClick = (
    targetMapId: string,
    spawnPosition: { x: number; y: number }
  ) => {
    setCurrentMapId(targetMapId);

    // Valider la position de spawn avec les collisions
    const validatedSpawnPosition = collision.validatePosition(spawnPosition);
    setTokenPosition(validatedSpawnPosition);
    collision.updatePreviousPosition(validatedSpawnPosition);
  };

  // Get camera pos
  const handleCameraPositionChange = useCallback((position: Position) => {
    setCameraPosition(position);
  }, []);

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
        <div>
          <h4>Debug Collisions</h4>
          <p>Collisions actives: {currentMapCollisions.length}</p>
          <p>Position joueur: x:{Math.round(tokenPosition.x)}, y:{Math.round(tokenPosition.y)}</p>
        </div>
      </div>
      <CameraFollower
        playerPosition={tokenPosition}
        mapRef={mapRef}
        smoothing={0.1}
        onCameraPositionChange={handleCameraPositionChange}
      />
      <CurrentMap
        mapRef={mapRef}
        currentMapId={currentMapId}
        getPlayerVisionScope={playerVisionScope}
        playerPosition={tokenPosition}
        onMapChange={handleMapChange}
        onPortalClick={handlePortalClick}
      >
        <PlayerToken
          givenChangedPos={handlePlayerPositionChange}
          position={tokenPosition}
          cameraPosition={cameraPosition}
        />
        <PlayerVision tokenPosition={tokenPosition} givenVisionSize={setPlayerVisionScope} />
        <Collision
          mapRef={mapRef}
          currentMapId={currentMapId}
          playerPosition={tokenPosition}
          collisionBoxes={currentMapCollisions}
        />
      </CurrentMap>
    </div>
  );
}

export default App;
