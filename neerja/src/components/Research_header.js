import React from "react";
import { NavLink } from "react-router-dom";

export default function ResearchHeader() {
  const navItems = [
    { name: "Waste", path: "/waste" },
    { name: "Turbidity", path: "/turbidity" },
    { name: "Salinity", path: "/salinity" },
    { name: "Water Quality", path: "/quality" },
    { name: "Nitrate", path: "/nitrate" },
    { name: "Fish", path: "/fish" },
    { name: "Analysis", path: "/combined" },
  ];

  return (
    <div className="flex flex-row gap-4 items-center p-4 bg-gray-800 rounded-xl">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg hover:bg-blue-50 hover:border hover:border-blue-300 hover:text-black transition-colors duration-200 ${
              isActive ? "text-white font-semibold bg-blue-500" : "text-gray-300"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}
