import React from "react";

export default function AdminPlantationsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold">Moderation Queue: Plantation Reports</h1>
      <p className="text-sm text-gray-500 mb-6">Review, verify, or delete reports to main platform integrity.</p>
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trees</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-03-31</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">User #123</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Khulna</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 hover:text-red-900 cursor-pointer">Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
