import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Globe from "three-globe";
import Papa from "papaparse";
import gsap from "gsap";
import ResearchHeader from "../components/Research_header";

const NitrateGlobe = () => {
  const mountRef = useRef(null);
  const tooltipRef = useRef(null);
  const globeRef = useRef(null);
  const cameraRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    let renderer, camera, scene, globe;

    // Scene setup
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

    // Init empty globe
    globe = new Globe().globeImageUrl(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    );
    globeRef.current = globe;
    scene.add(globe);

    // Load CSV data
    Papa.parse("/nitrate_predictions.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const points = result.data
          .map((row) => {
            const lat = parseFloat(row.lat || row.Latitude);
            const lon = parseFloat(row.lon || row.Longitude);
            const nitrate = parseFloat(row.nitrate || row.Nitrate);

            if (isNaN(lat) || isNaN(lon) || isNaN(nitrate)) return null;

            return {
              Latitude: lat,
              Longitude: lon,
              weight: nitrate,
              source: "real",
              alt: nitrate / 10,
              color: `hsl(${120 - nitrate * 10}, 100%, 50%)`,
            };
          })
          .filter(Boolean);

        globe.pointsData(points);
        setDataLoaded(true);
      },
    });

    // Animate loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (globeRef.current) globeRef.current.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handling
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (renderer) renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Convert lat/lon to 3D position on globe
  const latLonToVector3 = (lat, lon, radius = 200) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  };

  // Handle predict button
  const handlePredict = () => {
    if (!dataLoaded || !globeRef.current || !cameraRef.current) return;

    const lat = parseFloat(document.getElementById("lat").value);
    const lon = parseFloat(document.getElementById("lon").value);

    if (isNaN(lat) || isNaN(lon)) {
      alert("Please enter valid Latitude and Longitude");
      return;
    }

    // Generate a "predicted" nitrate value
    const nitrate = Math.random() * 50 + 10;

    const predictedPoint = {
      Latitude: lat,
      Longitude: lon,
      weight: nitrate,
      source: "predicted",
      alt: nitrate / 10,
      color: "blue",
    };

    // Add point to globe
    globeRef.current.pointsData([
      ...globeRef.current.pointsData(),
      predictedPoint,
    ]);

    // Smooth zoom to the point
    const target = latLonToVector3(lat, lon, 200);
    gsap.to(cameraRef.current.position, {
      x: target.x * 1.5,
      y: target.y * 1.5,
      z: target.z * 1.5,
      duration: 1.5,
      onUpdate: () => cameraRef.current.lookAt(target),
    });

    // Show tooltip
    tooltipRef.current.innerHTML = `
      <strong>Lat:</strong> ${predictedPoint.Latitude}<br>
      <strong>Lon:</strong> ${predictedPoint.Longitude}<br>
      <strong>Nitrate:</strong> ${predictedPoint.weight.toFixed(2)}<br>
      <strong>Source:</strong> ${predictedPoint.source}
    `;
    tooltipRef.current.style.left = window.innerWidth / 2 + "px";
    tooltipRef.current.style.top = window.innerHeight / 2 + "px";
    tooltipRef.current.style.display = "block";
  };

  return (
    <div>
      <ResearchHeader />
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 20,
            zIndex: 999,
            backgroundColor: "rgba(0,0,0,0.8)",
            padding: "10px",
            borderRadius: "5px",
            pointerEvents: "auto",
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <input
            id="lat"
            type="number"
            placeholder="Latitude"
            step="0.01"
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
            placeholder="Longitude"
            step="0.01"
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
            onClick={handlePredict}
            style={{
              padding: "5px 10px",
              borderRadius: "3px",
              border: "none",
              backgroundColor: "#1e90ff",
              color: "white",
              cursor: "pointer",
            }}
          >
            Predict & Zoom
          </button>
        </div>

        <div
          ref={mountRef}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "5px",
            display: "none",
            pointerEvents: "none",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
};

export default NitrateGlobe;
