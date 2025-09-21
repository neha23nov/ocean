import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function TurbidityGlobe() {
  const mountRef = useRef(null);
  const dataDisplayRef = useRef(null);
  const pointsGroupRef = useRef(null);

  const [pointDataArray, setPointDataArray] = useState([]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Light
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);

    // Globe
    const globeRadius = 1;
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x0066cc, wireframe: true })
    );
    scene.add(globe);

    // Status colors
    const statusColors = {
      Bening: 0x00a0e0,
      "Keruh Ringan": 0xcccc00,
      "Keruh Sedang": 0xff9900,
      "Keruh Pekat": 0x8b4513,
      Kotor: 0x8b0000,
    };

    // Convert lat/lon to 3D
    const degToRad = (deg) => (deg * Math.PI) / 180;
    const latLonToXYZ = (lat, lon, radius) => {
      const latRad = degToRad(lat);
      const lonRad = degToRad(lon);
      return new THREE.Vector3(
        radius * Math.cos(latRad) * Math.cos(lonRad),
        radius * Math.sin(latRad),
        radius * Math.cos(latRad) * Math.sin(lonRad)
      );
    };

    // Load JSON turbidity data
    fetch("/turbidity.json")
      .then((res) => res.json())
      .then((data) => {
        setPointDataArray(data);

        const positions = [];
        const colors = [];

        data.forEach((point) => {
          const pos = latLonToXYZ(point.latitude, point.longitude, globeRadius + 0.01);
          positions.push(pos.x, pos.y, pos.z);
          const color = new THREE.Color(statusColors[point.status] || 0xffffff);
          colors.push(color.r, color.g, color.b);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: 0.02,
          vertexColors: true,
          sizeAttenuation: true,
        });

        pointsGroupRef.current = new THREE.Points(geometry, material);
        scene.add(pointsGroupRef.current);
      });

    // Raycaster (hover effect)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let INTERSECTED = null;

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.0005;
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
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Find nearest point in JSON for given lat/lon
  const fetchPointStatus = () => {
    const lat = parseFloat(document.getElementById("lat").value);
    const lon = parseFloat(document.getElementById("lon").value);

    if (isNaN(lat) || isNaN(lon)) return alert("Enter valid latitude and longitude");

    // Find closest point (by simple Euclidean lat/lon distance)
    let closestPoint = null;
    let minDist = Infinity;
    pointDataArray.forEach((p) => {
      const dist = Math.sqrt((lat - p.latitude) ** 2 + (lon - p.longitude) ** 2);
      if (dist < minDist) {
        minDist = dist;
        closestPoint = p;
      }
    });

    if (closestPoint && dataDisplayRef.current) {
      dataDisplayRef.current.innerHTML = `
        <b>Status:</b> ${closestPoint.status}<br/>
        <b>Latitude:</b> ${closestPoint.latitude}<br/>
        <b>Longitude:</b> ${closestPoint.longitude}
      `;
    } else {
      alert("No point found near this location");
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      <div className="absolute top-2 left-2 bg-black/60 text-white p-2 rounded flex gap-2 z-50">
        <input
          id="lat"
          type="number"
          placeholder="Latitude"
          step="0.01"
          className="px-2 py-1 bg-gray-900 text-white rounded border border-white"
        />
        <input
          id="lon"
          type="number"
          placeholder="Longitude"
          step="0.01"
          className="px-2 py-1 bg-gray-900 text-white rounded border border-white"
        />
        <button
          onClick={fetchPointStatus}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Fetch Status
        </button>
      </div>

      <div
        ref={dataDisplayRef}
        className="absolute top-16 left-2 bg-black/60 text-white p-2 rounded z-50"
      >
        Enter coordinates and click Fetch Status.
      </div>

      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
