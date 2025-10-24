// import React from "react";

// interface Props {
//   tileImage?: HTMLImageElement;
// }

// export const SwatchView: React.FC<Props> = ({ tileImage }) => {
//   return (
//     <div className="flex flex-col items-center justify-center w-full max-w-[600px] h-[600px] bg-black p-4">
//       {!tileImage ? (
//         <div className="flex items-center justify-center h-full text-gray-600">
//           Loading...
//         </div>
//       ) : (
//         <div className="grid grid-cols-6 gap-1 w-full h-full">
//           {Array.from({ length: 36 }).map((_, i) => (
//             <div
//               key={i}
//               className="aspect-square overflow-hidden bg-white shadow-sm"
//             >
//               <img
//                 src={tileImage.src}
//                 alt={`tile-${i}`}
//                 className="w-full h-full object-cover"
//                 draggable={false}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// "use client";
// import React, { useState } from "react";

// interface Props {
//   tileImage?: HTMLImageElement;
// }

// export const SwatchView: React.FC<Props> = ({ tileImage }) => {
//   const [viewMode, setViewMode] = useState<"full" | "bordered">("bordered");

//   return (
//     <div className="flex flex-col items-center justify-center w-full max-w-[600px] h-[600px] bg-black p-4 rounded-lg relative">
//       {/* === Toggle Buttons === */}
//       <div className="absolute top-4 right-4 flex gap-2 z-10">
//         <button
//           onClick={() => setViewMode("full")}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             viewMode === "full"
//               ? "bg-green-600 text-white shadow"
//               : "bg-white text-gray-800 border"
//           }`}
//         >
//           Full View
//         </button>
//         <button
//           onClick={() => setViewMode("bordered")}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             viewMode === "bordered"
//               ? "bg-green-600 text-white shadow"
//               : "bg-white text-gray-800 border"
//           }`}
//         >
//           Bordered View
//         </button>
//       </div>

//       {/* === Main Display Area === */}
//       {!tileImage ? (
//         <div className="flex items-center justify-center h-full text-gray-400">
//           Loading...
//         </div>
//       ) : viewMode === "full" ? (
//         // --- FULL VIEW (single tile fills the area) ---
//         <div className="w-full h-full overflow-hidden rounded-md shadow-lg">
//           <img
//             src={tileImage.src}
//             alt="Full Tile"
//             className="w-full h-full object-cover"
//             draggable={false}
//           />
//         </div>
//       ) : (
//         // --- BORDERED VIEW (grid of tiles) ---
//         <div className="grid grid-cols-6 w-full h-full p-1 rounded-md bg-gray-300">
//           {Array.from({ length: 36 }).map((_, i) => (
//             <div
//               key={i}
//               className="aspect-square overflow-hidden bg-white shadow-sm border-2 border-gray-400 "
//             >
//               <img
//                 src={tileImage.src}
//                 alt={`tile-${i}`}
//                 className="w-full h-full object-cover"
//                 draggable={false}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// "use client";
// import React, { useState } from "react";

// interface Props {
//   tileImage?: HTMLImageElement;
// }

// export const SwatchView: React.FC<Props> = ({ tileImage }) => {
//   const [viewMode, setViewMode] = useState<"full" | "bordered">("bordered");
//   const [showBorders, setShowBorders] = useState(true);

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full max-w-[600px] h-[600px] bg-black p-4 rounded-lg overflow-hidden">
//       {/* === Toggle Buttons === */}
//       <div className="absolute top-4 right-4 flex gap-2 z-10">
//         {["full", "bordered"].map((mode) => (
//           <button
//             key={mode}
//             onClick={() => setViewMode(mode as "full" | "bordered")}
//             className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//               viewMode === mode
//                 ? "bg-green-600 text-white shadow"
//                 : "bg-white text-gray-800 border"
//             }`}
//           >
//             {mode === "full" ? "Full View" : "Bordered View"}
//           </button>
//         ))}

