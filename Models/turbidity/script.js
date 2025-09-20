// Global variables for raycaster and mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let INTERSECTED = null;
const dataDisplay = document.getElementById('data-display');
let pointsGroup = null;
const statusColors = {
    'Bening': 0x00A0E0, // A clear blue
    'Keruh Ringan': 0xCCCC00, // Light yellow for slightly murky
    'Keruh Sedang': 0xFF9900, // Orange for moderately murky
    'Keruh Pekat': 0x8B4513 // A brown color for very murky
};

// Function to convert degrees to radians
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

// Function to convert spherical coordinates to 3D Cartesian coordinates
function latLonToXYZ(lat, lon, radius) {
    const latRad = degToRad(lat);
    const lonRad = degToRad(lon);
    const x = radius * Math.cos(latRad) * Math.cos(lonRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.sin(lonRad);
    return new THREE.Vector3(x, y, z);
}

// Main async function to create the globe and load data
async function createGlobe() {
    // Basic scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create the globe sphere
    const globeRadius = 1;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMaterial = new THREE.MeshBasicMaterial({ color: 0x0066cc, wireframe: true });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Load your JSON data
    const response = await fetch('turbidity_data.json');
    const data = await response.json();
    
    // Create arrays to hold point positions and colors
    const positions = [];
    const colors = [];
    const pointDataArray = [];

    // Populate the arrays
    data.forEach(pointData => {
        const pointPosition = latLonToXYZ(pointData.latitude, pointData.longitude, globeRadius + 0.01);
        positions.push(pointPosition.x, pointPosition.y, pointPosition.z);
        
        const color = new THREE.Color(statusColors[pointData.status]);
        colors.push(color.r, color.g, color.b);

        pointDataArray.push(pointData);
    });

    // Create a BufferGeometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Create a PointsMaterial and Points object
    const material = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        sizeAttenuation: true
    });

    pointsGroup = new THREE.Points(geometry, material);
    scene.add(pointsGroup);

    // Handle mouse movement for hover effect
    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', onMouseMove, false);

    // Handle mouse wheel for zooming
    function onMouseWheel(event) {
        camera.position.z -= event.deltaY * 0.005;
        camera.position.z = Math.max(1.5, Math.min(camera.position.z, 10));
    }
    window.addEventListener('wheel', onMouseWheel, false);
    
    // Handle mouse click for displaying data in a box
    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([pointsGroup]);

        if (intersects.length > 0) {
            const intersection = intersects[0];
            const index = intersection.index;
            const dataPoint = pointDataArray[index];
            
            dataDisplay.innerHTML = 
            `<b>Turbidity Status:</b> ${dataPoint.status}<br/>
            <b>Latitude:</b> ${dataPoint.latitude.toFixed(2)}<br/>
            <b>Longitude:</b> ${dataPoint.longitude.toFixed(2)}`;
        }
    }
    window.addEventListener('click', onMouseClick, false);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.0005;

        // Check for hover intersections
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([pointsGroup]);

        if (intersects.length > 0) {
            const index = intersects[0].index;
            if (INTERSECTED != index) {
                if (INTERSECTED !== null) {
                    const originalColor = new THREE.Color(statusColors[pointDataArray[INTERSECTED].status]);
                    pointsGroup.geometry.attributes.color.setXYZ(INTERSECTED, originalColor.r, originalColor.g, originalColor.b);
                }
                INTERSECTED = index;
                pointsGroup.geometry.attributes.color.setXYZ(INTERSECTED, 1, 1, 0);
                pointsGroup.geometry.attributes.color.needsUpdate = true;
                
                const dataPoint = pointDataArray[INTERSECTED];
                dataDisplay.innerText = 
                    `Status: ${dataPoint.status}`;
            }
        } else {
            if (INTERSECTED !== null) {
                const originalColor = new THREE.Color(statusColors[pointDataArray[INTERSECTED].status]);
                pointsGroup.geometry.attributes.color.setXYZ(INTERSECTED, originalColor.r, originalColor.g, originalColor.b);
                pointsGroup.geometry.attributes.color.needsUpdate = true;
            }
            INTERSECTED = null;
        }
        
        renderer.render(scene, camera);
    }
    animate();
}

createGlobe();