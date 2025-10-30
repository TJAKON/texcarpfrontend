import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 md:px-8 py-4 sm:py-2">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <p className="text-4xl md:text-6xl font-light text-blue-950">
              Tex
              <span className="text-yellow-400 font-thin uppercase">Carp</span>
            </p>
            <img
              src="/logo1.png"
              alt="TexCarp Logo"
              className="h-10 md:h-18 w-auto"
            />
          </Link>
          {/* Desktop CTA Button */}
          <Link
            to="/broadloom"
            className="hidden md:block bg-blue-900 hover:bg-blue-950 text-white text-xl px-8 py-3 rounded-full font-medium transition"
          >
            Broadloom
          </Link>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-10 text-blue-950 text-3xl font-light uppercase">
            <Link to="/About" className="hover:text-yellow-400 transition">
              About us
            </Link>
            <Link to="/Contact" className="hover:text-yellow-400 transition">
              Contact us
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-3xl text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t shadow-lg">
          <nav className="flex flex-col gap-4 py-5 px-6 text-lg">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-900 hover:text-blue-700"
            >
              Home
            </Link>
            <Link
              to="/About"
              onClick={() => setMenuOpen(false)}
              className="text-gray-900 hover:text-blue-700"
            >
              About
            </Link>

            {/* Product Buttons */}
            {/* <Link to="/carpetTile" onClick={() => setMenuOpen(false)} className="bg-yellow-400 text-black py-2 rounded-lg text-center">Carpet Tiles</Link> */}

            <Link
              to="/Contact"
              onClick={() => setMenuOpen(false)}
              className="text-gray-900 hover:text-blue-700"
            >
              Contact
            </Link>
            <Link
              to="/broadloom"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-900 text-white py-2 rounded-lg text-center"
            >
              Broadloom
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