//         <button
//           onClick={() => setShowBorders(false)}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             !showBorders
//               ? "bg-green-600 text-white shadow"
//               : "bg-white text-gray-800 border"
//           }`}
//         >
//           Full View
//         </button>
//         <button
//           onClick={() => setShowBorders(true)}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             showBorders
//               ? "bg-green-600 text-white shadow"
//               : "bg-white text-gray-800 border"
//           }`}
//         >
//           Bordered View
//         </button>
//       </div>

//       {/* === Main Display Area === */}
//       {!tileImage ? (
//         <div className="flex items-center justify-center h-full text-gray-400">
//           Loading...
//         </div>
//       ) : (
//         <div className="relative w-full h-full rounded-md overflow-hidden shadow-lg">
//           {/* Single Tile Image */}
//           <img
//             src={tileImage.src}
//             alt="Tile"
//             className="w-full h-full object-cover"
//             draggable={false}
//           />

//           {/* === Overlay Grid (only visible in bordered mode) === */}
//           {viewMode === "bordered" && (
//             <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
//               {Array.from({ length: 36 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className={` pointer-events-none  ${
//                     showBorders ? "border border-gray-400" : "border-none"
//                   } `}
//                 >
//                   <img
//                     src={tileImage.src}
//                     alt={`tile-${i}`}
//                     className="w-full h-full object-cover"
//                     draggable={false}
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// "use client";
// import React, { useState } from "react";

// interface Props {
//   tileImage?: HTMLImageElement;
// }

// export const SwatchView: React.FC<Props> = ({ tileImage }) => {
//   const [viewMode, setViewMode] = useState<"full" | "bordered">("bordered");

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full max-w-[600px] h-[600px] bg-black p-4 rounded-lg overflow-hidden">
//       {/* === Toggle Buttons === */}
//       <div className="absolute top-4 right-4 flex gap-2 z-10">
//         <button
//           onClick={() => setViewMode("full")}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             viewMode === "full"
//               ? "bg-green-600 text-white shadow"
//               : "bg-white text-gray-800 border"
//           }`}
//         >
//           Full View
//         </button>
//         <button
//           onClick={() => setViewMode("bordered")}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             viewMode === "bordered"
//               ? "bg-green-600 text-white shadow"
//               : "bg-white text-gray-800 border"
//           }`}
//         >
//           Bordered View
//         </button>
//       </div>

//       {/* === Main Display Area === */}
//       {!tileImage ? (
//         <div className="flex items-center justify-center h-full text-gray-400">
//           Loading...
//         </div>
//       ) : viewMode === "full" ? (
//         // Full View: single tile fills the container
//         <div className="w-full h-full rounded-md overflow-hidden shadow-lg">
//           <img
//             src={tileImage.src}
//             alt="Full Tile"
//             className="w-full h-full object-cover"
//             draggable={false}
//           />
//         </div>
//       ) : (
//         // Bordered View: 6x6 grid of tiles with borders
//         <div className="grid grid-cols-6 w-full h-full rounded-md bg-gray-300">
//           {Array.from({ length: 36 }).map((_, i) => (
//             <div
//               key={i}
//               className="aspect-square overflow-hidden border border-gray-400"
//             >
//               <img
//                 src={tileImage.src}
//                 alt={`tile-${i}`}
//                 className="w-full h-full object-cover"
//                 draggable={false}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// "use client";
// import React, { useState } from "react";

// interface Props {
//   tileImage?: HTMLImageElement;
// }

