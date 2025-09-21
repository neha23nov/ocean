import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import ResearchHeader from "./Research_header";

const FishMigrationGlobe = () => {
  const [fishData, setFishData] = useState([]);

  useEffect(() => {
    fetch("/fish_migration_oceans.json")
      .then((res) => res.json())
      .then((data) => setFishData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!fishData.length) return <div>Loading...</div>;

  const lats = fishData.map((row) => row.lat);
  const lons = fishData.map((row) => row.lon);
  const text = fishData.map(
    (row) => `Species: ${row.species}<br>Month: ${row.month}<br>Route: ${row.migration_route}`
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
        <ResearchHeader/>
      <div style={{ top:"60",height: "600px" }}>
  <Plot
    data={[
      {
        type: "scattergeo",
        lon: lons,
        lat: lats,
        text: text,
        mode: "markers",
        marker: { size: 5, color: "cyan", line: { width: 0.5, color: "blue" } },
      },
    ]}
    layout={{
      title: "Fish Migration Globally",
      geo: {
        showland: true,
        landcolor: "black",
        showocean: true,
        oceancolor: "rgb(204, 224, 255)",
        projection: { type: "orthographic" },
        showcountries: true,
      },
      margin: { t: 0, b: 0, l: 0, r: 0 }, // remove default margins
    }}
    config={{ scrollZoom: false }}
    style={{ width: "100%", height: "100%" }}
  />
</div>

    </div>
  );
};

export default FishMigrationGlobe;
