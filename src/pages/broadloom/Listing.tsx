import { Heart } from "lucide-react";
import { useState, useMemo } from "react";
import { FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";

type Item = {
  id: string;
  sku: string;
  image: string;
  category: "Broadloom";
  isNew?: boolean;
};

// ✅ Broadloom products only
const items: Item[] = [
  {
    id: "1",
    sku: "ZD501",
    image: "/tiles/tile1/Organic_1_Blue.png",
    category: "Broadloom",
    isNew: true,
  },
  {
    id: "2",
    sku: "ZD502",
    image: "/tiles/tile3/Z81544_SG011- Completed.png",
    category: "Broadloom",
  },
  {
    id: "3",
    sku: "ZD503",
    image: "/tiles/tile4/BACKGROUND RUG 1_Flat_Completed.png",
    category: "Broadloom",
  },
  {
    id: "4",
    sku: "ZD504",
    image: "/tiles/tile6/I83087 opt 1.png",
    category: "Broadloom",
    isNew: true,
  },
  {
    id: "5",
    sku: "ZD505",
    image: "/tiles/tile9/Z81541_SG008-Completed.png",
    category: "Broadloom",
  },
];

export default function Listing() {
  const [viewInColor, setViewInColor] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [filterNewOnly, setFilterNewOnly] = useState(false);
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter logic
  const filteredItems = useMemo(() => {
    return items.filter((it) => {
      if (filterNewOnly && !it.isNew) return false;
      if (filterFavoritesOnly && !favorites[it.id]) return false;
      if (search && !it.sku.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [filterNewOnly, filterFavoritesOnly, favorites, search]);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Banner */}
      <section className="relative w-full h-[70vh] md:h-[50vh] flex items-end justify-center">
        <img
          src="/carpet8.jpeg"
          alt="Broadloom Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-thin uppercase text-yellow-400 mb-4">
            Broadloom Collection
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover our premium{" "}
            <span className="font-semibold text-yellow-300">Broadloom</span>{" "}
            carpet designs in stunning detail.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="relative bg-amber-100/60 py-4">
        <div className="container mx-auto px-6">
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="flex items-center w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search by SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* View in Color toggle */}
            <div className="flex-shrink-0 text-center">
              <label className="inline-flex items-center gap-3 text-gray-500">
                <span>View in Color</span>
                <button
                  onClick={() => setViewInColor((s) => !s)}
                  className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors ${
                    viewInColor ? "bg-blue-800/90" : "bg-gray-300"
                  }`}
                  aria-pressed={viewInColor}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transform transition-transform ${
                      viewInColor ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </label>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Favorites count */}
              <button className="flex items-center gap-2 border rounded-full px-4 py-2 hover:bg-gray-100">
                <Heart
                  className={`${
                    Object.values(favorites).some(Boolean) ? "text-red-500" : ""
                  }`}
                />
                <span className="hidden md:inline">
                  {Object.values(favorites).filter(Boolean).length}
                </span>
              </button>

              {/* Filter toggle */}
              <button
                onClick={() => setShowFilterPanel(true)}
                className="flex items-center gap-2 border rounded-full px-4 py-2 hover:bg-gray-100"
              >
                <FiFilter />
                <span className="hidden md:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="w-80 bg-white h-full shadow-lg p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {/* New only */}
            <label className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={filterNewOnly}
                onChange={(e) => setFilterNewOnly(e.target.checked)}
              />
              <span>New Only</span>
            </label>

            {/* Favorites only */}
            <label className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={filterFavoritesOnly}
                onChange={(e) => setFilterFavoritesOnly(e.target.checked)}
              />
              <span>Favorites Only</span>
            </label>

            {/* View in color toggle */}
            <label className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={viewInColor}
                onChange={(e) => setViewInColor(e.target.checked)}
              />
              <span>View in Color</span>
            </label>

            <button
              onClick={() => setShowFilterPanel(false)}
              className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <section className="container mx-auto px-6 py-12">
        {filteredItems.length === 0 ? (
          <div className="text-center text-gray-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {filteredItems.map((it) => (
              <Link
                key={it.id}
                to={`/broadloom/${it.sku}`}
                className="group bg-white rounded-xl overflow-hidden relative shadow-sm hover:shadow-md transition"
              >
                <div className="relative h-60 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={it.image}
                    alt={it.sku}
                    className={`w-full h-full object-cover transition-transform group-hover:scale-110 ${
                      viewInColor ? "" : "filter grayscale"
                    }`}
                  />
                  {it.isNew && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-black text-sm font-medium px-3 py-1 rounded-full shadow">
                      New
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(it.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:scale-110 transition"
                  >
                    <Heart
                      className={`${
                        favorites[it.id] ? "text-red-500" : "text-black"
                      }`}
                    />
                  </button>
                </div>
                <div className="px-3 py-3 text-center">
                  <div className="text-sm text-gray-600 font-semibold">
                    {it.sku}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