// export const SwatchView: React.FC<Props> = ({ tileImage }) => {
//   const [viewMode, setViewMode] = useState<"full" | "bordered">("bordered");
//   const [showBorders, setShowBorders] = useState(true); // For toggling borders in bordered view

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full max-w-[600px] h-[600px] bg-black p-4 rounded-lg overflow-hidden">
//       {/* === Toggle Buttons === */}
//       <div className="absolute top-4 right-4 flex gap-2 z-10">
//         <button
//           onClick={() => setViewMode("full")}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             viewMode === "full"
//               ? "bg-white text-black shadow"
//               : "bg-white text-orange-500 border"
//           }`}
//         >
//           Full View
//         </button>
//         {viewMode === "bordered" && (
//           <button
//             onClick={() => setShowBorders((prev) => !prev)}
//             className="px-3 py-1 rounded-md text-sm font-medium bg-white text-white border border-white transition"
//           >
//             {showBorders ? "Remove Borders" : "Show Borders"}
//           </button>
//         )}
//       </div>

//       {/* === Main Display Area === */}
//       {!tileImage ? (
//         <div className="flex items-center justify-center h-full text-gray-400">
//           Loading...
//         </div>
//       ) : viewMode === "full" ? (
//         // Full View: single tile fills the container
//         <div className="w-full h-full rounded-md overflow-hidden shadow-lg">
//           <img
//             src={tileImage.src}
//             alt="Full Tile"
//             className="w-full h-full object-cover"
//             draggable={false}
//           />
//         </div>
//       ) : (
//         // Bordered View: 6x6 grid of tiles with optional borders
//         <div className="grid grid-cols-6 w-full h-full rounded-md bg-gray-300 gap-0">
//           {Array.from({ length: 36 }).map((_, i) => (
//             <div
//               key={i}
//               className={`aspect-square overflow-hidden ${
//                 showBorders ? "border border-gray-400" : ""
//               }`}
//             >
//               <img
//                 src={tileImage.src}
//                 alt={`tile-${i}`}
//                 className="w-full h-full object-cover"
//                 draggable={false}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// "use client";
// import React, { useState } from "react";

// interface Props {
//   tileImage?: HTMLImageElement;
// }

// export const SwatchView: React.FC<Props> = ({ tileImage }) => {
//   const [viewMode, setViewMode] = useState<"full" | "bordered">("bordered");
//   const [showBorders, setShowBorders] = useState(true);

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full max-w-[600px] h-[600px] bg-black p-4 rounded-lg overflow-hidden">

//       {/* Toggle Buttons */}
//       <div className="absolute top-4 right-4 flex gap-2 z-10">
//         <button
//           onClick={() => setViewMode("full")}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             viewMode === "full"
//               ? "bg-white text-black shadow"
//               : "bg-white text-orange-500 border"
//           }`}
//         >
//           Full View
//         </button>

//         {viewMode === "bordered" && (
//           <button
//             onClick={() => setShowBorders((prev) => !prev)}
//             className="px-3 py-1 rounded-md text-sm font-medium bg-white text-white border transition"
//           >
//             {showBorders ? "Remove Borders" : "Show Borders"}
//           </button>
//         )}
//       </div>

//       {/* Main Display Area */}
//       {!tileImage ? (
//         <div className="flex items-center justify-center h-full text-gray-400">
//           Loading...
//         </div>
//       ) : viewMode === "full" ? (
//         <div className="w-full h-full rounded-md overflow-hidden shadow-lg">
//           <img
//             src={tileImage.src}
//             alt="Full Tile"
//             className="w-full h-full object-cover"
//             draggable={false}
//           />
//         </div>
//       ) : (
//         <div className="grid grid-cols-6 w-full h-full rounded-md bg-gray-300 gap-0">
//           {Array.from({ length: 36 }).map((_, i) => (
//             <div
//               key={i}
//               className={`aspect-square overflow-hidden ${
//                 showBorders ? "border border-gray-400" : ""
//               }`}
//             >
//               <img
//                 src={tileImage.src}
//                 alt={`tile-${i}`}
//                 className="w-full h-full object-cover"
//                 draggable={false}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };



// "use client";
// import React, { useState } from "react";

// interface Props {
//   tileImage?: HTMLImageElement;
// }

