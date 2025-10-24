import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import ThreeD from "../ThreeD";
import Swatch from "../Swatch";
import broadloomData from "../../data/boardloom.json";

interface Product {
  id: string;
  sku: string;
  image: string;
  isNew?: boolean;
  colors: { code: string; label: string }[];
  rooms: { name: string; image: string }[];
  colorways: { sku: string; image: string }[];
  coordinates: { sku: string; image: string }[];
}

type RightTab = "Colors" | "Rooms" | "Colorways" | "Coordinates";
type MainTab = "swatch" | "room";

export default function BroadloomDetails() {
  const { sku } = useParams<{ sku: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<MainTab>("swatch");
  const [activeRightTab, setActiveRightTab] = useState<RightTab>("Colors");

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
  const [appliedDesign, setAppliedDesign] = useState<string[][]>([]);
  const [history, setHistory] = useState<number[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // --- Fetch Broadloom Product ---
  useEffect(() => {
    const found = (broadloomData.products as Product[]).find((p) => p.sku === sku);
    setProduct(found || null);
    setSelectedColorIndex(null);
    setHistory([]);
    setHistoryIndex(-1);
    setActiveRightTab("Colors");
    setActiveTab("swatch");
  }, [sku]);

  const canGoPrev = historyIndex > 0;
  const canGoNext = historyIndex < history.length - 1;
  const filteredRooms = useMemo(
    () => (selectedRoom ? product?.rooms.filter((r) => r.name === selectedRoom) : product?.rooms),
    [selectedRoom, product]
  );

  const handleSelectColor = (idx: number) => {
    if (selectedColorIndex === idx) return;
    const newHistory = history.slice(0, historyIndex + 1).concat(idx);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setSelectedColorIndex(idx);
  };

  const navigateHistory = (direction: "prev" | "next") => {
    if (direction === "prev" && canGoPrev) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setSelectedColorIndex(history[newIndex]);
    } else if (direction === "next" && canGoNext) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setSelectedColorIndex(history[newIndex]);
    }
  };

  const resetHistory = () => {
    setHistory([]);
    setHistoryIndex(-1);
    setSelectedColorIndex(null);
  };

  if (!product)
    return (
      <div className="text-center py-20 text-gray-600">
        ❌ Broadloom product not found
      </div>
    );

  const TabButton = ({
    label,
    isActive,
    onClick,
  }: {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={clsx(
        "pb-3 text-xl font-semibold transition-colors",
        isActive ? "border-b-2 border-black text-black" : "text-gray-500"
      )}
    >
      {label}
    </button>
  );

//   const SectionTitle = ({ title }: { title: string }) => (
//     <h3 className="text-lg font-semibold mb-3">{title}</h3>
//   );

  return (
    <div className="mx-auto px-6 py-24 grid md:grid-cols-5 gap-8">
      {/* LEFT PANEL */}
      <div className="md:col-span-3">
        {/* Top Tabs */}
        <div className="flex space-x-6 border-b mb-4">
          {(["swatch", "room"] as MainTab[]).map((tab) => (
            <TabButton
              key={tab}
              label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        <div className="relative h-[680px] rounded-xl shadow-lg overflow-hidden bg-gray-100">
          {activeTab === "swatch" ? (
            <Swatch
              baseTile={product.image}
              selectedTile={
                selectedColorIndex !== null ? product.colors[selectedColorIndex] : null
              }
              palette={product.colors.map((c) => c.code)}
              onApplyToRoom={setAppliedDesign}
            />
          ) : (
            <ThreeD appliedDesign={appliedDesign || [[]]} />
          )}

          {product.isNew && (
            <span className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
              New
            </span>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="md:col-span-2 flex flex-col justify-between">
        <div>
          {/* Tabs */}
          <div className="flex justify-between border-b mb-6">
            {(["Colors", "Rooms", "Colorways", "Coordinates"] as RightTab[]).map((tab) => (
              <TabButton
                key={tab}
                label={tab}
                isActive={activeRightTab === tab}
                onClick={() => setActiveRightTab(tab)}
              />
            ))}
          </div>

          {/* Tab Contents */}
          <div className="min-h-fit space-y-8">
            {/* COLORS */}
            {activeRightTab === "Colors" && (
              <div className="grid grid-cols-4 gap-6">
                {product.colors.map((c, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      role="button"
                      aria-label={`Select color ${c.label}`}
                      onClick={() => handleSelectColor(idx)}
                      className={clsx(
                        "w-24 h-20 rounded-md shadow-sm cursor-pointer hover:scale-105 transition-transform",
                        selectedColorIndex === idx && "ring-4 ring-offset-2 ring-blue-950"
                      )}
                      style={{ backgroundColor: c.code }}
                    />
                    <span className="mt-2 text-sm font-medium">{c.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* ROOMS */}
            {activeRightTab === "Rooms" && (
              <>
                <div className="flex flex-wrap gap-2">
                  {product.rooms.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedRoom((prev) => (prev === r.name ? null : r.name))}
                      className={clsx(
                        "px-4 py-2 rounded-xl border text-sm font-medium",
                        selectedRoom === r.name
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {filteredRooms?.map((room, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab("room")}
                      className="rounded-xl border overflow-hidden"
                    >
                      <img src={room.image} alt={room.name} className="w-full h-40 object-cover" />
                      <div className="p-2 text-left">
                        <div className="text-sm font-medium">{room.name}</div>
                        <div className="text-sm text-gray-500">Preview in {room.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* COLORWAYS */}
            {activeRightTab === "Colorways" && (
              <div className="grid grid-cols-3 gap-4">
                {product.colorways.map((c) => (
                  <div key={c.sku} className="flex flex-col items-center">
                    <img src={c.image} alt={c.sku} className="w-full h-full rounded object-cover shadow" />
                    <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
                  </div>
                ))}
              </div>
            )}

            {/* COORDINATES */}
            {activeRightTab === "Coordinates" && (
              <div className="grid grid-cols-3 gap-4">
                {product.coordinates.map((c) => (
                  <div key={c.sku} className="flex flex-col items-center">
                    <img src={c.image} alt={c.sku} className="w-full h-full rounded object-cover shadow" />
                    <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* History Navigation */}
        <div className="flex items-center justify-center space-x-4 mt-6">
          <button
            onClick={() => navigateHistory("prev")}
            disabled={!canGoPrev}
            className={clsx(
              "w-12 h-12 flex items-center justify-center rounded-full",
              canGoPrev ? "bg-gray-300 hover:bg-gray-400" : "bg-gray-200 opacity-50 cursor-not-allowed"
            )}
          >
            «
          </button>

          <button
            onClick={resetHistory}
            className="px-6 py-2 rounded-md bg-gray-300 text-gray-700 font-medium hover:bg-gray-400"
          >
            Reset History
          </button>

          <button
            onClick={() => navigateHistory("next")}
            disabled={!canGoNext}
            className={clsx(
              "w-12 h-12 flex items-center justify-center rounded-full",
              canGoNext ? "bg-gray-300 hover:bg-gray-400" : "bg-gray-200 opacity-50 cursor-not-allowed"
            )}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
