import React from "react";

export default function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-[#0D1117] text-white p-6 overflow-y-auto">
      {/* Data Layers */}
      <h2 className="text-lg font-bold mb-3">Data Layers</h2>
      <ul className="space-y-2 mb-6">
        {[
          "Temperature",
          "Salinity",
          "Currents",
          "Winds",
          "Tide Stations",
          "Fisheries Zones",
          "Plankton Density",
        ].map((item) => (
          <li key={item} className="flex items-center space-x-2">
            <input type="checkbox" className="accent-blue-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Filters */}
      <h2 className="text-lg font-bold mb-3">Filters</h2>

      <label className="block text-sm mb-1">Region</label>
      <select className="w-full bg-[#161B22] border border-gray-700 rounded p-2 mb-4">
        <option>All Regions</option>
      </select>

      <label className="block text-sm mb-1">Season</label>
      <select className="w-full bg-[#161B22] border border-gray-700 rounded p-2 mb-4">
        <option>All Seasons</option>
      </select>

      <label className="block text-sm mb-1">Fish Species</label>
      <select className="w-full bg-[#161B22] border border-gray-700 rounded p-2">
        <option>All Species</option>
      </select>
    </aside>
  );
}