// export const SwatchView: React.FC<Props> = ({ tileImage }) => {
//   const [viewMode, setViewMode] = useState<"full" | "bordered">("bordered");
//   const [showBorders, setShowBorders] = useState(true);

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full max-w-[600px] h-[600px] bg-black p-4 rounded-lg overflow-hidden">
//       {/* Toggle Buttons */}
//       <div className="absolute top-4 right-4 flex gap-2 z-10">
//         <button
//           onClick={() => setViewMode("full")}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             viewMode === "full"
//               ? "bg-white text-black shadow"
//               : "bg-white text-orange-500 border"
//           }`}
//         >
//           Full View
//         </button>

//         <button
//           onClick={() => setViewMode("bordered")}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             viewMode === "bordered"
//               ? "bg-white text-white shadow"
//               : "bg-white text-orange-500 border"
//           }`}
//         >
//           Bordered View
//         </button>

//         {/* Border toggle button always visible but disabled in Full View */}
//         <button
//           onClick={() => setShowBorders((prev) => !prev)}
//           className={`px-3 py-1 rounded-md text-sm font-medium bg-white border transition ${
//             viewMode === "full"
//               ? "text-orange-500 cursor-not-allowed"
//               : "text-white"
//           }`}
//           disabled={viewMode === "full"}
//         >
//           {showBorders ? "Remove Borders" : "Show Borders"}
//         </button>
//       </div>

//       {/* Main Display Area */}
//       {!tileImage ? (
//         <div className="flex items-center justify-center h-full text-gray-400">
//           Loading...
//         </div>
//       ) : viewMode === "full" ? (
//         // Full View: single tile fills container
//         <div className="w-full h-full rounded-md overflow-hidden shadow-lg"
//          style={{
//                 backgroundImage: `url(${tileImage.src})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}>
//           {/* <img
//             src={tileImage.src}
//             alt="Full Tile"
//             className="w-full h-full object-cover"
//             draggable={false}
//           /> */}
//         </div>
//       ) : (
//         // Bordered View: 6x6 grid with optional borders
//         <div className="grid grid-cols-6 w-full h-full rounded-md bg-gray-300 gap-0">
//           {Array.from({ length: 36 }).map((_, i) => (
//             <div
//               key={i}
//               className={`aspect-square overflow-hidden ${
//                 showBorders ? "border border-gray-400" : ""
//               }`}
//               style={{
//                 backgroundImage: `url(${tileImage.src})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             ></div>
//           ))}
//           {/* {Array.from({ length: 36 }).map((_, i) => (
//             <div
//               key={i}
//               className={`aspect-square overflow-hidden ${
//                 showBorders ? "border border-gray-400" : ""
//               }`} 
//             >
//               <img
//                 src={tileImage.src}
//                 alt={`tile-${i}`}
//                 className="w-full h-full object-cover"
//                 draggable={false}
//               />
//             </div>
//           ))} */}
//         </div>
//       )}
//     </div>
//   );
// };



//working properly

// "use client";
// import React, { useState } from "react";

// interface Props {
//   tileImage?: HTMLImageElement;
// }

// export const SwatchView: React.FC<Props> = ({ tileImage }) => {
//   const [viewMode, setViewMode] = useState<"full" | "bordered">("bordered");
//   const [showBorders, setShowBorders] = useState(true);

//   const bgStyle = (src: string) => ({
//     backgroundImage: `url(${src})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   });

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full max-w-[600px] h-[600px] bg-black p-4 rounded-lg overflow-hidden">
      
//       {/* Toggle Buttons */}
//       <div className="absolute top-4 right-4 flex gap-2 z-10">
//         <button
//           onClick={() => setViewMode("full")}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             viewMode === "full"
//               ? "bg-white text-white shadow"
//               : "bg-white text-orange-500 border"
//           }`}
//         >
//           Full View
//         </button>

//         <button
//           onClick={() => setViewMode("bordered")}
//           className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//             viewMode === "bordered"
//               ? "bg-white text-white shadow"
//               : "bg-white text-orange-500 border"
//           }`}
//         >
//           Bordered View
//         </button>

