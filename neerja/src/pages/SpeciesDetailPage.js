// src/pages/SpeciesDetailPage.js
import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";

const SpeciesDetailPage = () => {
  const { name } = useParams(); // species name from the URL
  const location = useLocation();
  const { species } = location.state || {}; // full species object passed

  return (
    <div className="bg-background-light dark:bg-background-dark text-white min-h-screen">
      {/* Header */}
      <header className="bg-blue-900 py-6 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {species?.title || species?.name || name}
          </h1>
          <Link
            to="/biodiversity"
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-lg text-black font-semibold"
          >
            ← Back to Biodiversity
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Species Image */}
        {species?.img || species?.image ? (
          <img
            src={species.img || species.image}
            alt={species.title || species.name}
            className="w-full max-h-[400px] object-cover rounded-lg shadow-lg mb-8"
          />
        ) : null}

        {/* Species Details */}
        <div className="bg-[#1E2530] p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            About {species?.title || species?.name}
          </h2>
          <p className="text-lg mb-4">
            {species?.details || species?.description || species?.desc || "No details available."}
          </p>

          {/* Dataset / Research Section */}
          {species?.datasetLink && (
            <div className="mt-6">
              <a
                href={species.datasetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold"
              >
                View Research Dataset
              </a>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 text-center py-4 mt-12">
        <p className="text-sm text-gray-300">
          © 2024 Ocean Insights. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default SpeciesDetailPage;
