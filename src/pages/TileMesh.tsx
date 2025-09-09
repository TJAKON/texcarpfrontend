import { useTexture } from "@react-three/drei";

export default function TileMesh({
  position,
  tile,
  onClick,
}: {
  position: [number, number, number];
  tile: string;
  onClick: () => void;
}) {
  // decide if it's an image or color
  const isImage =
    tile.endsWith(".jpg") || tile.endsWith(".jpeg") || tile.endsWith(".png");
  const texture = isImage ? useTexture(tile) : null;

  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[1, 0.1, 1]} />
      {isImage ? (
        <meshStandardMaterial map={texture} />
      ) : (
        <meshStandardMaterial color={tile} />
      )}
    </mesh>
  );
}
