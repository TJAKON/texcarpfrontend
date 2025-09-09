import { useTexture } from "@react-three/drei";

export default function SingleTile({ tile }: { tile?: string }) {
  const isImage =
    !!tile &&
    (tile.endsWith(".jpg") ||
      tile.endsWith(".jpeg") ||
      tile.endsWith(".png") ||
      tile.endsWith(".webp") ||
      tile.endsWith(".gif"));

  const texture = isImage ? useTexture(tile!) : null;

  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[3, 0.2, 3]} />
      {isImage ? (
        <meshStandardMaterial map={texture} />
      ) : (
        <meshStandardMaterial color={tile || "#cccccc"} />
      )}
    </mesh>
  );
}
