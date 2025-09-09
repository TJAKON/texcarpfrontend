// src/pages/Swatch.tsx
import { Canvas, useThree } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import TileMesh from "./TileMesh";
import SingleTile from "./SingleTile";

interface Tile {
  code: string;
  label: string;
  image?: string;
}

interface SwatchProps {
  baseTile?: string; // 👈 new
  selectedTile?: Tile | null;
  palette?: string[];
  onApplyToRoom?: (tiles: string[][]) => void;
}

// ✅ Camera control for front view
function FrontViewControl() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 25, 0); // 👈 front-facing position
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

export default function Swatch({
  selectedTile,
  palette,
  onApplyToRoom,
  baseTile: swatcbaseTile,
}: SwatchProps) {
  const [gridSize, setGridSize] = useState<number>(8);
  const [tiles, setTiles] = useState<string[][]>([]);
  const [mode, setMode] = useState<"floor" | "tile">("floor");
  const [frontView, setFrontView] = useState<boolean>(false);
  const [tool, setTool] = useState<"paint" | "picker">("paint");

  // Undo/Redo state
  const [history, setHistory] = useState<string[][][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const canvasRef = useRef<HTMLDivElement>(null);
  const tileSize = 1;

  useEffect(() => {
    const defaultTile = swatcbaseTile || "#cccccc";
    //   const defaultTile =
    //   swatcbaseTile || selectedTile?.code || selectedTile?.image || "#cccccc";

    const empty = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => defaultTile)
    );

    setTiles(empty);
    setHistory([empty]);
    setHistoryIndex(0);
  }, [gridSize, swatcbaseTile]);

  const pushHistory = (newTiles: string[][]) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newTiles.map((r) => [...r])); // deep clone
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  // ✅ Undo
  const undo = () => {
    if (historyIndex > 0) {
      setTiles(history[historyIndex - 1].map((r) => [...r]));
      setHistoryIndex(historyIndex - 1);
    }
  };

  // ✅ Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setTiles(history[historyIndex + 1].map((r) => [...r]));
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleTileClick = (row: number, col: number) => {
    if (tool === "picker") {
      const picked = tiles[row][col];
      alert(`🎨 Picked: ${picked}`);
      return;
    }
    if (!selectedTile) return;

    const updated = tiles.map((r) => [...r]);
    updated[row][col] = selectedTile.image || selectedTile.code; // ✅ support both
    setTiles(updated);
    pushHistory(updated);
  };

  // ✅ Fill all tiles
  const fillAllTiles = () => {
    if (!selectedTile) return;
    const updated = tiles.map((row) => row.map(() => selectedTile.code));
    setTiles(updated);
    pushHistory(updated);
  };

  // ✅ Random pattern
  const applyRandomPattern = () => {
    if (!selectedTile) return;

    const basePalette = palette?.length
      ? palette
      : [selectedTile.code, "#999999", "#ffffff"];

    const updated = tiles.map((row) =>
      row.map(() => basePalette[Math.floor(Math.random() * basePalette.length)])
    );

    setTiles(updated);
    pushHistory(updated);
  };

