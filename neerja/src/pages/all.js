import React, { useEffect, useState } from "react";
import ResearchHeader from "../components/Research_header";
import Papa from "papaparse";

export default function WaterQualityScreen() {
  const [salinityData, setSalinityData] = useState([]);
  const [turbidityData, setTurbidityData] = useState([]);
  const [nitrateData, setNitrateData] = useState([]);
  const [globeData, setGlobeData] = useState([]);
  const [result, setResult] = useState(null);
  const [indexes, setIndexes] = useState(null);

  // Prediction model
  const modelPredict = async ({ lat, lon }) => {
    return { weight: Math.random() * 50 + 5, source: "predicted", waste: Math.random() * 20 };
  };

  useEffect(() => {
    fetch("/salinity.json").then(res => res.json()).then(setSalinityData);
    fetch("/turbidity.json").then(res => res.json()).then(setTurbidityData);

    Papa.parse("/nitrate_predictions.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const parsed = result.data
          .map(r => {
            const lat = parseFloat(r.lat || r.Latitude);
            const lon = parseFloat(r.lon || r.Longitude);
            const nitrate = parseFloat(r.nitrate_concentration || r.Nitrate_Concentration);
            if (isNaN(lat) || isNaN(lon) || isNaN(nitrate)) return null;
            return { lat, lon, nitrate };
          })
          .filter(Boolean);
        setNitrateData(parsed);
      }
    });

    fetch("/globe_data.json").then(res => res.json()).then(setGlobeData);
  }, []);

  const normalizeScores = (data) => {
    const wasteScore = Math.max(0, 100 - parseFloat(data.waste) * 5);

    let turbidityScore = 50;
    switch (data.turbidity) {
      case "Bening": turbidityScore = 100; break;
      case "Keruh Ringan": turbidityScore = 70; break;
      case "Keruh Sedang": turbidityScore = 40; break;
      case "Keruh Pekat": turbidityScore = 10; break;
      default: turbidityScore = 50;
    }

    const nitrateVal = parseFloat(data.nitrate) || 0;
    let nitrateScore = 0;
    if (nitrateVal < 10) nitrateScore = 90;
    else if (nitrateVal < 30) nitrateScore = 70;
    else nitrateScore = 40;

    const salinityVal = parseFloat(data.salinity) || 35;
    const salinityScore = Math.max(0, 100 - Math.abs(salinityVal - 35) * 3);

    return { wasteScore, turbidityScore, nitrateScore, salinityScore };
  };

  const computeIndexes = (scores) => {
    const tourist = (
      scores.wasteScore * 0.5 +
      scores.turbidityScore * 0.3 +
      scores.nitrateScore * 0.1 +
      scores.salinityScore * 0.1
    );

    const researcher = (
      scores.wasteScore * 0.25 +
      (100 - scores.turbidityScore) * 0.25 +
      (100 - scores.nitrateScore) * 0.25 +
      (100 - scores.salinityScore) * 0.25
    );

    const fisherman = (
      scores.wasteScore * 0.3 +
      scores.turbidityScore * 0.3 +
      scores.nitrateScore * 0.2 +
      scores.salinityScore * 0.2
    );

    return {
      tourist: tourist.toFixed(1),
      researcher: researcher.toFixed(1),
      fisherman: fisherman.toFixed(1)
    };
  };

  const handleSearch = async () => {
    const lat = parseFloat(document.getElementById("lat").value);
    const lon = parseFloat(document.getElementById("lon").value);

    if (isNaN(lat) || isNaN(lon)) {
      alert("Please enter valid coordinates");
      return;
    }

    const salPoint = salinityData.find(
      p => Math.abs(p.lat - lat) < 0.01 && Math.abs(p.lon - lon) < 0.01
    );

    let turbPoint = null;
    let minDist = Infinity;
    turbidityData.forEach(p => {
      const dist = Math.sqrt((lat - p.latitude) ** 2 + (lon - p.longitude) ** 2);
      if (dist < minDist) {
        minDist = dist;
        turbPoint = p;
      }
    });

    let nitratePoint = null;
    minDist = Infinity;
    nitrateData.forEach(p => {
      const dist = Math.sqrt((lat - p.lat) ** 2 + (lon - p.lon) ** 2);
      if (dist < minDist) {
        minDist = dist;
        nitratePoint = p;
      }
    });

    let globePoint = null;
    minDist = Infinity;
    globeData.forEach(p => {
      const dist = Math.sqrt((lat - p.Latitude) ** 2 + (lon - p.Longitude) ** 2);
      if (dist < minDist) {
        minDist = dist;
        globePoint = p;
      }
    });

    if (!globePoint) {
      const prediction = await modelPredict({ lat, lon });
      globePoint = { Latitude: lat, Longitude: lon, ...prediction };
    }

    const data = {
      salinity: salPoint ? salPoint.sal : 35,
      turbidity: turbPoint ? turbPoint.status : "No data",
      nitrate: nitratePoint ? nitratePoint.nitrate : 0,
      waste: globePoint.weight || 0,
      source: globePoint.source || "real"
    };

    setResult({
      ...data,
      nitrate: data.nitrate ? data.nitrate.toFixed(2) : "No data"
    });

    const scores = normalizeScores(data);
    const newIndexes = computeIndexes(scores);
    setIndexes(newIndexes);
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6">
      <ResearchHeader />
      <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl border border-blue-600 mt-7">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Water Quality Search</h2>
        <div className="flex gap-4 mb-6">
          <input id="lat" type="number" step="0.01" placeholder="Latitude"
            className="flex-1 px-4 py-3 bg-gray-800 border border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
          <input id="lon" type="number" step="0.01" placeholder="Longitude"
            className="flex-1 px-4 py-3 bg-gray-800 border border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
        </div>
        <button onClick={handleSearch}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all duration-200">
          Search / Predict
        </button>

        {result && (
          <div className="mt-8 bg-gray-800/80 p-6 rounded-xl border border-blue-500 shadow-lg">
            <h3 className="text-2xl mb-4 font-semibold text-blue-300">Results</h3>
            <div className="grid grid-cols-2 gap-4 text-gray-100">
              <p><b>Salinity:</b> {result.salinity}</p>
              <p><b>Turbidity:</b> {result.turbidity}</p>
              <p><b>Nitrate:</b> {result.nitrate}</p>
              <p><b>Waste:</b> {result.waste}</p>
              <p className="col-span-2"><b>Source:</b> {result.source}</p>
            </div>
          </div>
        )}

        {indexes && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tourist Box */}
            <div className="bg-gray-800 border border-blue-500 p-6 rounded-2xl text-center shadow-lg hover:scale-105 transition-transform duration-200">
              <h3 className="text-2xl font-bold mb-3 text-blue-400">Tourist Index</h3>
              <p className="text-4xl font-extrabold">{indexes.tourist} / 100</p>
              <p className="mt-3 text-sm text-gray-300 italic">
                {indexes.tourist > 75
                  ? "Great spot for sightseeing — clean and clear!"
                  : indexes.tourist > 50
                  ? "Decent area, but some waste or turbidity present."
                  : "Not recommended for tourism due to pollution."}
              </p>
            </div>

            {/* Researcher Box */}
            <div className="bg-gray-800 border border-blue-500 p-6 rounded-2xl text-center shadow-lg hover:scale-105 transition-transform duration-200">
              <h3 className="text-2xl font-bold mb-3 text-blue-400">Researcher Index</h3>
              <p className="text-4xl font-extrabold">{indexes.researcher} / 100</p>
              <p className="mt-3 text-sm text-gray-300 italic">
                {indexes.researcher > 75
                  ? "High variability — excellent for scientific research."
                  : indexes.researcher > 50
                  ? "Moderate variability — potential for field studies."
                  : "Stable but less diverse — limited research value."}
              </p>
            </div>

            {/* Fisherman Box */}
            <div className="bg-gray-800 border border-blue-500 p-6 rounded-2xl text-center shadow-lg hover:scale-105 transition-transform duration-200">
              <h3 className="text-2xl font-bold mb-3 text-blue-400">Fisherman Index</h3>
              <p className="text-4xl font-extrabold">{indexes.fisherman} / 100</p>
              <p className="mt-3 text-sm text-gray-300 italic">
                {indexes.fisherman > 75
                  ? "Ideal fishing conditions — healthy waters."
                  : indexes.fisherman > 50
                  ? "Fair conditions — some challenges for fishing."
                  : "Poor conditions — not suitable for fishing."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
