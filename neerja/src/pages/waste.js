import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Globe from "three-globe";
import gsap from "gsap";

const GlobeViewer = () => {
  const mountRef = useRef(null);
  const tooltipRef = useRef(null);
  const globeRef = useRef(null);
  const cameraRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const modelPredict = async ({ lat, lon }) => {
    return { weight: Math.random() * 50 + 5, source: "predicted" };
  };

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

    fetch("/globe_data.json")
      .then((res) => res.json())
      .then((data) => {
        globe = new Globe()
          .globeImageUrl(
            "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          )
          .pointsData(data)
          .pointAltitude((d) => d.weight / 50)
          .pointColor((d) => (d.source === "real" ? "red" : "blue"))
          .pointRadius(0.3);

        globeRef.current = globe;
        scene.add(globe);
        setDataLoaded(true);
      });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event) => {
      if (!globeRef.current || !globeRef.current.pointsMesh) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(globeRef.current.pointsMesh);
      if (intersects.length > 0) {
        const pointIndex = intersects[0].index;
        const point = globeRef.current.pointsData()[pointIndex];
        if (point) {
          tooltipRef.current.innerHTML = `
            <strong>Lat:</strong> ${point.Latitude}<br>
            <strong>Lon:</strong> ${point.Longitude}<br>
            <strong>Weight:</strong> ${point.weight.toFixed(2)}<br>
            <strong>Source:</strong> ${point.source}
          `;
          tooltipRef.current.style.left = event.clientX + 10 + "px";
          tooltipRef.current.style.top = event.clientY + 10 + "px";
          tooltipRef.current.style.display = "block";
        }
      } else {
        tooltipRef.current.style.display = "none";
      }
    };
    window.addEventListener("click", onClick);

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
      window.removeEventListener("click", onClick);
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

  const handlePredict = async () => {
    if (!dataLoaded || !globeRef.current || !cameraRef.current) return;

    const lat = parseFloat(document.getElementById("lat").value);
    const lon = parseFloat(document.getElementById("lon").value);

    if (isNaN(lat) || isNaN(lon))
      return alert("Please enter valid Latitude and Longitude");

    const prediction = await modelPredict({ lat, lon });
    const predictedPoint = {
      Latitude: lat,
      Longitude: lon,
      weight: prediction.weight,
      source: prediction.source,
    };

    globeRef.current.pointsData([
      ...globeRef.current.pointsData(),
      predictedPoint,
    ]);

    const target = latLonToVector3(lat, lon, 200);
    gsap.to(cameraRef.current.position, {
      x: target.x * 1.5,
      y: target.y * 1.5,
      z: target.z * 1.5,
      duration: 1.5,
      onUpdate: () => cameraRef.current.lookAt(target),
    });

    // Show tooltip for predicted point
    tooltipRef.current.innerHTML = `
      <strong>Lat:</strong> ${predictedPoint.Latitude}<br>
      <strong>Lon:</strong> ${predictedPoint.Longitude}<br>
      <strong>Weight:</strong> ${predictedPoint.weight.toFixed(2)}<br>
      <strong>Source:</strong> ${predictedPoint.source}
    `;
    tooltipRef.current.style.left = window.innerWidth / 2 + "px";
    tooltipRef.current.style.top = window.innerHeight / 2 + "px";
    tooltipRef.current.style.display = "block";
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <GlobeViewer/>
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 999,
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: "10px",
          borderRadius: "5px",
          pointerEvents: "auto",
          display: "flex",
          gap: "5px",
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
            width: "80px",
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
            width: "80px",
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

      <div ref={mountRef} />

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
  );
};

export default GlobeViewer;
