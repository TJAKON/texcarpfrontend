// src/pages/ThreeD.tsx
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
// import { OrbitControls, useTexture } from "@react-three/drei";

interface RoomProps {
  layout: string[][]; // array of tile image paths or color codes
  wallTexture: string;
  tileSize: number;
  openFront?: boolean;
  onTileClick?: (row: number, col: number) => void;
}

// ✅ Tile component (inside Canvas, so useTexture works)
function Tile({
  tile,
  position,
}: {
  tile: string;
  position: [number, number, number];
}) {
  const isImage = tile && !tile.startsWith("#");
  const texture = isImage ? useTexture(tile) : null;

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      {isImage ? (
        <meshStandardMaterial map={texture} />
      ) : (
        <meshStandardMaterial color={tile || "#cccccc"} />
      )}
    </mesh>
  );
}

function Room({
  layout,
  wallTexture,
  tileSize,
  openFront = true,
//   onTileClick,
}: RoomProps) {
  const wall = useTexture(wallTexture);
  wall.wrapS = wall.wrapT = THREE.RepeatWrapping;
  wall.repeat.set(4, 2);

  const floorSize = layout.length * tileSize;
  const half = floorSize / 2;

  return (
    <group>
      {/* Floor tiles */}
      {layout.map((row, i) =>
        row.map((tile, j) => (
          <Tile
            key={`${i}-${j}`}
            tile={tile}
            position={[
              -half + j * tileSize + tileSize / 2,
              0,
              -half + i * tileSize + tileSize / 2,
            ]}
          />
        ))
      )}

      {/* Walls */}
      <mesh position={[0, 5, -floorSize / 2]}>
        <planeGeometry args={[floorSize, 10]} />
        <meshStandardMaterial map={wall} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-floorSize / 2, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[floorSize, 10]} />
        <meshStandardMaterial map={wall} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[floorSize / 2, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[floorSize, 10]} />
        <meshStandardMaterial map={wall} side={THREE.DoubleSide} />
      </mesh>
      {!openFront && (
        <mesh position={[0, 5, floorSize / 2]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[floorSize, 10]} />
          <meshStandardMaterial map={wall} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
        <planeGeometry args={[floorSize, floorSize]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
    </group>
  );
}

interface ThreeDProps {
  appliedDesign: string[][]; // ✅ receive full tile array from Swatch
  wallTexture?: string;
  tileSize?: number;
}

export default function ThreeD({
  appliedDesign,
  wallTexture = "/wall1.jpeg",
  tileSize = 1,
}: ThreeDProps) {
  return (
    <div className="h-full w-full flex">
      <Canvas camera={{ position: [0, 6, 20], fov: 16 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 20, 10]} intensity={1} />
        <Room
          layout={appliedDesign}
          wallTexture={wallTexture}
          tileSize={tileSize}
        />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
