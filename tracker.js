/**
 * tracker.js
 * Handles real-time multi-user "Live Agents" map layer using MQTT over WebSockets.
 */

const TRACKER_TOPIC = 'stratcom/defcon/v2/live_agents';
const USER_ID = 'AGENT_' + Math.random().toString(36).substr(2, 9).toUpperCase();
const activeAgents = new Map();
let mqttClient = null;
let isWatching = false;

document.addEventListener('DOMContentLoaded', () => {
    // Wait for the map to initialize properly
    setTimeout(initTracker, 1000);
});

function initTracker() {
    if (!window.worldMapObj || typeof mqtt === 'undefined') {
        console.warn('[TRACKER] Map or MQTT not loaded yet, retrying...');
        setTimeout(initTracker, 1000);
        return;
    }

    // Connect to HiveMQ Public Broker via Secure WebSockets
    console.log('[TRACKER] Initializing secure uplink via HiveMQ...');
    mqttClient = mqtt.connect('wss://broker.hivemq.com:8000/mqtt');

    const updateUplinkUI = (status, color) => {
        const countEl = document.getElementById('agent-count');
        if (countEl) countEl.style.color = color;
        console.log(`[TRACKER] Uplink status: ${status}`);
    };

    mqttClient.on('connect', () => {
        console.log(`[TRACKER] ${USER_ID} connected to secure uplink.`);
        updateUplinkUI('CONNECTED', '#ff0055');
        mqttClient.subscribe(TRACKER_TOPIC, (err) => {
            if (!err) {
                console.log(`[TRACKER] Subscribed to ${TRACKER_TOPIC}`);
                startBroadcast();
            } else {
                console.error('[TRACKER] Subscription error:', err);
            }
        });
    });

    mqttClient.on('error', (err) => {
        console.error('[TRACKER] Uplink error:', err);
        updateUplinkUI('ERROR', '#ff9900');
    });

    mqttClient.on('offline', () => {
        updateUplinkUI('OFFLINE', '#444');
    });

    mqttClient.on('message', (topic, message) => {
        if (topic === TRACKER_TOPIC) {
            try {
                const data = JSON.parse(message.toString());
                if (data.id && data.lat !== undefined && data.lng !== undefined) {
                    // Filter out stale broadcast messages (>2 mins)
                    if (data.timestamp && Date.now() - data.timestamp > 120000) return;
                    updateAgentLocation(data, data.id === USER_ID);
                }
            } catch (e) {
                console.error('[TRACKER] Invalid payload received:', e);
            }
        }
    });

    // Cleanup stale agents every 30 seconds
    setInterval(() => {
        const now = Date.now();
        let changed = false;
        
        const targetLayer = (window.tacticalLayers && window.tacticalLayers.agents) 
                            ? window.tacticalLayers.agents 
                            : window.worldMapObj;

        for (const [id, agent] of activeAgents.entries()) {
            if (now - agent.lastSeen > 60000) { // 60 seconds without ping = stale
                if (agent.marker) {
                    targetLayer.removeLayer(agent.marker);
                }
                activeAgents.delete(id);
                console.log(`[TRACKER] Agent ${id} signal lost (stale).`);
                changed = true;
            }
        }
        if (changed) updateAgentCount();
    }, 30000);
}

function updateAgentCount() {
    const countEl = document.getElementById('agent-count');
    if (countEl) {
        countEl.innerText = activeAgents.size.toString().padStart(2, '0');
    }
}

async function fetchIPLocation() {
    console.log('[TRACKER] Attempting IP-geoloc fallback...');
    try {
        const response = await fetch('https://freeipapi.com/api/json');
        if (!response.ok) throw new Error('IP API failed');
        const data = await response.json();
        
        if (data.latitude && data.longitude) {
            console.log(`[TRACKER] IP-geoloc successful: ${data.cityName}`);
            const payload = {
                id: USER_ID,
                lat: data.latitude,
                lng: data.longitude,
                timestamp: Date.now(),
                isFallback: true
            };
            
            if (mqttClient && mqttClient.connected) {
                mqttClient.publish(TRACKER_TOPIC, JSON.stringify(payload));
            }
            updateAgentLocation(payload, true);
        }
    } catch (e) {
        console.error('[TRACKER] IP Fallback failed:', e);
    }
}

