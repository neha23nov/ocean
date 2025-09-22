import { Link, useLocation } from "react-router-dom";

export default function SpeciesDetails() {
  const location = useLocation();
  const species = location.state?.species;

  // Fallback when species data is missing (e.g., page refresh)
  if (!species) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-white">
        <h1 className="text-2xl font-bold mb-4">No Species Data Found</h1>
        <p className="mb-6 text-lg text-gray-300">
          Try navigating from the Biodiversity page again.
        </p>
        <Link
          to="/biodiversity"
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-lg text-black font-semibold"
        >
          ← Back to Biodiversity
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-white min-h-screen overflow-y-auto">
      <header className="bg-blue-900 py-6 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {species?.title || species?.name}
          </h1>
          <Link
            to="/biodiversity"
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-lg text-black font-semibold"
          >
            ← Back to Biodiversity
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Main species image */}
        {species?.img && (
          <img
            src={species.img}
            alt={species.title || species.name}
            className="w-full max-h-[400px] object-cover rounded-lg shadow-lg mb-8"
          />
        )}

        <div className="bg-[#1E2530] p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            About {species?.title || species?.name}
          </h2>
          <p className="text-lg mb-4">
            {species?.details || species?.desc || "No details available."}
          </p>
          {species?.datasetLink && (
            <a
              href={species.datasetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold"
            >
              View Research Dataset
            </a>
          )}
        </div>

        {/* Variants */}
        {species?.variants && species.variants.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Species Variants
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {species.variants.map((v, idx) => (
                <div
                  key={idx}
                  className="bg-[#1E2530] rounded-xl p-4 shadow-lg"
                >
                  {v.img && (
                    <img
                      src={v.img}
                      alt={v.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">
                    {v.name}
                  </h4>
                  <p className="text-white mb-2">
                    {v.desc || "No description available."}
                  </p>
                  {v.datasetLink && (
                    <a
                      href={v.datasetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold"
                    >
                      View Dataset
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
