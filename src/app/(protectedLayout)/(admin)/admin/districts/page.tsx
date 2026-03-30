import React from "react";

export default function AdminDistrictsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold">Manage District Environmental Data</h1>
      <p className="text-sm text-gray-500 mb-6">Update tree counts, area, and density for 64 districts.</p>
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area (km²)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Trees</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Dhaka</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dhaka</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1463</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,511,200</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
