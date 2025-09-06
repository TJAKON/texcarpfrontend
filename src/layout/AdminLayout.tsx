import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="block hover:text-gray-300">Dashboard</Link>
          <Link to="/admin/users" className="block hover:text-gray-300">Users</Link>
          <Link to="/admin/settings" className="block hover:text-gray-300">Settings</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-grow bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}
