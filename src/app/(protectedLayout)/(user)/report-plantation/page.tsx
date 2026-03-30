import React from "react";

export default function ReportPlantationPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold font-sans">Report Tree Plantation</h1>
      <form className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Trees</label>
          <input type="number" min="1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">District</label>
          <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option>Select District</option>
            {/* List of 64 districts */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location Description</label>
          <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows={3}></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Plantation Date</label>
          <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">Submit Report</button>
      </form>
    </div>
  );
}
