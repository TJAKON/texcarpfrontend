// import { useEffect, useMemo, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import clsx from "clsx";
// import broadloomData from "../../data/boardloom.json";
// import { useImageLoader } from "../../hooks/boardloom/useImageLoader";
// import { useDynamicSvgTile } from "../../hooks/boardloom/useDynamicSvgTile";
// import type { TileColors } from "../../hooks/boardloom/types";
// import * as THREE from "three";

// interface Product {
//   id: string;
//   sku: string;
//   image: string;
//   isNew?: boolean;
//   colors: { code: string; label: string }[];
//   rooms: { name: string; image: string }[];
//   colorways: { sku: string; image: string }[];
//   coordinates: { sku: string; image: string }[];
// }

// type RightTab = "Colors" | "Rooms" | "Colorways" | "Coordinates";
// type MainTab = "swatch" | "room";

// const SVG_MASK_PATH = "/room5.svg";

// export default function BroadloomDetailsnext() {
//   const { sku } = useParams<{ sku: string }>();
//   const [product, setProduct] = useState<Product | null>(null);

//   // View states
//   const [activeTab, setActiveTab] = useState<MainTab>("swatch");
//   const [activeRightTab, setActiveRightTab] = useState<RightTab>("Colors");
//   const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
//   const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
//     null
//   );
//   const [view, setView] = useState<"room" | "swatch">("room");

//   // History tracking
//   const [history, setHistory] = useState<number[]>([]);
//   const [historyIndex, setHistoryIndex] = useState<number>(-1);

