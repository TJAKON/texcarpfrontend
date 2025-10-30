import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 sm:p-10 rounded-2xl shadow-lg">

        {/* Left Side - Contact Info */}
        <div className="space-y-6 order-2 lg:order-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Get in Touch</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Have questions or want to work with us? Fill out the form, and we’ll get back to you soon.
          </p>

          {/* Contact Info */}
          <div className="space-y-4 text-sm sm:text-base">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-gray-700">+91 90110 08838</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-gray-700">info@textcarp.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-gray-700">
                A 1001 Park Grandeur, Balewadi High Street, Balewadi, Pune, Maharashtra, 411045
              </span>
            </div>
          </div>

          {/* Map */}
          <div className="mt-6 overflow-hidden rounded-xl h-52 sm:h-64 md:h-72">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14379.690218555901!2d73.775224!3d18.571536!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b93458ad6251%3A0x3793d5d66e7454e0!2sPark%20Grandeur!5e1!3m2!1sen!2sin!4v1757398476542!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right Side - Form */}
        <form className="space-y-5 order-1 lg:order-2">
          <div>
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">Your Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">Message</label>
            <textarea
              placeholder="Write your message..."
              className="w-full border px-4 py-3 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
