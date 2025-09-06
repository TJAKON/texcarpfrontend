import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white backdrop-blur-md shadow-md z-50">
      <div className=" mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <p className=" text-7xl font-extralight text-blue-950/80">
            Tex
            <span className="text-yellow-600/80 text-6xl font-thin uppercase">
              Carp
            </span>
          </p>
          <img src="/logo1.png" alt="TexCarp Logo" className="h-20 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-thin text-blue-950/80 text-5xl uppercase ">
          <Link
            to="/"
            className=" hover:text-yellow-400/95 transition duration-400 delay-50"
          >
            Home
          </Link>
          <Link
            to="/about"
            className=" hover:text-yellow-400/95 transition duration-400 delay-50"
          >
            About Us
          </Link>
          <Link
            to="/products"
            className=" hover:text-yellow-400/95 transition duration-400 delay-50"
          >
            Products
          </Link>
          <Link
            to="/Blogs"
            className=" hover:text-yellow-400/95 transition duration-400 delay-50"
          >
            Blogs
          </Link>
          <Link
            to="/contact"
            className=" hover:text-yellow-400/95 transition duration-400 delay-50"
          >
            Contact Us
          </Link>
          {/* <Link to="/admin" className="text-white">
            Admin
          </Link> */}
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
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-black"
            >
              About
            </Link>
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-black"
            >
              Products
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-black"
            >
              Contact
            </Link>
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="text-white"
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