//   // Canvas & texture states
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [productImage, setProductImage] = useState<HTMLImageElement | null>(
//     null
//   );

//   const swatchCanvasRef = useRef<HTMLCanvasElement>(null);
//   const roomCanvasRef = useRef<HTMLCanvasElement>(null);

//   // Default carpet colors
//   const [colors, setColors] = useState<TileColors>({
//     base: "#b69d78",
//     accent1: "#d3c4a8",
//     accent2: "#a58962",
//   });

//   // Hooks for dynamic texture + room image
//   const dynamicTile = useDynamicSvgTile(colors);
//   const roomImage = useImageLoader(SVG_MASK_PATH);

//   // Fetch product
//   useEffect(() => {
//     const found = (broadloomData.products as Product[]).find(
//       (p) => p.sku === sku
//     );
//     setProduct(found || null);
//     setSelectedColorIndex(null);
//     setHistory([]);
//     setHistoryIndex(-1);
//     setActiveRightTab("Colors");
//     setActiveTab("swatch");
//   }, [sku]);

//   // Load the actual carpet image as a texture
//   useEffect(() => {
//     if (!product?.image) return;
//     const img = new Image();
//     img.src = product.image;
//     img.onload = () => setProductImage(img);
//   }, [product]);

//   const canGoPrev = historyIndex > 0;
//   const canGoNext = historyIndex < history.length - 1;

//   const filteredRooms = useMemo(
//     () =>
//       selectedRoom
//         ? product?.rooms.filter((r) => r.name === selectedRoom)
//         : product?.rooms,
//     [selectedRoom, product]
//   );

//   // Select color & update history
//   const handleSelectColor = (idx: number) => {
//     if (selectedColorIndex === idx) return;
//     const newHistory = history.slice(0, historyIndex + 1).concat(idx);
//     setHistory(newHistory);
//     setHistoryIndex(newHistory.length - 1);
//     setSelectedColorIndex(idx);

//     // Update carpet color dynamically
//     if (product) {
//       const colorCode = product.colors[idx]?.code;
//       setColors({
//         base: colorCode || "#b69d78",
//         accent1: "#d3c4a8",
//         accent2: "#a58962",
//       });
//     }
//   };

//   const navigateHistory = (direction: "prev" | "next") => {
//     if (direction === "prev" && canGoPrev) {
//       const newIndex = historyIndex - 1;
//       setHistoryIndex(newIndex);
//       setSelectedColorIndex(history[newIndex]);
//     } else if (direction === "next" && canGoNext) {
//       const newIndex = historyIndex + 1;
//       setHistoryIndex(newIndex);
//       setSelectedColorIndex(history[newIndex]);
//     }
//   };

//   const resetHistory = () => {
//     setHistory([]);
//     setHistoryIndex(-1);
//     setSelectedColorIndex(null);
//   };

//   // 🎨 Canvas Drawing — Carpet Roll / Room
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const width = canvas.width;
//     const height = canvas.height;

//     ctx.clearRect(0, 0, width, height);

//     const texture = productImage || dynamicTile;

//     // 🧵 Draw repeated carpet roll
//     if (texture) {
//       const pattern = ctx.createPattern(texture, "repeat");
//       if (pattern) {
//         ctx.fillStyle = pattern;
//         ctx.fillRect(0, 0, width, height);
//       }
//     }

//     // 🏠 Overlay room image (for "room" view)
//     if (view === "room" && roomImage) {
//       ctx.globalAlpha = 0.9;
//       ctx.drawImage(roomImage, 0, 0, width, height);
//       ctx.globalAlpha = 1;
//     }

//     // 🎨 Carpet roll edge shading (for "swatch" view)
//     if (view === "swatch") {
//       ctx.fillStyle = "rgba(0,0,0,0.15)";
//       ctx.fillRect(width - 40, 0, 40, height);
//       ctx.fillStyle = "rgba(255,255,255,0.4)";
//       ctx.fillRect(width - 45, 0, 5, height);
//     }
//   }, [dynamicTile, roomImage, productImage, view]);

//   //   NEW CODE BELOW

//   // Canvas Drawing — Carpet Roll (swatch)
//   useEffect(() => {
//     const canvas = swatchCanvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const width = canvas.width;
//     const height = canvas.height;

//     ctx.clearRect(0, 0, width, height);

//     const texture = productImage || dynamicTile;

//     if (texture) {
//       const pattern = ctx.createPattern(texture, "repeat");
//       if (pattern) {
//         ctx.fillStyle = pattern;
//         ctx.fillRect(0, 0, width, height);
//       }
//     }

//     // Carpet roll edge shading for swatch
//     ctx.fillStyle = "rgba(0,0,0,0.0)";
//     ctx.fillRect(width, 0, 0, height);
//     ctx.fillStyle = "rgba(255,255,255,0.4)";
//     ctx.fillRect(width, 0, 0, height);
//   }, [dynamicTile, productImage]);

//   // // Canvas Drawing — Room View with carpet texture
//   // this is final work ----------------------

//   useEffect(() => {
//     const canvas = roomCanvasRef.current;
//     // We need both the image from useImageLoader AND the canvas
//     if (!canvas || !roomImage) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const width = canvas.width;
//     const height = canvas.height;

//     ctx.clearRect(0, 0, width, height);

//     const texture = productImage || dynamicTile;
//     if (!texture) {
//       // Fallback: draw room if no texture
//       ctx.drawImage(roomImage, 0, 0, width, height);
//       return;
//     }

//     // ---- Load SVG floor polygon ----
//     fetch(SVG_MASK_PATH) // <-- FIX: Fetch the new .svg file
//       .then((res) => res.text())
//       .then((svgText) => {
//         const svgDoc = new DOMParser().parseFromString(
//           svgText,
//           "image/svg+xml"
//         );

//         // Get the SVG element to read its viewBox
//         const svgEl = svgDoc.querySelector("svg");
//         if (!svgEl) return;

//         // Get the viewBox attribute (e.g., "0 0 247.36 360")
//         const viewBox = svgEl.getAttribute("viewBox");
//         if (!viewBox) return;

//         // Get the dimensions from the viewBox
//         const [, , svgWidth, svgHeight] = viewBox.split(" ").map(Number);

//         // --- FIX: Calculate scaling factors ---
//         const scaleX = width / svgWidth;
//         const scaleY = height / svgHeight;

//         // Prefer polygon with id="floor" if available
//         const floor =
//           svgDoc.querySelector("#floor") || svgDoc.querySelector("polygon");
//         if (!floor) return;

//         const pointsAttr = floor.getAttribute("points")!;
//         if (!pointsAttr) return;

//         // Parse space-separated polygon points into {x, y} array
//         const coords = pointsAttr.trim().split(/\s+/).map(Number);
//         const points: { x: number; y: number }[] = [];
//         for (let i = 0; i < coords.length; i += 2) {
//           points.push({ x: coords[i], y: coords[i + 1] });
//         }

//         if (!points.length) return;

//         // ---- Create texture pattern ----
//         const pattern = ctx.createPattern(texture, "repeat");
//         if (!pattern) return;

//         ctx.save();

//         // ---- Clip to polygon (with scaling) ----
//         ctx.beginPath();
//         // --- FIX: Apply scaling to all points ---
//         ctx.moveTo(points[0].x * scaleX, points[0].y * scaleY);
//         for (let i = 1; i < points.length; i++) {
//           ctx.lineTo(points[i].x * scaleX, points[i].y * scaleY);
//         }
//         ctx.setTransform(1, 0, 0, 0.3, 0, height * 0.65);
//         ctx.closePath();
//         ctx.clip();

//         console.log("Filling floor polygon with carpet texture.", points);

//         // ---- Fill polygon with pattern ----
//         // This is Step 1: Draw the carpet INSIDE the clip
//         ctx.fillStyle = pattern;
//         ctx.fillRect(0, 0, width, height);

//         ctx.restore();

//         // --- FIX: Draw the room image ONCE, at the end ---
//         // This is Step 2: Draw the room (with furniture) on TOP

//         // ✅ CRITICAL FIX: This MUST be 1.0
//         ctx.globalAlpha = 1;

//         // This `roomImage` MUST be a PNG with a transparent floor
//         // so the carpet from Step 1 can show through.
//         ctx.drawImage(roomImage, 0, 0, width, height);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch or parse SVG mask:", err);
//         // Fallback: just draw the room if SVG fails
//         ctx.drawImage(roomImage, 0, 0, width, height);
//       });
//   }, [dynamicTile, productImage, roomImage]);

//   // THREE.JS Room View (alternative to 2D canvas)
//   useEffect(() => {
//     const canvas = roomCanvasRef.current;
//     if (!canvas || !roomImage) return;

//     const width = canvas.width;
//     const height = canvas.height;

//     // ⚡ Use a single WebGL renderer (no 2D mixing)
//     const renderer = new THREE.WebGLRenderer({
//       canvas,
//       alpha: true,
//       antialias: true,
//     });
//     renderer.setSize(width, height);
//     renderer.setClearColor(0x000000, 0); // Transparent background

//     // 🎥 Scene setup
//     const scene = new THREE.Scene();

//     // 📸 Perspective camera — you can tune this angle
//     const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
//     camera.position.set(0, 4, 8);
//     camera.lookAt(0, 0, 0);
//     scene.add(camera);

//     // 💡 Lighting
//     const light = new THREE.DirectionalLight(0xffffff, 1);
//     light.position.set(10, 10, 10);
//     scene.add(light);

//     // 🧶 Carpet texture setup
//     const textureSrc = productImage || dynamicTile;
//     if (!textureSrc) return;

//     // Convert image source to THREE texture
//     const texture = new THREE.Texture(textureSrc);
//     texture.needsUpdate = true;

//     // ❌ No repeat — show it as one stretched carpet
//     texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//     texture.repeat.set(1, 1);

//     // 🧱 Create a single carpet plane
//     const geometry = new THREE.PlaneGeometry(10, 8); // wider plane for floor
//     const material = new THREE.MeshPhongMaterial({
//       map: texture,
//       side: THREE.DoubleSide,
//     });

//     const floor = new THREE.Mesh(geometry, material);
//     floor.rotation.x = -Math.PI / 2; // lay flat
//     floor.position.y = 0;
//     scene.add(floor);

//     // 🖼️ Room background — make it a large rectangle behind everything
//     const roomTexture = new THREE.Texture(roomImage);
//     roomTexture.needsUpdate = true;

//     const roomMaterial = new THREE.MeshBasicMaterial({
//       map: roomTexture,
//       transparent: true,
//       depthTest: false, // ensures it's drawn behind the carpet
//     });

//     const roomPlane = new THREE.Mesh(
//       new THREE.PlaneGeometry(12, 9),
//       roomMaterial
//     );
//     roomPlane.position.z = -0.5; // slightly behind carpet
//     roomPlane.position.y = 2.5; // lift it so floor aligns better
//     scene.add(roomPlane);

//     // 🔁 Render once (or make it animate)
//     renderer.render(scene, camera);

//     // ♻️ Cleanup
//     return () => {
//       renderer.dispose();
//       geometry.dispose();
//       material.dispose();
//       texture.dispose();
//       roomTexture.dispose();
//     };
//   }, [dynamicTile, productImage, roomImage]);

//   // --------------- ----------------------

//   if (!product)
//     return (
//       <div className="text-center py-20 text-gray-600">
//         ❌ Broadloom product not found
//       </div>
//     );

//   const TabButton = ({
//     label,
//     isActive,
//     onClick,
//   }: {
//     label: string;
//     isActive: boolean;
//     onClick: () => void;
//   }) => (
//     <button
//       onClick={onClick}
//       className={clsx(
//         "pb-1 text-md font-semibold transition-colors",
//         isActive ? "border-b-4 border-black text-black" : "text-gray-500"
//       )}
//     >
//       {label}
//     </button>
//   );

//   // ------------------------------------------------------
//   // 💠 MAIN LAYOUT
//   // ------------------------------------------------------
//   return (
//     <div className="mx-auto px-6 pt-24 grid md:grid-cols-5 gap-8">
//       {/* LEFT PANEL */}
//       <div className="md:col-span-3">
//         {/* Top Tabs */}
//         <div className="flex space-x-6 border-b justify-between mb-4">
//           <div className=" flex items-center gap-3">
//             {(["swatch", "room"] as MainTab[]).map((tab) => (
//               <TabButton
//                 key={tab}
//                 label={tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 isActive={activeTab === tab}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   setView(tab);
//                 }}
//               />
//             ))}
//           </div>
//           <div className=" flex gap-3 text-sm">
//             <p>144" x 198" |</p>
//             <p>Colorpoint</p>
//             <p></p>
//           </div>
//         </div>

//         <div className="relative h-full  shadow-lg overflow-hidden bg-gray-100 flex flex-col items-center justify-center">
//           {/* Both canvases exist, visibility controlled by activeTab */}
//           <canvas
//             ref={swatchCanvasRef}
//             width={1440}
//             height={1980}
//             className={clsx(
//               "w-full h-full scale-100 object-cover object-bottom-left transition-opacity",
//               activeTab === "swatch"
//                 ? "opacity-100"
//                 : "opacity-0 absolute top-0 left-0"
//             )}
//           />

//           <canvas
//             ref={roomCanvasRef}
//             width={1440}
//             height={1980}
//             className={clsx(
//               "w-full h-screen scale-100 object-cover object-bottom-left transition-opacity",
//               activeTab === "room"
//                 ? " opacity-100"
//                 : "opacity-0 absolute top-0 left-0"
//             )}
//           />
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="md:col-span-2 flex flex-col justify-between">
//         <div>
//           {/* Right-side Tabs */}
//           <div className="flex justify-between border-b mb-6">
//             {(
//               ["Colors", "Rooms", "Colorways", "Coordinates"] as RightTab[]
//             ).map((tab) => (
//               <TabButton
//                 key={tab}
//                 label={tab}
//                 isActive={activeRightTab === tab}
//                 onClick={() => setActiveRightTab(tab)}
//               />
//             ))}
//           </div>

//           {/* Tab Contents */}
//           <div className="min-h-fit space-y-8">
//             {/* COLORS */}
//             {activeRightTab === "Colors" && (
//               <>
//                 <div className="grid grid-cols-4 gap-6">
//                   {product.colors.map((c, idx) => (
//                     <div key={idx} className="flex flex-col items-center ">
//                       <div
//                         onClick={() => handleSelectColor(idx)}
//                         className={clsx(
//                           "w-24 h-20  shadow-sm cursor-pointer hover:scale-105 transition-transform",
//                           selectedColorIndex === idx &&
//                             "ring-4 ring-offset-2 ring-blue-950"
//                         )}
//                         style={{ backgroundColor: c.code }}
//                       />
//                       <span className="mt-2 text-sm font-medium">
//                         {c.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* History Navigation */}
//                 <div className="flex items-center justify-center space-x-4">
//                   <button
//                     onClick={() => navigateHistory("prev")}
//                     disabled={!canGoPrev}
//                     className={clsx(
//                       "w-12 h-12 flex items-center justify-center rounded-full",
//                       canGoPrev
//                         ? "bg-gray-300 hover:bg-gray-400"
//                         : "bg-gray-200 opacity-50 cursor-not-allowed"
//                     )}
//                   >
//                     «
//                   </button>

//                   <button
//                     onClick={resetHistory}
//                     className="px-6 py-2 rounded-md bg-gray-300 text-gray-700 font-medium hover:bg-gray-400"
//                   >
//                     Reset History
//                   </button>

//                   <button
//                     onClick={() => navigateHistory("next")}
//                     disabled={!canGoNext}
//                     className={clsx(
//                       "w-12 h-12 flex items-center justify-center rounded-full",
//                       canGoNext
//                         ? "bg-gray-300 hover:bg-gray-400"
//                         : "bg-gray-200 opacity-50 cursor-not-allowed"
//                     )}
//                   >
//                     »
//                   </button>
//                 </div>
//               </>
//             )}

//             {/* ROOMS */}
//             {activeRightTab === "Rooms" && (
//               <>
//                 <div className="flex flex-wrap gap-2">
//                   {product.rooms.map((r, i) => (
//                     <button
//                       key={i}
//                       onClick={() =>
//                         setSelectedRoom((prev) =>
//                           prev === r.name ? null : r.name
//                         )
//                       }
//                       className={clsx(
//                         "px-4 py-2  border text-sm font-medium",
//                         selectedRoom === r.name
//                           ? "bg-black text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-100"
//                       )}
//                     >
//                       {r.name}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   {filteredRooms?.map((room, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setView("room")}
//                       className=" overflow-hidden"
//                     >
//                       <img
//                         src={room.image}
//                         alt={room.name}
//                         className="w-full h-40 object-cover"
//                       />
//                       <div className="p-2 text-left">
//                         <div className="text-sm font-medium">{room.name}</div>
//                         {/* <div className="text-sm text-gray-500">
//                           Preview in {room.name}
//                         </div> */}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* COLORWAYS */}
//             {activeRightTab === "Colorways" && (
//               <div className="grid grid-cols-3 gap-4">
//                 {product.colorways.map((c) => (
//                   <div key={c.sku} className="flex flex-col items-center">
//                     <img
//                       src={c.image}
//                       alt={c.sku}
//                       className="w-full h-full object-cover shadow"
//                     />
//                     <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* COORDINATES */}
//             {activeRightTab === "Coordinates" && (
//               <div className="grid grid-cols-3 gap-4">
//                 {product.coordinates.map((c) => (
//                   <div key={c.sku} className="flex flex-col items-center">
//                     <img
//                       src={c.image}
//                       alt={c.sku}
//                       className="w-full h-full object-cover shadow"
//                     />
//                     <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* --- BOTTOM BUTTONS SECTION --- */}
//         <div className="space-y-6 mt-6">
//           {/* Action Buttons (from screenshot) */}
//           <div className="flex items-center justify-between px-5 py-4 border-t">
//             {/* Save Button */}
//             <button
//               onClick={() => {
//                 /* Handle Save Logic */
//               }}
//               className="px-8 py-2 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-700"
//             >
//               Save
//             </button>

//             {/* Icon Buttons Group */}
//             <div className="flex items-center space-x-4 gap-10">
//               {/* Download */}
//               <button
//                 onClick={() => {
//                   /* Handle Download Logic */
//                 }}
//                 className="flex flex-col items-center text-gray-700 hover:text-black"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                   />
//                 </svg>
//                 <span className="text-sm font-medium">Download</span>
//               </button>
//               {/* Order */}
//               <button
//                 onClick={() => {
//                   /* Handle Order Logic */
//                 }}
//                 className="flex flex-col items-center text-gray-700 hover:text-black"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 <span className="text-sm font-medium">Order</span>
//               </button>
//               {/* Email */}
//               <button
//                 onClick={() => {
//                   /* Handle Email Logic */
//                 }}
//                 className="flex flex-col items-center text-gray-700 hover:text-black"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//                 <span className="text-sm font-medium">Email</span>
//               </button>
//               {/* Pin It */}
//               <button
//                 onClick={() => {
//                   /* Handle Pin It Logic */
//                 }}
//                 className="flex flex-col items-center text-gray-700 hover:text-black"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M12.017 0C5.383 0 0 5.383 0 12.017c0 5.09 3.076 9.42 7.37 11.23-.052-.895-.12-2.19.034-3.27.14-1.002.9-4.24 1.04-4.71.132-.45.082-.644-.14-.98-.24-.36-.42-.87-.42-1.46 0-1.38.78-2.42 1.76-2.42.82 0 1.22.62 1.22 1.37 0 .84-.54 2.09-.81 3.25-.23 1.02.5 1.84 1.5 1.84 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.8 0-4.4 2.1-4.4 4.3 0 .83.31 1.7.7 2.2.08.1.1.18.07.28-.08.34-.27 1.1-.35 1.4-.09.38-.18.48-.36.38-1.5-.83-2.5-2.9-2.5-4.8C2.5 6.1 5.7 3 9.9 3c3.8 0 6.8 2.8 6.8 6.3 0 3.8-2.4 6.7-5.8 6.7-1.1 0-2.2-.6-2.5-1.3 0 0-.54 2.1-.66 2.6-.33 1.3-.9 2.7-1.3 3.6 1.2.3 2.5.5 3.8.5 6.6 0 12-5.4 12-12S18.6 0 12 0" />
//                 </svg>
//                 <span className="text-sm font-medium">Pin It</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


//  // --------------- ----------------------
//   //   useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   if (!canvas || !roomImage) return;

//   //   const ctx = canvas.getContext("2d");
//   //   if (!ctx) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   ctx.clearRect(0, 0, width, height);

//   //   const texture = productImage || dynamicTile;
//   //   if (!texture) {
//   //     ctx.drawImage(roomImage, 0, 0, width, height);
//   //     return;
//   //   }

//   //   // Define the path to your SVG mask file
//   //  // Make sure this file exists in /public

//   //   fetch(SVG_MASK_PATH)
//   //     .then((res) => res.text())
//   //     .then((svgText) => {
//   //       const svgDoc = new DOMParser().parseFromString(
//   //         svgText,
//   //         "image/svg+xml"
//   //       );
//   //       const svgEl = svgDoc.querySelector("svg");
//   //       if (!svgEl) return;
//   //       const viewBox = svgEl.getAttribute("viewBox");
//   //       if (!viewBox) return;

//   //       const [,, svgWidth, svgHeight] = viewBox.split(" ").map(Number);
//   //       const scaleX = width / svgWidth;
//   //       const scaleY = height / svgHeight;

//   //       const floor =
//   //         svgDoc.querySelector("#floor") || svgDoc.querySelector("polygon");
//   //       if (!floor) return;

//   //       const pointsAttr = floor.getAttribute("points")!;
//   //       if (!pointsAttr) return;

//   //       const coords = pointsAttr.trim().split(/\s+/).map(Number);
//   //       const points: { x: number; y: number }[] = [];
//   //       for (let i = 0; i < coords.length; i += 2) {
//   //         points.push({ x: coords[i], y: coords[i + 1] });
//   //       }
//   //       if (!points.length) return;

//   //       const pattern = ctx.createPattern(texture, "repeat");
//   //       if (!pattern) return;

//   //       // --- THIS IS THE CORRECT ORDER ---
//   //       ctx.save();

//   //       // 1. DEFINE THE CLIP PATH (using scaled SVG points)
//   //       ctx.beginPath();
//   //       ctx.moveTo(points[0].x * scaleX, points[0].y * scaleY);
//   //       for (let i = 1; i < points.length; i++) {
//   //         ctx.lineTo(points[i].x * scaleX, points[i].y * scaleY);
//   //       }
//   //       ctx.closePath();

//   //       // 2. APPLY THE CLIP
//   //       // This creates a "window" in the shape of your floor polygon
//   //       ctx.clip();

//   //       // 3. APPLY PERSPECTIVE TRANSFORM
//   //       // This warps the coordinate system *after* the clip is set
//   //       const vScale = 0.30; // Your vertical scale
//   //       const vOffset = height * 0.65; // Your vertical offset
//   //       ctx.setTransform(1, 0, 0, vScale, 0, vOffset);

//   //       // 4. FILL THE (now warped) "WINDOW" WITH THE PATTERN
//   //       ctx.fillStyle = pattern;
//   //       // We must fill a larger area to account for the transform
//   //       ctx.fillRect(0, -vOffset / vScale, width, height / vScale);

//   //       // 5. RESTORE
//   //       // This removes the clip AND the transform
//   //       ctx.restore();

//   //       // 6. DRAW THE ROOM IMAGE ON TOP

//   //       // ✅ CRITICAL FIX: This MUST be 1.0 to get a solid rug
//   //       ctx.globalAlpha = 1.0;

//   //       // This `roomImage` MUST be a PNG with a transparent floor
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //     })
//   //     .catch((err) => {
//   //       console.error("Failed to fetch or parse SVG mask:", err);
//   //       // Fallback: just draw the room if SVG fails
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //     });
//   // }, [dynamicTile, productImage, roomImage]);

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   if (!canvas || !roomImage) return;

//   //   const ctx = canvas.getContext("2d");
//   //   if (!ctx) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   ctx.clearRect(0, 0, width, height);

//   //   const texture = productImage || dynamicTile;
//   //   if (!texture) {
//   //     ctx.drawImage(roomImage, 0, 0, width, height);
//   //     return;
//   //   }

//   //   fetch(SVG_MASK_PATH)
//   //     .then((res) => res.text())
//   //     .then((svgText) => {
//   //       const svgDoc = new DOMParser().parseFromString(
//   //         svgText,
//   //         "image/svg+xml"
//   //       );

//   //       const svgEl = svgDoc.querySelector("svg");
//   //       if (!svgEl) return;

//   //       const viewBox = svgEl.getAttribute("viewBox");
//   //       if (!viewBox) return;

//   //       const [, , svgWidth, svgHeight] = viewBox.split(" ").map(Number);
//   //       const scaleX = width / svgWidth;
//   //       const scaleY = height / svgHeight;

//   //       const floor =
//   //         svgDoc.querySelector("#floor") || svgDoc.querySelector("polygon");
//   //       if (!floor) return;

//   //       const pointsAttr = floor.getAttribute("points");
//   //       if (!pointsAttr) return;

//   //       const coords = pointsAttr.trim().split(/\s+/).map(Number);
//   //       const points: { x: number; y: number }[] = [];
//   //       for (let i = 0; i < coords.length; i += 2) {
//   //         points.push({ x: coords[i], y: coords[i + 1] });
//   //       }
//   //       if (!points.length) return;

//   //       // --- 🧮 Compute geometric properties ---
//   //       const scaledPoints = points.map((p) => ({
//   //         x: p.x * scaleX,
//   //         y: p.y * scaleY,
//   //       }));
//   //       const [bl, br, tr, tl] = scaledPoints;

//   //       const bottomWidth = Math.hypot(br.x - bl.x, br.y - bl.y);
//   //       const topWidth = Math.hypot(tr.x - tl.x, tr.y - tl.y);
//   //       const midBottom = { x: (bl.x + br.x) / 2, y: (bl.y + br.y) / 2 };
//   //       const midTop = { x: (tl.x + tr.x) / 2, y: (tl.y + tr.y) / 2 };
//   //       const depth = Math.hypot(
//   //         midBottom.x - midTop.x,
//   //         midBottom.y - midTop.y
//   //       );
//   //       const perspectiveRatio = topWidth / bottomWidth;

//   //       console.log({
//   //         bottomWidth,
//   //         topWidth,
//   //         depth,
//   //         perspectiveRatio,
//   //       });

//   //       // --- 🎯 Dynamic carpet transform based on floor geometry ---
//   //       const scaleYFactor = Math.max(
//   //         0.25,
//   //         Math.min(0.6, perspectiveRatio * 1.2)
//   //       );
//   //       const translateY = height * (0.55 + (1 - perspectiveRatio) * 0.3);

//   //       const pattern = ctx.createPattern(texture, "repeat");
//   //       if (!pattern) return;

//   //       ctx.save();

//   //       // Clip to the floor polygon
//   //       ctx.beginPath();
//   //       ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);
//   //       for (let i = 1; i < scaledPoints.length; i++) {
//   //         ctx.lineTo(scaledPoints[i].x, scaledPoints[i].y);
//   //       }
//   //       ctx.closePath();
//   //       ctx.clip();

//   //       // --- Apply one-point perspective transform ---
//   //       ctx.setTransform(1, 0, 0, scaleYFactor, 0, translateY);

//   //       // Fill the polygon with carpet texture
//   //       ctx.fillStyle = pattern;
//   //       ctx.fillRect(0, 0, width, height);

//   //       ctx.restore();

//   //       // --- Draw room overlay ---
//   //       ctx.globalAlpha = 0.35;
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //       ctx.globalAlpha = 1;
//   //     })
//   //     .catch((err) => {
//   //       console.error("Failed to fetch or parse SVG mask:", err);
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //     });
//   // }, [dynamicTile, productImage, roomImage]);


//     // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   if (!canvas) return;
//   //   const ctx = canvas.getContext("2d");
//   //   if (!ctx) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   ctx.clearRect(0, 0, width, height);

//   //   const texture = productImage || dynamicTile;

//   //   if (texture) {
//   //     const pattern = ctx.createPattern(texture, "repeat");
//   //     if (pattern) {
//   //       ctx.save();

//   //       ctx.setTransform(1, 0, 0, 0.45, 0, height * 0.65);
//   //       ctx.fillStyle = pattern;
//   //       ctx.fillRect(0, 0, width, height);

//   //       ctx.restore();
//   //     }
//   //   }

//   //   if (roomImage) {
//   //     ctx.globalAlpha = 1;
//   //     ctx.drawImage(roomImage, 0, 0, width, height);
//   //   }
//   // }, [dynamicTile, productImage, roomImage]);

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   if (!canvas || !roomImage) return;

//   //   const ctx = canvas.getContext("2d");
//   //   if (!ctx) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   ctx.clearRect(0, 0, width, height);

//   //   const texture = productImage || dynamicTile;
//   //   if (!texture) return;

//   //   // Draw the room image first
//   //   ctx.globalAlpha = 1;
//   //   ctx.drawImage(roomImage, 0, 0, width, height);

//   //   // ---- Load SVG floor polygon ----
//   //   fetch(ROOM_IMAGE_PATH)
//   //     .then((res) => res.text())
//   //     .then((svgText) => {
//   //       const svgDoc = new DOMParser().parseFromString(
//   //         svgText,
//   //         "image/svg+xml"
//   //       );

//   //       // Prefer polygon with id="floor" if available
//   //       const floor =
//   //         svgDoc.querySelector("#floor") || svgDoc.querySelector("polygon");
//   //       if (!floor) return;

//   //       const pointsAttr = floor.getAttribute("points")!;
//   //       if (!pointsAttr) return;

//   //       // Parse space-separated polygon points into {x, y} array
//   //       const coords = pointsAttr.trim().split(/\s+/).map(Number);
//   //       const points: { x: number; y: number }[] = [];
//   //       for (let i = 0; i < coords.length; i += 2) {
//   //         points.push({ x: coords[i], y: coords[i + 1] });
//   //       }

//   //       if (!points.length) return;

//   //       console.log("Floor polygon points:", points);

//   //       // ---- Create texture pattern ----
//   //       const pattern = ctx.createPattern(texture, "repeat");
//   //       if (!pattern) return;

//   //       ctx.save();

//   //       // ---- Clip to polygon ----
//   //       ctx.beginPath();
//   //       ctx.moveTo(points[0].x, points[0].y);
//   //       for (let i = 1; i < points.length; i++) {
//   //         ctx.lineTo(points[i].x, points[i].y);
//   //       }
//   //       ctx.closePath();
//   //       ctx.clip();

//   //       // ---- Fill polygon with pattern ----
//   //       ctx.fillStyle = pattern;
//   //       ctx.fillRect(0, 0, width, height);

//   //       console.log("Filled floor polygon with carpet texture.");

//   //       ctx.restore();

//   //       // Overlay the room image for realism
//   //       ctx.globalAlpha = 1;
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //       ctx.globalAlpha = 1;
//   //     });
//   // }, [dynamicTile, productImage, roomImage]);

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   // We need both the image from useImageLoader AND the canvas
//   //   if (!canvas || !roomImage) return;

//   //   const ctx = canvas.getContext("2d");
//   //   if (!ctx) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   ctx.clearRect(0, 0, width, height);

//   //   const texture = productImage || dynamicTile;
//   //   if (!texture) return;

//   //   // --- FIX: DO NOT draw the room image here ---

//   //   // ---- Load SVG floor polygon ----
//   //   fetch(ROOM_IMAGE_PATH) // <-- FIX: Fetch the new .svg file
//   //     .then((res) => res.text())
//   //     .then((svgText) => {
//   //       const svgDoc = new DOMParser().parseFromString(
//   //         svgText,
//   //         "image/svg+xml"
//   //       );

//   //       // Get the SVG element to read its viewBox
//   //       const svgEl = svgDoc.querySelector("svg");
//   //       if (!svgEl) return;

//   //       // Get the viewBox attribute (e.g., "0 0 247.36 360")
//   //       const viewBox = svgEl.getAttribute("viewBox");
//   //       if (!viewBox) return;

//   //       // Get the dimensions from the viewBox
//   //       const [,, svgWidth, svgHeight] = viewBox.split(" ").map(Number);

//   //       // --- FIX: Calculate scaling factors ---
//   //       const scaleX = width / svgWidth;
//   //       const scaleY = height / svgHeight;

//   //       // Prefer polygon with id="floor" if available
//   //       const floor =
//   //         svgDoc.querySelector("#floor") || svgDoc.querySelector("polygon");
//   //       if (!floor) return;

//   //       const pointsAttr = floor.getAttribute("points")!;
//   //       if (!pointsAttr) return;

//   //       // Parse space-separated polygon points into {x, y} array
//   //       const coords = pointsAttr.trim().split(/\s+/).map(Number);
//   //       const points: { x: number; y: number }[] = [];
//   //       for (let i = 0; i < coords.length; i += 2) {
//   //         points.push({ x: coords[i], y: coords[i + 1] });
//   //       }

//   //       if (!points.length) return;

//   //       // ---- Create texture pattern ----
//   //       const pattern = ctx.createPattern(texture, "repeat");
//   //       if (!pattern) return;

//   //       ctx.save();

//   //       // ---- Clip to polygon (with scaling) ----
//   //       ctx.beginPath();
//   //       // --- FIX: Apply scaling to all points ---
//   //       ctx.moveTo(points[0].x * scaleX, points[0].y * scaleY);
//   //       for (let i = 1; i < points.length; i++) {
//   //         ctx.lineTo(points[i].x * scaleX, points[i].y * scaleY);
//   //       }
//   //       ctx.closePath();
//   //       ctx.clip();

//   //       // ---- Fill polygon with pattern ----
//   //       // This is Step 1: Draw the carpet INSIDE the clip
//   //       ctx.fillStyle = pattern;
//   //       ctx.fillRect(0, 0, width, height);

//   //       ctx.restore();

//   //       // --- FIX: Draw the room image ONCE, at the end ---
//   //       // This is Step 2: Draw the room (with furniture) on TOP
//   //       ctx.globalAlpha = 0.5;
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //     })
//   //     .catch((err) => {
//   //       console.error("Failed to fetch or parse SVG mask:", err);
//   //       // Fallback: just draw the room if SVG fails
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //     });
//   // }, [dynamicTile, productImage, roomImage]);

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   // We need both the image from useImageLoader AND the canvas
//   //   if (!canvas || !roomImage) return;

//   //   const ctx = canvas.getContext("2d");
//   //   if (!ctx) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   ctx.clearRect(0, 0, width, height);

//   //   const texture = productImage || dynamicTile;
//   //   if (!texture) {
//   //       // Fallback: draw room if no texture
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //       return;
//   //   }

//   //   // ---- Load SVG floor polygon ----
//   //   fetch(SVG_MASK_PATH) // <-- FIX: Fetch the new .svg file
//   //     .then((res) => res.text())
//   //     .then((svgText) => {
//   //       const svgDoc = new DOMParser().parseFromString(
//   //         svgText,
//   //         "image/svg+xml"
//   //       );

//   //       // Get the SVG element to read its viewBox
//   //       const svgEl = svgDoc.querySelector("svg");
//   //       if (!svgEl) return;

//   //       // Get the viewBox attribute (e.g., "0 0 247.36 360")
//   //       const viewBox = svgEl.getAttribute("viewBox");
//   //       if (!viewBox) return;

//   //       // Get the dimensions from the viewBox
//   //       const [,, svgWidth, svgHeight] = viewBox.split(" ").map(Number);

//   //       // --- FIX: Calculate scaling factors ---
//   //       const scaleX = width / svgWidth;
//   //       const scaleY = height / svgHeight;

//   //       // Prefer polygon with id="floor" if available
//   //       const floor =
//   //         svgDoc.querySelector("#floor") || svgDoc.querySelector("polygon");
//   //       if (!floor) return;

//   //       const pointsAttr = floor.getAttribute("points")!;
//   //       if (!pointsAttr) return;

//   //       // Parse space-separated polygon points into {x, y} array
//   //       const coords = pointsAttr.trim().split(/\s+/).map(Number);
//   //       const points: { x: number; y: number }[] = [];
//   //       for (let i = 0; i < coords.length; i += 2) {
//   //         points.push({ x: coords[i], y: coords[i + 1] });
//   //       }

//   //       if (!points.length) return;

//   //       // ---- Create texture pattern ----
//   //       const pattern = ctx.createPattern(texture, "repeat");
//   //       if (!pattern) return;

//   //       ctx.save();

//   //       // ---- Clip to polygon (with scaling) ----
//   //       ctx.beginPath();
//   //       // --- FIX: Apply scaling to all points ---
//   //       ctx.moveTo(points[0].x * scaleX, points[0].y * scaleY);
//   //       for (let i = 1; i < points.length; i++) {
//   //         ctx.lineTo(points[i].x * scaleX, points[i].y * scaleY);
//   //       }
//   //         ctx.setTransform(1, 0, 0, 0.35, 0, height * 0.65);
//   //       ctx.closePath();
//   //       ctx.clip();

//   //       // ---- Fill polygon with pattern ----
//   //       // This is Step 1: Draw the carpet INSIDE the clip
//   //       ctx.fillStyle = pattern;
//   //       ctx.fillRect(0, 0, width, height);

//   //       ctx.restore();

//   //       // --- FIX: Draw the room image ONCE, at the end ---
//   //       // This is Step 2: Draw the room (with furniture) on TOP

//   //       // ✅ CRITICAL FIX: This MUST be 1.0
//   //       ctx.globalAlpha = 1;

//   //       // This `roomImage` MUST be a PNG with a transparent floor
//   //       // so the carpet from Step 1 can show through.
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //     })
//   //     .catch((err) => {
//   //       console.error("Failed to fetch or parse SVG mask:", err);
//   //       // Fallback: just draw the room if SVG fails
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //     });
//   // }, [dynamicTile, productImage, roomImage]);

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   if (!canvas) return;
//   //   const ctx = canvas.getContext("2d");
//   //   if (!ctx) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   ctx.clearRect(0, 0, width, height);

//   //   const texture = productImage || dynamicTile;
//   //   if (!texture || !roomImage) return;

//   //   // Draw the room first
//   //   ctx.globalAlpha = 1;
//   //   ctx.drawImage(roomImage, 0, 0, width, height);

//   //   // Extract mask (floor area from PNG)
//   //   const tempCanvas = document.createElement("canvas");
//   //   tempCanvas.width = width;
//   //   tempCanvas.height = height;
//   //   const tempCtx = tempCanvas.getContext("2d");
//   //   if (!tempCtx) return;

//   //   tempCtx.drawImage(roomImage, 0, 0, width, height);
//   //   const imageData = tempCtx.getImageData(0, 0, width, height);
//   //   const data = imageData.data;

//   //   // Identify floor mask (assume floor is darkest region)
//   //   let floorYMin = height;
//   //   let floorYMax = 0;
//   //   for (let y = 0; y < height; y++) {
//   //     let rowBrightness = 0;
//   //     for (let x = 0; x < width; x++) {
//   //       const i = (y * width + x) * 4;
//   //       const brightness =
//   //         0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
//   //       rowBrightness += brightness;
//   //     }
//   //     const avg = rowBrightness / width;
//   //     if (avg < 70) {
//   //       // dark floor threshold
//   //       floorYMin = Math.min(floorYMin, y);
//   //       floorYMax = Math.max(floorYMax, y);
//   //     }
//   //   }

//   //   const floorHeight = floorYMax - floorYMin;
//   //   const floorStartY = floorYMin;

//   //   // ---- Simulate one-point perspective ----
//   //   const vanishingPointX = width / 2;
//   //   const vanishingPointY = floorStartY - floorHeight * 0.1;

//   //   if (texture) {
//   //     const pattern = ctx.createPattern(texture, "repeat");
//   //     if (pattern) {
//   //       ctx.save();

//   //       // Define bottom and top widths for the floor plane
//   //       const bottomWidth = width; // wider at bottom
//   //       const topWidth = width * 0.3; // narrow toward vanishing point

//   //       // Draw trapezoid manually to simulate one-point perspective
//   //       ctx.beginPath();
//   //       ctx.moveTo((width - bottomWidth) / 2, floorYMax);
//   //       ctx.lineTo((width + bottomWidth) / 2, floorYMax);
//   //       ctx.lineTo(vanishingPointX + topWidth / 2, vanishingPointY);
//   //       ctx.lineTo(vanishingPointX - topWidth / 2, vanishingPointY);
//   //       ctx.closePath();
//   //       ctx.setTransform(0.5, 0, 0, 0.4, 0, height * 0.65);
//   //       ctx.fillStyle = pattern;
//   //       // ctx.fillRect(vanishingPointX, vanishingPointY, vanishingPointX, vanishingPointY);
//   //       ctx.fill();
//   //       ctx.restore();
//   //     }
//   //   }

//   //   // Re-draw the room on top with partial transparency for realism
//   //   ctx.globalAlpha = 0.5;
//   //   ctx.drawImage(roomImage, 0, 0, width, height);
//   //   ctx.globalAlpha = 1;
//   // }, [dynamicTile, productImage, roomImage]);

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   // We need both the image from useImageLoader AND the canvas
//   //   if (!canvas || !roomImage) return;

//   //   const ctx = canvas.getContext("2d");
//   //   if (!ctx) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   ctx.clearRect(0, 0, width, height);

//   //   const texture = productImage || dynamicTile;
//   //   if (!texture) {
//   //     // Fallback: draw room if no texture
//   //     ctx.drawImage(roomImage, 0, 0, width, height);
//   //     return;
//   //   }

//   //   // --- NEW LOGIC USING A CLIP PATH ---
//   //   // This code matches your ASCII diagram: /   \

//   //   // 1. Create the carpet pattern
//   //   const pattern = ctx.createPattern(texture, "repeat");
//   //   if (pattern) {
//   //     ctx.save();

//   //     // --- 💡 TWEAK THESE 4 VALUES FOR YOUR ROOM ---

//   //     // Y-coordinate for the "vanishing point" (top of the floor)
//   //     const topY = height * 0.6; // 60% down from the top

//   //     // Width of the floor at the "vanishing point"
//   //     const topWidth = width * 0.4; // 40% of canvas width

//   //     // Y-coordinate for the front of the floor
//   //     const bottomY = height; // 100% (bottom edge of canvas)

//   //     // Width of the floor at the front
//   //     const bottomWidth = width; // 100% of canvas width

//   //     // -------------------------------------------------

//   //     // Calculate the 4 corner coordinates
//   //     const topLeftX = (width - topWidth) / 2;
//   //     const topRightX = (width + topWidth) / 2;
//   //     const bottomLeftX = (width - bottomWidth) / 2;
//   //     const bottomRightX = (width + bottomWidth) / 2;

//   //     // 2. Create the trapezoid path
//   //     ctx.beginPath();
//   //     ctx.moveTo(bottomLeftX, bottomY); // Start at bottom-left
//   //     ctx.lineTo(bottomRightX, bottomY); // Line to bottom-right
//   //     ctx.lineTo(topRightX, topY); // Line to top-right
//   //     ctx.lineTo(topLeftX, topY); // Line to top-left
//   //     ctx.closePath(); // Close path back to bottom-left

//   //     // 3. Use clip() to restrict all future drawing to this path
//   //     ctx.clip();

//   //     // 4. Fill the entire canvas with the pattern.
//   //     // The clip() path will ensure it only appears inside the trapezoid.
//   //     ctx.fillStyle = pattern;
//   //     ctx.fillRect(0, 0, width, height);

//   //     // 5. Remove the clip path to draw normally again
//   //     ctx.restore();
//   //   }

//   //   // 6. Draw the room image ON TOP (as a mask)

//   //   // ✅ CRITICAL FIX: This MUST be 1.0 to prevent "ghosting".
//   //   ctx.globalAlpha = 1.0;

//   //   // This `roomImage` MUST be a PNG with a transparent floor
//   //   // so the carpet from step 4 can show through.
//   //   ctx.drawImage(roomImage, 0, 0, width, height);
//   // }, [dynamicTile, productImage, roomImage]);

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   if (!canvas) return;
//   //   const ctx = canvas.getContext("2d");
//   //   if (!ctx) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   // ctx.clearRect(0, 0, width, height);

//   //   const texture = productImage || dynamicTile;
//   //   if (!texture || !roomImage) return;

//   //   // 1️⃣ Draw the background room first
//   //   ctx.globalAlpha = 1;
//   //   ctx.drawImage(roomImage, 0, 0, width, height);

//   //   // 2️⃣ Define floor trapezoid (front-view with one-point perspective)
//   //   const topY = height * 0.65; // where floor meets wall
//   //   const bottomY = height * 0.9; // bottom edge
//   //   const topWidth = width * 0.9;
//   //   const bottomWidth = width * 1.8;

//   //   const topLeftX = (width - topWidth) / 2;
//   //   const topRightX = (width + topWidth) / 2;
//   //   const bottomLeftX = (width - bottomWidth) / 2;
//   //   const bottomRightX = (width + bottomWidth) / 2;

//   //   const pattern = ctx.createPattern(texture, "repeat");
//   //   if (pattern) {
//   //     ctx.save();

//   //     // 3️⃣ Clip the carpet area
//   //     ctx.beginPath();
//   //     ctx.moveTo(bottomLeftX, bottomY);
//   //     ctx.lineTo(bottomRightX, bottomY);
//   //     ctx.lineTo(topRightX, topY);
//   //     ctx.lineTo(topLeftX, topY);
//   //     ctx.closePath();
//   //     ctx.clip();

//   //     // 4️⃣ Apply perspective-like transform for illusion
//   //     // Slight horizontal compression + vertical scaling upward
//   //     ctx.transform(1, 0, 0, 0.3, 0, height * 0.45);

//   //     // 5️⃣ Fill whole region with pattern (flood)
//   //     ctx.fillStyle = pattern;
//   //     ctx.fillRect(0, 0, width, height * 1.5);

//   //     ctx.restore();
//   //   }

//   //   // 6️⃣ Redraw the room on top (for realism)
//   //   ctx.globalAlpha = 0.1;
//   //   ctx.drawImage(roomImage, 0, 0, width, height);
//   //   ctx.globalAlpha = 1;
//   // }, [dynamicTile, productImage, roomImage]);

//   // function drawPerspectiveImage(
//   //   ctx: CanvasRenderingContext2D,
//   //   image: HTMLImageElement,
//   //   vanishingX: number,
//   //   vanishingY: number,
//   //   width: number,
//   //   height: number
//   // ) {
//   //   const slices = 120; // smoothness of the gradient perspective
//   //   const floorStartY = height * 0.45; // top edge of floor area
//   //   const floorEndY = height * 0.95; // bottom of floor
//   //   const floorHeight = floorEndY - floorStartY;

//   //   for (let i = 0; i < slices; i++) {
//   //     const t1 = i / slices;
//   //     const t2 = (i + 1) / slices;

//   //     const y1 = floorStartY + t1 * floorHeight;
//   //     const y2 = floorStartY + t2 * floorHeight;

//   //     // Scale increases as we move downwards
//   //     const scale1 = 0.1 + t1 * 0.9; // starts small (top), grows large (bottom)
//   //     const scale2 = 0.1 + t2 * 0.9;

//   //     const x1 = vanishingX - (width * scale1) / 2;
//   //     const x2 = vanishingX - (width * scale2) / 2;
//   //     const sliceHeight = y2 - y1;

//   //     // Draw repeated texture for each slice
//   //     ctx.drawImage(
//   //       image,
//   //       0, 0, image.width, image.height,
//   //       x1, y1, width * scale1, sliceHeight
//   //     );
//   //   }
//   // }

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   if (!canvas || !roomImage) return;

//   //   const ctx = canvas.getContext("2d");
//   //   if (!ctx) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;
//   //   ctx.clearRect(0, 0, width, height);

//   //   const texture = productImage || dynamicTile;
//   //   if (!texture) {
//   //     ctx.drawImage(roomImage, 0, 0, width, height);
//   //     return;
//   //   }

//   //   fetch(SVG_MASK_PATH)
//   //     .then((res) => res.text())
//   //     .then((svgText) => {
//   //       const svgDoc = new DOMParser().parseFromString(svgText, "image/svg+xml");
//   //       const svgEl = svgDoc.querySelector("svg");
//   //       if (!svgEl) return;

//   //       const viewBox = svgEl.getAttribute("viewBox");
//   //       if (!viewBox) return;
//   //       const [, , svgWidth, svgHeight] = viewBox.split(" ").map(Number);
//   //       const scaleX = width / svgWidth;
//   //       const scaleY = height / svgHeight;

//   //       const floor =
//   //         svgDoc.querySelector("#floor") || svgDoc.querySelector("polygon");
//   //       if (!floor) return;

//   //       const pointsAttr = floor.getAttribute("points");
//   //       if (!pointsAttr) return;

//   //       const coords = pointsAttr.trim().split(/\s+/).map(Number);
//   //       const points: { x: number; y: number }[] = [];
//   //       for (let i = 0; i < coords.length; i += 2) {
//   //         points.push({ x: coords[i], y: coords[i + 1] });
//   //       }

//   //       console.log("Floor polygon points:", points);

//   //       if (!points.length) return;

//   //       // Load the carpet image and draw it with perspective
//   //       const image = new Image();
//   //       image.src = texture.src || texture;
//   //       image.onload = () => {
//   //         ctx.save();

//   //         // ---- Define your vanishing point (center top)
//   //         const vanishingPointX = width / 2;
//   //         const vanishingPointY = height * 0.25;

//   //         // ---- Clip to the floor polygon (scaled)
//   //         ctx.beginPath();
//   //         ctx.moveTo(points[0].x * scaleX, points[0].y * scaleY);
//   //         for (let i = 1; i < points.length; i++) {
//   //           ctx.lineTo(points[i].x * scaleX, points[i].y * scaleY);
//   //         }
//   //         ctx.closePath();
//   //         ctx.clip();

//   //         // ---- Draw the carpet with perspective ----
//   //         drawPerspectiveImage(ctx, image, vanishingPointX, vanishingPointY, width, height);

//   //         ctx.restore();

//   //         // ---- Draw semi-transparent room image on top ----
//   //         ctx.globalAlpha = 0.5;
//   //         ctx.drawImage(roomImage, 0, 0, width, height);
//   //         ctx.globalAlpha = 1.0;
//   //       };
//   //     })
//   //     .catch((err) => {
//   //       console.error("Failed to fetch or parse SVG mask:", err);
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //     });
//   // }, [dynamicTile, productImage, roomImage]);

//   // this is final work ----------------------

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   // We need both the image from useImageLoader AND the canvas
//   //   if (!canvas || !roomImage) return;

//   //   const ctx = canvas.getContext("2d");
//   //   if (!ctx) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   ctx.clearRect(0, 0, width, height);

//   //   const texture = productImage || dynamicTile;
//   //   if (!texture) {
//   //     // Fallback: draw room if no texture
//   //     ctx.drawImage(roomImage, 0, 0, width, height);
//   //     return;
//   //   }

//   //   // ---- Load SVG floor polygon ----
//   //   fetch(SVG_MASK_PATH) // <-- FIX: Fetch the new .svg file
//   //     .then((res) => res.text())
//   //     .then((svgText) => {
//   //       const svgDoc = new DOMParser().parseFromString(
//   //         svgText,
//   //         "image/svg+xml"
//   //       );

//   //       // Get the SVG element to read its viewBox
//   //       const svgEl = svgDoc.querySelector("svg");
//   //       if (!svgEl) return;

//   //       // Get the viewBox attribute (e.g., "0 0 247.36 360")
//   //       const viewBox = svgEl.getAttribute("viewBox");
//   //       if (!viewBox) return;

//   //       // Get the dimensions from the viewBox
//   //       const [, , svgWidth, svgHeight] = viewBox.split(" ").map(Number);

//   //       // --- FIX: Calculate scaling factors ---
//   //       const scaleX = width / svgWidth;
//   //       const scaleY = height / svgHeight;

//   //       // Prefer polygon with id="floor" if available
//   //       const floor =
//   //         svgDoc.querySelector("#floor") || svgDoc.querySelector("polygon");
//   //       if (!floor) return;

//   //       const pointsAttr = floor.getAttribute("points")!;
//   //       if (!pointsAttr) return;

//   //       // Parse space-separated polygon points into {x, y} array
//   //       const coords = pointsAttr.trim().split(/\s+/).map(Number);
//   //       const points: { x: number; y: number }[] = [];
//   //       for (let i = 0; i < coords.length; i += 2) {
//   //         points.push({ x: coords[i], y: coords[i + 1] });
//   //       }

//   //       if (!points.length) return;

//   //       // ---- Create texture pattern ----
//   //       const pattern = ctx.createPattern(texture, "repeat");
//   //       if (!pattern) return;

//   //       ctx.save();

//   //       // ---- Clip to polygon (with scaling) ----
//   //       ctx.beginPath();
//   //       // --- FIX: Apply scaling to all points ---
//   //       ctx.moveTo(points[0].x * scaleX, points[0].y * scaleY);
//   //       for (let i = 1; i < points.length; i++) {
//   //         ctx.lineTo(points[i].x * scaleX, points[i].y * scaleY);
//   //       }
//   //       ctx.setTransform(1, 0, 0, 0.30, 0, height * 0.65);
//   //       ctx.closePath();
//   //       ctx.clip();

//   //       console.log("Filling floor polygon with carpet texture.", points);

//   //       // ---- Fill polygon with pattern ----
//   //       // This is Step 1: Draw the carpet INSIDE the clip
//   //       ctx.fillStyle = pattern;
//   //       ctx.fillRect(0, 0, width, height);

//   //       ctx.restore();

//   //       // --- FIX: Draw the room image ONCE, at the end ---
//   //       // This is Step 2: Draw the room (with furniture) on TOP

//   //       // ✅ CRITICAL FIX: This MUST be 1.0
//   //       ctx.globalAlpha = 1;

//   //       // This `roomImage` MUST be a PNG with a transparent floor
//   //       // so the carpet from Step 1 can show through.
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //     })
//   //     .catch((err) => {
//   //       console.error("Failed to fetch or parse SVG mask:", err);
//   //       // Fallback: just draw the room if SVG fails
//   //       ctx.drawImage(roomImage, 0, 0, width, height);
//   //     });
//   // }, [dynamicTile, productImage, roomImage]);

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   if (!canvas || !roomImage) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   // Setup WebGL renderer using existing <canvas>
//   //   const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
//   //   renderer.setSize(width, height);
//   //   renderer.setClearColor(0x000000, 0); // Transparent background

//   //   const scene = new THREE.Scene();

//   //   // Camera setup — adjust fov and position for better floor look
//   //   const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
//   //   camera.position.set(0, 5, 10);
//   //   camera.lookAt(0, 0, 0);

//   //   // Light setup
//   //   const light = new THREE.DirectionalLight(0xffffff, 1);
//   //   light.position.set(0, 10, 10);
//   //   scene.add(light);

//   //   // Load carpet texture (either dynamicTile or productImage)
//   //   const textureSrc = productImage || dynamicTile;
//   //   if (!textureSrc) return;

//   //   const texture = new THREE.Texture(textureSrc);
//   //   texture.needsUpdate = true;
//   //   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//   //   texture.repeat.set(5, 5); // adjust to control repeat density

//   //   // Create a plane (floor)
//   //   const geometry = new THREE.PlaneGeometry(10, 10, 1, 1);
//   //   const material = new THREE.MeshPhongMaterial({
//   //     map: texture,
//   //     side: THREE.DoubleSide,
//   //   });

//   //   const floor = new THREE.Mesh(geometry, material);
//   //   floor.rotation.x = -Math.PI / 2; // Make it flat (horizontal)
//   //   floor.position.y = 0; // ground level
//   //   scene.add(floor);

//   //   // Render loop
//   //   renderer.render(scene, camera);

//   //   // Overlay the room image after the 3D render
//   //   const ctx2d = canvas.getContext("2d");
//   //   if (ctx2d) {
//   //     const overlay = roomImage;
//   //     ctx2d.globalAlpha = 1;
//   //     ctx2d.drawImage(overlay, 0, 0, width, height);
//   //   }

//   //   // Cleanup
//   //   return () => {
//   //     renderer.dispose();
//   //     geometry.dispose();
//   //     material.dispose();
//   //     texture.dispose();
//   //   };
//   // }, [dynamicTile, productImage, roomImage]);

//   // import { useEffect, useMemo, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import clsx from "clsx";
// // import ThreeD from "../ThreeD";
// // import Swatch from "../Swatch";
// // import broadloomData from "../../data/boardloom.json";
// // import BroadloomView from "./Boardloomview";

// // interface Product {
// //   id: string;
// //   sku: string;
// //   image: string;
// //   isNew?: boolean;
// //   colors: { code: string; label: string }[];
// //   rooms: { name: string; image: string }[];
// //   colorways: { sku: string; image: string }[];
// //   coordinates: { sku: string; image: string }[];
// // }

// // type RightTab = "Colors" | "Rooms" | "Colorways" | "Coordinates";
// // type MainTab = "swatch" | "room";

// // export default function BroadloomDetails() {
// //   const { sku } = useParams<{ sku: string }>();
// //   const [product, setProduct] = useState<Product | null>(null);
// //   const [activeTab, setActiveTab] = useState<MainTab>("swatch");
// //   const [activeRightTab, setActiveRightTab] = useState<RightTab>("Colors");

// //   const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
// //   const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
// //     null
// //   );
// //   const [appliedDesign, setAppliedDesign] = useState<string[][]>([]);
// //   const [history, setHistory] = useState<number[]>([]);
// //   const [historyIndex, setHistoryIndex] = useState<number>(-1);

// //   // --- Fetch Broadloom Product ---
// //   useEffect(() => {
// //     const found = (broadloomData.products as Product[]).find(
// //       (p) => p.sku === sku
// //     );
// //     setProduct(found || null);
// //     setSelectedColorIndex(null);
// //     setHistory([]);
// //     setHistoryIndex(-1);
// //     setActiveRightTab("Colors");
// //     setActiveTab("swatch");
// //   }, [sku]);

// //   const canGoPrev = historyIndex > 0;
// //   const canGoNext = historyIndex < history.length - 1;
// //   const filteredRooms = useMemo(
// //     () =>
// //       selectedRoom
// //         ? product?.rooms.filter((r) => r.name === selectedRoom)
// //         : product?.rooms,
// //     [selectedRoom, product]
// //   );

// //   const handleSelectColor = (idx: number) => {
// //     if (selectedColorIndex === idx) return;
// //     const newHistory = history.slice(0, historyIndex + 1).concat(idx);
// //     setHistory(newHistory);
// //     setHistoryIndex(newHistory.length - 1);
// //     setSelectedColorIndex(idx);
// //   };

// //   const navigateHistory = (direction: "prev" | "next") => {
// //     if (direction === "prev" && canGoPrev) {
// //       const newIndex = historyIndex - 1;
// //       setHistoryIndex(newIndex);
// //       setSelectedColorIndex(history[newIndex]);
// //     } else if (direction === "next" && canGoNext) {
// //       const newIndex = historyIndex + 1;
// //       setHistoryIndex(newIndex);
// //       setSelectedColorIndex(history[newIndex]);
// //     }
// //   };

// //   const resetHistory = () => {
// //     setHistory([]);
// //     setHistoryIndex(-1);
// //     setSelectedColorIndex(null);
// //   };

// //   if (!product)
// //     return (
// //       <div className="text-center py-20 text-gray-600">
// //         ❌ Broadloom product not found
// //       </div>
// //     );

// //   const TabButton = ({
// //     label,
// //     isActive,
// //     onClick,
// //   }: {
// //     label: string;
// //     isActive: boolean;
// //     onClick: () => void;
// //   }) => (
// //     <button
// //       onClick={onClick}
// //       className={clsx(
// //         "pb-3 text-xl font-semibold transition-colors",
// //         isActive ? "border-b-2 border-black text-black" : "text-gray-500"
// //       )}
// //     >
// //       {label}
// //     </button>
// //   );

// //   //   const SectionTitle = ({ title }: { title: string }) => (
// //   //     <h3 className="text-lg font-semibold mb-3">{title}</h3>
// //   //   );

// //   return (
// //     <div className="mx-auto px-6 py-24 grid md:grid-cols-5 gap-8">
// //       {/* LEFT PANEL */}
// //       <div className="md:col-span-3">
// //         {/* Top Tabs */}
// //         <div className="flex space-x-6 border-b mb-4">
// //           {(["swatch", "room"] as MainTab[]).map((tab) => (
// //             <TabButton
// //               key={tab}
// //               label={tab.charAt(0).toUpperCase() + tab.slice(1)}
// //               isActive={activeTab === tab}
// //               onClick={() => setActiveTab(tab)}
// //             />
// //           ))}
// //         </div>

// //         {/* <div className="relative h-[680px] rounded-xl shadow-lg overflow-hidden bg-gray-100">
// //           {activeTab === "swatch" ? (
// //             <Swatch
// //               baseTile={product.image}
// //               selectedTile={
// //                 selectedColorIndex !== null ? product.colors[selectedColorIndex] : null
// //               }
// //               palette={product.colors.map((c) => c.code)}
// //               onApplyToRoom={setAppliedDesign}
// //             />
// //           ) : (
// //             <ThreeD appliedDesign={appliedDesign || [[]]} />
// //           )}

// //           {product.isNew && (
// //             <span className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
// //               New
// //             </span>
// //           )}
// //         </div> */}

// //         <div className="relative h-[680px] rounded-xl shadow-lg overflow-hidden bg-gray-100">
// //           <BroadloomView />
// //         </div>
// //       </div>

// //       {/* RIGHT PANEL */}
// //       <div className="md:col-span-2 flex flex-col justify-between">
// //         <div>
// //           {/* Tabs */}
// //           <div className="flex justify-between border-b mb-6">
// //             {(
// //               ["Colors", "Rooms", "Colorways", "Coordinates"] as RightTab[]
// //             ).map((tab) => (
// //               <TabButton
// //                 key={tab}
// //                 label={tab}
// //                 isActive={activeRightTab === tab}
// //                 onClick={() => setActiveRightTab(tab)}
// //               />
// //             ))}
// //           </div>

// //           {/* Tab Contents */}
// //           <div className="min-h-fit space-y-8">
// //             {/* COLORS */}
// //             {activeRightTab === "Colors" && (
// //               <div className="grid grid-cols-4 gap-6">
// //                 {product.colors.map((c, idx) => (
// //                   <div key={idx} className="flex flex-col items-center">
// //                     <div
// //                       role="button"
// //                       aria-label={`Select color ${c.label}`}
// //                       onClick={() => handleSelectColor(idx)}
// //                       className={clsx(
// //                         "w-24 h-20 rounded-md shadow-sm cursor-pointer hover:scale-105 transition-transform",
// //                         selectedColorIndex === idx &&
// //                           "ring-4 ring-offset-2 ring-blue-950"
// //                       )}
// //                       style={{ backgroundColor: c.code }}
// //                     />
// //                     <span className="mt-2 text-sm font-medium">{c.label}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {/* ROOMS */}
// //             {activeRightTab === "Rooms" && (
// //               <>
// //                 <div className="flex flex-wrap gap-2">
// //                   {product.rooms.map((r, i) => (
// //                     <button
// //                       key={i}
// //                       onClick={() =>
// //                         setSelectedRoom((prev) =>
// //                           prev === r.name ? null : r.name
// //                         )
// //                       }
// //                       className={clsx(
// //                         "px-4 py-2 rounded-xl border text-sm font-medium",
// //                         selectedRoom === r.name
// //                           ? "bg-black text-white"
// //                           : "bg-white text-gray-700 hover:bg-gray-100"
// //                       )}
// //                     >
// //                       {r.name}
// //                     </button>
// //                   ))}
// //                 </div>

// //                 <div className="grid grid-cols-3 gap-4">
// //                   {filteredRooms?.map((room, i) => (
// //                     <button
// //                       key={i}
// //                       onClick={() => setActiveTab("room")}
// //                       className="rounded-xl border overflow-hidden"
// //                     >
// //                       <img
// //                         src={room.image}
// //                         alt={room.name}
// //                         className="w-full h-40 object-cover"
// //                       />
// //                       <div className="p-2 text-left">
// //                         <div className="text-sm font-medium">{room.name}</div>
// //                         <div className="text-sm text-gray-500">
// //                           Preview in {room.name}
// //                         </div>
// //                       </div>
// //                     </button>
// //                   ))}
// //                 </div>
// //               </>
// //             )}

// //             {/* COLORWAYS */}
// //             {activeRightTab === "Colorways" && (
// //               <div className="grid grid-cols-3 gap-4">
// //                 {product.colorways.map((c) => (
// //                   <div key={c.sku} className="flex flex-col items-center">
// //                     <img
// //                       src={c.image}
// //                       alt={c.sku}
// //                       className="w-full h-full rounded object-cover shadow"
// //                     />
// //                     <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {/* COORDINATES */}
// //             {activeRightTab === "Coordinates" && (
// //               <div className="grid grid-cols-3 gap-4">
// //                 {product.coordinates.map((c) => (
// //                   <div key={c.sku} className="flex flex-col items-center">
// //                     <img
// //                       src={c.image}
// //                       alt={c.sku}
// //                       className="w-full h-full rounded object-cover shadow"
// //                     />
// //                     <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* History Navigation */}
// //         <div className="flex items-center justify-center space-x-4 mt-6">
// //           <button
// //             onClick={() => navigateHistory("prev")}
// //             disabled={!canGoPrev}
// //             className={clsx(
// //               "w-12 h-12 flex items-center justify-center rounded-full",
// //               canGoPrev
// //                 ? "bg-gray-300 hover:bg-gray-400"
// //                 : "bg-gray-200 opacity-50 cursor-not-allowed"
// //             )}
// //           >
// //             «
// //           </button>

// //           <button
// //             onClick={resetHistory}
// //             className="px-6 py-2 rounded-md bg-gray-300 text-gray-700 font-medium hover:bg-gray-400"
// //           >
// //             Reset History
// //           </button>

// //           <button
// //             onClick={() => navigateHistory("next")}
// //             disabled={!canGoNext}
// //             className={clsx(
// //               "w-12 h-12 flex items-center justify-center rounded-full",
// //               canGoNext
// //                 ? "bg-gray-300 hover:bg-gray-400"
// //                 : "bg-gray-200 opacity-50 cursor-not-allowed"
// //             )}
// //           >
// //             »
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import { useEffect, useMemo, useRef, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import clsx from "clsx";
// // import broadloomData from "../../data/boardloom.json";
// // import { useImageLoader } from "../../hooks/boardloom/useImageLoader";
// // import { useDynamicSvgTile } from "../../hooks/boardloom/useDynamicSvgTile";
// // import type { TileColors } from "../../hooks/boardloom/types";

// // interface Product {
// //   id: string;
// //   sku: string;
// //   image: string;
// //   isNew?: boolean;
// //   colors: { code: string; label: string }[];
// //   rooms: { name: string; image: string }[];
// //   colorways: { sku: string; image: string }[];
// //   coordinates: { sku: string; image: string }[];
// // }

// // type RightTab = "Colors" | "Rooms" | "Colorways" | "Coordinates";
// // type MainTab = "swatch" | "room";

// // const ROOM_IMAGE_PATH = "/room.png";

// // export default function BroadloomDetails() {
// //   const { sku } = useParams<{ sku: string }>();
// //   const [product, setProduct] = useState<Product | null>(null);

// //   // View states
// //   const [activeTab, setActiveTab] = useState<MainTab>("swatch");
// //   const [activeRightTab, setActiveRightTab] = useState<RightTab>("Colors");
// //   const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
// //   const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
// //     null
// //   );
// //   const [view, setView] = useState<"room" | "swatch">("room");

// //   // History tracking
// //   const [history, setHistory] = useState<number[]>([]);
// //   const [historyIndex, setHistoryIndex] = useState<number>(-1);

// //   // Canvas
// //   const canvasRef = useRef<HTMLCanvasElement>(null);

// //   // Default carpet colors (you can map from product.colors too)
// //   const [colors, setColors] = useState<TileColors>({
// //     base: "#b69d78",
// //     accent1: "#d3c4a8",
// //     accent2: "#a58962",
// //   });

// //   // Hooks for dynamic texture + room image
// //   const dynamicTile = useDynamicSvgTile(colors);
// //   const roomImage = useImageLoader(ROOM_IMAGE_PATH);

// //   // Fetch product
// //   useEffect(() => {
// //     const found = (broadloomData.products as Product[]).find(
// //       (p) => p.sku === sku
// //     );
// //     setProduct(found || null);
// //     setSelectedColorIndex(null);
// //     setHistory([]);
// //     setHistoryIndex(-1);
// //     setActiveRightTab("Colors");
// //     setActiveTab("swatch");
// //   }, [sku]);

// //   const canGoPrev = historyIndex > 0;
// //   const canGoNext = historyIndex < history.length - 1;

// //   const filteredRooms = useMemo(
// //     () =>
// //       selectedRoom
// //         ? product?.rooms.filter((r) => r.name === selectedRoom)
// //         : product?.rooms,
// //     [selectedRoom, product]
// //   );

// //   // Select color & update history
// //   const handleSelectColor = (idx: number) => {
// //     if (selectedColorIndex === idx) return;
// //     const newHistory = history.slice(0, historyIndex + 1).concat(idx);
// //     setHistory(newHistory);
// //     setHistoryIndex(newHistory.length - 1);
// //     setSelectedColorIndex(idx);

// //     // Update carpet color dynamically
// //     if (product) {
// //       const colorCode = product.colors[idx]?.code;
// //       setColors({
// //         base: colorCode || "#b69d78",
// //         accent1: "#d3c4a8",
// //         accent2: "#a58962",
// //       });
// //     }
// //   };

// //   const navigateHistory = (direction: "prev" | "next") => {
// //     if (direction === "prev" && canGoPrev) {
// //       const newIndex = historyIndex - 1;
// //       setHistoryIndex(newIndex);
// //       setSelectedColorIndex(history[newIndex]);
// //     } else if (direction === "next" && canGoNext) {
// //       const newIndex = historyIndex + 1;
// //       setHistoryIndex(newIndex);
// //       setSelectedColorIndex(history[newIndex]);
// //     }
// //   };

// //   const resetHistory = () => {
// //     setHistory([]);
// //     setHistoryIndex(-1);
// //     setSelectedColorIndex(null);
// //   };

// //   // 🎨 Canvas Drawing
// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;
// //     const ctx = canvas.getContext("2d");
// //     if (!ctx) return;

// //     const width = canvas.width;
// //     const height = canvas.height;

// //     ctx.clearRect(0, 0, width, height);

// //     // Draw carpet roll texture
// //     if (dynamicTile) {
// //       const pattern = ctx.createPattern(dynamicTile, "repeat");
// //       if (pattern) {
// //         ctx.fillStyle = pattern;
// //         ctx.fillRect(0, 0, width, height);
// //       }
// //     }

// //     // Room overlay view
// //     if (view === "room" && roomImage) {
// //       ctx.globalAlpha = 0.9;
// //       ctx.drawImage(roomImage, 0, 0, width, height);
// //       ctx.globalAlpha = 1;
// //     }

// //     // Carpet roll edge shading (for full-roll view)
// //     if (view === "swatch") {
// //       ctx.fillStyle = "rgba(0,0,0,0.15)";
// //       ctx.fillRect(width - 40, 0, 40, height);
// //       ctx.fillStyle = "rgba(255,255,255,0.4)";
// //       ctx.fillRect(width - 45, 0, 5, height);
// //     }
// //   }, [dynamicTile, roomImage, view]);

// //   if (!product)
// //     return (
// //       <div className="text-center py-20 text-gray-600">
// //         ❌ Broadloom product not found
// //       </div>
// //     );

// //   const TabButton = ({
// //     label,
// //     isActive,
// //     onClick,
// //   }: {
// //     label: string;
// //     isActive: boolean;
// //     onClick: () => void;
// //   }) => (
// //     <button
// //       onClick={onClick}
// //       className={clsx(
// //         "pb-3 text-xl font-semibold transition-colors",
// //         isActive ? "border-b-2 border-black text-black" : "text-gray-500"
// //       )}
// //     >
// //       {label}
// //     </button>
// //   );

// //   // ------------------------------------------------------
// //   // 💠 MAIN LAYOUT
// //   // ------------------------------------------------------
// //   return (
// //     <div className="mx-auto px-6 py-24 grid md:grid-cols-5 gap-8">
// //       {/* LEFT PANEL */}
// //       <div className="md:col-span-3">
// //         {/* Top Tabs */}
// //         <div className="flex space-x-6 border-b mb-4">
// //           {(["swatch", "room"] as MainTab[]).map((tab) => (
// //             <TabButton
// //               key={tab}
// //               label={tab.charAt(0).toUpperCase() + tab.slice(1)}
// //               isActive={activeTab === tab}
// //               onClick={() => {
// //                 setActiveTab(tab);
// //                 setView(tab);
// //               }}
// //             />
// //           ))}
// //         </div>

// //         {/* Canvas Display */}
// //         <div className="relative h-[680px] rounded-xl shadow-lg overflow-hidden bg-gray-100 flex flex-col items-center justify-center">
// //           <canvas
// //             ref={canvasRef}
// //             width={900}
// //             height={400}
// //             className=" w-full h-full scale-120 object-bottom-right"
// //           ></canvas>
// //         </div>
// //       </div>

// //       {/* RIGHT PANEL */}
// //       <div className="md:col-span-2 flex flex-col justify-between">
// //         <div>
// //           {/* Right-side Tabs */}
// //           <div className="flex justify-between border-b mb-6">
// //             {(
// //               ["Colors", "Rooms", "Colorways", "Coordinates"] as RightTab[]
// //             ).map((tab) => (
// //               <TabButton
// //                 key={tab}
// //                 label={tab}
// //                 isActive={activeRightTab === tab}
// //                 onClick={() => setActiveRightTab(tab)}
// //               />
// //             ))}
// //           </div>

// //           {/* Tab Contents */}
// //           <div className="min-h-fit space-y-8">
// //             {/* COLORS */}
// //             {activeRightTab === "Colors" && (
// //               <div className="grid grid-cols-4 gap-6">
// //                 {product.colors.map((c, idx) => (
// //                   <div key={idx} className="flex flex-col items-center">
// //                     <div
// //                       onClick={() => handleSelectColor(idx)}
// //                       className={clsx(
// //                         "w-24 h-20 rounded-md shadow-sm cursor-pointer hover:scale-105 transition-transform",
// //                         selectedColorIndex === idx &&
// //                           "ring-4 ring-offset-2 ring-blue-950"
// //                       )}
// //                       style={{ backgroundColor: c.code }}
// //                     />
// //                     <span className="mt-2 text-sm font-medium">{c.label}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {/* ROOMS */}
// //             {activeRightTab === "Rooms" && (
// //               <>
// //                 <div className="flex flex-wrap gap-2">
// //                   {product.rooms.map((r, i) => (
// //                     <button
// //                       key={i}
// //                       onClick={() =>
// //                         setSelectedRoom((prev) =>
// //                           prev === r.name ? null : r.name
// //                         )
// //                       }
// //                       className={clsx(
// //                         "px-4 py-2 rounded-xl border text-sm font-medium",
// //                         selectedRoom === r.name
// //                           ? "bg-black text-white"
// //                           : "bg-white text-gray-700 hover:bg-gray-100"
// //                       )}
// //                     >
// //                       {r.name}
// //                     </button>
// //                   ))}
// //                 </div>

// //                 <div className="grid grid-cols-3 gap-4">
// //                   {filteredRooms?.map((room, i) => (
// //                     <button
// //                       key={i}
// //                       onClick={() => setView("room")}
// //                       className="rounded-xl border overflow-hidden"
// //                     >
// //                       <img
// //                         src={room.image}
// //                         alt={room.name}
// //                         className="w-full h-40 object-cover"
// //                       />
// //                       <div className="p-2 text-left">
// //                         <div className="text-sm font-medium">{room.name}</div>
// //                         <div className="text-sm text-gray-500">
// //                           Preview in {room.name}
// //                         </div>
// //                       </div>
// //                     </button>
// //                   ))}
// //                 </div>
// //               </>
// //             )}

// //             {/* COLORWAYS */}
// //             {activeRightTab === "Colorways" && (
// //               <div className="grid grid-cols-3 gap-4">
// //                 {product.colorways.map((c) => (
// //                   <div key={c.sku} className="flex flex-col items-center">
// //                     <img
// //                       src={c.image}
// //                       alt={c.sku}
// //                       className="w-full h-full rounded object-cover shadow"
// //                     />
// //                     <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {/* COORDINATES */}
// //             {activeRightTab === "Coordinates" && (
// //               <div className="grid grid-cols-3 gap-4">
// //                 {product.coordinates.map((c) => (
// //                   <div key={c.sku} className="flex flex-col items-center">
// //                     <img
// //                       src={c.image}
// //                       alt={c.sku}
// //                       className="w-full h-full rounded object-cover shadow"
// //                     />
// //                     <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* History Navigation */}
// //         <div className="flex items-center justify-center space-x-4 mt-6">
// //           <button
// //             onClick={() => navigateHistory("prev")}
// //             disabled={!canGoPrev}
// //             className={clsx(
// //               "w-12 h-12 flex items-center justify-center rounded-full",
// //               canGoPrev
// //                 ? "bg-gray-300 hover:bg-gray-400"
// //                 : "bg-gray-200 opacity-50 cursor-not-allowed"
// //             )}
// //           >
// //             «
// //           </button>

// //           <button
// //             onClick={resetHistory}
// //             className="px-6 py-2 rounded-md bg-gray-300 text-gray-700 font-medium hover:bg-gray-400"
// //           >
// //             Reset History
// //           </button>

// //           <button
// //             onClick={() => navigateHistory("next")}
// //             disabled={!canGoNext}
// //             className={clsx(
// //               "w-12 h-12 flex items-center justify-center rounded-full",
// //               canGoNext
// //                 ? "bg-gray-300 hover:bg-gray-400"
// //                 : "bg-gray-200 opacity-50 cursor-not-allowed"
// //             )}
// //           >
// //             »
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // looks more clear 

// //   useEffect(() => {
// //   const canvas = roomCanvasRef.current;
// //   if (!canvas || !roomImage) {
// //     console.warn("roomCanvas or roomImage missing");
// //     return;
// //   }

// //   // Use displayed size + DPR for crispness
// //   const dpr = Math.max(1, window.devicePixelRatio || 1);
// //   const displayWidth = canvas.clientWidth || canvas.width;
// //   const displayHeight = canvas.clientHeight || canvas.height;
// //   canvas.width = Math.round(displayWidth * dpr);
// //   canvas.height = Math.round(displayHeight * dpr);

// //   // THREE renderer
// //   const renderer = new THREE.WebGLRenderer({
// //     canvas,
// //     alpha: true,
// //     antialias: true,
// //   });
// //   renderer.setPixelRatio(dpr);
// //   renderer.setSize(displayWidth, displayHeight, false); // use CSS size
// //   renderer.setClearColor(0x000000, 0); // transparent

// //   const scene = new THREE.Scene();

// //   // Camera (keep your FOV but set aspect)
// //   const camera = new THREE.PerspectiveCamera(65, displayWidth / displayHeight, 0.1, 1000);
// //   camera.position.set(0, 4, 16);
// //   camera.lookAt(0, 0, 0);

// //   // Light
// //   const light = new THREE.DirectionalLight(0xffffff, 1.5);
// //   light.position.set(0, 3, 3);
// //   scene.add(light);

// //   // Validate texture source
// //   const textureSrc = productImage || dynamicTile;
// //   if (!textureSrc) {
// //     console.warn("no carpet texture source");
// //     renderer.dispose();
// //     return;
// //   }

// //   // Helper to create a THREE.Texture from either HTMLImageElement or canvas/string
// //   const createTextureFromSource = (src: HTMLImageElement | HTMLCanvasElement | string) => {
// //     // If src is an already-loaded HTMLImageElement or canvas, use THREE.Texture
// //     if (src instanceof HTMLImageElement || src instanceof HTMLCanvasElement) {
// //       const t = new THREE.Texture(src);
// //       t.needsUpdate = true;
// //       return Promise.resolve(t);
// //     }
// //     // If src is a string (URL/dataURI) use TextureLoader
// //     return new Promise<THREE.Texture>((resolve, reject) => {
// //       const loader = new THREE.TextureLoader();
// //       loader.crossOrigin = ""; // allow CORS if needed
// //       loader.load(
// //         src as string,
// //         (tex) => {
// //           resolve(tex);
// //         },
// //         undefined,
// //         (err) => reject(err)
// //       );
// //     });
// //   };

// //   // create carpet texture (supports HTMLImageElement or dynamicTile canvas/dataURI)
// //   let carpetTexturePromise: Promise<THREE.Texture>;
// //   if (textureSrc instanceof HTMLImageElement || textureSrc instanceof HTMLCanvasElement) {
// //     carpetTexturePromise = createTextureFromSource(textureSrc);
// //   } else {
// //     // dynamicTile might be a data URL string — try loader
// //     carpetTexturePromise = createTextureFromSource(textureSrc as any);
// //   }

// //   // room overlay texture (SVG/PNG)
// //   const overlayTexturePromise = new Promise<THREE.Texture>((resolve, reject) => {
// //     const loader = new THREE.TextureLoader();
// //     loader.crossOrigin = "";
// //     loader.load(
// //       SVG_MASK_PATH,
// //       (tex) => resolve(tex),
// //       undefined,
// //       (err) => {
// //         console.error("overlay texture load error", err);
// //         reject(err);
// //       }
// //     );
// //   });

// //   let disposed = false;
// //   Promise.all([carpetTexturePromise, overlayTexturePromise])
// //     .then(([carpetTexture, overlayTexture]) => {
// //       if (disposed) {
// //         // If component unmounted while loading
// //         carpetTexture.dispose();
// //         overlayTexture.dispose();
// //         return;
// //       }

// //       // Carpet texture configuration
// //       carpetTexture.wrapS = carpetTexture.wrapT = THREE.RepeatWrapping;
// //       carpetTexture.repeat.set(4, 4);
// //       carpetTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

// //       // Floor as large plane (your original)
// //       const floorGeometry = new THREE.PlaneGeometry(20, 20);
// //       const floorMaterial = new THREE.MeshPhongMaterial({
// //         map: carpetTexture,
// //         side: THREE.DoubleSide,
// //       });
// //       const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// //       floor.rotation.x = -Math.PI / 2;
// //       floor.position.y = 0;
// //       scene.add(floor);

// //       // Overlay texture config
// //       overlayTexture.wrapS = overlayTexture.wrapT = THREE.ClampToEdgeWrapping;
// //       overlayTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

// //       // Determine overlay plane size to preserve overlay aspect ratio
// //       const overlayImageWidth = overlayTexture.image?.width || displayWidth;
// //       const overlayImageHeight = overlayTexture.image?.height || displayHeight;
// //       const overlayAspect = overlayImageWidth / overlayImageHeight;

// //       // Choose plane height in world units (tweak as needed)
// //       const overlayPlaneHeight = 12; // world units
// //       const overlayPlaneWidth = overlayPlaneHeight * overlayAspect;

// //       const overlayGeometry = new THREE.PlaneGeometry(overlayPlaneWidth, overlayPlaneHeight);
// //       const overlayMaterial = new THREE.MeshBasicMaterial({
// //         map: overlayTexture,
// //         transparent: true,
// //         depthTest: false, // draw on top
// //       });

// //       const overlayMesh = new THREE.Mesh(overlayGeometry, overlayMaterial);
// //       // place overlay slightly above floor so depthTest false still draws above
// //       overlayMesh.rotation.x = -Math.PI / 2;
// //       overlayMesh.position.y = 0.01;
// //       overlayMesh.position.z = 0; // in front of camera's origin
// //       scene.add(overlayMesh);

// //       // If you want the overlay to exactly cover the camera view, you can position it further away:
// //       // overlayMesh.position.z = -10; // then adjust camera to look at it if needed

// //       // Final render
// //       renderer.render(scene, camera);

// //       // cleanup closure values so outer cleanup can dispose geometry/materials
// //       (renderer as any).__cleanup = () => {
// //         scene.remove(floor);
// //         floorGeometry.dispose();
// //         floorMaterial.dispose();
// //         carpetTexture.dispose();

// //         scene.remove(overlayMesh);
// //         overlayGeometry.dispose();
// //         overlayMaterial.dispose();
// //         overlayTexture.dispose();
// //       };
// //     })
// //     .catch((err) => {
// //       console.error("texture load error:", err);
// //       // still attempt a minimal render to show floor texture if available
// //     });

// //   // cleanup
// //   return () => {
// //     disposed = true;
// //     // call any created cleanup
// //     try {
// //       const cleanup = (renderer as any).__cleanup;
// //       if (typeof cleanup === "function") cleanup();
// //     } catch (e) {
// //       /* ignore */
// //     }
// //     renderer.dispose();
// //   };
// // }, [dynamicTile, productImage, roomImage]);



// import { useEffect, useMemo, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import clsx from "clsx";
// import broadloomData from "../../data/boardloom.json";
// import { useImageLoader } from "../../hooks/boardloom/useImageLoader";
// import { useDynamicSvgTile } from "../../hooks/boardloom/useDynamicSvgTile";
// import type { TileColors } from "../../hooks/boardloom/types";
// import * as THREE from "three";

// interface Product {
//   id: string;
//   sku: string;
//   image: string;
//   isNew?: boolean;
//   colors: { code: string; label: string }[];
//   rooms: { name: string; image: string }[];
//   colorways: { sku: string; image: string }[];
//   coordinates: { sku: string; image: string }[];
// }

// type RightTab = "Colors" | "Rooms" | "Colorways" | "Coordinates";
// type MainTab = "swatch" | "room";

// const SVG_MASK_PATH = "/room8.svg";

// export default function BroadloomDetails() {
//   const { sku } = useParams<{ sku: string }>();
//   const [product, setProduct] = useState<Product | null>(null);

//   // View states
//   const [activeTab, setActiveTab] = useState<MainTab>("swatch");
//   const [activeRightTab, setActiveRightTab] = useState<RightTab>("Colors");
//   const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
//   const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
//     null
//   );
//   const [view, setView] = useState<"room" | "swatch">("room");

//   // History tracking
//   const [history, setHistory] = useState<number[]>([]);
//   const [historyIndex, setHistoryIndex] = useState<number>(-1);

//   // Canvas & texture states
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [productImage, setProductImage] = useState<HTMLImageElement | null>(
//     null
//   );

//   const swatchCanvasRef = useRef<HTMLCanvasElement>(null);
//   const roomCanvasRef = useRef<HTMLCanvasElement>(null);

//   // Default carpet colors
//   const [colors, setColors] = useState<TileColors>({
//     base: "#b69d78",
//     accent1: "#d3c4a8",
//     accent2: "#a58962",
//   });

//   // Hooks for dynamic texture + room image
//   const dynamicTile = useDynamicSvgTile(colors);
//   const roomImage = useImageLoader(SVG_MASK_PATH);

//   // Fetch product
//   useEffect(() => {
//     const found = (broadloomData.products as Product[]).find(
//       (p) => p.sku === sku
//     );
//     setProduct(found || null);
//     setSelectedColorIndex(null);
//     setHistory([]);
//     setHistoryIndex(-1);
//     setActiveRightTab("Colors");
//     setActiveTab("swatch");
//   }, [sku]);

//   // Load the actual carpet image as a texture
//   useEffect(() => {
//     if (!product?.image) return;
//     const img = new Image();
//     img.src = product.image;
//     img.onload = () => setProductImage(img);
//   }, [product]);

//   const canGoPrev = historyIndex > 0;
//   const canGoNext = historyIndex < history.length - 1;

//   const filteredRooms = useMemo(
//     () =>
//       selectedRoom
//         ? product?.rooms.filter((r) => r.name === selectedRoom)
//         : product?.rooms,
//     [selectedRoom, product]
//   );

//   // Select color & update history
//   const handleSelectColor = (idx: number) => {
//     if (selectedColorIndex === idx) return;
//     const newHistory = history.slice(0, historyIndex + 1).concat(idx);
//     setHistory(newHistory);
//     setHistoryIndex(newHistory.length - 1);
//     setSelectedColorIndex(idx);

//     // Update carpet color dynamically
//     if (product) {
//       const colorCode = product.colors[idx]?.code;
//       setColors({
//         base: colorCode || "#b69d78",
//         accent1: "#d3c4a8",
//         accent2: "#a58962",
//       });
//     }
//   };

//   const navigateHistory = (direction: "prev" | "next") => {
//     if (direction === "prev" && canGoPrev) {
//       const newIndex = historyIndex - 1;
//       setHistoryIndex(newIndex);
//       setSelectedColorIndex(history[newIndex]);
//     } else if (direction === "next" && canGoNext) {
//       const newIndex = historyIndex + 1;
//       setHistoryIndex(newIndex);
//       setSelectedColorIndex(history[newIndex]);
//     }
//   };

//   const resetHistory = () => {
//     setHistory([]);
//     setHistoryIndex(-1);
//     setSelectedColorIndex(null);
//   };

//   // 🎨 Canvas Drawing — Carpet Roll / Room
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const width = canvas.width;
//     const height = canvas.height;

//     ctx.clearRect(0, 0, width, height);

//     const texture = productImage || dynamicTile;

//     // 🧵 Draw repeated carpet roll
//     if (texture) {
//       const pattern = ctx.createPattern(texture, "repeat");
//       if (pattern) {
//         ctx.fillStyle = pattern;
//         ctx.fillRect(0, 0, width, height);
//       }
//     }

//     // 🏠 Overlay room image (for "room" view)
//     if (view === "room" && roomImage) {
//       ctx.globalAlpha = 0.9;
//       ctx.drawImage(roomImage, 0, 0, width, height);
//       ctx.globalAlpha = 1;
//     }

//     // 🎨 Carpet roll edge shading (for "swatch" view)
//     if (view === "swatch") {
//       ctx.fillStyle = "rgba(0,0,0,0.15)";
//       ctx.fillRect(width - 40, 0, 40, height);
//       ctx.fillStyle = "rgba(255,255,255,0.4)";
//       ctx.fillRect(width - 45, 0, 5, height);
//     }
//   }, [dynamicTile, roomImage, productImage, view]);

//   //   NEW CODE BELOW

//   // Canvas Drawing — Carpet Roll (swatch)
//   useEffect(() => {
//     const canvas = swatchCanvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const width = canvas.width;
//     const height = canvas.height;

//     ctx.clearRect(0, 0, width, height);

//     const texture = productImage || dynamicTile;

//     if (texture) {
//       const pattern = ctx.createPattern(texture, "repeat");
//       if (pattern) {
//         ctx.fillStyle = pattern;
//         ctx.fillRect(0, 0, width, height);
//       }
//     }

//     // Carpet roll edge shading for swatch
//     ctx.fillStyle = "rgba(0,0,0,0.0)";
//     ctx.fillRect(width, 0, 0, height);
//     ctx.fillStyle = "rgba(255,255,255,0.4)";
//     ctx.fillRect(width, 0, 0, height);
//   }, [dynamicTile, productImage]);

//   // // Canvas Drawing — Room View with carpet texture

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   if (!canvas || !roomImage) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   // ⚡ Use a single WebGL renderer (no 2D mixing)
//   //   const renderer = new THREE.WebGLRenderer({
//   //     canvas,
//   //     alpha: true,
//   //     antialias: true,
//   //   });
//   //   renderer.setSize(width, height);
//   //   renderer.setClearColor(0xfffff, 0); // Transparent background

//   //   // 🎥 Scene setup
//   //   const scene = new THREE.Scene();

//   //   // 📸 Perspective camera — you can tune this angle
//   //   const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
//   //   camera.position.set(0, 4, 8);
//   //   camera.lookAt(0, 0, 0);
//   //   scene.add(camera);

//   //   // 💡 Lighting
//   //   const light = new THREE.DirectionalLight(0xffffff, 1);
//   //   light.position.set(0, 10, 10);
//   //   scene.add(light);

//   //   // 🧶 Carpet texture setup
//   //   const textureSrc = productImage || dynamicTile;
//   //   if (!textureSrc) return;

//   //   // Convert image source to THREE texture
//   //   const texture = new THREE.Texture(textureSrc);
//   //   texture.needsUpdate = true;

//   //   // ❌ No repeat — show it as one stretched carpet
//   //   texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//   //   texture.repeat.set(1, 1);

//   //   // 🧱 Create a single carpet plane
//   //   const geometry = new THREE.PlaneGeometry(10, 8); // wider plane for floor
//   //   const material = new THREE.MeshPhongMaterial({
//   //     map: texture,
//   //     side: THREE.DoubleSide,
//   //   });

//   //   const floor = new THREE.Mesh(geometry, material);
//   //   floor.rotation.x = -Math.PI / 2; // lay flat
//   //   floor.position.y = 0;
//   //   scene.add(floor);

//   //   // 🖼️ Room background — make it a large rectangle behind everything
//   //   const roomTexture = new THREE.Texture(roomImage);
//   //   roomTexture.needsUpdate = true;

//   //   const roomMaterial = new THREE.MeshBasicMaterial({
//   //     map: roomTexture,
//   //     transparent: true,
//   //     depthTest: false, // ensures it's drawn behind the carpet
//   //   });

//   //   // const roomPlane = new THREE.Mesh(
//   //   //   new THREE.PlaneGeometry(12, 9),
//   //   //   roomMaterial
//   //   // );
//   //   // roomPlane.position.z = 1; // slightly behind carpet
//   //   // roomPlane.position.y = 1; // lift it so floor aligns better
//   //   // scene.add(roomPlane);

//   //   const aspect = roomImage.width / roomImage.height;
//   //   const planeHeight = 5;
//   //   const planeWidth = planeHeight * aspect;

//   //   const roomPlane = new THREE.Mesh(
//   //     new THREE.PlaneGeometry(planeWidth, planeHeight),
//   //     roomMaterial
//   //   );
//   //   roomPlane.position.z = -5; // further back
//   //   roomPlane.position.y = planeHeight / 2; // align bottom
//   //   scene.add(roomPlane);

//   //   // 🔁 Render once (or make it animate)
//   //   renderer.render(scene, camera);

//   //   // ♻️ Cleanup
//   //   return () => {
//   //     renderer.dispose();
//   //     geometry.dispose();
//   //     material.dispose();
//   //     texture.dispose();
//   //     roomTexture.dispose();
//   //   };
//   // }, [dynamicTile, productImage, roomImage]);

//   // useEffect(() => {
//   //   const canvas = roomCanvasRef.current;
//   //   // We need roomImage to be loaded, but we DON'T render it here
//   //   if (!canvas || !roomImage) return;

//   //   const width = canvas.width;
//   //   const height = canvas.height;

//   //   // Setup WebGL renderer
//   //   const renderer = new THREE.WebGLRenderer({
//   //     canvas,
//   //     alpha: true, // Transparent background
//   //     antialias: true,
//   //   });
//   //   renderer.setSize(width, height);
//   //   renderer.setClearColor(0x000000, 0); // Fully transparent

//   //   const scene = new THREE.Scene();

//   //   // --- 💡 TWEAK CAMERA ---
//   //   // This is the most important part. You must position this
//   //   // to match the perspective of your room.png
//   //   const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
//   //   camera.position.set(0, 3, 5); // Start lower and closer
//   //   camera.lookAt(0, 0, 0); // Look at the center of the floor

//   //   // Light setup
//   //   const light = new THREE.AmbientLight(0xffffff, 1.2); // Brighter ambient light
//   //   scene.add(light);

//   //   // --- ✅ FIXED TEXTURE LOADING ---
//   //   const textureSrc = productImage || dynamicTile;
//   //   if (!textureSrc) return;

//   //   const textureLoader = new THREE.TextureLoader();
//   //   let texture: THREE.Texture;

//   //   if (productImage) {
//   //     // Case 1: We have an already-loaded HTMLImageElement
//   //     texture = new THREE.Texture(productImage);
//   //     texture.needsUpdate = true;
//   //   } else {
//   //     // Case 2: We have a string (data URI) from dynamicTile
//   //     texture = textureLoader.load(SVG_MASK_PATH as string);
//   //   }

//   //   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//   //   // 💡 TWEAK REPEAT (e.g., 4x4)
//   //   texture.repeat.set(4, 4);

//   //   // --- 💡 TWEAK GEOMETRY ---
//   //   // Create a plane (floor). Make it larger to fill the view.
//   //   const geometry = new THREE.PlaneGeometry(20, 20);
//   //   const material = new THREE.MeshBasicMaterial({
//   //     // MeshBasicMaterial doesn't need lights
//   //     map: texture,
//   //   });

//   //   const floor = new THREE.Mesh(geometry, material);
//   //   floor.rotation.x = -Math.PI / 2; // Make it flat (horizontal)
//   //   floor.position.y = 0; // 💡 TWEAK this to move floor up/down
//   //   scene.add(floor);

//   //   // Render the 3D scene
//   //   renderer.render(scene, camera);

//   //   // --- ❌ REMOVED: All 2D context or roomPlane logic ---

//   //   // Cleanup
//   //   return () => {
//   //     renderer.dispose();
//   //     geometry.dispose();
//   //     material.dispose();
//   //     texture.dispose();
//   //   };
//   // }, [dynamicTile, productImage, roomImage]);

//   // Room Canvas (Three.js)
//   useEffect(() => {
//     const canvas = roomCanvasRef.current;
//     if (!canvas || !roomImage) return;

//     const width = canvas.width;
//     const height = canvas.height;

//     const renderer = new THREE.WebGLRenderer({
//       canvas,
//       alpha: true,
//       antialias: true,
//     });
//     // renderer.setSize(width, height);
//     // renderer.setClearColor(0x000000, 0);

//     const scene = new THREE.Scene();

//     // Camera
//     const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
//     camera.fov = 60; 
//     camera.position.set(0, 4, 16);
//     camera.lookAt(0, 4, 16);
// camera.updateProjectionMatrix();

//     scene.add(new THREE.AmbientLight(0xffffff, 1.2));
//     // Light
//     // const light = new THREE.DirectionalLight(0xffffff, 1.5);
//     // light.position.set(12, 12, 12);
//     // scene.add(light);

//     const keyLight = new THREE.DirectionalLight(0xffe6c9, 0.4);
// keyLight.position.set(0, 10, 10);
// scene.add(keyLight);

//     // Carpet texture
//     const textureSrc = productImage || dynamicTile;
//     if (!textureSrc) return;

//     const carpetTexture = new THREE.Texture(textureSrc);
//     carpetTexture.needsUpdate = true;
//     carpetTexture.wrapS = carpetTexture.wrapT = THREE.RepeatWrapping;
//     carpetTexture.repeat.set(3, 3);

//     carpetTexture.colorSpace = THREE.SRGBColorSpace;
//     carpetTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
//     carpetTexture.magFilter = THREE.LinearFilter;
//     carpetTexture.minFilter = THREE.LinearMipmapLinearFilter;


//     // const floorPoints = [
//     //   new THREE.Vector2(-6, -3), // bottom left
//     //   new THREE.Vector2(6, -3), // bottom right
//     //   new THREE.Vector2(8, 1), // upper right
//     //   new THREE.Vector2(-8, 1), // upper left
//     // ];
//     // const floorShape = new THREE.Shape(floorPoints);
//     // const floorGeometry = new THREE.ShapeGeometry(floorShape);

//     // const floorMaterial = new THREE.MeshPhongMaterial({
//     //   map: carpetTexture,
//     //   side: THREE.DoubleSide,
//     // });

//     // const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//     // floor.rotation.x = -Math.PI / 2;
//     // floor.position.y = 0;
//     // scene.add(floor);

//     const floorGeometry = new THREE.PlaneGeometry(20, 20);
//      floorGeometry.setAttribute("uv2", new THREE.BufferAttribute(floorGeometry.attributes.uv.array, 2));

//     // const floorMaterial = new THREE.MeshPhongMaterial({
//     //   map: carpetTexture,
//     //   side: THREE.DoubleSide,
//     // });
//     const floorMaterial = new THREE.MeshStandardMaterial({
//     map: carpetTexture,
//     roughness: 0.88,
//     metalness: -2,
//     aoMap: carpetTexture,
//     aoMapIntensity: 0.35,
//     opacity: 2,
//     transparent: true,
//   });


//     const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//     floor.rotation.x = -Math.PI / 2;
//     floor.position.y = 0;
//     scene.add(floor);

//     renderer.render(scene, camera);

//     // // --- 5. RESIZE HANDLER ---
//     // // This updates the scene if the window size changes
//     // const handleResize = () => {
//     //   // Check if canvas is still mounted
//     //   if (!roomCanvasRef.current) return;
      
//     //   const { clientWidth: newWidth, clientHeight: newHeight } = roomCanvasRef.current;

//     //   if (newWidth === 0 || newHeight === 0) return;

//     //   // Update renderer
//     //   renderer.setSize(newWidth, newHeight);

//     //   // Update camera
//     //   camera.aspect = newWidth / newHeight;
//     //   camera.updateProjectionMatrix();

//     //   // Re-render
//     //   renderer.render(scene, camera);
//     // };

//     // window.addEventListener("resize", handleResize);

//     // // --- 6. CLEANUP ---
//     // return () => {
//     //   window.removeEventListener("resize", handleResize);
//     //   renderer.dispose();
//     //   floorGeometry.dispose();
//     //   floorMaterial.dispose();
//     //   carpetTexture.dispose();
//     // };

//     return () => {
//       renderer.dispose();
//       floorGeometry.dispose();
//       floorMaterial.dispose();
//       carpetTexture.dispose();
//       // roomTexture.dispose();
//     };
//   }, [dynamicTile, productImage, roomImage]);



 

//   if (!product)
//     return (
//       <div className="text-center py-20 text-gray-600">
//         ❌ Broadloom product not found
//       </div>
//     );

//   const TabButton = ({
//     label,
//     isActive,
//     onClick,
//   }: {
//     label: string;
//     isActive: boolean;
//     onClick: () => void;
//   }) => (
//     <button
//       onClick={onClick}
//       className={clsx(
//         "pb-1 text-md font-semibold transition-colors",
//         isActive ? "border-b-4 border-black text-black" : "text-gray-500"
//       )}
//     >
//       {label}
//     </button>
//   );

//   // ------------------------------------------------------
//   // 💠 MAIN LAYOUT
//   // ------------------------------------------------------
//   return (
//     <div className="mx-auto px-6 pt-24 grid md:grid-cols-5 gap-4">
//       {/* LEFT PANEL */}
//       <div className="md:col-span-3">
//         {/* Top Tabs */}
//         <div className="flex space-x-6 border-b justify-between mb-4">
//           <div className=" flex items-center gap-3">
//             {(["swatch", "room"] as MainTab[]).map((tab) => (
//               <TabButton
//                 key={tab}
//                 label={tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 isActive={activeTab === tab}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   setView(tab);
//                 }}
//               />
//             ))}
//           </div>
//           <div className=" flex gap-3 text-sm">
//             <p>144" x 198" |</p>
//             <p>Colorpoint</p>
//             <p></p>
//           </div>
//         </div>
//         <div className="relative h-full  shadow-lg overflow-hidden bg-gray-100 flex flex-col items-center justify-center">
//           <canvas
//             ref={swatchCanvasRef}
//             width={1440}
//             height={1980}
//             className={clsx(
//               "w-full h-full scale-100 object-cover object-bottom-left transition-opacity",
//               activeTab === "swatch"
//                 ? "opacity-100"
//                 : "opacity-0 absolute top-0 left-0"
//             )}
//           />

//           <div
//             className={clsx(
//               " relative h-screen w-full transition-opacity",
//               activeTab === "room"
//                 ? " opacity-100"
//                 : "opacity- hidden absolute top-0 left-0"
//             )}
//           >
//             <canvas
//               ref={roomCanvasRef}
//               width={1440}
//               height={1980}
//               className={clsx(
//                 "w-full h-screen scale-100 object-cover object-bottom-left transition-opacity",
//                 activeTab === "room"
//                   ? " opacity-100"
//                   : "opacity-0 absolute top-0 left-0"
//               )}
//             />
//             <img
//               src={SVG_MASK_PATH}
//               alt="Room Overlay"
//               className="absolute -top-24 left-0 w-full h-screen pointer-events-none"
//             />
//           </div>
//         </div>

//       </div>

//       {/* RIGHT PANEL */}
//       <div className="md:col-span-2 flex flex-col justify-between">
//         <div>
//           {/* Right-side Tabs */}
//           <div className="flex justify-between border-b mb-6">
//             {(
//               ["Colors", "Rooms", "Colorways", "Coordinates"] as RightTab[]
//             ).map((tab) => (
//               <TabButton
//                 key={tab}
//                 label={tab}
//                 isActive={activeRightTab === tab}
//                 onClick={() => setActiveRightTab(tab)}
//               />
//             ))}
//           </div>

//           {/* Tab Contents */}
//           <div className="min-h-fit space-y-8">
//             {/* COLORS */}
//             {activeRightTab === "Colors" && (
//               <>
//                 <div className="grid grid-cols-4 gap-6">
//                   {product.colors.map((c, idx) => (
//                     <div key={idx} className="flex flex-col items-center ">
//                       <div
//                         onClick={() => handleSelectColor(idx)}
//                         className={clsx(
//                           "w-24 h-20  shadow-sm cursor-pointer hover:scale-105 transition-transform",
//                           selectedColorIndex === idx &&
//                             "ring-4 ring-offset-2 ring-blue-950"
//                         )}
//                         style={{ backgroundColor: c.code }}
//                       />
//                       <span className="mt-2 text-sm font-medium">
//                         {c.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* History Navigation */}
//                 <div className="flex items-center justify-center space-x-4">
//                   <button
//                     onClick={() => navigateHistory("prev")}
//                     disabled={!canGoPrev}
//                     className={clsx(
//                       "w-12 h-12 flex items-center justify-center rounded-full",
//                       canGoPrev
//                         ? "bg-gray-300 hover:bg-gray-400"
//                         : "bg-gray-200 opacity-50 cursor-not-allowed"
//                     )}
//                   >
//                     «
//                   </button>

//                   <button
//                     onClick={resetHistory}
//                     className="px-6 py-2 rounded-md bg-gray-300 text-gray-700 font-medium hover:bg-gray-400"
//                   >
//                     Reset History
//                   </button>

//                   <button
//                     onClick={() => navigateHistory("next")}
//                     disabled={!canGoNext}
//                     className={clsx(
//                       "w-12 h-12 flex items-center justify-center rounded-full",
//                       canGoNext
//                         ? "bg-gray-300 hover:bg-gray-400"
//                         : "bg-gray-200 opacity-50 cursor-not-allowed"
//                     )}
//                   >
//                     »
//                   </button>
//                 </div>
//               </>
//             )}

//             {/* ROOMS */}
//             {activeRightTab === "Rooms" && (
//               <>
//                 <div className="flex flex-wrap gap-2">
//                   {product.rooms.map((r, i) => (
//                     <button
//                       key={i}
//                       onClick={() =>
//                         setSelectedRoom((prev) =>
//                           prev === r.name ? null : r.name
//                         )
//                       }
//                       className={clsx(
//                         "px-4 py-2  border text-sm font-medium",
//                         selectedRoom === r.name
//                           ? "bg-black text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-100"
//                       )}
//                     >
//                       {r.name}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   {filteredRooms?.map((room, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setView("room")}
//                       className=" overflow-hidden"
//                     >
//                       <img
//                         src={room.image}
//                         alt={room.name}
//                         className="w-full h-40 object-cover"
//                       />
//                       <div className="p-2 text-left">
//                         <div className="text-sm font-medium">{room.name}</div>
//                         {/* <div className="text-sm text-gray-500">
//                           Preview in {room.name}
//                         </div> */}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* COLORWAYS */}
//             {activeRightTab === "Colorways" && (
//               <div className="grid grid-cols-3 gap-4">
//                 {product.colorways.map((c) => (
//                   <div key={c.sku} className="flex flex-col items-center">
//                     <img
//                       src={c.image}
//                       alt={c.sku}
//                       className="w-full h-full object-cover shadow"
//                     />
//                     <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* COORDINATES */}
//             {activeRightTab === "Coordinates" && (
//               <div className="grid grid-cols-3 gap-4">
//                 {product.coordinates.map((c) => (
//                   <div key={c.sku} className="flex flex-col items-center">
//                     <img
//                       src={c.image}
//                       alt={c.sku}
//                       className="w-full h-full object-cover shadow"
//                     />
//                     <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* --- BOTTOM BUTTONS SECTION --- */}
//         <div className="space-y-6 mt-6">
//           {/* Action Buttons (from screenshot) */}
//           <div className="flex items-center justify-between px-5 py-4 border-t">
//             {/* Save Button */}
//             <button
//               onClick={() => {
//                 /* Handle Save Logic */
//               }}
//               className="px-8 py-2 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-700"
//             >
//               Save
//             </button>

//             {/* Icon Buttons Group */}
//             <div className="flex items-center space-x-4 gap-10">
//               {/* Download */}
//               <button
//                 onClick={() => {
//                   /* Handle Download Logic */
//                 }}
//                 className="flex flex-col items-center text-gray-700 hover:text-black"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                   />
//                 </svg>
//                 <span className="text-sm font-medium">Download</span>
//               </button>
//               {/* Order */}
//               <button
//                 onClick={() => {
//                   /* Handle Order Logic */
//                 }}
//                 className="flex flex-col items-center text-gray-700 hover:text-black"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 <span className="text-sm font-medium">Order</span>
//               </button>
//               {/* Email */}
//               <button
//                 onClick={() => {
//                   /* Handle Email Logic */
//                 }}
//                 className="flex flex-col items-center text-gray-700 hover:text-black"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//                 <span className="text-sm font-medium">Email</span>
//               </button>
//               {/* Pin It */}
//               <button
//                 onClick={() => {
//                   /* Handle Pin It Logic */
//                 }}
//                 className="flex flex-col items-center text-gray-700 hover:text-black"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M12.017 0C5.383 0 0 5.383 0 12.017c0 5.09 3.076 9.42 7.37 11.23-.052-.895-.12-2.19.034-3.27.14-1.002.9-4.24 1.04-4.71.132-.45.082-.644-.14-.98-.24-.36-.42-.87-.42-1.46 0-1.38.78-2.42 1.76-2.42.82 0 1.22.62 1.22 1.37 0 .84-.54 2.09-.81 3.25-.23 1.02.5 1.84 1.5 1.84 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.8 0-4.4 2.1-4.4 4.3 0 .83.31 1.7.7 2.2.08.1.1.18.07.28-.08.34-.27 1.1-.35 1.4-.09.38-.18.48-.36.38-1.5-.83-2.5-2.9-2.5-4.8C2.5 6.1 5.7 3 9.9 3c3.8 0 6.8 2.8 6.8 6.3 0 3.8-2.4 6.7-5.8 6.7-1.1 0-2.2-.6-2.5-1.3 0 0-.54 2.1-.66 2.6-.33 1.3-.9 2.7-1.3 3.6 1.2.3 2.5.5 3.8.5 6.6 0 12-5.4 12-12S18.6 0 12 0" />
//                 </svg>
//                 <span className="text-sm font-medium">Pin It</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// //   useEffect(() => {
// //     const canvas = roomCanvasRef.current;
// //     if (!canvas || !roomImage) return;

// //     const width = canvas.width;
// //     const height = canvas.height;

// //     const renderer = new THREE.WebGLRenderer({
// //       canvas,
// //       alpha: true,
// //       antialias: true,
// //     });

// // //     renderer.outputEncoding = THREE.sRGBEncoding;
// // // renderer.toneMapping = THREE.ACESFilmicToneMapping;
// // // renderer.toneMappingExposure = 1.15;
// // // renderer.setPixelRatio(window.devicePixelRatio);
// // // renderer.setSize(width, height);

// // renderer.outputColorSpace = THREE.SRGBColorSpace;
// // renderer.toneMapping = THREE.ACESFilmicToneMapping;
// // renderer.toneMappingExposure = 2;
// // renderer.setPixelRatio(window.devicePixelRatio);
// // renderer.setSize(width, height);


// //     // renderer.setSize(width, height);
// //     // renderer.setClearColor(0x000000, 0);

// //     const scene = new THREE.Scene();

    

// //     // Camera
// //     // const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
// //     // camera.position.set(0, 4, 16);
// //     // camera.lookAt(0, 4, 16);

// //     const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
// // camera.position.set(0, 4.2, 16);
// // camera.lookAt(0, 0, -2);

// // camera.fov = 40; 
// // camera.position.set(0, 8, 25);
// // camera.lookAt(0, 0, 0);
// // camera.updateProjectionMatrix();


// //     // Light
// //     // const light = new THREE.DirectionalLight(0xffffff, 1.5);
// //     // light.position.set(0, 12, 12);
// //     // scene.add(light);

// //     scene.add(new THREE.AmbientLight(0xffffff, 1.2));

// // const keyLight = new THREE.DirectionalLight(0xffe6c9, 0.4);
// // keyLight.position.set(0, 10, 10);
// // scene.add(keyLight);




// //     // Carpet texture
// //     const textureSrc = productImage || dynamicTile;
// //     if (!textureSrc) return;

// //     const carpetTexture = new THREE.Texture(textureSrc);
// //     carpetTexture.needsUpdate = true;
// //     carpetTexture.wrapS = carpetTexture.wrapT = THREE.RepeatWrapping;
// //     carpetTexture.repeat.set(3, 3);

// // carpetTexture.colorSpace = THREE.SRGBColorSpace;
// // carpetTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
// // carpetTexture.magFilter = THREE.LinearFilter;
// // carpetTexture.minFilter = THREE.LinearMipmapLinearFilter;

// // renderer.outputColorSpace = THREE.SRGBColorSpace;




// //     // const floorPoints = [
// //     //   new THREE.Vector2(-6, -3), // bottom left
// //     //   new THREE.Vector2(6, -3), // bottom right
// //     //   new THREE.Vector2(8, 1), // upper right
// //     //   new THREE.Vector2(-8, 1), // upper left
// //     // ];
// //     // const floorShape = new THREE.Shape(floorPoints);
// //     // const floorGeometry = new THREE.ShapeGeometry(floorShape);

// //     // const floorMaterial = new THREE.MeshPhongMaterial({
// //     //   map: carpetTexture,
// //     //   side: THREE.DoubleSide,
// //     // });

// //     // const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// //     // floor.rotation.x = -Math.PI / 2;
// //     // floor.position.y = 0;
// //     // scene.add(floor);

// //     // const floorGeometry = new THREE.PlaneGeometry(20, 20);
// //     // const floorMaterial = new THREE.MeshPhongMaterial({
// //     //   map: carpetTexture,
// //     //   side: THREE.DoubleSide,
// //     // });

// //     // const floorGeometry = new THREE.PlaneGeometry(20, 20);
// //     const floorGeometry = new THREE.PlaneGeometry(30, 30); // increase size massively

// // floorGeometry.setAttribute(
// //   "uv2",
// //   new THREE.BufferAttribute(floorGeometry.attributes.uv.array, 2)
// // );

// // const floorMaterial = new THREE.MeshStandardMaterial({
// //   map: carpetTexture,
// //   roughness: 1,
// //   metalness: 0.0,
// //   aoMap: carpetTexture,
// //   aoMapIntensity: 0.35,
// //   opacity: 1,
// //   transparent: true,
// // });




// // //     const floorGeometry = new THREE.PlaneGeometry(20, 20);
// // // const floorMaterial = new THREE.MeshStandardMaterial({
// // //   map: carpetTexture,
// // // });
// //     // const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// //     // floor.rotation.x = -Math.PI / 2;
// //     // floor.position.y = 0;
// //     // scene.add(floor);

// //     const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// // // floor.rotation.x = -Math.PI / 2;
// // floor.rotation.x = -Math.PI / 2;

// // // Slide floor a little forward so it aligns perspective better
// // // floor.position.set(0, 0, -5.5);
// // floor.position.y = -0.009;
// // floor.position.set(0, 0, -10);



// // scene.add(floor);

// //     renderer.render(scene, camera);

// //     return () => {
// //       renderer.dispose();
// //       floorGeometry.dispose();
// //       floorMaterial.dispose();
// //       carpetTexture.dispose();
// //       // roomTexture.dispose();
      
// //     };
// //   }, [dynamicTile, productImage, roomImage]);
