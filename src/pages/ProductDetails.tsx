// src/pages/ProductDetails.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import ThreeD from "./ThreeD"; // adjust path if needed
import Swatch from "./Swatch";
import productsData from "../data/products.json"; // ✅ import JSON

interface Product {
  id: string;
  sku: string;
  image: string;
  isNew?: boolean;
  colors: { code: string; label: string }[];
  rooms: { name: string; image: string }[];
  colorways: { code: string; label: string }[];
  coordinates: { sku: string; image: string }[];
}

export default function ProductDetails() {
  const { sku } = useParams<{ sku: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const [appliedDesign, setAppliedDesign] = useState<string[][]>([]);

  // page-level tabs (swatch / room)
  const [activeTab, setActiveTab] = useState<"swatch" | "room">("swatch");

  // right-panel tabs
  const rightTabs = ["Colors", "Rooms", "Colorways", "Coordinates"] as const;
  type RightTab = (typeof rightTabs)[number];
  const [activeRightTab, setActiveRightTab] = useState<RightTab>("Colors");

  // selection + history (for colors)
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  );
  const [history, setHistory] = useState<number[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  useEffect(() => {
    const found = (productsData.products as Product[]).find(
      (p) => p.sku === sku
    );
    setProduct(found || null);

    // reset when product changes
    setSelectedColorIndex(null);
    setHistory([]);
    setHistoryIndex(-1);
    setActiveRightTab("Colors");
    setActiveTab("swatch");
  }, [sku]);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600">
        ❌ Product not found
      </div>
    );
  }

  // --- Right-panel handlers ---
  const onSelectColor = (idx: number) => {
    if (selectedColorIndex === idx) return;
    const newHistory = history.slice(0, historyIndex + 1).concat(idx);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setSelectedColorIndex(idx);
  };

  const canGoPrev = historyIndex > 0;
  const canGoNext = historyIndex >= 0 && historyIndex < history.length - 1;

  const goPrev = () => {
    if (!canGoPrev) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    setSelectedColorIndex(history[newIndex]);
  };

  const goNext = () => {
    if (!canGoNext) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    setSelectedColorIndex(history[newIndex]);
  };

  const resetHistory = () => {
    setHistory([]);
    setHistoryIndex(-1);
    setSelectedColorIndex(null);
  };

  const swatchClass = (idx: number) =>
    clsx(
      "w-24 h-20 rounded-md shadow-sm cursor-pointer transition-transform transform hover:scale-105",
      selectedColorIndex === idx ? "ring-4 ring-offset-2 ring-blue-950" : ""
    );

  return (
    <div className="mx-auto px-6 py-30 grid md:grid-cols-3 gap-8">
      {/* LEFT AREA */}
      <div className="md:col-span-2">
        <div className="flex space-x-6 border-b mb-4">
          <button
            onClick={() => setActiveTab("swatch")}
            className={clsx(
              "pb-2 text-2xl font-semibold",
              activeTab === "swatch"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            )}
          >
            Swatch
          </button>
          <button
            onClick={() => setActiveTab("room")}
            className={clsx(
              "pb-2 text-2xl font-semibold",
              activeTab === "room"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            )}
          >
            Room
          </button>
        </div>

        <div className="relative h-[680px] rounded-xl w-full shadow-lg overflow-hidden bg-gray-100">
          {activeTab === "swatch" ? (
    
            <Swatch
              baseTile={product.image} // ✅ initializes swatch with product image/color
              selectedTile={
                selectedColorIndex !== null
                  ? product.colors[selectedColorIndex]
                  : null
              }
              palette={product.colors.map((c) => c.code)}
              onApplyToRoom={(tiles) => {
                console.log("Design applied to room", tiles);
                setAppliedDesign(tiles); // ✅ save design in state
              }}
            />
          ) : (
         
            <ThreeD appliedDesign={appliedDesign || [[]]} />

            // )}
          )}

          {product.isNew && activeTab === "swatch" && (
            <span className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
              New
            </span>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <aside className="bg-gray-50 rounded-xl shadow-md flex flex-col justify-between p-6">
        <div>
          <div className="flex justify-between border-b mb-6">
            {rightTabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveRightTab(t)}
                className={clsx(
                  "pb-2 text-xl font-semibold",
                  activeRightTab === t
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">
            {activeRightTab === "Colors" && (
              <div className="grid grid-cols-4 gap-6 mb-8">
                {product.colors?.map((c, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      role="button"
                      aria-label={`Select color ${c.label}`}
                      onClick={() => onSelectColor(idx)}
                      className={swatchClass(idx)}
                      style={{ backgroundColor: c.code }}
                    />
                    <span className="mt-2 text-lg font-medium">{c.label}</span>
                  </div>
                ))}
              </div>
            )}

            {activeRightTab === "Rooms" && (
              <div className="grid grid-cols-1 gap-4 mb-8">
                {product.rooms?.map((room, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab("room")}
                    className="flex items-center gap-3 p-2 rounded-xl border hover:bg-white"
                  >
                    <div className="w-60 h-40 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className=" text-left">
                      <div className="text-xl font-medium">{room.name}</div>
                      <div className="text-md text-gray-500">
                        Preview in {room.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {activeRightTab === "Colorways" && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {product.colorways?.map((cw, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className="w-28 h-20 rounded border shadow"
                      style={{ backgroundColor: cw.code }}
                    />
                    <span className="mt-1 text-sm text-gray-700">
                      {cw.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeRightTab === "Coordinates" && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {product.coordinates?.map((c) => (
                  <div key={c.sku} className="flex flex-col items-center">
                    <img
                      src={c.image}
                      alt={c.sku}
                      className="w-28 h-20 rounded object-cover shadow"
                    />
                    <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom history controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={goPrev}
            disabled={!canGoPrev}
            className={clsx(
              "w-12 h-12 flex items-center justify-center rounded-full",
              canGoPrev
                ? "bg-gray-300 hover:bg-gray-400"
                : "bg-gray-200 opacity-50 cursor-not-allowed"
            )}
          >
            «
          </button>
          <button
            onClick={resetHistory}
            className="px-6 py-2 rounded-md bg-gray-300 text-gray-700 font-medium hover:bg-gray-400"
          >
            Reset & Clear History
          </button>
          <button
            onClick={goNext}
            disabled={!canGoNext}
            className={clsx(
              "w-12 h-12 flex items-center justify-center rounded-full",
              canGoNext
                ? "bg-gray-300 hover:bg-gray-400"
                : "bg-gray-200 opacity-50 cursor-not-allowed"
            )}
          >
            »
          </button>
        </div>
      </aside>
    </div>
  );
}
