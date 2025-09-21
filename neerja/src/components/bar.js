// src/components/FeatureWeightsChart.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { Feature: "Conductivity (mho/ Cm)", Weight: 157.641295 },
  { Feature: "Faecal Coliform (MPN/ 100 mL)", Weight: 3.388620 },
  { Feature: "Bio-Chemical Oxygen Demand (mg/L)", Weight: 0.372102 },
  { Feature: "Nitrate (mg/ L)", Weight: 0.132487 },
  { Feature: "Faecal Streptococci (MPN/ 100 mL)", Weight: 0.080256 },
  { Feature: "Total Coliform (MPN/ 100 mL)", Weight: 0.080256 },
  { Feature: "Dissolved Oxygen", Weight: 0.053813 },
  { Feature: "Temperature", Weight: 0.014330 },
  { Feature: "pH", Weight: 0.009975 }
];

const FeatureWeightsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Feature" angle={-36} textAnchor="end" interval={0} height={100} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Weight" fill="#0f84f9ff" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FeatureWeightsChart;
