export default function About() {
  return (
    <div className="p-8 py-40 bg-white text-gray-800 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center">About Us</h1>

      {/* Company Description */}
      <p className="mt-4 text-center max-w-3xl mx-auto leading-relaxed">
        TexCarp has been crafting high-quality carpets for over 20 years. We
        specialize in Broadloom and Carpet Tiles, offering a wide variety of
        styles, colors, and textures to fit both commercial and residential
        spaces.
      </p>

      {/* Owner Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
        {/* Owner Image */}
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg">
          <img
            src="/logo1.png" // 👈 place your image in the public/ folder
            alt="Owner of TexCarp"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Owner Text */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">Meet Our Founder</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Our founder, <span className="font-semibold">Mr. Rajat Jain</span>,
            started TexCarp with a vision to bring style, comfort, and
            durability together in every carpet we produce. His passion for
            innovation and commitment to quality have driven our growth over the
            last two decades. TexCarp is the brainchild of{" "}
            <span className="font-semibold">Mr. Rajat Jain</span>, who after
            having worked for 18 years founded this firm. With the vast amount
            of experience as its driving force, TexCarp has escalated to great
            heights. Rajat graduated as a Textile Technologist from V.J.T.I.
            Mumbai and went on to gain a postgraduate degree in Environmental
            Sciences from the University of Illinois in USA. He is also
            certified PMP (Project Management Professional) from Project
            Management Institute, Philadelphia. He has diverse experience of two
            decades in various continents. He is known for his technical skills,
            execution and leadership. His working experience in several
            countries brings in great understanding of various markets and
            working requirements. During his successful career, he supported
            organizations like Arvind Mills, Brintons Carpets, Snowhite Textiles
            and University of Illinois to name a few.
          </p>
        </div>
      </div>
    </div>
  );
}
