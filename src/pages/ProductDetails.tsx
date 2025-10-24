// // src/pages/ProductDetails.tsx
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import clsx from "clsx";
// import ThreeD from "./ThreeD"; // adjust path if needed
// import Swatch from "./Swatch";
// import productsData from "../data/products.json"; // ✅ import JSON

// interface Product {
//   id: string;
//   sku: string;
//   image: string;
//   isNew?: boolean;
//   colors: { code: string; label: string }[];
//   rooms: { name: string; image: string }[];
//   colorways: { code: string; label: string }[];
//   coordinates: { sku: string; image: string }[];
//   configure?: {
//     sizes?: { label: string; bgColor?: string }[];
//     installs?: { name: string; image: string }[];
//     patterns?: { name: string; image: string; options: number }[];
//   };
// }

// export default function ProductDetails() {
//   const { sku } = useParams<{ sku: string }>();
//   const [product, setProduct] = useState<Product | null>(null);

//   const [appliedDesign, setAppliedDesign] = useState<string[][]>([]);

//   // page-level tabs (swatch / room)
//   const [activeTab, setActiveTab] = useState<"swatch" | "room">("swatch");

//   // right-panel tabs
//   const rightTabs = [
//     "Colors",
//     "Rooms",
//     "Colorways",
//     "Configure",
//     "Coordinates",
//   ] as const;
//   type RightTab = (typeof rightTabs)[number];
//   const [activeRightTab, setActiveRightTab] = useState<RightTab>("Colors");
//   const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

//   // selection + history (for colors)
//   const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
//     null
//   );
//   const [history, setHistory] = useState<number[]>([]);
//   const [historyIndex, setHistoryIndex] = useState<number>(-1);

//   // Selected configuration states
//   const [selectedSize, setSelectedSize] = useState<{
//     label: string;
//     bgColor?: string;
//   } | null>(null);

//   const [selectedInstall, setSelectedInstall] = useState<{
//     name: string;
//     image: string;
//   } | null>(null);

//   const [selectedPattern, setSelectedPattern] = useState<{
//     name: string;
//     image: string;
//     options: number;
//   } | null>(null);

//   useEffect(() => {
//     const found = (productsData.products as Product[]).find(
//       (p) => p.sku === sku
//     );
//     setProduct(found || null);

//     // reset when product changes
//     setSelectedColorIndex(null);
//     setHistory([]);
//     setHistoryIndex(-1);
//     setActiveRightTab("Colors");
//     setActiveTab("swatch");
//   }, [sku]);

//   if (!product) {
//     return (
//       <div className="text-center py-20 text-gray-600">
//         ❌ Product not found
//       </div>
//     );
//   }

//   // --- Right-panel handlers ---
//   const onSelectColor = (idx: number) => {
//     if (selectedColorIndex === idx) return;
//     const newHistory = history.slice(0, historyIndex + 1).concat(idx);
//     setHistory(newHistory);
//     setHistoryIndex(newHistory.length - 1);
//     setSelectedColorIndex(idx);
//   };

//   const canGoPrev = historyIndex > 0;
//   const canGoNext = historyIndex >= 0 && historyIndex < history.length - 1;

//   const goPrev = () => {
//     if (!canGoPrev) return;
//     const newIndex = historyIndex - 1;
//     setHistoryIndex(newIndex);
//     setSelectedColorIndex(history[newIndex]);
//   };

//   const goNext = () => {
//     if (!canGoNext) return;
//     const newIndex = historyIndex + 1;
//     setHistoryIndex(newIndex);
//     setSelectedColorIndex(history[newIndex]);
//   };

//   const resetHistory = () => {
//     setHistory([]);
//     setHistoryIndex(-1);
//     setSelectedColorIndex(null);
//   };

