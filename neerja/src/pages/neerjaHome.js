import { useEffect } from "react";
import Globe from "globe.gl";


import "leaflet/dist/leaflet.css";

export default function Home() {
  useEffect(() => {
    const globe = Globe()(document.getElementById("globeViz"))
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
      .backgroundColor("#0D1117") // match container background
      .pointOfView({ lat: 60, lng: 100, altitude: 1.6});

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
    <div>
      <div className="relative w-full h-screen">
  {/* Globe */}
  <div
    id="globeViz"
    className="absolute top-0 left-0 w-full h-full opacity-100 z-[10]"
  ></div>

  {/* Overlay Text */}
  <div className="absolute top-1/4 left-16 z-[20]">
    <p className="text-white text-7xl font-bold">Neerja</p>
    <p className="text-white text-2xl font-medium mt-4">
      Smart Ocean Sustainability & Monitoring
    </p>
  </div>
</div>


{/* <div className="w-full bg-black py-16 px-6 flex flex-col items-center">

  <p className="text-white text-4xl md:text-5xl font-bold text-center">
    Our Vision
  </p>


  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 w-full max-w-[1400px]">

    <div className="bg-gray-900 border border-white rounded-xl p-6 flex items-center justify-center hover:scale-105 transition-transform duration-300 flex flex-col">
      <p className="text-white text-center">Vision 1</p>
      <p className="text-white text-center">Vision 1</p>
      <p className="text-white text-center">Vision 1</p>
      <p className="text-white text-center">Vision 1</p>
    </div>


    <div className="bg-gray-900 border border-white rounded-xl p-6 flex items-center justify-center hover:scale-105 transition-transform duration-300">
      <p className="text-white text-center">Vision 2</p>
    </div>


    <div className="bg-gray-900 border border-white rounded-xl p-6 flex items-center justify-center hover:scale-105 transition-transform duration-300">
      <p className="text-white text-center">Vision 3</p>
    </div>


    <div className="bg-gray-900 border border-white rounded-xl p-6 flex items-center justify-center hover:scale-105 transition-transform duration-300">
      <p className="text-white text-center">Vision 4</p>
    </div>
  </div>
</div> */}


    </div>
  );
}
