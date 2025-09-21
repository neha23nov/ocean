// src/components/PlasticPollutionGlobe.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PlasticPollutionGlobe() {
  const mountRef = useRef(null);
  const dataDisplayRef = useRef(null);

  useEffect(() => {
    let INTERSECTED = null;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pointsGroup = null;

    // Scene setup
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

    // Globe
    const globeRadius = 1;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0066cc,
      wireframe: true,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Helpers
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

    // Mouse events
    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function onMouseWheel(event) {
      camera.position.z -= event.deltaY * 0.005;
      camera.position.z = Math.max(1.5, Math.min(camera.position.z, 10));
    }

    function onMouseClick(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (!pointsGroup) return;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(pointsGroup);

      if (intersects.length > 0) {
        const index = intersects[0].index;
        const dataPoint = pointDataArray[index];

        if (dataDisplayRef.current) {
          dataDisplayRef.current.innerHTML = `
            <b>Data Source:</b> ${dataPoint.source}<br/>
            <b>Latitude:</b> ${dataPoint.Latitude.toFixed(2)}<br/>
            <b>Longitude:</b> ${dataPoint.Longitude.toFixed(2)}<br/>
            <b>Waste:</b> ${dataPoint.weight.toFixed(2)} kg
          `;
        }
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("wheel", onMouseWheel);
    window.addEventListener("click", onMouseClick);

    // Load data and create points
    let pointDataArray = [];
    const loadData = async () => {
      try {
        const response = await fetch("/globe_data.json"); // Place in public folder
        const data = await response.json();

        const positions = [];
        const colors = [];

        const realColor = new THREE.Color(0xff0000);
        const predictedColor = new THREE.Color(0x00ff00);

        data.forEach((pointData) => {
          const pos = latLonToXYZ(
            pointData.Latitude,
            pointData.Longitude,
            globeRadius + 0.01
          );
          positions.push(pos.x, pos.y, pos.z);

          const color = pointData.source === "real" ? realColor : predictedColor;
          colors.push(color.r, color.g, color.b);

          pointDataArray.push(pointData);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3)
        );
        geometry.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(colors, 3)
        );

        const material = new THREE.PointsMaterial({
          size: 0.02,
          vertexColors: true,
          sizeAttenuation: true,
        });

        pointsGroup = new THREE.Points(geometry, material);
        scene.add(pointsGroup);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadData();

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.0005;

      if (pointsGroup) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(pointsGroup);

        if (intersects.length > 0) {
          const index = intersects[0].index;
          if (INTERSECTED !== index) {
            if (INTERSECTED !== null) {
              const origColor =
                pointDataArray[INTERSECTED].source === "real"
                  ? new THREE.Color(0xff0000)
                  : new THREE.Color(0x00ff00);
              pointsGroup.geometry.attributes.color.setXYZ(
                INTERSECTED,
                origColor.r,
                origColor.g,
                origColor.b
              );
            }
            INTERSECTED = index;
            pointsGroup.geometry.attributes.color.setXYZ(INTERSECTED, 1, 1, 0); // highlight
            pointsGroup.geometry.attributes.color.needsUpdate = true;

            const dataPoint = pointDataArray[INTERSECTED];
            if (dataDisplayRef.current) {
              dataDisplayRef.current.innerText = `Source: ${dataPoint.source}\nWaste: ${dataPoint.weight.toFixed(2)} kg`;
            }
          }
        } else {
          if (INTERSECTED !== null) {
            const origColor =
              pointDataArray[INTERSECTED].source === "real"
                ? new THREE.Color(0xff0000)
                : new THREE.Color(0x00ff00);
            pointsGroup.geometry.attributes.color.setXYZ(
              INTERSECTED,
              origColor.r,
              origColor.g,
              origColor.b
            );
            pointsGroup.geometry.attributes.color.needsUpdate = true;
          }
          INTERSECTED = null;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("wheel", onMouseWheel);
      window.removeEventListener("click", onMouseClick);
    };
  }, []);

  return (
    <>
      <div
        ref={dataDisplayRef}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "white",
          background: "rgba(0,0,0,0.6)",
          padding: "10px",
          fontFamily: "sans-serif",
          borderRadius: "5px",
          pointerEvents: "none",
        }}
      >
        Hover over a point to see data.
      </div>
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
    </>
  );
}