//   const swatchClass = (idx: number) =>
//     clsx(
//       "w-24 h-20 rounded-md shadow-sm cursor-pointer transition-transform transform hover:scale-105",
//       selectedColorIndex === idx ? "ring-4 ring-offset-2 ring-blue-950" : ""
//     );

//   return (
//     <div className="mx-auto px-6 py-30 grid md:grid-cols-5 gap-8">
//       {/* LEFT AREA */}
//       <div className="md:col-span-3">
//         <div className="flex space-x-6 border-b mb-4">
//           <button
//             onClick={() => setActiveTab("swatch")}
//             className={clsx(
//               "pb-2 text-2xl font-semibold",
//               activeTab === "swatch"
//                 ? "border-b-2 border-black text-black"
//                 : "text-gray-500"
//             )}
//           >
//             Swatch
//           </button>
//           <button
//             onClick={() => setActiveTab("room")}
//             className={clsx(
//               "pb-2 text-2xl font-semibold",
//               activeTab === "room"
//                 ? "border-b-2 border-black text-black"
//                 : "text-gray-500"
//             )}
//           >
//             Room
//           </button>
//         </div>

//         <div className="relative h-[680px] rounded-xl w-full shadow-lg overflow-hidden bg-gray-100">
//           {activeTab === "swatch" ? (
//             <Swatch
//               baseTile={product.image} // ✅ initializes swatch with product image/color
//               selectedTile={
//                 selectedColorIndex !== null
//                   ? product.colors[selectedColorIndex]
//                   : null
//               }
//               palette={product.colors.map((c) => c.code)}
//               onApplyToRoom={(tiles) => {
//                 console.log("Design applied to room", tiles);
//                 setAppliedDesign(tiles); // ✅ save design in state
//               }}
//             />
//           ) : (
//             <ThreeD appliedDesign={appliedDesign || [[]]} />

//             // )}
//           )}

//           {product.isNew && activeTab === "swatch" && (
//             <span className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
//               New
//             </span>
//           )}
//         </div>
//       </div>

//       <div className="md:col-span-2">
//         {/* RIGHT PANEL */}
//         <div className="flex flex-col justify-between">
//           <div>
//             <div className="flex justify-between border-b mb-6">
//               {rightTabs.map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setActiveRightTab(t)}
//                   className={clsx(
//                     "pb-3 text-xl font-semibold",
//                     activeRightTab === t
//                       ? "border-b-2 border-black text-black"
//                       : "text-gray-500"
//                   )}
//                 >
//                   {t}
//                 </button>
//               ))}
//             </div>

//             <div className="min-h-[200px]">
//               {activeRightTab === "Colors" && (
//                 <div className="grid grid-cols-4 gap-6 mb-8">
//                   {product.colors?.map((c, idx) => (
//                     <div key={idx} className="flex flex-col items-center">
//                       <div
//                         role="button"
//                         aria-label={`Select color ${c.label}`}
//                         onClick={() => onSelectColor(idx)}
//                         className={swatchClass(idx)}
//                         style={{ backgroundColor: c.code }}
//                       />
//                       <span className="mt-2 text-lg font-medium">
//                         {c.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* {activeRightTab === "Rooms" && (
//                 <div className="grid grid-cols-3 gap-4 mb-8">
//                   {product.rooms?.map((room, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setActiveTab("room")}
//                       className="  rounded-xl border overflow-hidden"
//                     >
//                       <div className=" w-full h-40 overflow-hidden">
//                         <img
//                           src={room.image}
//                           alt={room.name}
//                           className="w-full h-full object-cover object-top"
//                         />
//                       </div>
//                       <div className=" text-left p-2">
//                         <div className="text-sm font-medium">{room.name}</div>
//                         <div className="text-sm text-gray-500">
//                           Preview in {room.name}
//                         </div>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )} */}

