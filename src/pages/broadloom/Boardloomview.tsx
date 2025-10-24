import { useEffect, useRef, useState } from "react";
import { useImageLoader } from "../../hooks/boardloom/useImageLoader";
import { useDynamicSvgTile } from "../../hooks/boardloom/useDynamicSvgTile";
import type { TileColors } from "../../hooks/boardloom/types";

const ROOM_IMAGE_PATH = "/room.png";

export default function BroadloomView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [view, setView] = useState<"room" | "swatch">("room");

  // ✅ Broadloom = one continuous texture (not small tiles)
  const [colors] = useState<TileColors>({
    base: "#b69d78",
    accent1: "#d3c4a8",
    accent2: "#a58962",
  });

  const dynamicTile = useDynamicSvgTile(colors); // base texture generator
  const roomImage = useImageLoader(ROOM_IMAGE_PATH);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // 💠 Draw full carpet roll (broadloom)
    if (dynamicTile) {
      // Stretch the pattern across the full canvas (no tiling gaps)
      const pattern = ctx.createPattern(dynamicTile, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }
    }

    // 🏠 Overlay room if in room mode
    if (view === "room" && roomImage) {
      ctx.globalAlpha = 0.9; // subtle transparency to blend carpet
      ctx.drawImage(roomImage, 0, 0, width, height);
      ctx.globalAlpha = 1;
    }

    // 🧶 Add “carpet roll” visual when in swatch mode
    if (view === "swatch") {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(width - 40, 0, 40, height); // shadow edge
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillRect(width - 45, 0, 5, height); // highlight
    }
  }, [dynamicTile, roomImage, view]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <header className="flex items-center gap-2 bg-white shadow-md rounded-full p-2 mb-6">
        <button
          onClick={() => setView("room")}
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            view === "room"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Room View
        </button>
        <button
          onClick={() => setView("swatch")}
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            view === "swatch"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Full Carpet Roll
        </button>
      </header>

      {/* Main Canvas */}
      <main className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-300">
        <canvas
          ref={canvasRef}
          width={1000}
          height={400}
          className="block"
        ></canvas>
      </main>

      {/* Optional Label */}
      <div className="mt-4 text-gray-600 text-sm">
        {view === "room"
          ? "Previewing carpet in room layout"
          : "Viewing full broadloom roll (continuous pattern)"}
      </div>
    </div>
  );
}
