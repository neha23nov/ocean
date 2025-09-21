import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Globe from "three-globe";
import gsap from "gsap";
import ResearchHeader from "../components/Research_header";

const GlobeViewer = () => {
  const mountRef = useRef(null);
  const tooltipRef = useRef(null);
  const globeRef = useRef(null);
  const cameraRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pointsData, setPointsData] = useState([]);

  useEffect(() => {
    let renderer, camera, scene, globe;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 400;
    cameraRef.current = camera;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xbbbbbb));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);

    // Load salinity JSON
    fetch("/salinity.json")
      .then((res) => res.json())
      .then((data) => {
        setPointsData(data);

        globe = new Globe()
          .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
          .pointsData(data)
          .pointLat((d) => d.lat)
          .pointLng((d) => d.lon)
          .pointColor(() => "cyan") // all points cyan
          .pointRadius(0.3);

        globeRef.current = globe;
        scene.add(globe);
        setDataLoaded(true);
      });

    const animate = () => {
      requestAnimationFrame(animate);
      if (globeRef.current) globeRef.current.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (renderer) renderer.dispose();
      if (mountRef.current && renderer.domElement)
        mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const latLonToVector3 = (lat, lon, radius = 100) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  };

  const handleLocate = () => {
    if (!dataLoaded || !globeRef.current || !cameraRef.current) return;

    const lat = parseFloat(document.getElementById("lat").value);
    const lon = parseFloat(document.getElementById("lon").value);

    if (isNaN(lat) || isNaN(lon)) {
      alert("Please enter valid Latitude and Longitude");
      return;
    }

    const point = pointsData.find(
      (p) => Math.abs(p.lat - lat) < 0.01 && Math.abs(p.lon - lon) < 0.01
    );

    if (!point) {
      alert("No salinity data found for this location");
      return;
    }

    const target = latLonToVector3(point.lat, point.lon, 200);
    gsap.to(cameraRef.current.position, {
      x: target.x * 1.5,
      y: target.y * 1.5,
      z: target.z * 1.5,
      duration: 1.5,
      onUpdate: () => cameraRef.current.lookAt(target),
    });

    tooltipRef.current.innerHTML = `
      <strong>Latitude:</strong> ${point.lat}<br>
      <strong>Longitude:</strong> ${point.lon}<br>
      <strong>Salinity:</strong> ${point.sal.toFixed(2)}
    `;
    tooltipRef.current.style.left = "50%";
    tooltipRef.current.style.top = "50%";
    tooltipRef.current.style.transform = "translate(-50%, -50%)";
    tooltipRef.current.style.display = "block";
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", background: "#000" }}>
      <ResearchHeader />
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 20,
          zIndex: 999,
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: "10px",
          borderRadius: "5px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <input
          id="lat"
          type="number"
          step="0.01"
          placeholder="Latitude"
          style={{
            padding: "5px",
            borderRadius: "3px",
            border: "1px solid #fff",
            backgroundColor: "#222",
            color: "white",
            width: "100px",
          }}
        />
        <input
          id="lon"
          type="number"
          step="0.01"
          placeholder="Longitude"
          style={{
            padding: "5px",
            borderRadius: "3px",
            border: "1px solid #fff",
            backgroundColor: "#222",
            color: "white",
            width: "100px",
          }}
        />
        <button
          onClick={handleLocate}
          style={{
            padding: "5px 10px",
            borderRadius: "3px",
            border: "none",
            backgroundColor: "#1e90ff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Locate & Zoom
        </button>
      </div>

      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          background: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "5px 10px",
          borderRadius: "4px",
          display: "none",
          pointerEvents: "none",
          textAlign: "center",
        }}
      />
    </div>
  );
};

export default GlobeViewer;