function startBroadcast() {
    if (isWatching) return;
    
    if (!('geolocation' in navigator)) {
        console.error('[TRACKER] Geolocation is NOT supported. Fallback to IP...');
        fetchIPLocation();
        return;
    }

    console.log('[TRACKER] Requesting geolocation... (Protocol:', window.location.protocol, ')');
    
    // Check if on file:// protocol which usually blocks geolocation
    if (window.location.protocol === 'file:') {
        console.warn('[TRACKER] WARNING: Geolocation usually fails on file://. Recommend using a local server.');
        alert('STRATCOM_ALERT: Real-time tracking is BLOCKED by the browser on file:// protocol.\n\nPlease host this project or use a local server (like VS Code Live Server) to see real-time agent locations.');
    }

    const geoOptions = {
        enableHighAccuracy: true, 
        maximumAge: 0,          
        timeout: 8000 // Shorten timeout to trigger fallback faster
    };

    isWatching = true;
    navigator.geolocation.watchPosition(
        (position) => {
            const payload = {
                id: USER_ID,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                timestamp: Date.now()
            };
            
            if (mqttClient && mqttClient.connected) {
                mqttClient.publish(TRACKER_TOPIC, JSON.stringify(payload));
            }
            
            // Locally update our own location immediately
            updateAgentLocation(payload, true);
        },
        (error) => {
            console.warn('[TRACKER] Native geolocation unavailable or blocked. Activating IP-geoloc fallback.');
            fetchIPLocation();
            
            // If it was a permission or protocol issue, we stop watching and just rely on IP refresh
            if (error.code === error.PERMISSION_DENIED || window.location.protocol === 'file:') {
                 // Refresh IP location every 30 seconds as fallback
                 setInterval(fetchIPLocation, 30000);
            }
        },
        geoOptions
    );
}

function updateAgentLocation(data, isSelf = false) {
    if (!window.worldMapObj) return;

    const targetLayer = (window.tacticalLayers && window.tacticalLayers.agents) 
                        ? window.tacticalLayers.agents 
                        : window.worldMapObj;

    let agent = activeAgents.get(data.id);

    if (!agent) {
        const iconHtml = `<div class="agent-blip" style="${isSelf ? 'background: #00ff00; box-shadow: 0 0 10px #00ff00;' : ''}"></div>`;
        const icon = L.divIcon({
            className: '', 
            html: iconHtml,
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });

        const marker = L.marker([data.lat, data.lng], { icon: icon });
        const label = isSelf ? `<span style="color:#00ff00;">YOU (OPERATOR)</span>` : `AGENT // ${data.id}`;
        
        marker.bindPopup(`<div style="font-family: var(--font-mono); font-size: 0.6rem;">
                            <div style="color: #ff0055; margin-bottom: 5px; border-bottom: 1px solid rgba(255,0,85,0.3); padding-bottom: 2px;">LIVE_TRACKER_NODE</div>
                            <strong style="color: #fff; letter-spacing: 1px;">${label}</strong><br>
                            <div style="margin-top: 5px; color: rgba(255,255,255,0.6);">
                                LAT: ${data.lat.toFixed(5)}<br>
                                LNG: ${data.lng.toFixed(5)}<br>
                                SOURCE: ${data.isFallback ? 'IP_TRIANGULATION' : 'GPS_GNSS'}<br>
                                STATUS: ONLINE
                            </div>
                        </div>`);

        marker.addTo(targetLayer);

        agent = { marker: marker, lastSeen: data.timestamp };
        activeAgents.set(data.id, agent);
        
        if (!isSelf) console.log(`[TRACKER] New agent detected on radar: ${data.id}`);
        updateAgentCount();
    } else {
        agent.marker.setLatLng([data.lat, data.lng]);
        agent.lastSeen = data.timestamp;
    }
}