//         <button
//           onClick={() => setShowBorders((prev) => !prev)}
//           disabled={viewMode === "full"}
//           className={`px-3 py-1 rounded-md text-sm font-medium bg-white border transition ${
//             viewMode === "full"
//               ? "text-white cursor-not-allowed"
//               : "text-orange-500"
//           }`}
//         >
//           {showBorders ? "Remove Borders" : "Show Borders"}
//         </button>
//       </div>

//       {/* Main Display Area */}
//       {!tileImage ? (
//         <div className="flex items-center justify-center h-full text-gray-400">
//           Loading...
//         </div>
//       ) : viewMode === "full" ? (
//         <div
//           className="w-full h-full rounded-md overflow-hidden shadow-lg"
//           style={bgStyle(tileImage.src)}
//         />
//       ) : (
//         <div className="grid grid-cols-6 w-full h-full rounded-md bg-gray-300 gap-0">
//           {Array.from({ length: 36 }).map((_, i) => (
//             <div
//               key={i}
//               className={`aspect-square overflow-hidden ${
//                 showBorders ? "border border-gray-400" : ""
//               }`}
//               style={bgStyle(tileImage.src)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// "use client";
// import React, { useState, useMemo } from "react";

// // Helper function moved outside the component to prevent re-creation on every render.
// const bgStyle = (src: string) => ({
//   backgroundImage: `url(${src})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// });

// // --- Sub-components for better readability and performance ---

// // Memoized component for the single, full-size view.
// const FullView = React.memo(({ src }: { src: string }) => (
//   <div
//     className="w-full h-full rounded-md overflow-hidden shadow-lg"
//     style={bgStyle(src)}
//   />
// ));

// // Memoized component for the grid view.
// const GridView = React.memo(({ src, showBorders }: { src: string; showBorders: boolean }) => {
//   // useMemo ensures the grid items array is not recalculated on every render.
//   const gridItems = useMemo(() => Array.from({ length: 36 }), []);

//   return (
//     <div className="grid grid-cols-6 w-full h-full rounded-md bg-gray-300">
//       {gridItems.map((_, i) => (
//         <div
//           key={i}
//           className={`aspect-square overflow-hidden ${
//             showBorders ? "border border-gray-400" : ""
//           }`}
//           style={bgStyle(src)}
//         />
//       ))}
//     </div>
//   );
// });

// // --- Main Component Props ---

// interface Props {
//   // Use a string for the image source, which is a more common and flexible pattern.
//   tileImageSrc?: string;
// }

// // --- Main SwatchView Component ---

// export const SwatchView: React.FC<Props> = ({ tileImageSrc }) => {
//   const [viewMode, setViewMode] = useState<"full" | "bordered">("bordered");
//   const [showBorders, setShowBorders] = useState(true);

//   const handleSetViewMode = (mode: "full" | "bordered") => {
//     setViewMode(mode);
//     // For better UX, reset borders when switching to full view.
//     if (mode === "full") {
//       setShowBorders(true);
//     }
//   };

//   // --- Simplified ClassName Logic ---
//   const baseButtonClass = "px-3 py-1 rounded-md text-sm font-medium transition";
//   const activeClass = "bg-orange-500 text-white shadow"; // Bug Fix: was bg-white text-white
//   const inactiveClass = "bg-white text-orange-500 border";
//   const disabledClass = "text-gray-400 cursor-not-allowed border";

//   // --- Content Rendering Logic ---
//   let content;
//   if (!tileImageSrc) {
//     content = (
//       <div className="flex items-center justify-center h-full text-gray-400">
//         Loading...
//       </div>
//     );
//   } else if (viewMode === "full") {
//     content = <FullView src={tileImageSrc} />;
//   } else {
//     content = <GridView src={tileImageSrc} showBorders={showBorders} />;
//   }

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full max-w-[600px] h-[600px] bg-black p-4 rounded-lg overflow-hidden">
      