//               {activeRightTab === "Rooms" && (
//                 <>
//                   {/* Room filter buttons */}
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {product.rooms?.map((room, i) => (
//                       <button
//                         key={i}
//                         onClick={() =>
//                           setSelectedRoom((prev) =>
//                             prev === room.name ? null : room.name
//                           )
//                         }
//                         className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${
//                           selectedRoom === room.name
//                             ? "bg-black text-white"
//                             : "bg-white text-gray-700 hover:bg-gray-100"
//                         }`}
//                       >
//                         {room.name}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Show filtered images */}
//                   <div className="grid grid-cols-3 gap-4 mb-8">
//                     {(selectedRoom
//                       ? product.rooms?.filter((r) => r.name === selectedRoom)
//                       : product.rooms
//                     )?.map((room, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setActiveTab("room")}
//                         className="rounded-xl border overflow-hidden"
//                       >
//                         <div className="w-full h-40 overflow-hidden">
//                           <img
//                             src={room.image}
//                             alt={room.name}
//                             className="w-full h-full object-cover object-top"
//                           />
//                         </div>
//                         <div className="text-left p-2">
//                           <div className="text-sm font-medium">{room.name}</div>
//                           <div className="text-sm text-gray-500">
//                             Preview in {room.name}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               )}

//               {activeRightTab === "Colorways" && (
//                 <div className="grid grid-cols-3 gap-4 mb-8">
//                   {product.colorways?.map((cw, i) => (
//                     <div key={i} className="flex flex-col items-center">
//                       <div
//                         className="w-28 h-20 rounded border shadow"
//                         style={{ backgroundColor: cw.code }}
//                       />
//                       <span className="mt-1 text-sm text-gray-700">
//                         {cw.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {/* {activeRightTab === "Configure" && (
//                 <div className="grid grid-cols-3 gap-4 mb-8">
//                   {product.colorways?.map((cw, i) => (
//                   <div key={i} className="flex flex-col items-center">
//                     <div
//                       className="w-28 h-20 rounded border shadow"
//                       style={{ backgroundColor: cw.code }}
//                     />
//                     <span className="mt-1 text-sm text-gray-700">
//                       {cw.label}
//                     </span>
//                   </div>
//                 ))}
//                 </div>
//               )} */}

//               {activeRightTab === "Configure" && product.configure && (
//                 <div className="space-y-10 mb-8">
//                   {/* Choose Size */}
//                   <section>
//                     <h3 className="text-lg font-semibold mb-3">Choose Size</h3>
//                     <div className="grid grid-cols-3 gap-4">
//                       {product.configure.sizes?.map((size, i) => (
//                         <button
//                           key={i}
//                           onClick={() => setSelectedSize(size)}
//                           className={`flex flex-col items-center justify-center border rounded-xl p-4 hover:shadow transition ${
//                             selectedSize?.label === size.label
//                               ? "ring ring-black"
//                               : ""
//                           }`}
//                         >
//                           <div
//                             className="w-30 h-20 flex items-center justify-center text-sm font-medium rounded"
//                             style={{
//                               backgroundColor: size.bgColor || "#d6c5a0",
//                             }}
//                           >
//                             {size.label}
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   </section>

//                   {/* Choose Install */}
//                   <section>
//                     <h3 className="text-lg font-semibold mb-3">
//                       Choose Install
//                     </h3>
//                     <div className="grid grid-cols-4 gap-4">
//                       {product.configure.installs?.map((install, i) => (
//                         <button
//                           key={i}
//                           onClick={() => setSelectedInstall(install)}
//                           className={`flex flex-col items-center justify-center border rounded-xl p-4 hover:shadow transition ${
//                             selectedInstall?.name === install.name
//                               ? "ring ring-black"
//                               : ""
//                           }`}
//                         >
//                           <img
//                             src={install.image}
//                             alt={install.name}
//                             className="w-20 h-20 object-contain mb-2"
//                           />
//                           <span className="text-xs font-medium text-center">
//                             {install.name}
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   </section>

//                   {/* Choose Patterns */}
//                   <section>
//                     <h3 className="text-lg font-semibold mb-3">
//                       Choose Patterns
//                     </h3>
//                     <div className="grid grid-cols-3 gap-4">
//                       {product.configure.patterns?.map((pattern, i) => (
//                         <button
//                           key={i}
//                           onClick={() => setSelectedPattern(pattern)}
//                           className={`border rounded-xl overflow-hidden hover:shadow transition ${
//                             selectedPattern?.name === pattern.name
//                               ? "ring ring-black"
//                               : ""
//                           }`}
//                         >
//                           <img
//                             src={pattern.image}
//                             alt={pattern.name}
//                             className="w-full h-40 object-cover"
//                           />
//                           <div className="p-2 text-left">
//                             <div className="font-medium text-sm">
//                               {pattern.name}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {pattern.options} Options
//                             </div>
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   </section>
//                 </div>
//               )}

//               {activeRightTab === "Coordinates" && (
//                 <div className="grid grid-cols-3 gap-4 mb-8">
//                   {product.coordinates?.map((c) => (
//                     <div key={c.sku} className="flex flex-col items-center">
//                       <img
//                         src={c.image}
//                         alt={c.sku}
//                         className="w-28 h-20 rounded object-cover shadow"
//                       />
//                       <span className="mt-1 text-sm text-gray-600">
//                         {c.sku}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Bottom history controls */}
//           <div className="flex items-center justify-center space-x-4">
//             <button
//               onClick={goPrev}
//               disabled={!canGoPrev}
//               className={clsx(
//                 "w-12 h-12 flex items-center justify-center rounded-full",
//                 canGoPrev
//                   ? "bg-gray-300 hover:bg-gray-400"
//                   : "bg-gray-200 opacity-50 cursor-not-allowed"
//               )}
//             >
//               «
//             </button>
//             <button
//               onClick={resetHistory}
//               className="px-6 py-2 rounded-md bg-gray-300 text-gray-700 font-medium hover:bg-gray-400"
//             >
//               Reset & Clear History
//             </button>
//             <button
//               onClick={goNext}
//               disabled={!canGoNext}
//               className={clsx(
//                 "w-12 h-12 flex items-center justify-center rounded-full",
//                 canGoNext
//                   ? "bg-gray-300 hover:bg-gray-400"
//                   : "bg-gray-200 opacity-50 cursor-not-allowed"
//               )}
//             >
//               »
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/ProductDetails.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import ThreeD from "./ThreeD";
import Swatch from "./Swatch";
import productsData from "../data/products.json";

interface Product {
  id: string;
  sku: string;
  image: string;
  isNew?: boolean;
  colors: { code: string; label: string }[];
  rooms: { name: string; image: string }[];
  colorways: { sku: string; image: string }[];
  coordinates: { sku: string; image: string }[];
  configure?: {
    sizes?: { label: string; bgColor?: string }[];
    installs?: { name: string; image: string }[];
    patterns?: { name: string; image: string; options: number }[];
  };
}

type RightTab = "Colors" | "Rooms" | "Colorways" | "Configure" | "Coordinates";
type MainTab = "swatch" | "room";

export default function ProductDetails() {
  const { sku } = useParams<{ sku: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<MainTab>("swatch");
  const [activeRightTab, setActiveRightTab] = useState<RightTab>("Colors");

  // --- States ---
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<{
    label: string;
    bgColor?: string;
  } | null>(null);
  const [selectedInstall, setSelectedInstall] = useState<{
    name: string;
    image: string;
  } | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<{
    name: string;
    image: string;
    options: number;
  } | null>(null);
  const [appliedDesign, setAppliedDesign] = useState<string[][]>([]);
  const [history, setHistory] = useState<number[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // --- Fetch product ---
  useEffect(() => {
    const found = (productsData.products as Product[]).find(
      (p) => p.sku === sku
    );
    setProduct(found || null);
    setSelectedColorIndex(null);
    setHistory([]);
    setHistoryIndex(-1);
    setActiveRightTab("Colors");
    setActiveTab("swatch");
  }, [sku]);

  // --- Derived Data ---
  const canGoPrev = historyIndex > 0;
  const canGoNext = historyIndex < history.length - 1;
  const filteredRooms = useMemo(
    () =>
      selectedRoom
        ? product?.rooms.filter((r) => r.name === selectedRoom)
        : product?.rooms,
    [selectedRoom, product]
  );

  // --- Handlers ---
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
        ❌ Product not found
      </div>
    );

  // --- Components ---
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

  const SectionTitle = ({ title }: { title: string }) => (
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
  );

  return (
    <div className="mx-auto px-6 py-30 grid md:grid-cols-5 gap-8">
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
                selectedColorIndex !== null
                  ? product.colors[selectedColorIndex]
                  : null
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
            {(
              [
                "Colors",
                "Rooms",
                "Colorways",
                "Configure",
                "Coordinates",
              ] as RightTab[]
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
              <div className="grid grid-cols-4 gap-6">
                {product.colors.map((c, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      role="button"
                      aria-label={`Select color ${c.label}`}
                      onClick={() => handleSelectColor(idx)}
                      className={clsx(
                        "w-24 h-20 rounded-md shadow-sm cursor-pointer hover:scale-105 transition-transform",
                        selectedColorIndex === idx &&
                          "ring-4 ring-offset-2 ring-blue-950"
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
                      onClick={() =>
                        setSelectedRoom((prev) =>
                          prev === r.name ? null : r.name
                        )
                      }
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
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-2 text-left">
                        <div className="text-sm font-medium">{room.name}</div>
                        <div className="text-sm text-gray-500">
                          Preview in {room.name}
                        </div>
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
                      className="w-full h-full rounded object-cover shadow"
                    />
                    <span className="mt-1 text-sm text-gray-600">{c.sku}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CONFIGURE */}
            {activeRightTab === "Configure" && product.configure && (
              <div className="">
                {/* Size */}
                <section>
                  <SectionTitle title="Choose Size" />
                  <div className="grid grid-cols-3 gap-4">
                    {product.configure.sizes?.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSize(s)}
                        className={clsx(
                          " rounded-xl p-4 hover:shadow transition",
                          selectedSize?.label === s.label && "ring ring-black"
                        )}
                      >
                        <div
                          className="w-24 h-24 flex items-center justify-center font-medium rounded"
                          style={{ backgroundColor: s.bgColor || "#d6c5a0" }}
                        >
                          {s.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Install */}
                <section>
                  <SectionTitle title="Choose Install" />
                  <div className="grid grid-cols-4 gap-4">
                    {product.configure.installs?.map((install, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedInstall(install)}
                        className={clsx(
                          "flex flex-col items-center  rounded-xl p-4 hover:shadow transition",
                          selectedInstall?.name === install.name &&
                            "ring ring-black"
                        )}
                      >
                        <img
                          src={install.image}
                          alt={install.name}
                          className="w-20 h-20 object-contain mb-2"
                        />
                        <span className="text-xs font-medium text-center">
                          {install.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Pattern */}
                <section>
                  <SectionTitle title="Choose Patterns" />
                  <div className="grid grid-cols-3 gap-4">
                    {product.configure.patterns?.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedPattern(p)}
                        className={clsx(
                          "border-b rounded-xl overflow-hidden hover:shadow transition",
                          selectedPattern?.name === p.name && "ring ring-black"
                        )}
                      >
                        <div className=" flex flex-col">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="p-2 text-left">
                            <div className="font-medium text-sm">{p.name}</div>
                            <div className="text-xs text-gray-500">
                              {p.options} Options
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
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
                      className="w-full h-full rounded object-cover shadow"
                    />
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
      </div>
    </div>
  );
}
