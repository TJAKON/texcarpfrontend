import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-30 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">
        {/* Left Side - Contact Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
          <p className="text-gray-600">
            Have questions or want to work with us? Fill out the form, and we’ll
            get back to you soon.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700">+91 90110 08838</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700">info@textcarp.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700">
                A 1001 Park Grandeur, Balewadi High Street, Balewadi, Pune,
                Maharashtra, 411045
              </span>
            </div>
          </div>

          <div className="mt-6 overflow-hidden h-60">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14379.690218555901!2d73.775224!3d18.571536!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b93458ad6251%3A0x3793d5d66e7454e0!2sPark%20Grandeur!5e1!3m2!1sen!2sin!4v1757398476542!5m2!1sen!2sin"
              width="500"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Your Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              placeholder="Write your message..."
              className="w-full border px-4 py-3 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
