import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

// Data
const temperatureData = [
  { month: "Jan", value: 18 },
  { month: "Feb", value: 20 },
  { month: "Mar", value: 22 },
  { month: "Apr", value: 21 },
  { month: "May", value: 23 },
  { month: "Jun", value: 24 },
  { month: "Jul", value: 22 },
];

const salinityData = [
  { month: "Jan", value: 34 },
  { month: "Feb", value: 35 },
  { month: "Mar", value: 36 },
  { month: "Apr", value: 35 },
  { month: "May", value: 34.5 },
  { month: "Jun", value: 35 },
  { month: "Jul", value: 34.8 },
];

const fishCatchData = [
  { species: "Cod", kg: 1500 },
  { species: "Salmon", kg: 1000 },
  { species: "Tuna", kg: 600 },
  { species: "Mackerel", kg: 1800 },
];

const Analysis = () => {
  return (
    <div className="min-h-screen p-6 bg-[#0D1117] text-white">
      <h1 className="text-4xl font-bold mb-8">Coastal Marine Analysis</h1>

      {/* Temperature Line Chart */}
      <div className="bg-[#1A2024] rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Temperature Trends (°C)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={temperatureData}>
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1193d4"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Salinity Bar Chart */}
      <div className="bg-[#1A2024] rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Salinity Variation (ppt)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={salinityData}>
            <CartesianGrid stroke="#283339" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Bar dataKey="value" fill="#1193d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Fish Catch Horizontal Bar Chart */}
      <div className="bg-[#1A2024] rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Fish Catch Intensity (kg)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={fishCatchData}
            layout="vertical"
            margin={{ top: 20, right: 20, bottom: 20, left: 50 }}
          >
            <XAxis type="number" stroke="#9ca3af" />
            <YAxis
              dataKey="species"
              type="category"
              stroke="#9ca3af"
              width={80}
            />
            <Tooltip />
            <Bar dataKey="kg" fill="#1193d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Coral Reef Section */}
      <div className="bg-[#1A2024] p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-4">Coral Reef Information</h1>
        <h2 className="text-xl text-blue-400 font-semibold mb-2">Coral Reef Health</h2>
        <p className="text-gray-300 mb-4">
          Detailed information about the coral reef ecosystem, including species diversity,
          health status, and the impact of environmental changes. Monitoring these vibrant
          underwater cities is crucial for understanding the overall ecosystem dynamics.
        </p>
        <div className="flex gap-4">
          {/* Dummy Images */}
          <div className="w-1/2 h-40 bg-gray-700 rounded-lg flex items-center justify-center">
            Dummy Image 1
          </div>
          <div className="w-1/2 h-40 bg-gray-700 rounded-lg flex items-center justify-center">
            Dummy Image 2
          </div>
        </div>
      </div>

      {/* Downloads + Resources */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Downloads */}
        <div className="bg-[#1A2024] p-6 rounded-lg flex-1">
          <h2 className="text-2xl font-bold mb-4">Downloads</h2>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg mr-4">
            📊 Download CSV
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg">
            📄 Download PDF
          </button>
        </div>

        {/* Resources */}
        <div className="bg-[#1A2024] p-6 rounded-lg flex-1">
          <h2 className="text-2xl font-bold mb-4">Educational Resources</h2>
          <div className="bg-[#2A2F36] p-4 rounded-lg mb-4">
            📘 <strong>Research Paper: Marine Ecosystems</strong>
            <p className="text-gray-400 text-sm">
              A comprehensive study on marine ecosystems.
            </p>
          </div>
          <div className="bg-[#2A2F36] p-4 rounded-lg">
            📘 <strong>Article: Marine Conservation</strong>
            <p className="text-gray-400 text-sm">
              Learn about the importance of marine conservation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