//       {/* Toggle Buttons */}
//       <div className="absolute top-4 right-4 flex gap-2 z-10">
//         <button
//           onClick={() => handleSetViewMode("full")}
//           className={`${baseButtonClass} ${viewMode === "full" ? activeClass : inactiveClass}`}
//         >
//           Full View
//         </button>

//         <button
//           onClick={() => handleSetViewMode("bordered")}
//           className={`${baseButtonClass} ${viewMode === "bordered" ? activeClass : inactiveClass}`}
//         >
//           Bordered View
//         </button>

//         <button
//           onClick={() => setShowBorders((prev) => !prev)}
//           disabled={viewMode === "full"}
//           className={`${baseButtonClass} bg-white ${
//             viewMode === "full" ? disabledClass : "text-orange-500"
//           }`}
//         >
//           {showBorders ? "Hide Borders" : "Show Borders"}
//         </button>
//       </div>

//       {/* Main Display Area */}
//       {content}
//     </div>
//   );
// };



// "use client";
// import React, { useState, useMemo } from "react";

// // Helper function moved outside the component to prevent re-creation on every render.
// const bgStyle = (src: string) => ({
//   backgroundImage: `url(${src})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// });

// // --- Sub-components for better readability and performance ---

// // Memoized component for the single, full-size view.
// const FullView = React.memo(({ src }: { src: string }) => (
//   <div
//     className="w-full h-full rounded-md overflow-hidden shadow-lg"
//     style={bgStyle(src)}
//   />
// ));

// // Memoized component for the grid view.
// const GridView = React.memo(({ src, showBorders }: { src: string; showBorders: boolean }) => {
//   const gridItems = useMemo(() => Array.from({ length: 36 }), []);

//   return (
//     <div className="grid grid-cols-6 w-full h-full rounded-md bg-gray-300">
//       {gridItems.map((_, i) => (
//         <div
//           key={i}
//           className={`aspect-square overflow-hidden ${
//             showBorders ? "border border-gray-400" : ""
//           }`}
//           style={bgStyle(src)}
//         />
//       ))}
//     </div>
//   );
// });

// // --- Main Component Props ---

// interface Props {
//   // CORRECTED: The prop name is now consistent.
//   tileImage?: string;
// }

// // --- Main SwatchView Component ---

// export const SwatchView: React.FC<Props> = ({ tileImage }) => { // CORRECTED: Destructuring tileImageSrc
//   const [viewMode, setViewMode] = useState<"full" | "bordered">("bordered");
//   const [showBorders, setShowBorders] = useState(true);

//   const handleSetViewMode = (mode: "full" | "bordered") => {
//     setViewMode(mode);
//     if (mode === "full") {
//       setShowBorders(true);
//     }
//   };

//   console.log(tileImage)
//   const baseButtonClass = "px-3 py-1 rounded-md text-sm font-medium transition";
//   const activeClass = "bg-orange-500 text-white shadow";
//   const inactiveClass = "bg-white text-orange-500 border";
//   const disabledClass = "text-gray-400 cursor-not-allowed border";

//   // --- Content Rendering Logic ---
//   let content;
//   // CORRECTED: Checking tileImage
//   if (!tileImage) {
//     content = (
//       <div className="flex items-center justify-center h-full text-gray-400">
//         Loading...
//       </div>
//     );
//   } else if (viewMode === "full") {
//     // CORRECTED: Passing tileImageSrc
//     content = <FullView src={tileImage} />;
//   } else {
//     // CORRECTED: Passing tileImageSrc
//     content = <GridView src={tileImage} showBorders={showBorders} />;
//   }

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full max-w-[600px] h-[600px] bg-black p-4 rounded-lg overflow-hidden">
      
//       {/* Toggle Buttons */}
//       <div className="absolute top-4 right-4 flex gap-2 z-10">
//         <button
//           onClick={() => handleSetViewMode("full")}
//           className={`${baseButtonClass} ${viewMode === "full" ? activeClass : inactiveClass}`}
//         >
//           Full View
//         </button>

