// mil.js - STRAT_COM TACTICAL INTERFACE
let milMap;

function initMap() {
    // 1. Initialize Map with restricted bounds (no infinite gray edges)
    const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

    milMap = L.map('map', {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0, // Hard bounce at edges
        attributionControl: false
    });

    // 2. High-Contrast Tactical "Dark" Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        opacity: 0.8
    }).addTo(milMap);

    // 3. Expanded US Military Base Data
    const bases = [
        { name: "Ramstein Air Base", loc: [49.44, 7.59], info: "HQ USAFE-AFAFRICA" },
        { name: "Kadena Air Base", loc: [26.35, 127.76], info: "Keystone of the Pacific" },
        { name: "Camp Humphreys", loc: [36.96, 127.03], info: "Largest Overseas US Base" },
        { name: "Naval Base Guam", loc: [13.44, 144.70], info: "Strategic Pacific Hub" },
        { name: "Al Udeid Air Base", loc: [25.12, 51.31], info: "CENTCOM Forward HQ" },
        { name: "Thule Air Base", loc: [76.53, -68.70], info: "Space Force Arctic Hub" }
    ];

    // Tactical Pulsing Marker Style
    bases.forEach(base => {
        const marker = L.circleMarker(base.loc, {
            radius: 5,
            fillColor: "#ff0000",
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(milMap);

        marker.bindPopup(`<div style="background:#000; color:#fff; padding:5px; border-radius:0;">
            <b style="color:#ff3333">${base.name}</b><br>
            <small style="color:#aaa">${base.info}</small>
        </div>`);
    });

    // Store map globally so refreshMilMap can find it
    window.milMap = milMap;
}

// 3. WEAPON CATALOG SEARCH LOGIC
const MIL_DATA = [
    { name: "F-35C Lightning II", type: "air", desc: "Carrier-variant stealth fighter" },
    { name: "M1A2 SEPv3 Abrams", type: "ground", desc: "Next-gen main battle tank" },
    { name: "Zumwalt-Class", type: "sea", desc: "Guided missile destroyer" },
    { name: "B-21 Raider", type: "air", desc: "Sixth-generation stealth bomber" },
    { name: "LRASM", type: "ammo", desc: "Long Range Anti-Ship Missile" }
];

function initCatalog() {
    const search = document.getElementById('catalogSearch');
    const display = document.getElementById('catalogResults');

    search.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = MIL_DATA.filter(i => i.name.toLowerCase().includes(term));

        display.innerHTML = filtered.map(i => `
            <div class="col-md-4 mb-3">
                <div class="p-3 border border-danger border-opacity-25 bg-dark">
                    <span class="badge bg-danger mb-2">${i.type.toUpperCase()}</span>
                    <h6 class="text-white">${i.name}</h6>
                    <p class="small text-secondary m-0">${i.desc}</p>
                </div>
            </div>
        `).join('');
    });
}

// Start everything
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initCatalog();
});

function switchTab(tabId, element) {
    // ... your existing hide/show logic ...

    // Add this:
    if (tabId === 'mil_db') {
        refreshMilMap();
    }
}

function refreshMilMap() {
    if (window.milMap) {
        // This is the magic line that fixes the "partial loading" bug
        setTimeout(() => {
            window.milMap.invalidateSize();
        }, 200);
    }
}

refreshMilMap();