import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar";
import Sidebar from "./pages/Sidebar";
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
              <Sidebar />
              <main className="ml-64 mt-16 p-6 text-white bg-[#0D1117] min-h-screen">
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




      </Routes>
    </Router>
  );
}

export default App;
