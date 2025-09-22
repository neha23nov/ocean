import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import ResearchHeader from "./Research_header";

const FishMigrationGlobe = () => {
  const [fishData, setFishData] = useState([]);
  const [rotation, setRotation] = useState({ lon: 0, lat: 0 });

  useEffect(() => {
    fetch("/fish_migration_oceans.json")
      .then((res) => res.json())
      .then((data) => setFishData(data))
      .catch((err) => console.error(err));
  }, []);

  // 🌍 Auto-rotate effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => ({
        lon: prev.lon + 0.2, // speed of rotation
        lat: prev.lat,
      }));
    }, 50); // interval in ms
    return () => clearInterval(interval);
  }, []);

  if (!fishData.length) return <div>Loading...</div>;

  const lats = fishData.map((row) => row.lat);
  const lons = fishData.map((row) => row.lon);
  const text = fishData.map(
    (row) =>
      `Species: ${row.species}<br>Month: ${row.month}<br>Route: ${row.migration_route}`
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ResearchHeader />
      <div style={{ top: "60", height: "600px" }}>
        <Plot
          data={[
            {
              type: "scattergeo",
              lon: lons,
              lat: lats,
              text: text,
              mode: "markers",
              marker: {
                size: 5,
                color: "cyan",
                line: { width: 0.5, color: "blue" },
              },
            },
          ]}
          layout={{
            title: "Fish Migration Globally",
            geo: {
              showland: true,
              landcolor: "black",
              showocean: true,
              oceancolor: "rgb(204, 224, 255)",
              projection: {
                type: "orthographic",
                rotation: rotation, // 🌍 dynamic rotation
              },
              showcountries: true,
            },
            margin: { t:10, b: 10, l: 0, r: 0 },
          }}
          config={{ scrollZoom: false }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default FishMigrationGlobe;
