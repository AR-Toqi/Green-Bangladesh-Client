import React from "react";

export default function AdminUsersPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      <p className="text-sm text-gray-500 mb-6">Manage roles and status for all platform users.</p>
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">USER</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 italic">ACTIVE</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button className="text-blue-600 hover:text-blue-900">Change Role</button>
                <button className="text-red-600 hover:text-red-900">Block</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
