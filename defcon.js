/**
 * DEFCON Page Logic (Standalone)
 * Handles tactical map rendering and real-time telemetry.
 */

document.addEventListener('DOMContentLoaded', () => {
    initWorldMap();
    updateSubHeaderClock();
    setInterval(updateSubHeaderClock, 1000);
    
    fetchDefconStatus();
    setInterval(fetchDefconStatus, 300000); // 5 min sync
});

function initWorldMap() {
    // Initialize Leaflet Map
    const worldMap = L.map('worldMap', {
        zoomControl: false, // Disable +/- buttons
        center: [25, 10], 
        zoom: 3,
        minZoom: 2,
        maxZoom: 12
    });

    window.worldMapObj = worldMap;

    // Dark Matter Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO'
    }).addTo(worldMap);

    // Layer Groups for Visibility Control
    const tacticalLayers = {
        infra: L.layerGroup().addTo(worldMap),
        gov: L.layerGroup().addTo(worldMap),
        mil: L.layerGroup().addTo(worldMap),
        airport: L.layerGroup().addTo(worldMap),
        silo: L.layerGroup().addTo(worldMap),
        bunker: L.layerGroup().addTo(worldMap),
        fleet: L.layerGroup().addTo(worldMap),
        agents: L.layerGroup().addTo(worldMap)
    };

    // Measurement Layer
    const measureLayer = L.layerGroup().addTo(worldMap);

    // Measurement State
    let measureMode = false;
    let measurePoints = []; // unlimited sequential waypoints
    let totalMeasureDist = 0; // accumulated km

    window.toggleTacticalLayer = (type) => {
        const layer = tacticalLayers[type];
        if (!layer) return;
        const btn = document.getElementById(`toggle-${type}`);
        const led = btn ? btn.querySelector('.status-led') : null;
        
        const colors = { 
            infra: '#ff5e00', 
            gov: '#ffffff', 
            airport: '#ffe000', 
            mil: '#4b7bec', 
            silo: '#ff3e3e',
            bunker: '#8e44ad',
            fleet: '#ff2400',
            agents: '#ff0055'
        };

        if (worldMap.hasLayer(layer)) {
            worldMap.removeLayer(layer);
            if (btn) btn.style.opacity = '0.3';
            if (led) {
                led.style.background = '#444';
                led.style.boxShadow = 'none';
            }
        } else {
            worldMap.addLayer(layer);
            if (btn) btn.style.opacity = '1';
            if (led) {
                led.style.background = colors[type];
                led.style.boxShadow = `0 0 5px ${colors[type]}`;
            }
        }
    };

    window.toggleNukeControl = () => {
        const bar = document.querySelector('.control-bar');
        const deck = document.getElementById('missileDeck');
        const btn = document.getElementById('toggle-nuke');
        const led = btn ? btn.querySelector('.status-led') : null;
        
        if (!bar) return;
        
        const isHidden = window.getComputedStyle(bar).display === 'none';
        if (isHidden) {
            bar.style.display = 'flex';
            if (deck) deck.style.display = 'flex';
            if (btn) btn.style.background = 'rgba(217, 4, 41, 0.3)';
            if (led) {
                led.style.background = '#ff4444';
                led.style.boxShadow = '0 0 5px #ff4444';
            }
        } else {
            bar.style.display = 'none';
            if (deck) deck.style.display = 'none';
            if (btn) btn.style.background = 'rgba(217, 4, 41, 0.1)';
            if (led) {
                led.style.background = '#444';
                led.style.boxShadow = 'none';
            }
        }
    };

    window.toggleNewsBar = () => {
        const bar = document.getElementById('tactical-news-bar');
        const btn = document.getElementById('toggle-news');
        const led = btn ? btn.querySelector('.status-led') : null;
        
        if (!bar) return;
        
        const isHidden = window.getComputedStyle(bar).display === 'none';
        if (isHidden) {
            bar.style.display = 'flex';
            if (btn) btn.style.background = 'rgba(255, 255, 255, 0.15)';
            if (led) {
                led.style.background = '#4cd137'; // Strategic Green
                led.style.boxShadow = '0 0 5px #4cd137';
            }
        } else {
            bar.style.display = 'none';
            if (btn) btn.style.background = 'rgba(255, 255, 255, 0.05)';
            if (led) {
                led.style.background = '#444';
                led.style.boxShadow = 'none';
            }
        }
    };

    // Render US Military Bases
    if (typeof globalMilIntelligence !== 'undefined') {
        globalMilIntelligence.forEach(base => {
            let marker;
            // Identify target layer based on type
            let targetLayer;
            if (base.type === 'infra') targetLayer = tacticalLayers.infra;
            else if (base.type === 'gov') targetLayer = tacticalLayers.gov;
            else if (base.type === 'bunker') targetLayer = tacticalLayers.bunker;
            else targetLayer = tacticalLayers.mil;
            
            if (base.type === 'infra' || base.type === 'gov' || base.type === 'bunker') {
                const triangleClass = base.type === 'infra' ? 'triangle-orange' : base.type === 'gov' ? 'triangle-white' : 'triangle-purple';
                const icon = L.divIcon({
                    className: `tactical-triangle ${triangleClass}`,
                    iconSize: [12, 12],
                    iconAnchor: [6, 6]
                });
                marker = L.marker([base.lat, base.lng], { icon: icon }).addTo(targetLayer);
            } else {
                const icon = L.divIcon({
                    className: 'marker-base',
                    iconSize: [12, 12],
                    iconAnchor: [6, 12]
                });
                marker = L.marker([base.lat, base.lng], { icon: icon }).addTo(targetLayer);
            }

            const typeLabel = base.type === 'infra' ? 'CRITICAL_INFRA' : base.type === 'gov' ? 'GOV_CENTER' : base.type === 'bunker' ? 'COMMAND_BUNKER' : 'MIL_INSTALLATION';
            const nameColor = base.type === 'infra' ? '#ff8c00' : base.type === 'gov' ? '#fff' : base.type === 'bunker' ? '#8e44ad' : '#4b7bec';
            marker.bindPopup(`<div style="font-family: var(--font-mono); font-size: 0.6rem;">
                                <div style="color: rgba(255,255,255,0.4); margin-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2px;">${typeLabel}</div>
                                <strong style="color: ${nameColor}; letter-spacing: 1px;">${base.name}</strong><br>
                                <div style="margin-top: 5px; color: rgba(255,255,255,0.6);">
                                    UNIT: ${base.unit || 'NA'}<br>
                                    ${base.aircraft ? `ASSETS: ${base.aircraft}<br>` : ''}
                                    ${base.info ? `<i style="color:#ffde03;">${base.info}</i>` : ''}
                                </div>
                            </div>`);
        });
    }

    // Render Global Airports (Yellow Triangle)
    if (typeof globalAirports !== 'undefined') {
        globalAirports.forEach(ap => {
            const icon = L.divIcon({
                className: 'tactical-triangle triangle-yellow',
                iconSize: [12, 12],
                iconAnchor: [6, 6]
            });
            L.marker([ap.lat, ap.lng], { icon: icon })
                .bindPopup(`<div style="font-family: var(--font-mono); font-size: 0.6rem;">
                                    <div style="color: #ffe000; margin-bottom: 5px; border-bottom: 1px solid rgba(255,224,0,0.2); padding-bottom: 2px;">CIVIL_AVIATION</div>
                                    <strong style="color: #ffe000; letter-spacing: 1px;">${ap.iata} — ${ap.name}</strong><br>
                                    <div style="margin-top: 5px; color: rgba(255,255,255,0.6);">
                                        CLASS: ${ap.unit}<br>
                                        ${ap.info ? `<i style="color: rgba(255,255,255,0.4);">${ap.info}</i>` : ''}
                                    </div>
                                </div>`)
                .addTo(tacticalLayers.airport);
        });
    }

    // Render ICBM Silos (Minot, Malmstrom, FE Warren, etc.)
    const icbmInventories = [];
    if (typeof minotInventory !== 'undefined') icbmInventories.push(...minotInventory);
    if (typeof malmstromInventory !== 'undefined') icbmInventories.push(...malmstromInventory);
    if (typeof warrenInventory !== 'undefined') icbmInventories.push(...warrenInventory);

    icbmInventories.forEach(silo => {
        const icon = L.divIcon({
            className: 'marker-silo',
            iconSize: [12, 12],
            iconAnchor: [6, 12]
        });

        L.marker([silo.lat, silo.lng], { icon: icon })
            .bindPopup(`<div style="font-family: var(--font-mono); font-size: 0.6rem;">
                            <div style="color: #ff3e3e; margin-bottom: 5px; border-bottom: 1px solid rgba(255,62,62,0.2); padding-bottom: 2px;">STRATEGIC_ASSET</div>
                            <strong style="color: #fff; letter-spacing: 1px;">${silo.name}</strong><br>
                            <div style="margin-top: 5px; color: rgba(255,255,255,0.6);">
                                TYPE: ICBM_SILO<br>
                                CLASS: LGM-30G (Minuteman III)
                            </div>
                        </div>`)
            .addTo(tacticalLayers.silo);
    });

    // Render US Fleets
    if (typeof usFleets !== 'undefined') {
        usFleets.forEach(f => {
            L.circle([f.lat, f.lng], {
                color: f.color,
                fillColor: f.color,
                fillOpacity: 0.1,
                radius: f.radius,
                weight: 1,
                dashArray: '4, 4'
            }).bindPopup(`<div style="font-family: var(--font-mono); font-size: 0.6rem;">
                            <div style="color: ${f.color}; margin-bottom: 5px; border-bottom: 1px solid rgba(0,168,255,0.3); padding-bottom: 2px;">NAVAL_AOR</div>
                            <strong style="color: #fff; letter-spacing: 1px;">US NAVY ${f.name}</strong><br>
                            <div style="margin-top: 5px; color: rgba(255,255,255,0.6);">
                                AREA: ${f.info}
                                ${f.assets ? `<br><br><span style="color: #ffde03;">ASSETS ASSIGNED:</span><br>` + f.assets.join('<br>') : ''}
                            </div>
                        </div>`)
            .addTo(tacticalLayers.fleet);
        });
    }

    window.worldMapObj = worldMap;

    // --- NUKE SIMULATION CORE ---
    const impactLayer = L.layerGroup().addTo(worldMap);
    const trajectoryLayer = L.layerGroup().addTo(worldMap);
    let totalFatalities = 0;
    let isArmed = false;
    let activeMissiles = [];
    let missileCount = 0;
    let targetingId = null; // Currently active slot for map clicking

    const ICBM_SPEED_KPH = 24140;

    worldMap.on('click', (e) => {
        // --- MEASURE MODE INTERCEPT ---
        if (measureMode) {
            const pt = { lat: e.latlng.lat, lng: e.latlng.lng };

            // Green tactical dot marker
            const markerIcon = L.divIcon({
                className: '',
                html: `<div style="
                    width:7px; height:7px; border-radius:50%;
                    background:#39ff14;
                    box-shadow: 0 0 0 2px rgba(57,255,20,0.2), 0 0 7px #39ff14;
                "></div>`,
                iconSize: [7, 7],
                iconAnchor: [3, 3]
            });
            L.marker([pt.lat, pt.lng], { icon: markerIcon }).addTo(measureLayer);

            // If we have a previous point, draw segment line and accumulate distance
            if (measurePoints.length > 0) {
                const prev = measurePoints[measurePoints.length - 1];
                const segKm = getDistance(prev.lat, prev.lng, pt.lat, pt.lng);
                totalMeasureDist += segKm;

                L.polyline([[prev.lat, prev.lng], [pt.lat, pt.lng]], {
                    color: '#39ff14',
                    weight: 1.2,
                    dashArray: '5, 5',
                    opacity: 0.75
                }).addTo(measureLayer);
            }

            measurePoints.push(pt);
            updateMeasureHUD();
            return; // Don't process ICBM click
        }

        // --- ICBM TARGETING ---
        if (!isArmed) return;
        
        // If we have an active targeting slot OR a staged missile, clicking map updates it
        let activeUnit = activeMissiles.find(m => m.id === targetingId || m.status === 'STAGED');
        if (!activeUnit) return;

        const yieldKt = getSelectedYield();
        const originSelect = document.getElementById('launchOrigin');
        const originStr = originSelect.value;
        const originName = originSelect.options[originSelect.selectedIndex].text.split(' (')[0];
        const [oLat, oLng] = originStr.split(',').map(Number);
        
        // Update Unit Data
        activeUnit.oLat = oLat; activeUnit.oLng = oLng;
        activeUnit.originName = originName;
        activeUnit.tLat = e.latlng.lat; activeUnit.tLng = e.latlng.lng;
        activeUnit.y = yieldKt;
        
        const dist = getDistance(oLat, oLng, activeUnit.tLat, activeUnit.tLng);
        activeUnit.remaining = Math.round((dist / ICBM_SPEED_KPH) * 3600 * 1000);
        activeUnit.status = 'STAGED';
        targetingId = null; // Exit targeting mode once staged

        // Render Pre-Impact Blast Radius Preview
        renderBlastCircles(activeUnit);
        updateMissileDeck();
    });

    // --- MEASURE HUD UPDATER ---
    function updateMeasureHUD() {
        const n = measurePoints.length;
        const last = measurePoints[n - 1];
        const fmtC = (p) => `${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}`;
        document.getElementById('measure-pts-val').innerText = n;
        document.getElementById('measure-last-val').innerText = fmtC(last);
        if (totalMeasureDist > 0) {
            document.getElementById('measure-dist-km').innerText = totalMeasureDist.toFixed(1) + ' KM';
            document.getElementById('measure-dist-nm').innerText = (totalMeasureDist / 1.852).toFixed(1) + ' NM';
        } else {
            document.getElementById('measure-dist-km').innerText = '-- KM';
            document.getElementById('measure-dist-nm').innerText = '-- NM';
        }
        document.getElementById('measure-status-text').innerText = n === 1 ? 'SET DEST' : `${n} PTS`;
    }

    // --- MEASURE MODE TOGGLE ---
    window.toggleMeasureMode = () => {
        measureMode = !measureMode;
        const btn = document.getElementById('toggle-measure');
        const led = document.getElementById('measure-led');
        const hud = document.getElementById('measure-hud');

        if (measureMode) {
            if (btn) btn.classList.add('measure-active');
            if (led) { led.style.background = '#39ff14'; led.style.boxShadow = '0 0 5px #39ff14'; }
            if (hud) hud.style.display = 'flex';
            measureLayer.clearLayers();
            measurePoints = [];
            totalMeasureDist = 0;
            document.getElementById('measure-pts-val').innerText = '0';
            document.getElementById('measure-last-val').innerText = '---.----, ---.----';
            document.getElementById('measure-dist-km').innerText = '-- KM';
            document.getElementById('measure-dist-nm').innerText = '-- NM';
            document.getElementById('measure-status-text').innerText = 'SET ORIGIN';
            worldMap.getContainer().style.cursor = 'crosshair';
        } else {
            if (btn) btn.classList.remove('measure-active');
            if (led) { led.style.background = '#444'; led.style.boxShadow = 'none'; }
            if (hud) hud.style.display = 'none';
            measureLayer.clearLayers();
            measurePoints = [];
            totalMeasureDist = 0;
            worldMap.getContainer().style.cursor = '';
        }
    };

    window.clearMeasurement = () => {
        measureLayer.clearLayers();
        measurePoints = [];
        totalMeasureDist = 0;
        document.getElementById('measure-pts-val').innerText = '0';
        document.getElementById('measure-last-val').innerText = '---.----, ---.----';
        document.getElementById('measure-dist-km').innerText = '-- KM';
        document.getElementById('measure-dist-nm').innerText = '-- NM';
        document.getElementById('measure-status-text').innerText = 'SET ORIGIN';
    };

    window.createNewMissile = () => {
        if (!isArmed) {
            alert("SYSTEM_LOCKED: ARM PROTOCOL REQUIRED");
            return;
        }

        // BUFFER: Check if any existing missile is NOT launched/impacted
        const pending = activeMissiles.find(m => m.status === 'TARGETING' || m.status === 'STAGED');
        if (pending) {
            alert("DEPLOYMENT_BUFFER: PREVIOUS ASSET REQUIRES DISPATCH/ABORT");
            return;
        }

        missileCount++;
        const id = 'MISSILE_' + String(missileCount).padStart(2, '0');
        
        activeMissiles.push({
            id: id,
            status: 'TARGETING',
            remaining: 0,
            y: 0,
            oLat: 0, oLng: 0,
            tLat: 0, tLng: 0,
            originName: 'PENDING',
            circles: [],
            line: null,
            interval: null,
            aborted: false
        });
        
        targetingId = id; 
        updateMissileDeck();
    };

    function renderBlastCircles(m) {
        m.circles.forEach(c => impactLayer.removeLayer(c));
        m.circles = [];

        if (m.y <= 0) return;

        const r1 = Math.pow(m.y, 0.4) * 110;
        const r2 = Math.pow(m.y, 0.33) * 750;
        
        const c1 = L.circle([m.tLat, m.tLng], { color: '#ff1414', fill: false, radius: r1, stroke: true, weight: 2 }).addTo(impactLayer);
        const c2 = L.circle([m.tLat, m.tLng], { color: '#ff4d00', weight: 2, fill: false, radius: r2 }).addTo(impactLayer);
        const c3 = L.circle([m.tLat, m.tLng], { color: '#ffae00', weight: 1, fill: false, radius: r2 * 2 }).addTo(impactLayer);
        
        m.circles = [c1, c2, c3];
    }

    window.confirmLaunch = (id) => {
        const m = activeMissiles.find(x => x.id === id);
        if (!m || m.status !== 'STAGED') return;

        m.status = 'IN-FLIGHT';
        m.line = L.polyline([[m.oLat, m.oLng], [m.tLat, m.tLng]], { color: '#ff3e3e', weight: 2, dashArray: '5, 10', opacity: 0.8 }).addTo(trajectoryLayer);
        
        const card = document.getElementById(`m-${m.id}`);
        if (card) {
            card.classList.add('inflight');
            card.querySelector('.status').innerText = 'IN-FLIGHT';
            const btn = card.querySelector('.launch');
            if (btn) btn.remove();
        }

        updateInflightCount();
        
        m.interval = setInterval(() => {
            if (m.aborted) return clearInterval(m.interval);

            m.remaining -= 10;
            const timerEl = document.querySelector(`#m-${m.id} .timer`);
            if (timerEl) timerEl.innerText = formatPrecisionTime(m.remaining);

            if (m.remaining <= 0) {
                clearInterval(m.interval);
                m.status = 'IMPACT';
                
                const card = document.getElementById(`m-${m.id}`);
                if (card) {
                    card.querySelector('.status').innerText = 'IMPACT';
                    card.querySelector('.timer').innerText = '00:00:00';
                }

                const est = Math.floor(Math.pow(m.y, 0.7) * 5000 * (1 + Math.random() * 0.2));
                totalFatalities += est;
                document.getElementById('totalFatalities').innerText = totalFatalities.toLocaleString();
                
                updateInflightCount();
            }
        }, 10);
    };

    function updateMissileDeck() {
        const deck = document.getElementById('missileDeck');
        deck.innerHTML = activeMissiles.map(m => {
            const isStstaging = m.status === 'TARGETING';
            const isStaged = m.status === 'STAGED';
            const isInFlight = m.status === 'IN-FLIGHT';
            const timeStr = formatPrecisionTime(m.remaining);
            
            let cardClass = '';
            if (isInFlight) cardClass = 'inflight';
            if (isStstaging) cardClass = 'targeting-mode';

            const destStr = m.tLat ? `${m.tLat.toFixed(4)}, ${m.tLng.toFixed(4)}` : '0.0000, 0.0000';

            return `
                <div class="missile-card ${cardClass}" id="m-${m.id}" style="${isStstaging ? 'border-left-color: #ffde03; outline: 1px solid #ffde03;' : ''}">
                    <span class="id">${m.id}</span>
                    <div class="telemetry">
                        <div>FROM: <span class="coord">${m.originName}</span></div>
                        <div>TO: <span class="coord">${destStr}</span></div>
                    </div>
                    <span class="status">${m.status}</span>
                    <span class="timer">${timeStr}</span>
                    ${isStaged ? `<button class="missile-btn launch" onclick="confirmLaunch('${m.id}')">LAUNCH</button>` : ''}
                    <button class="missile-btn abort" onclick="abortMissile('${m.id}')">ABORT</button>
                </div>
            `;
        }).join('');
    }

    window.abortMissile = (id) => {
        const idx = activeMissiles.findIndex(x => x.id === id);
        if (idx !== -1) {
            const m = activeMissiles[idx];
            if (m.interval) clearInterval(m.interval);
            if (m.line) trajectoryLayer.removeLayer(m.line);
            m.circles.forEach(c => impactLayer.removeLayer(c));
            
            activeMissiles.splice(idx, 1);
            if (targetingId === id) targetingId = null;
            
            updateMissileDeck(); // Full rebuild only on deletion
            updateInflightCount();
        }
    };

    function updateInflightCount() {
        const iEl = document.getElementById('inflightAssets');
        const count = activeMissiles.filter(m => m.status === 'IN-FLIGHT').length;
        if (iEl) iEl.innerText = count > 0 ? count.toString().padStart(3, '0') : '--';
    }

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    function getSelectedYield() {
        const preset = document.getElementById('yieldPreset').value;
        if (preset === 'manual') {
            const val = parseFloat(document.getElementById('manualYieldVal').value) || 0;
            const unit = document.getElementById('manualYieldUnit').value;
            return unit === 'mt' ? val * 1000 : val;
        }
        return parseFloat(preset);
    }

    window.clearAllSims = () => {
        impactLayer.clearLayers();
        trajectoryLayer.clearLayers();
        activeMissiles.forEach(m => { if (m.line) worldMapObj.removeLayer(m.line); });
        activeMissiles = [];
        totalFatalities = 0;
        document.getElementById('totalFatalities').innerText = '--';
        document.getElementById('inflightAssets').innerText = '--';
        updateMissileDeck();
    };

    window.toggleManualYield = () => {
        const preset = document.getElementById('yieldPreset').value;
        document.getElementById('manualYieldWrap').style.display = preset === 'manual' ? 'flex' : 'none';
    };

    window.toggleArm = () => {
        isArmed = !isArmed;
        const btn = document.getElementById('armBtn');
        const st = document.getElementById('targetStatusText');
        
        if (isArmed) {
            btn.innerText = 'WEAPON_ARMED';
            btn.classList.add('active');
            st.innerText = 'SELECT_NEW_MISSILE_(+)';
            st.style.color = '#ffde03';
        } else {
            btn.innerText = 'UNARMED';
            btn.classList.remove('active');
            st.innerText = 'PROTOCOL_LOCKED';
            st.style.color = 'rgba(255,255,255,0.2)';
            
            // Cancel any active targeting
            targetingId = null;
            updateMissileDeck();
        }
    };

    function formatPrecisionTime(ms) {
        if (ms < 0) ms = 0;
        const min = Math.floor(ms / 60000);
        const sec = Math.floor((ms % 60000) / 1000);
        const mils = Math.floor((ms % 1000) / 10);
        return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}:${String(mils).padStart(2,'0')}`;
    }
}

function updateSubHeaderClock() {
    const now = new Date();
    const h = String(now.getUTCHours()).padStart(2, '0');
    const m = String(now.getUTCMinutes()).padStart(2, '0');
    const s = String(now.getUTCSeconds()).padStart(2, '0');
    
    const mainEl = document.getElementById('zulu-main');
    if (mainEl) mainEl.innerText = `${h}:${m}:${s} ZULU`;

    const subEl = document.getElementById('subTimestamp');
    if (subEl) {
        subEl.innerText = `${now.getUTCFullYear()}.${String(now.getUTCMonth() + 1).padStart(2,'0')}.${String(now.getUTCDate()).padStart(2,'0')}`;
    }
}
