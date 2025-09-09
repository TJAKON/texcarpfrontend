import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white container mx-auto border-t border-gray-200 relative">
      <div className="px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + Tagline */}
        <div>
          <Link to="/" className="flex items-center space-x-3">
            <p className="text-5xl font-extralight text-blue-950/80">
              Tex
              <span className="text-yellow-600/80 text-4xl font-thin uppercase">
                Carp
              </span>
            </p>
            <img src="/logo1.png" alt="TexCarp Logo" className="h-14 w-auto" />
          </Link>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Redefining carpets with immersive 2D & 3D experiences. Bringing
            design, comfort, and technology together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Links
          </h4>
          <nav className="flex flex-col space-y-2 text-gray-700 text-sm">
            <Link to="/" className="hover:text-amber-600">
              Home
            </Link>
            <Link to="/about" className="hover:text-amber-600">
              About Us
            </Link>
            <Link to="/products" className="hover:text-amber-600">
              Products
            </Link>
            <Link to="/blogs" className="hover:text-amber-600">
              Blogs
            </Link>
            <Link to="/contact" className="hover:text-amber-600">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Contact + Social */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Get in Touch
          </h4>
          <p className="text-gray-700 text-sm mb-2">
            📍 A 1001 Park Grandeur, Balewadi High Street, Balewadi, Pune,
            Maharashtra, 411045
          </p>
          <p className="text-gray-700 text-sm mb-2">📧 info@texcarp.com</p>
          <p className="text-gray-700 text-sm mb-4">📞 +91 90110 08838</p>
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-amber-600 hover:text-white transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-amber-600 hover:text-white transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-amber-600 hover:text-white transition"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 text-xs py-4 border-t border-gray-200">
        © {new Date().getFullYear()} TexCarp Consulting Pvt Ltd. All rights
        reserved.
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-6 bottom-6 p-3 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
