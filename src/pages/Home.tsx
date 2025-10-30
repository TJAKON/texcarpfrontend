"use client";

import { useState } from "react";

const panels = [
  { id: 1, title: "Customize", image: "/carpet5.jpeg" },
  { id: 2, title: "What's New", image: "/carpet7.jpeg" },
  { id: 3, title: "Inspiration", image: "/carpet3.jpeg" },
  { id: 4, title: "Tackboards", image: "/carpet8.jpeg" },
];

export default function Home() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <section className="relative w-full h-screen md:h-screen overflow-hidden">
        {/* Background with Parallax */}
        {/* <div
          className="absolute inset-0 w-full h-full bg-center bg-cover transform transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: "url('/hero.mp4')", // replace with your immersive carpet banner
          }}
        /> */}

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Glass-like Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 backdrop-blur-xs" />
        <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/20 blur-3xl rounded-full  animate-pulse" />
        <div className="absolute bottom-16 right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl animate-bounce" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
            Welcome to <span className="text-yellow-400">TexCarp</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl drop-shadow">
            Step into the future of carpets with{" "}
            <span className="text-yellow-300 font-semibold uppercase">
              Immersive 2D & 3D
            </span>{" "}
            experiences like never before.
          </p>

          {/* Call to Action */}
          {/* <div className="flex gap-6">
            <Link
              to="/products"
              className="px-8 py-4 bg-yellow-400 text-black text-xl font-semibold rounded-full shadow-2xl hover:bg-yellow-500 transform hover:scale-105 hover:-rotate-1 transition"
            >
              Explore Products
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 bg-white/20 border border-white text-xl font-semibold rounded-full shadow-2xl hover:bg-white/30 backdrop-blur-sm transform hover:scale-105 hover:rotate-1 transition"
            >
              Learn More
            </Link>
          </div> */}
        </div>
      </section>

      <div className=" hidden sm:block">
        <section className="  flex w-full h-screen overflow-hidden">
          {panels.map((panel, idx) => (
            <div
              key={panel.id}
              className={`relative flex-1 transition-all duration-900 ease-in-out cursor-pointer
            ${active === idx ? "flex-[2]" : "flex-[1]"}`}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Background Image */}
              <img
                src={panel.image}
                alt={panel.title}
                className="w-full h-full object-cover transition-transform duration-900 hover:scale-90"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-3xl font-semibold">
                  {panel.title}
                </h2>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
