export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Settings</h1>
      <form className="mt-6 space-y-4 max-w-md">
        <label className="block">
          <span className="text-gray-700">Site Title</span>
          <input
            type="text"
            defaultValue="TexCarp Admin"
            className="w-full border px-4 py-2 rounded mt-1"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Theme</span>
          <select className="w-full border px-4 py-2 rounded mt-1">
            <option>Light</option>
            <option>Dark</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
