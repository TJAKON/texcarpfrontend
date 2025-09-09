// import * as THREE from "three";
// import { useTexture } from "@react-three/drei";

// interface RoomProps {
//   floorTextures: string[];
//   wallTexture: string;
//   layout: number[][];
//   floorSize: number;
//   tileSize: number;
//   openFront?: boolean;
//   onTileClick?: (row: number, col: number) => void;
// }

// export default function Room({
//   floorTextures,
//   wallTexture,
//   layout,
//   floorSize,
//   tileSize,
//   openFront = true,
//   onTileClick,
// }: RoomProps) {
//   const wall = useTexture(wallTexture);
//   wall.wrapS = wall.wrapT = THREE.RepeatWrapping;
//   wall.repeat.set(4, 2);

//   const loadedTextures = useTexture(floorTextures);
//   loadedTextures.forEach((tex) => {
//     tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
//     tex.repeat.set(1, 1);
//   });

//   const half = floorSize / 2;

//   return (
//     <group>
//       {/* Floor with tiles */}
//       <group>
//         {layout.map((row, i) =>
//           row.map((tile, j) => {
//             const tex = loadedTextures[tile];
//             return (
//               <mesh
//                 key={`${i}-${j}`}
//                 position={[
//                   -half + j * tileSize + tileSize / 2,
//                   0,
//                   -half + i * tileSize + tileSize / 2,
//                 ]}
//                 rotation={[-Math.PI / 2, 0, 0]}
//                 onClick={() => onTileClick?.(i, j)}
//               >
//                 <planeGeometry args={[tileSize, tileSize]} />
//                 <meshStandardMaterial map={tex} />
//               </mesh>
//             );
//           })
//         )}
//       </group>

//       {/* Walls */}
//       <mesh position={[0, 5, -floorSize / 2]}>
//         <planeGeometry args={[floorSize, 10]} />
//         <meshStandardMaterial map={wall} side={THREE.DoubleSide} />
//       </mesh>

//       <mesh position={[-floorSize / 2, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
//         <planeGeometry args={[floorSize, 10]} />
//         <meshStandardMaterial map={wall} side={THREE.DoubleSide} />
//       </mesh>

//       <mesh position={[floorSize / 2, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
//         <planeGeometry args={[floorSize, 10]} />
//         <meshStandardMaterial map={wall} side={THREE.DoubleSide} />
//       </mesh>

//       {!openFront && (
//         <mesh position={[0, 5, floorSize / 2]} rotation={[0, Math.PI, 0]}>
//           <planeGeometry args={[floorSize, 10]} />
//           <meshStandardMaterial map={wall} side={THREE.DoubleSide} />
//         </mesh>
//       )}

//       {/* Ceiling */}
//       <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
//         <planeGeometry args={[floorSize, floorSize]} />
//         <meshStandardMaterial color="#f5f5f5" />
//       </mesh>
//     </group>
//   );
// }



import * as THREE from "three";
import { useTexture } from "@react-three/drei";

interface RoomProps {
  floorTextures: string[]; // ✅ array of tile images
  wallTexture: string;     // ✅ wall image
  layout: number[][];      // ✅ grid defining which tile index goes where
  floorSize: number;       // total size of floor (width/length)
  tileSize: number;        // size of each tile
  openFront?: boolean;     // hide front wall for viewing
  onTileClick?: (row: number, col: number) => void; // ✅ click tile callback
}

export default function Room({
  floorTextures,
  wallTexture,
  layout,
  floorSize,
  tileSize,
  openFront = true,
  onTileClick,
}: RoomProps) {
  // Load wall texture
  const wall = useTexture(wallTexture);
  wall.wrapS = wall.wrapT = THREE.RepeatWrapping;
  wall.repeat.set(4, 2);

  // Load all tile textures
  const loadedTextures = useTexture(floorTextures);
  // Handle case: single texture or multiple
  const texturesArray = Array.isArray(loadedTextures)
    ? loadedTextures
    : [loadedTextures];

  texturesArray.forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1, 1);
  });

  const half = floorSize / 2;

  return (
    <group>
      {/* Floor with tiled grid */}
      <group>
        {layout.map((row, i) =>
          row.map((tileIndex, j) => {
            const tex = texturesArray[tileIndex] || texturesArray[0];
            return (
              <mesh
                key={`${i}-${j}`}
                position={[
                  -half + j * tileSize + tileSize / 2,
                  0,
                  -half + i * tileSize + tileSize / 2,
                ]}
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={() => onTileClick?.(i, j)}
              >
                <planeGeometry args={[tileSize, tileSize]} />
                <meshStandardMaterial map={tex} />
              </mesh>
            );
          })
        )}
      </group>

      {/* Back Wall */}
      <mesh position={[0, 5, -floorSize / 2]}>
        <planeGeometry args={[floorSize, 10]} />
        <meshStandardMaterial map={wall} side={THREE.DoubleSide} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-floorSize / 2, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[floorSize, 10]} />
        <meshStandardMaterial map={wall} side={THREE.DoubleSide} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[floorSize / 2, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[floorSize, 10]} />
        <meshStandardMaterial map={wall} side={THREE.DoubleSide} />
      </mesh>

      {/* Optional Front Wall */}
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
