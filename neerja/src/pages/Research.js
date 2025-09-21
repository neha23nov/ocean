import React from "react";
import ResearchHeader from "../components/Research_header"; // make sure file is PascalCase
import GlobeViewer from "./waste";

export default function Research() {
  return (
    <main className="min-h-screen p-6 text-white bg-[#0D1117]">
      <ResearchHeader />
      
      <div className="mt-6">
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg text-gray-100">
  <h1 className="text-3xl font-bold mb-4 text-white">Research Insights & Environmental Analysis</h1>
  <p className="mb-4 text-gray-300">
    Welcome to the Research Dashboard — a dedicated tool for environmental researchers and analysts. 
    Here, you can explore interactive visualizations of oceanic and water quality data, focusing on key parameters such as <strong className="text-blue-400">salinity</strong> and <strong className="text-red-400">waste concentration</strong> in specific regions.
  </p>
  <p className="mb-4 text-gray-300">
    Our platform allows researchers to:
  </p>
  <ul className="list-disc list-inside mb-4 text-gray-300">
    <li>Visualize water quality metrics across different geographic locations.</li>
    <li>Monitor changes in <strong className="text-blue-400">salinity</strong> and identify high <strong className="text-red-400">waste</strong> concentration areas.</li>
    <li>Access data-driven insights to support environmental research, policymaking, and sustainability projects.</li>
    <li>Compare historical data with current measurements to track trends and anomalies.</li>
  </ul>
  <p className="mb-4 text-gray-300">
    By providing an intuitive and interactive interface, this research page enables scientists and analysts to make informed decisions, identify critical zones of concern, and communicate findings effectively.
  </p>
  <p className="text-gray-300">
    Dive into the data and explore environmental patterns that matter to your research.
  </p>
</div>

      </div>
      {/* <GlobeViewer/> */}
    </main>
  );
}
