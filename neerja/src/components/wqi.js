// src/components/WQICalculator.jsx
import React, { useState } from "react";

const weights = {
  "Temperature": 0.01433,
  "Dissolved Oxygen": 0.053813,
  "pH": 0.009975,
  "Bio-Chemical Oxygen Demand (mg/L)": 0.372102,
  "Faecal Streptococci (MPN/ 100 mL)": 0.080256,
  "Nitrate (mg/ L)": 0.132487,
  "Faecal Coliform (MPN/ 100 mL)": 3.388620,
  "Total Coliform (MPN/ 100 mL)": 0.080256,
  "Conductivity (mho/ Cm)": 157.641295
};

const WQICalculator = () => {
  const [inputs, setInputs] = useState(
    Object.fromEntries(Object.keys(weights).map(key => [key, ""]))
  );
  const [wqi, setWQI] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateWQI = () => {
    let sum = 0;
    for (let key in weights) {
      const val = parseFloat(inputs[key]);
      if (!isNaN(val)) {
        sum += val * weights[key];
      }
    }
    setWQI(sum.toFixed(2));
  };

  return (
    <div style={{
      maxWidth: "700px",
      margin: "40px auto",
      padding: "30px",
      borderRadius: "10px",
      backgroundColor: "#0B1D3A",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#AAD8FF" }}>
        Water Quality Index Calculator
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {Object.keys(weights).map((feature) => (
          <div key={feature} style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", fontWeight: "bold", color: "#E0F0FF" }}>
              {feature}
            </label>
            <input
              type="number"
              name={feature}
              value={inputs[feature]}
              onChange={handleChange}
              style={{
                padding: "8px",
                fontSize: "14px",
                borderRadius: "5px",
                border: "1px solid #446699",
                outline: "none",
                backgroundColor: "#1A2E4B",
                color: "#ffffff"
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={calculateWQI}
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "12px",
          backgroundColor: "#3366CC",
          color: "#ffffff",
          fontSize: "16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background 0.3s"
        }}
        onMouseOver={e => e.target.style.backgroundColor = "#5590FF"}
        onMouseOut={e => e.target.style.backgroundColor = "#3366CC"}
      >
        Calculate WQI
      </button>

      {wqi && (
        <h3 style={{ marginTop: "30px", textAlign: "center", color: "#AAD8FF" }}>
          Predicted WQI: <span style={{ color: "#FFDD57" }}>{wqi}</span>
        </h3>
      )}
    </div>
  );
};

export default WQICalculator;
