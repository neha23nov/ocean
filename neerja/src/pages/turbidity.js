import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TurbidityGlobe() {
  const mountRef = useRef(null);
  const dataDisplayRef = useRef(null);

  useEffect(() => {
    // Global-like variables
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let INTERSECTED = null;
    let pointsGroup = null;

    const statusColors = {
      Bening: 0x00a0e0,
      "Keruh Ringan": 0xcccc00,
      "Keruh Sedang": 0xff9900,
      "Keruh Pekat": 0x8b4513,
    };

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

    // === Scene setup ===
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
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x0066cc, wireframe: true })
    );
    scene.add(globe);

    // Load JSON turbidity data
    let pointDataArray = [];
    fetch("../../../Models/turbidity/turbidity_data.json")
      .then((res) => res.json())
      .then((data) => {
        const positions = [];
        const colors = [];

        data.forEach((pointData) => {
          const pos = latLonToXYZ(
            pointData.latitude,
            pointData.longitude,
            globeRadius + 0.01
          );
          positions.push(pos.x, pos.y, pos.z);

          const color = new THREE.Color(statusColors[pointData.status]);
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
      });

    // Mouse events
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onWheel = (e) => {
      camera.position.z -= e.deltaY * 0.005;
      camera.position.z = Math.max(1.5, Math.min(camera.position.z, 10));
    };
    window.addEventListener("wheel", onWheel);

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      if (!pointsGroup) return;
      const intersects = raycaster.intersectObject(pointsGroup);
      if (intersects.length > 0) {
        const index = intersects[0].index;
        const dataPoint = pointDataArray[index];
        if (dataDisplayRef.current) {
          dataDisplayRef.current.innerHTML = `
            <b>Turbidity Status:</b> ${dataPoint.status}<br/>
            <b>Latitude:</b> ${dataPoint.latitude.toFixed(2)}<br/>
            <b>Longitude:</b> ${dataPoint.longitude.toFixed(2)}
          `;
        }
      }
    };
    window.addEventListener("click", onClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.0005;

      raycaster.setFromCamera(mouse, camera);
      if (pointsGroup) {
        const intersects = raycaster.intersectObject(pointsGroup);
        if (intersects.length > 0) {
          const index = intersects[0].index;
          if (INTERSECTED !== index) {
            if (INTERSECTED !== null) {
              const orig = new THREE.Color(
                statusColors[pointDataArray[INTERSECTED].status]
              );
              pointsGroup.geometry.attributes.color.setXYZ(
                INTERSECTED,
                orig.r,
                orig.g,
                orig.b
              );
            }
            INTERSECTED = index;
            pointsGroup.geometry.attributes.color.setXYZ(INTERSECTED, 1, 1, 0);
            pointsGroup.geometry.attributes.color.needsUpdate = true;

            const dataPoint = pointDataArray[INTERSECTED];
            if (dataDisplayRef.current) {
              dataDisplayRef.current.innerText = `Status: ${dataPoint.status}`;
            }
          }
        } else {
          if (INTERSECTED !== null) {
            const orig = new THREE.Color(
              statusColors[pointDataArray[INTERSECTED].status]
            );
            pointsGroup.geometry.attributes.color.setXYZ(
              INTERSECTED,
              orig.r,
              orig.g,
              orig.b
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
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("click", onClick);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black">
      <div
        ref={dataDisplayRef}
        className="absolute top-2 left-2 bg-black/60 text-white p-2 rounded"
      >
        Hover over a point to see data.
      </div>
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
