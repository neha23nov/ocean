import React, { useState, useEffect } from "react";
import ResearchHeader from "../components/Research_header";

export default function WaterQualityScreen() {
  const [salinityData, setSalinityData] = useState([]);
  const [turbidityData, setTurbidityData] = useState([]);
  const [nitrateData, setNitrateData] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Load all datasets
    fetch("/salinity.json").then(res => res.json()).then(setSalinityData);
    fetch("/turbidity.json").then(res => res.json()).then(setTurbidityData);
    fetch("/nitrate_predictions.csv")
      .then(res => res.text())
      .then(text => {
        const rows = text.split("\n").slice(1);
        const parsed = rows.map(r => {
          const [lat, lon, nitrate] = r.split(",");
          return { lat: parseFloat(lat), lon: parseFloat(lon), nitrate: parseFloat(nitrate) };
        }).filter(d => !isNaN(d.lat) && !isNaN(d.lon) && !isNaN(d.nitrate));
        setNitrateData(parsed);
      });
  }, []);

  const handleSearch = () => {
    const lat = parseFloat(document.getElementById("lat").value);
    const lon = parseFloat(document.getElementById("lon").value);

    if (isNaN(lat) || isNaN(lon)) {
      alert("Please enter valid coordinates");
      return;
    }

    // Find nearest salinity
    const salPoint = salinityData.find(p => Math.abs(p.lat - lat) < 0.01 && Math.abs(p.lon - lon) < 0.01);

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

    setResult({
      salinity: salPoint ? salPoint.sal : "No data",
      turbidity: turbPoint ? turbPoint.status : "No data",
      nitrate: nitratePoint ? nitratePoint.nitrate.toFixed(2) : "No data"
    });
  };

  return (
    <div className="w-screen h-screen bg-black text-white p-6">
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
          Search
        </button>

        {result && (
          <div className="mt-6 bg-black/70 p-4 rounded">
            <h3 className="text-lg mb-2">Results:</h3>
            <p><b>Salinity:</b> {result.salinity}</p>
            <p><b>Turbidity:</b> {result.turbidity}</p>
            <p><b>Nitrate:</b> {result.nitrate}</p>
          </div>
        )}
      </div>
    </div>
  );
}
