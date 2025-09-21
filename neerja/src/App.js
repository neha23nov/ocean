import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar";

import NeerjaHome from "./pages/neerjaHome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContactPage from "./pages/contact";
import About from "./pages/About"; 
import Analysis from "./pages/Analysis"; 
import Biodiversity from "./pages/Biodiversity";
import TurbidityGlobe from "./pages/turbidity";
import PlasticPollutionGlobe from "./pages/waste";

import Profile from "./pages/Profile";
import SpeciesDetailPage from "./pages/SpeciesDetailPage";

import Research from "./pages/Research";

import SalinityGlobe from "./pages/salinity";
import Waterquality from "./pages/waterquality";
import Globe from "./pages/waste";
import NitrateGlobe from "./pages/nitrate";
import Fishscreen from "./pages/fishscreen";
import BiodiversityPage from "./pages/Biodiversity";
import OceanExplorerScreen from "./pages/bio";
import MarineGalleryScreen from "./pages/bio";



function App() {
  return (
    <Router>
      {/* <TurbidityGlobe/> */}
      {/* <PlasticPollutionGlobe/> */}
      <Navbar />
      <Routes>

        {/* Home with sidebar */}
        <Route
          path="/"
          element={
            <>
             
              <main className="p-6 text-white bg-[#0D1117] min-h-screen w-full">
                <NeerjaHome />
              </main>
            </>
          }
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            <div className="flex justify-center items-center min-h-screen bg-[#0D1117] text-white px-4">
              <Login />
            </div>
          }
        />

        {/* Signup Page */}
        <Route
          path="/signup"
          element={
            <div className="flex justify-center items-center min-h-screen bg-[#0D1117] text-white px-4">
              <Signup />
            </div>
          }
        />

        {/* Contact Page */}
        <Route
          path="/contact"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <ContactPage />
            </main>
          }
        />

        {/* About Page */}
        <Route
          path="/about"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <About />
            </main>
          }
        />

        {/* Analysis Page */}
        <Route
          path="/analysis"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <Analysis />
            </main>
          }
        />

        {/* Biodiversity Page */}
        <Route
          path="/biodiversity"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <Biodiversity />
            </main>
          }
        />

        <Route

  path="/profile"
  element={
    <main className="min-h-screen p-6 text-white bg-[#0D1117]">
      <Profile />
    </main>
  }
/>

<Route path="/" element={<biodiversity />} />
        <Route path="/species/:name" element={<SpeciesDetailPage />} />





          <Route path="/research"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <Research />
            </main>
          }
        />
        <Route
          path="/waste"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <PlasticPollutionGlobe />
            </main>
          }
        />
        <Route
          path="/turbidity"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <TurbidityGlobe/>
            </main>
          }
        />
        <Route
          path="/salinity"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <SalinityGlobe/>
            </main>
          }
        />
        <Route
          path="/quality"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <Waterquality/>
            </main>
          }
        />
        <Route
          path="/nitrate"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <NitrateGlobe/>
            </main>
          }
        />
        <Route
          path="/fish"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <Fishscreen/>
            </main>
          }
        />
        <Route
          path="/bio"
          element={
            <main className="min-h-screen p-6 text-white bg-[#0D1117]">
              <MarineGalleryScreen/>
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
