const map = L.map('map').setView([-11.2027, 17.8739], 5); // Centered on Angola
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Fabric overlay for Angola
const fabricImageURL = 'https://cdn.glitch.global/20e2949b-a0ce-46d7-8fa0-7b90f24dcb5f/Asset%202.png?v=1733861368247';
const fabricOverlayBounds = [[-4.0, 12.0], [-18.0, 23.0]]; // Approximate bounds for Angola

// Create and manually add the fabric image element
const fabricImage = document.createElement('img');
fabricImage.src = fabricImageURL;
fabricImage.className = 'fabric-overlay';
document.body.appendChild(fabricImage);

// Update position and size of the overlay based on map bounds
function updateFabricPosition() {
    const bounds = map.latLngToLayerPoint(fabricOverlayBounds[0]); // Top-left corner
    const size = map.latLngToLayerPoint(fabricOverlayBounds[1]).subtract(bounds); // Size of the image

    fabricImage.style.left = `${bounds.x}px`;
    fabricImage.style.top = `${bounds.y}px`;
    fabricImage.style.width = `${size.x}px`;
    fabricImage.style.height = `${size.y}px`;
}

// Update position on map move/zoom
map.on('move', updateFabricPosition);
map.on('zoom', updateFabricPosition);
updateFabricPosition(); // Initial position

// Create a transparent polygon over Angola for interaction
const angolaPolygon = L.polygon([
    [-4.0, 12.0],
    [-4.0, 23.0],
    [-18.0, 23.0],
    [-18.0, 12.0]
], { color: 'transparent', fillOpacity: 0 }).addTo(map);

// Add hover interaction for the floating effect
angolaPolygon.on('mouseover', () => {
    fabricImage.classList.add('floating'); // Add the scaling effect
});

angolaPolygon.on('mouseout', () => {
    fabricImage.classList.remove('floating'); // Remove the scaling effect
});