//   reset desgin
  const resetDesign = () => {
    // const defaultTile = swatcbaseTile || "#cccccc";
    const defaultTile =
      swatcbaseTile || selectedTile?.code || swatcbaseTile || "#cccccc";

    console.log(" default tile", defaultTile);
    const empty = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => defaultTile)
    );
    console.log(empty);
    setTiles(empty);
    pushHistory(empty);
  };

  // Download PNG from ThreeJS Canvas
  const downloadImage = () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) return;

    // Force WebGL to flush & preserve buffer
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = "swatch-design.png";
    link.href = dataURL;
    link.click();
  };

  // ✅ Save design as JSON
  const saveDesign = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(tiles));
    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "swatch-design.json";
    link.click();
  };

  // ✅ Load design JSON
  const loadDesign = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (Array.isArray(parsed)) {
          setTiles(parsed);
          pushHistory(parsed);
        }
      } catch (err) {
        alert("❌ Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  // ✅ Apply to room (callback)
  const applyToRoom = () => {
    if (onApplyToRoom) onApplyToRoom(tiles);
    console.log(onApplyToRoom)
    alert("✅ Design applied to room!");
  };

  return (
    <div
      className="w-full h-[550px] bg-gray-100 rounded-lg relative"
      ref={canvasRef}
    >
      {/* ThreeJS Canvas */}
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 15, 10], fov: 40 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <OrbitControls />

        {/* 👇 Only render when toggled */}
        {frontView && <FrontViewControl />}

        {mode === "floor" ? (
          tiles.map((row, i) =>
            row.map((tile, j) => (
              <TileMesh
                key={`${i}-${j}`}
                position={[
                  (j - gridSize / 2) * tileSize + tileSize / 2,
                  0,
                  (i - gridSize / 2) * tileSize + tileSize / 2,
                ]}
                tile={tile}
                onClick={() => handleTileClick(i, j)}
              />
            ))
          )
        ) : (
          //   <SingleTile tile={swatcbaseTile || selectedTile?.code} />
          <SingleTile
            tile={selectedTile?.image || selectedTile?.code || swatcbaseTile}
          />
        )}
      </Canvas>

      {/* Grid Size Control */}
      <div className="absolute top-4 right-4 text-white bg-black/40 p-3 rounded shadow flex flex-col items-center">
        <label className="text-sm font-medium text-white">
          Grid Size: {gridSize} × {gridSize}
        </label>
        <input
          type="range"
          min="2"
          max="20"
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
          className="w-40"
        />
      </div>

      {/* Action Buttons */}
      <div className="absolute top-22 right-4 flex flex-col gap-2">
        {mode === "floor" ? (
          <>
            {/* Tool Selector */}
            <div className="flex w-full gap-2">
              <button
                onClick={() => setTool("paint")}
                className={`px-4 py-2 rounded shadow w-full ${
                  tool === "paint"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                Paint
              </button>
              <button
                onClick={() => setTool("picker")}
                className={`px-4 py-2 rounded w-full shadow ${
                  tool === "picker"
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                Picker
              </button>
            </div>

            <button
              onClick={() => setMode("tile")}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              Single Tile View
            </button>
            <button
              onClick={fillAllTiles}
              className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
            >
              Apply to Whole Floor
            </button>
            <button
              onClick={applyRandomPattern}
              className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
            >
              Random Pattern
            </button>
            <button
              onClick={resetDesign}
              className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
            >
              Reset Design
            </button>
            <div className="flex w-full gap-2">
              <button
                onClick={undo}
                className="bg-gray-600 w-full text-white px-4 py-2 rounded shadow hover:bg-gray-700"
              >
                Undo
              </button>
              <button
                onClick={redo}
                className="bg-gray-800 w-full text-white px-4 py-2 rounded shadow hover:bg-gray-900"
              >
                Redo
              </button>
            </div>
            <button
              onClick={downloadImage}
              className="bg-yellow-600 text-white px-4 py-2 rounded shadow hover:bg-yellow-700"
            >
              Download PNG
            </button>
            <div className="flex w-full gap-2">
              <button
                onClick={saveDesign}
                className="bg-teal-600 text-white px-4 py-2 rounded shadow hover:bg-teal-700"
              >
                Save JSON
              </button>
              <label className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 cursor-pointer">
                Load JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={loadDesign}
                  className="hidden"
                />
              </label>
            </div>
            <button
              onClick={applyToRoom}
              className="bg-pink-600 text-white px-4 py-2 rounded shadow hover:bg-pink-700"
            >
              Apply to Room
            </button>
            <button
              onClick={() => setFrontView(!frontView)}
              className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700"
            >
              {frontView ? "Disable Front View" : "Front View"}
            </button>
          </>
        ) : (
          <button
            onClick={() => setMode("floor")}
            className="bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-800"
          >
            Back to Floor
          </button>
        )}
      </div>

      {/* Show selected tile label in single tile mode */}
      {mode === "tile" && selectedTile && (
        <div className="absolute top-34 right-4 text-white bg-black/40 px-4 py-2 rounded shadow text-lg font-medium">
          Selected Tile <span className=" underline">{selectedTile.label}</span>
        </div>
      )}
    </div>
  );
}
