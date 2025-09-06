export default function Contact() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-4 text-gray-600">We’d love to hear from you!</p>
      
      <form className="mt-6 space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border px-4 py-2 rounded h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Send
        </button>
      </form>
    </div>
  );
}
