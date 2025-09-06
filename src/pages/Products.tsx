// src/pages/Products.tsx
import { Heart } from "lucide-react";
import { useState, useMemo } from "react";
import { FiSearch, FiShoppingCart, FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";

type Item = {
  id: string;
  sku: string;
  image: string;
  isNew?: boolean;
};

const items: Item[] = [
  { id: "1", sku: "ZD501", image: "/floor1.jpeg", isNew: true },
  { id: "2", sku: "ZD502", image: "/floor2.jpeg", isNew: true },
  { id: "3", sku: "ZD503", image: "/floor3.jpeg" },
  { id: "4", sku: "ZD504", image: "/floor4.jpeg" },
  { id: "5", sku: "ZD505", image: "/floor5.jpeg", isNew: true },
  { id: "6", sku: "ZD506", image: "/floor6.jpeg" },
  { id: "7", sku: "ZD507", image: "/floor7.jpeg" },
  { id: "8", sku: "ZD508", image: "/floor8.jpeg" },
];

export default function Products() {
  const [viewInColor, setViewInColor] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [filterNewOnly, setFilterNewOnly] = useState(false);
  const [search, setSearch] = useState("");

  // toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // derive filtered products
  const filteredItems = useMemo(() => {
    return items.filter((it) => {
      if (filterNewOnly && !it.isNew) return false;
      if (search && !it.sku.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [filterNewOnly, search]);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <section className="relative w-full h-[70vh] md:h-[50vh] flex items-end justify-center">
        {/* Background Image */}
        <img
          src="/carpet8.jpeg" // replace with your banner image
          alt="TexCarp Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Text Content */}
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-thin uppercase text-yellow-400 mb-4">
            Products
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Experience carpets in <span className="font-semibold">2D & 3D</span>{" "}
            like never before
          </p>
        </div>
      </section>
      {/* Title Area */}
      <section className="relative bg-amber-100/60 py-8">
        <div className="container mx-auto px-6">
          {/* faded centered heading */}
          {/* <h1
            className="pointer-events-none select-none text-center text-6xl md:text-7xl font-serif text-gray-200"
            aria-hidden
          >
            Products
          </h1> */}

          {/* Controls row */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Search */}
            <div className="flex items-center w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search by SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Center toggle */}
            <div className="flex-shrink-0 text-center">
              <label className="inline-flex items-center gap-3 text-gray-500">
                <span>View in Color</span>
                <button
                  onClick={() => setViewInColor((s) => !s)}
                  className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors
                    ${viewInColor ? "bg-indigo-600" : "bg-gray-300"}`}
                  aria-pressed={viewInColor}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transform transition-transform ${
                      viewInColor ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </label>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Favorites */}
              <button
                onClick={() => setFilterNewOnly(false)}
                className="flex items-center gap-2 border rounded-full px-4 py-2 hover:bg-gray-100"
              >
                <Heart
                  className={`${
                    Object.values(favorites).some(Boolean) ? "text-red-500" : ""
                  }`}
                />
                <span className="hidden md:inline">
                  {Object.values(favorites).filter(Boolean).length}
                </span>
              </button>

              {/* Filter new only */}
              <button
                onClick={() => setFilterNewOnly((s) => !s)}
                className={`flex items-center gap-2 border rounded-full px-4 py-2 hover:bg-gray-100 ${
                  filterNewOnly ? "bg-indigo-50 border-indigo-400" : ""
                }`}
              >
                <FiFilter />
                <span className="hidden md:inline">
                  {filterNewOnly ? "New Only" : "Filter (0)"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Product Grid */}
      <section className="container mx-auto px-6 py-12">
        {filteredItems.length === 0 ? (
          <div className="text-center text-gray-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {filteredItems.map((it) => (
              <article
                key={it.id}
                className="group bg-white rounded-xl overflow-hidden relative shadow-sm"
              >
                <div className="relative h-44 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {/* image */}
                  <img
                    src={it.image}
                    alt={it.sku}
                    className={`w-full h-44 object-cover transition-transform group-hover:scale-120 ${
                      viewInColor ? "" : "filter grayscale"
                    }`}
                  />

                  {/* New badge */}
                  {it.isNew && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-black text-sm font-medium px-3 py-1 rounded-full shadow">
                      New
                    </div>
                  )}

                  {/* Favorite toggle */}
                  <button
                    onClick={() => toggleFavorite(it.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:scale-110 transition"
                  >
                    <Heart
                      className={`${
                        favorites[it.id] ? "text-red-500" : "text-black"
                      }`}
                    />
                  </button>
                </div>

                {/* SKU / actions */}
                <div className="px-3 py-3">
                  <div className="text-sm text-gray-600 mb-2">{it.sku}</div>

                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={`/product/${it.sku}`}
                      className="text-xs uppercase tracking-wide text-gray-700 hover:underline"
                    >
                      View
                    </Link>
                    <div className="flex gap-2 items-center">
                      <button
                        title="Add to cart"
                        className="p-2 rounded hover:bg-gray-100"
                        aria-label="Add to cart"
                      >
                        <FiShoppingCart className="h-6 w-6" />
                      </button>
                      <button
                        title="Quick view"
                        className="p-2 rounded hover:bg-gray-100"
                        aria-label="Quick view"
                      >
                        <FiSearch className="h-6 w-6"/>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
