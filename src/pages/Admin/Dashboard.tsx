export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4 text-gray-600">Overview of your TexCarp system.</p>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-gray-600">Manage your carpet inventory.</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-gray-600">View and manage registered users.</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="text-gray-600">Configure your admin preferences.</p>
        </div>
      </div>
    </div>
  );
}
