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
    // Waste score (lower waste is better)
    const wasteScore = Math.max(0, 100 - parseFloat(data.waste) * 5);

    // Turbidity score
    let turbidityScore = 50;
    switch (data.turbidity) {
      case "Bening": turbidityScore = 100; break;
      case "Keruh Ringan": turbidityScore = 70; break;
      case "Keruh Sedang": turbidityScore = 40; break;
      case "Keruh Pekat": turbidityScore = 10; break;
      default: turbidityScore = 50;
    }

    // Nitrate score (lower nitrate better for tourism/fishing, high is good for research)
    const nitrateVal = parseFloat(data.nitrate) || 0;
    let nitrateScore = 0;
    if (nitrateVal < 10) nitrateScore = 90;
    else if (nitrateVal < 30) nitrateScore = 70;
    else nitrateScore = 40;

    // Salinity score (best at 35 PSU)
    const salinityVal = parseFloat(data.salinity) || 35;
    const salinityScore = Math.max(0, 100 - Math.abs(salinityVal - 35) * 3);

    return { wasteScore, turbidityScore, nitrateScore, salinityScore };
  };

  const computeIndexes = (scores) => {
    // Tourist index
    const tourist = (
      scores.wasteScore * 0.5 +
      scores.turbidityScore * 0.3 +
      scores.nitrateScore * 0.1 +
      scores.salinityScore * 0.1
    );

    // Researcher index
    const researcher = (
      scores.wasteScore * 0.25 +
      (100 - scores.turbidityScore) * 0.25 + // variation is interesting
      (100 - scores.nitrateScore) * 0.25 +
      (100 - scores.salinityScore) * 0.25
    );

    // Fisherman index
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

    // Find nearest salinity
    const salPoint = salinityData.find(
      p => Math.abs(p.lat - lat) < 0.01 && Math.abs(p.lon - lon) < 0.01
    );

    // Find nearest turbidity
    let turbPoint = null;
    let minDist = Infinity;
    turbidityData.forEach(p => {
      const dist = Math.sqrt((lat - p.latitude) ** 2 + (lon - p.longitude) ** 2);
      if (dist < minDist) {
        minDist = dist;
        turbPoint = p;
      }
    });

    // Find nearest nitrate
    let nitratePoint = null;
    minDist = Infinity;
    nitrateData.forEach(p => {
      const dist = Math.sqrt((lat - p.lat) ** 2 + (lon - p.lon) ** 2);
      if (dist < minDist) {
        minDist = dist;
        nitratePoint = p;
      }
    });

    // Find nearest globe data
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
    <div className="w-screen h-screen bg-black text-white p-6 overflow-y-auto">
      <ResearchHeader />
      <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Water Quality Search</h2>
        <div className="flex gap-2 mb-4">
          <input id="lat" type="number" step="0.01" placeholder="Latitude"
            className="px-2 py-1 bg-gray-800 border border-gray-500 rounded w-1/2" />
          <input id="lon" type="number" step="0.01" placeholder="Longitude"
            className="px-2 py-1 bg-gray-800 border border-gray-500 rounded w-1/2" />
        </div>
        <button onClick={handleSearch}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded">
          Search / Predict
        </button>

        {result && (
          <div className="mt-6 bg-black/70 p-4 rounded">
            <h3 className="text-lg mb-2">Results:</h3>
            <p><b>Salinity:</b> {result.salinity}</p>
            <p><b>Turbidity:</b> {result.turbidity}</p>
            <p><b>Nitrate:</b> {result.nitrate}</p>
            <p><b>Waste:</b> {result.waste}</p>
            <p><b>Source:</b> {result.source}</p>
          </div>
        )}

        {indexes && (
          <div className="mt-6 space-y-4">
            <div className="bg-blue-900 p-4 rounded">
              <h3 className="text-lg">🌴 Tourist Index</h3>
              <p>{indexes.tourist} / 100</p>
            </div>
            <div className="bg-green-900 p-4 rounded">
              <h3 className="text-lg">🔬 Researcher Index</h3>
              <p>{indexes.researcher} / 100</p>
            </div>
            <div className="bg-yellow-900 p-4 rounded">
              <h3 className="text-lg">🎣 Fisherman Index</h3>
              <p>{indexes.fisherman} / 100</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
