import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface Product {
  id: string;
  sku: string;
  image: string;
  isNew?: boolean;
  roomImage?: string;
  colors?: { code: string; label: string }[];
}

export default function ProductDetails() {
  const { sku } = useParams<{ sku: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<"swatch" | "room">("swatch");

  // ✅ Updated mock product list with extra fields
  //   const mockProducts: Product[] = [
  //     {
  //       id: "1",
  //       sku: "ZD501",
  //       image: "/floor1.jpeg",
  //       isNew: true,
  //       roomImage: "/room1.jpeg",
  //       colors: [
  //         { code: "#D6CBB5", label: "3019" },
  //         { code: "#3C322B", label: "3120" },
  //         { code: "#5A636E", label: "3507" },
  //         { code: "#8C885A", label: "3415" },
  //       ],
  //     },
  //     {
  //       id: "2",
  //       sku: "ZD499",
  //       image: "/floor2.jpeg",
  //       isNew: true,
  //       roomImage: "/room2.jpeg",
  //       colors: [
  //         { code: "#E6E2D9", label: "3010" },
  //         { code: "#2D2D2D", label: "3100" },
  //         { code: "#6B7C8C", label: "3500" },
  //         { code: "#A9A76E", label: "3400" },
  //       ],
  //     },
  //   ];

  const mockProducts: Product[] = [
    {
      id: "1",
      sku: "ZD501",
      image: "/floor1.jpeg",
      isNew: true,
      roomImage: "/floor1.jpeg",
      colors: [
        { code: "#D6CBB5", label: "3019" },
        { code: "#3C322B", label: "3120" },
        { code: "#5A636E", label: "3507" },
        { code: "#8C885A", label: "3415" },
      ],
    },
    {
      id: "2",
      sku: "ZD502",
      image: "/floor2.jpeg",
      isNew: true,
      roomImage: "/floor2.jpeg",
      colors: [
        { code: "#E6E2D9", label: "3010" },
        { code: "#2D2D2D", label: "3100" },
        { code: "#6B7C8C", label: "3500" },
        { code: "#A9A76E", label: "3400" },
      ],
    },
    {
      id: "3",
      sku: "ZD503",
      image: "/floor3.jpeg",
      isNew: true,
      roomImage: "/floor3.jpeg",
      colors: [
        { code: "#F0E5D8", label: "3001" },
        { code: "#4A3F35", label: "3110" },
        { code: "#7A8B9C", label: "3510" },
        { code: "#B5A96A", label: "3420" },
      ],
    },
    {
      id: "4",
      sku: "ZD504",
      image: "/floor4.jpeg",
      isNew: true,
      roomImage: "/floor4.jpeg",
      colors: [
        { code: "#EFE9DA", label: "3002" },
        { code: "#5C4B3E", label: "3115" },
        { code: "#6E7A85", label: "3512" },
        { code: "#C2B56F", label: "3422" },
      ],
    },
    {
      id: "5",
      sku: "ZD505",
      image: "/floor5.jpeg",
      isNew: true,
      roomImage: "/floor5.jpeg",
      colors: [
        { code: "#F5EBDC", label: "3003" },
        { code: "#3D3A37", label: "3125" },
        { code: "#566270", label: "3514" },
        { code: "#9FA463", label: "3424" },
      ],
    },
    {
      id: "6",
      sku: "ZD506",
      image: "/floor6.jpeg",
      isNew: true,
      roomImage: "/floor6.jpeg",
      colors: [
        { code: "#E8E2CF", label: "3004" },
        { code: "#2F2A28", label: "3130" },
        { code: "#647180", label: "3516" },
        { code: "#AAA75B", label: "3426" },
      ],
    },
    {
      id: "7",
      sku: "ZD507",
      image: "/floor7.jpeg",
      isNew: true,
      roomImage: "/floor7.jpeg",
      colors: [
        { code: "#F2EADA", label: "3005" },
        { code: "#463F38", label: "3135" },
        { code: "#7C848D", label: "3518" },
        { code: "#C7BE74", label: "3428" },
      ],
    },
    {
      id: "8",
      sku: "ZD508",
      image: "/floor8.jpeg",
      isNew: true,
      roomImage: "/floor8.jpeg",
      colors: [
        { code: "#EDE4D2", label: "3006" },
        { code: "#3B322C", label: "3140" },
        { code: "#59626E", label: "3520" },
        { code: "#8F8C55", label: "3430" },
      ],
    },
  ];

  useEffect(() => {
    const found = mockProducts.find((p) => p.sku === sku);
    setProduct(found || null);
  }, [sku]);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600">
        ❌ Product not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-30 grid md:grid-cols-3 gap-8">
      {/* LEFT CONTENT */}
      <div className="md:col-span-2">
        {/* Tabs */}
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

        {/* Image Section */}
        <div className="relative h-[600px] rounded-xl w-full shadow-lg overflow-hidden">
          <img
            src={activeTab === "swatch" ? product.image : product.roomImage}
            alt={product.sku}
            className="rounded-xl w-full object-cover object-center shadow-lg"
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
              New
            </span>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-gray-50 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Colors</h2>
        <div className="grid grid-cols-2 gap-4">
          {product.colors?.map((c, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-md border"
                style={{ backgroundColor: c.code }}
              ></div>
              <span className="text-sm font-medium">{c.label}</span>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">Options</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Different Rooms</li>
          <li>• Multiple Colorways</li>
          <li>• Coordinates</li>
        </ul>
      </div>
    </div>
  );
}
