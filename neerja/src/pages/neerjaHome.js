import { useEffect } from "react";
import Globe from "globe.gl";
import Sidebar from "./Sidebar";

import "leaflet/dist/leaflet.css";

export default function Home() {
  useEffect(() => {
    const globe = Globe()(document.getElementById("globeViz"))
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
      .backgroundColor("#0D1117") // match container background
      .pointOfView({ lat: 60, lng: 100, altitude: 2 });

    const resizeGlobe = () => {
      const container = document.getElementById("globeViz");
      globe.width(container.clientWidth);
      globe.height(container.clientHeight);
    };

    resizeGlobe(); // initial size
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.9;

    window.addEventListener("resize", resizeGlobe);
    return () => window.removeEventListener("resize", resizeGlobe);
  }, []);

  return (
    <div className="flex">
      {/* Sidebar fixed on the left */}
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-800 z-10">
        <Sidebar />
      </div>

      {/* Globe full screen below navbar & respecting sidebar */}
      <div
        id="globeViz"
        className="fixed top-16 left-64 right-0 bottom-0 opacity-90"
      ></div>
    </div>
  );
}