//         <button
//           onClick={() => handleSetViewMode("bordered")}
//           className={`${baseButtonClass} ${viewMode === "bordered" ? activeClass : inactiveClass}`}
//         >
//           Bordered View
//         </button>

//         <button
//           onClick={() => setShowBorders((prev) => !prev)}
//           disabled={viewMode === "full"}
//           className={`${baseButtonClass} bg-white ${
//             viewMode === "full" ? disabledClass : "text-orange-500"
//           }`}
//         >
//           {showBorders ? "Hide Borders" : "Show Borders"}
//         </button>
//       </div>

//       {/* Main Display Area */}
//       {content}
//     </div>
//   );
// };


"use client";
import React, { useState, useMemo } from "react";

// Helper function remains the same.
const bgStyle = (src: string) => ({
  backgroundImage: `url(${src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

// --- Sub-components (no changes needed) ---

const FullView = React.memo(({ src }: { src: string }) => (
  <div
    className="w-full h-full rounded-md overflow-hidden shadow-lg"
    style={bgStyle(src)}
  />
));

const GridView = React.memo(({ src, showBorders }: { src: string; showBorders: boolean }) => {
  const gridItems = useMemo(() => Array.from({ length: 24 }), []);

  return (
    <div className="grid grid-cols-6 w-full h-full rounded-md bg-gray-300">
      {gridItems.map((_, i) => (
        <div
          key={i}
          className={`aspect-square overflow-hidden ${
            showBorders ? "border border-gray-400" : ""
          }`}
          style={bgStyle(src)}
        />
      ))}
    </div>
  );
});

// --- Main Component Props ---

interface Props {
  // Corrected: The prop is an HTMLImageElement object.
  tileImage?: HTMLImageElement;
}

// --- Main SwatchView Component ---

export const SwatchView: React.FC<Props> = ({ tileImage }) => {
  const [viewMode, setViewMode] = useState<"full" | "bordered">("bordered");
  const [showBorders, setShowBorders] = useState(true);

  // Extract the source URL string from the image object.
  const tileImageSrc = tileImage?.src;

  console.log(tileImage)

  const handleSetViewMode = (mode: "full" | "bordered") => {
    setViewMode(mode);
    if (mode === "full") {
      setShowBorders(true);
    }
  };

  const baseButtonClass = "px-3 py-1 rounded-md text-sm font-medium transition";
  const activeClass = "bg-orange-500 text-white shadow";
  const inactiveClass = "bg-white text-orange-500 border";
  const disabledClass = "text-gray-400 cursor-not-allowed border";

  // --- Content Rendering Logic ---
  let content;
  // This check now correctly determines if the image source is ready.
  if (!tileImageSrc) {
    content = (
      <div className="flex items-center justify-center h-full text-gray-400">
        Loading...
      </div>
    );
  } else if (viewMode === "full") {
    content = <FullView src={tileImageSrc} />;
  } else {
    content = <GridView src={tileImageSrc} showBorders={showBorders} />;
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[600px] h-[600px] bg-black p-4 rounded-lg overflow-hidden">
      
      {/* Toggle Buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={() => handleSetViewMode("full")}
          className={`${baseButtonClass} ${viewMode === "full" ? activeClass : inactiveClass}`}
        >
          Full View
        </button>

        <button
          onClick={() => handleSetViewMode("bordered")}
          className={`${baseButtonClass} ${viewMode === "bordered" ? activeClass : inactiveClass}`}
        >
          Bordered View
        </button>

        <button
          onClick={() => setShowBorders((prev) => !prev)}
          disabled={viewMode === "full"}
          className={`${baseButtonClass} bg-white ${
            viewMode === "full" ? disabledClass : "text-orange-500"
          }`}
        >
          {showBorders ? "Hide Borders" : "Show Borders"}
        </button>
      </div>

      {/* Main Display Area */}
      {content}
    </div>
  );
};
