export default function About() {
  return (
    <section className="bg-gray-50 text-gray-800 py-20">
      {/* Hero / Intro */}
      <div className="text-center py-20 px-6 bg-gradient-to-r from-blue-100 to-blue-50">
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          For over two decades, <span className="font-semibold">TexCarp</span>{" "}
          has been redefining flooring solutions with premium carpets that
          combine{" "}
          <span className="font-medium">style, comfort, and durability</span>.
          From elegant broadloom to versatile carpet tiles, we bring innovation
          to commercial and residential spaces alike.
        </p>
      </div>

      {/* Stats / Highlights */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center py-12">
        <div>
          <h3 className="text-3xl font-bold text-blue-600">20+</h3>
          <p className="text-gray-600">Years of Excellence</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-blue-600">500+</h3>
          <p className="text-gray-600">Projects Completed</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-blue-600">100+</h3>
          <p className="text-gray-600">Corporate Clients</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-blue-600">10+</h3>
          <p className="text-gray-600">Countries Served</p>
        </div>
      </div>

      {/* Founder Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <div className="w-56 h-56 rounded-full overflow-hidden shadow-lg border-4 border-blue-100">
            <img
              src="/logo1.png"
              alt="Founder Rajat Jain"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Meet Our Founder</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            <span className="font-semibold">Mr. Rajat Jain</span> established
            TexCarp with a vision to create world-class carpets that merge
            tradition with modern innovation. A{" "}
            <span className="font-semibold">
              Textile Technologist (V.J.T.I. Mumbai)
            </span>{" "}
            and{" "}
            <span className="font-semibold">
              Postgraduate in Environmental Sciences (University of Illinois,
              USA)
            </span>
            , Rajat brings unmatched expertise and global perspective.
          </p>
          <p className="mt-3 text-gray-600 leading-relaxed">
            With <span className="font-semibold">20+ years</span> of diverse
            experience across continents, including leadership roles at Arvind
            Mills, Brintons Carpets, and Snowhite Textiles, his technical skills
            and leadership have propelled TexCarp to international recognition.
          </p>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-600">Our Mission</h3>
            <p className="mt-3 text-gray-600">
              To design and deliver carpets that blend beauty with durability,
              enhancing spaces across the world.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-600">Our Vision</h3>
            <p className="mt-3 text-gray-600">
              To be a global leader in innovative flooring solutions that
              inspire and comfort generations.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-600">Our Values</h3>
            <p className="mt-3 text-gray-600">
              Quality, innovation, sustainability, and customer satisfaction
              form the foundation of everything we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
