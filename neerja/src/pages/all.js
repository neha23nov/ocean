import React, { useEffect, useState } from "react";
import Papa from "papaparse"; // for CSV parsing
import ResearchHeader from "../components/Research_header";

const DataBox = () => {
  const [nitrateData, setNitrateData] = useState([]);
  const [wasteData, setWasteData] = useState([]);
  const [turbidityData, setTurbidityData] = useState([]);

  useEffect(() => {
    // Load nitrate CSV
    fetch("/nitrate_predictions.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true });
        setNitrateData(parsed.data.slice(0, 5)); // take only first 5 rows for display
      })
      .catch((err) => console.error("Error loading nitrate:", err));

    // Load waste JSON
    fetch("/globe_data.json")
      .then((res) => res.json())
      .then((data) => setWasteData(data.slice(0, 5))) // first 5 entries
      .catch((err) => console.error("Error loading waste:", err));

    // Load turbidity JSON
    fetch("/turbidity.json")
      .then((res) => res.json())
      .then((data) => setTurbidityData(data.slice(0, 5))) // first 5 entries
      .catch((err) => console.error("Error loading turbidity:", err));
  }, []);

  return (
    
   <div>
    <ResearchHeader/>
         <div
      style={{
        position: "absolute",
        top: "70%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0,0,0,0.85)",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "400px",
        fontSize: "14px",
        textAlign: "left",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Ocean Data Overview
      </h3>

      {/* Nitrate */}
      <h4>Nitrate & Temperature</h4>
      {nitrateData.length > 0 ? (
        <ul>
          {nitrateData.map((row, idx) => (
            <li key={idx}>
              Temp: {parseFloat(row.sea_water_temperature).toFixed(2)} °C | Nitrate:{" "}
              {parseFloat(row.nitrate_concentration).toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading nitrate data...</p>
      )}

      {/* Waste */}
      <h4>Waste Levels (Weight)</h4>
      {wasteData.length > 0 ? (
        <ul>
          {wasteData.map((row, idx) => (
            <li key={idx}>
              Lat: {row.Latitude}, Lon: {row.Longitude} → Waste: {row.weight}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading waste data...</p>
      )}

      {/* Turbidity */}
      <h4>Turbidity Status</h4>
      {turbidityData.length > 0 ? (
        <ul>
          {turbidityData.map((row, idx) => (
            <li key={idx}>
              Lat: {row.latitude}, Lon: {row.longitude} → {row.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading turbidity data...</p>
      )}
    </div></div>
  );
};

export default DataBox;
