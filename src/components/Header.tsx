import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-xs shadow-md z-50">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className=" flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <p className="text-6xl font-extralight text-blue-950/80">
              Tex
              <span className="text-yellow-300/100 text-5xl font-thin uppercase">
                Carp
              </span>
            </p>
            <img src="/logo1.png" alt="TexCarp Logo" className="h-18 w-auto" />
          </Link>

          <div className="flex gap-3">
            <Link
              to="/broadloom"
              className="bg-blue-900/90 hover:bg-blue-950 text-white px-5 py-2 rounded-full font-semibold transition duration-300"
            >
              Broadloom
            </Link>
          </div>
          {/* <Link
            to="/carpetTile"
            className="bg-yellow-400/90 hover:bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold transition duration-300"
          >
            Carpet Tiles
          </Link> */}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-thin text-blue-950 text-2xl uppercase">
          {/* <Link
            to="/"
            className="hover:text-yellow-400/95 transition duration-400 delay-50"
          >
            Home
          </Link> */}
          <Link
            to="/About"
            className="hover:text-yellow-400/95 transition duration-400 delay-50"
          >
            About Us
          </Link>
          {/* <Link
            to="/Products"
            className="hover:text-yellow-400/95 transition duration-400 delay-50"
          >
            Products
          </Link> */}

          {/* Separate buttons for listings */}

          {/* <Link
            to="/Blogs"
            className="hover:text-yellow-400/95 transition duration-400 delay-50"
          >
            Blogs
          </Link> */}
          <Link
            to="/Contact"
            className="hover:text-yellow-400/95 transition duration-400 delay-50"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/20 backdrop-blur-sm border-t shadow-lg">
          <nav className="flex flex-col space-y-4 py-6 px-6 font-medium">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-black"
            >
              Home
            </Link>
            <Link
              to="/About"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-black"
            >
              About
            </Link>
            <Link
              to="/Products"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-black"
            >
              Products
            </Link>

            {/* Separate buttons for listings (mobile) */}
            <Link
              to="/CarpetTile/Listing"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-yellow-300 font-semibold"
            >
              Carpet Tiles
            </Link>
            <Link
              to="/Broadloom/Listing"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-yellow-300 font-semibold"
            >
              Broadloom
            </Link>

            <Link
              to="/Blogs"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-black"
            >
              Blogs
            </Link>
            <Link
              to="/Contact"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-black"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
