import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Overview", path: "/" },
     { name: "About", path: "/about" },
    { name: "Analysis ", path: "/analysis" },
    {name:"Biodiversity", path:"/biodiversity"},
   { name: "Contact", path: "/contact" },
   { name: "Research", path: "/research" },


  ];

  return (
    <nav className="bg-[#0D1117] text-white flex items-center justify-between px-6 py-3 shadow relative">
      {/* Left Logo + Hamburger */}
      <div className="flex items-center space-x-4">
        <span className="font-montserrat text-3xl font-bold">Neerja</span>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Center Menu (Desktop) */}
      <div className="hidden md:flex space-x-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `hover:text-blue-400 ${
                isActive ? "text-blue-400 font-semibold" : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Right Side: Search + Login */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for data, location..."
          className="hidden md:block px-3 py-1 rounded-md text-black"
        />

        {/* 👇 Login button (always visible) */}
        <NavLink
          to="/login"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold"
        >
          Login
        </NavLink>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0D1117] flex flex-col items-start px-6 py-4 space-y-3 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // close menu on click
              className={({ isActive }) =>
                `hover:text-blue-400 ${
                  isActive ? "text-blue-400 font-semibold" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {/* Mobile Login button */}
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold w-full text-center"
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
}
