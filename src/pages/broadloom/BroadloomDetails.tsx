import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import broadloomData from "../../data/boardloom.json";
import { useImageLoader } from "../../hooks/boardloom/useImageLoader";
import { useDynamicSvgTile } from "../../hooks/boardloom/useDynamicSvgTile";
import type { TileColors } from "../../hooks/boardloom/types";
import * as THREE from "three";

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

const SVG_MASK_PATH = "/room8.svg";

export default function BroadloomDetails() {
  const { sku } = useParams<{ sku: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  // View states
  const [activeTab, setActiveTab] = useState<MainTab>("swatch");
  const [activeRightTab, setActiveRightTab] = useState<RightTab>("Colors");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  );
  const [view, setView] = useState<"room" | "swatch">("room");

  // History tracking
  const [history, setHistory] = useState<number[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Canvas & texture states
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [productImage, setProductImage] = useState<HTMLImageElement | null>(
    null
  );

  const swatchCanvasRef = useRef<HTMLCanvasElement>(null);
  const roomCanvasRef = useRef<HTMLCanvasElement>(null);

  // Default carpet colors
  const [colors, setColors] = useState<TileColors>({
    base: "#b69d78",
    accent1: "#d3c4a8",
    accent2: "#a58962",
  });

  // Hooks for dynamic texture + room image
  const dynamicTile = useDynamicSvgTile(colors);
  const roomImage = useImageLoader(SVG_MASK_PATH);

  // Fetch product
  useEffect(() => {
    const found = (broadloomData.products as Product[]).find(
      (p) => p.sku === sku
    );
    setProduct(found || null);
    setSelectedColorIndex(null);
    setHistory([]);
    setHistoryIndex(-1);
    setActiveRightTab("Colors");
    setActiveTab("swatch");
  }, [sku]);

  // Load the actual carpet image as a texture
  useEffect(() => {
    if (!product?.image) return;
    const img = new Image();
    img.src = product.image;
    img.onload = () => setProductImage(img);
  }, [product]);

  const canGoPrev = historyIndex > 0;
  const canGoNext = historyIndex < history.length - 1;

  const filteredRooms = useMemo(
    () =>
      selectedRoom
        ? product?.rooms.filter((r) => r.name === selectedRoom)
        : product?.rooms,
    [selectedRoom, product]
  );

  // Select color & update history
  const handleSelectColor = (idx: number) => {
    if (selectedColorIndex === idx) return;
    const newHistory = history.slice(0, historyIndex + 1).concat(idx);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setSelectedColorIndex(idx);

    // Update carpet color dynamically
    if (product) {
      const colorCode = product.colors[idx]?.code;
      setColors({
        base: colorCode || "#b69d78",
        accent1: "#d3c4a8",
        accent2: "#a58962",
      });
    }
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

  // 🎨 Canvas Drawing — Carpet Roll / Room
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const texture = productImage || dynamicTile;

    // 🧵 Draw repeated carpet roll
    if (texture) {
      const pattern = ctx.createPattern(texture, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }
    }

    // 🏠 Overlay room image (for "room" view)
    if (view === "room" && roomImage) {
      ctx.globalAlpha = 0.9;
      ctx.drawImage(roomImage, 0, 0, width, height);
      ctx.globalAlpha = 1;
    }

    // 🎨 Carpet roll edge shading (for "swatch" view)
    if (view === "swatch") {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(width - 40, 0, 40, height);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillRect(width - 45, 0, 5, height);
    }
  }, [dynamicTile, roomImage, productImage, view]);

  //   NEW CODE BELOW

  // Canvas Drawing — Carpet Roll (swatch)
  useEffect(() => {
    const canvas = swatchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const texture = productImage || dynamicTile;

    if (texture) {
      const pattern = ctx.createPattern(texture, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }
    }

    // Carpet roll edge shading for swatch
    ctx.fillStyle = "rgba(0,0,0,0.0)";
    ctx.fillRect(width, 0, 0, height);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillRect(width, 0, 0, height);
  }, [dynamicTile, productImage]);

  // // Canvas Drawing — Room View with carpet texture
  useEffect(() => {
    const canvas = roomCanvasRef.current;
    if (!canvas || !roomImage) return;

    const width = canvas.width;
    const height = canvas.height;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.fov = 55;
    camera.position.set(0, 4, 16);
    camera.lookAt(0, 4, 16);
    camera.updateProjectionMatrix();

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    const keyLight = new THREE.DirectionalLight(0xffe6c9, 0.4);
    keyLight.position.set(0, 10, 10);
    scene.add(keyLight);

    // Carpet texture
    const textureSrc = productImage || dynamicTile;
    if (!textureSrc) return;

    const carpetTexture = new THREE.Texture(textureSrc);
    carpetTexture.needsUpdate = true;
    carpetTexture.wrapS = carpetTexture.wrapT = THREE.RepeatWrapping;
    carpetTexture.repeat.set(3, 3);

    carpetTexture.colorSpace = THREE.SRGBColorSpace;
    carpetTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    carpetTexture.magFilter = THREE.LinearFilter;
    carpetTexture.minFilter = THREE.LinearMipmapLinearFilter;

    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    floorGeometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(floorGeometry.attributes.uv.array, 2)
    );

    const floorMaterial = new THREE.MeshStandardMaterial({
      map: carpetTexture,
      roughness: 0.88,
      metalness: -2,
      aoMap: carpetTexture,
      aoMapIntensity: 0.35,
      opacity: 2,
      transparent: true,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    renderer.render(scene, camera);

    return () => {
      renderer.dispose();
      floorGeometry.dispose();
      floorMaterial.dispose();
      carpetTexture.dispose();
      // roomTexture.dispose();
    };
  }, [dynamicTile, productImage, roomImage]);

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
        "pb-1 text-md font-semibold transition-colors",
        isActive ? "border-b-4 border-black text-black" : "text-gray-500"
      )}
    >
      {label}
    </button>
  );

  // ------------------------------------------------------
  // 💠 MAIN LAYOUT
  // ------------------------------------------------------
  return (
    <div
      className="  mx-auto px-4 sm:px-6 pt-24 grid grid-cols-1 md:grid-cols-5 gap-4"
    >
      {/* LEFT PANEL */}
      <div className="md:col-span-3">
        {/* Top Tabs */}
        <div className="flex space-x-6 border-b justify-between mb-4">
          <div className=" flex items-center gap-3">
            {(["swatch", "room"] as MainTab[]).map((tab) => (
              <TabButton
                key={tab}
                label={tab.charAt(0).toUpperCase() + tab.slice(1)}
                isActive={activeTab === tab}
                onClick={() => {
                  setActiveTab(tab);
                  setView(tab);
                }}
              />
            ))}
          </div>
          <div className=" flex gap-3 text-sm">
            <p>144" x 198" |</p>
            <p>Colorpoint</p>
            <p></p>
          </div>
        </div>
        <div className="relative h-[420px] sm:h-full shadow-lg overflow-hidden bg-gray-100 flex flex-col items-center justify-center">
          <canvas
            ref={swatchCanvasRef}
            width={1440}
            height={1980}
            className={clsx(
              "w-full h-[420px] sm:h-full scale-100 object-cover object-center transition-opacity",
              activeTab === "swatch"
                ? "opacity-100"
                : "opacity-0 absolute top-0 left-0"
            )}
          />

          <div
            className={clsx(
              " relative h-[420px] sm:h-screen w-full transition-opacity",
              activeTab === "room"
                ? " opacity-100"
                : "opacity- hidden absolute top-0 left-0"
            )}
          >
            <canvas
              ref={roomCanvasRef}
              width={1440}
              height={1980}
              className={clsx(
                "w-full h-[340px] sm:h-screen scale-150 sm:scale-100 object-cover object-bottom transition-opacity",
                activeTab === "room"
                  ? " opacity-100"
                  : "opacity-0 absolute -top-0 left-0"
              )}
            />
            <img
              src={SVG_MASK_PATH}
              alt="Room Overlay"
              className="absolute -top-48 sm:-top-24 left-0 w-full h-screen pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="md:col-span-2 flex flex-col justify-between">
        <div>
          {/* Right-side Tabs */}
          <div className="flex justify-between border-b mb-6">
            {(
              ["Colors", "Rooms", "Colorways", "Coordinates"] as RightTab[]
            ).map((tab) => (
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
              <>
                <div className="grid grid-cols-4 gap-6">
                  {product.colors.map((c, idx) => (
                    <div key={idx} className="flex flex-col items-center ">
                      <div
                        onClick={() => handleSelectColor(idx)}
                        className={clsx(
                          "w-24 h-20  shadow-sm cursor-pointer hover:scale-105 transition-transform",
                          selectedColorIndex === idx &&
                            "ring-4 ring-offset-2 ring-blue-950"
                        )}
                        style={{ backgroundColor: c.code }}
                      />
                      <span className="mt-2 text-sm font-medium">
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* History Navigation */}
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => navigateHistory("prev")}
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
                    Reset History
                  </button>

                  <button
                    onClick={() => navigateHistory("next")}
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
              </>
            )}

            {/* ROOMS */}
            {activeRightTab === "Rooms" && (
              <>
                <div className="flex flex-wrap gap-2">
                  {product.rooms.map((r, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setSelectedRoom((prev) =>
                          prev === r.name ? null : r.name
                        )
                      }
                      className={clsx(
                        "px-4 py-2  border text-sm font-medium",
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
                      onClick={() => setView("room")}
                      className=" overflow-hidden"
                    >
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-2 text-left">
                        <div className="text-sm font-medium">{room.name}</div>
                        {/* <div className="text-sm text-gray-500">
                          Preview in {room.name}
                        </div> */}
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
                    <img
                      src={c.image}
                      alt={c.sku}
                      className="w-full h-full object-cover shadow"
                    />
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
                    <img
                      src={c.image}
                      alt={c.sku}
                      className="w-full h-full object-cover shadow"
                    />
                    <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- BOTTOM BUTTONS SECTION --- */}
        <div className="space-y-6 mt-6">
          {/* Action Buttons (from screenshot) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-0 px-0 sm:px-5 py-4 border-t">
            {/* Save Button */}
            <button
              onClick={() => {
                /* Handle Save Logic */
              }}
              className="px-0 sm:px-8 py-2 rounded-full w-full sm:w-fit bg-gray-900 text-white font-semibold hover:bg-gray-700"
            >
              Save
            </button>

            {/* Icon Buttons Group */}
            <div className="flex items-center space-x-4 gap-10">
              {/* Download */}
              <button
                onClick={() => {
                  /* Handle Download Logic */
                }}
                className="flex flex-col items-center text-gray-700 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span className="text-sm font-medium">Download</span>
              </button>
              {/* Order */}
              <button
                onClick={() => {
                  /* Handle Order Logic */
                }}
                className="flex flex-col items-center text-gray-700 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-sm font-medium">Order</span>
              </button>
              {/* Email */}
              <button
                onClick={() => {
                  /* Handle Email Logic */
                }}
                className="flex flex-col items-center text-gray-700 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium">Email</span>
              </button>
              {/* Pin It */}
              <button
                onClick={() => {
                  /* Handle Pin It Logic */
                }}
                className="flex flex-col items-center text-gray-700 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.017 0C5.383 0 0 5.383 0 12.017c0 5.09 3.076 9.42 7.37 11.23-.052-.895-.12-2.19.034-3.27.14-1.002.9-4.24 1.04-4.71.132-.45.082-.644-.14-.98-.24-.36-.42-.87-.42-1.46 0-1.38.78-2.42 1.76-2.42.82 0 1.22.62 1.22 1.37 0 .84-.54 2.09-.81 3.25-.23 1.02.5 1.84 1.5 1.84 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.8 0-4.4 2.1-4.4 4.3 0 .83.31 1.7.7 2.2.08.1.1.18.07.28-.08.34-.27 1.1-.35 1.4-.09.38-.18.48-.36.38-1.5-.83-2.5-2.9-2.5-4.8C2.5 6.1 5.7 3 9.9 3c3.8 0 6.8 2.8 6.8 6.3 0 3.8-2.4 6.7-5.8 6.7-1.1 0-2.2-.6-2.5-1.3 0 0-.54 2.1-.66 2.6-.33 1.3-.9 2.7-1.3 3.6 1.2.3 2.5.5 3.8.5 6.6 0 12-5.4 12-12S18.6 0 12 0" />
                </svg>
                <span className="text-sm font-medium">Pin It</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
