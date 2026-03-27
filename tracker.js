/**
 * tracker.js
 * Handles real-time multi-user "Live Agents" map layer using MQTT over WebSockets.
 */

const TRACKER_TOPIC = 'stratcom/defcon/v2/live_agents';
const USER_ID = 'AGENT_' + Math.random().toString(36).substr(2, 9).toUpperCase();
const activeAgents = new Map();
let mqttClient = null;

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
    console.log('[TRACKER] Initializing secure uplink to HiveMQ...');
    mqttClient = mqtt.connect('wss://broker.hivemq.com:8000/mqtt');

    mqttClient.on('connect', () => {
        console.log(`[TRACKER] ${USER_ID} connected to secure uplink.`);
        mqttClient.subscribe(TRACKER_TOPIC, (err) => {
            if (!err) {
                console.log(`[TRACKER] Subscribed to ${TRACKER_TOPIC}`);
                startBroadcast();
            } else {
                console.error('[TRACKER] Subscription error:', err);
            }
        });
    });

    mqttClient.on('message', (topic, message) => {
        if (topic === TRACKER_TOPIC) {
            try {
                const data = JSON.parse(message.toString());
                if (data.id && data.lat !== undefined && data.lng !== undefined) {
                    // Update field agents (we can also render ourselves to confirm it's working)
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
        for (const [id, agent] of activeAgents.entries()) {
            if (now - agent.lastSeen > 60000) { // 60 seconds without ping = stale
                if (agent.marker && window.worldMapObj.hasLayer(agent.marker)) {
                    if (window.tacticalLayers && window.tacticalLayers.agents) {
                        window.tacticalLayers.agents.removeLayer(agent.marker);
                    } else {
                        window.worldMapObj.removeLayer(agent.marker);
                    }
                }
                activeAgents.delete(id);
                console.log(`[TRACKER] Agent ${id} signal lost (stale).`);
            }
        }
    }, 30000);
}

function startBroadcast() {
    // Geolocation requires HTTP or HTTPS. It will silently fail on file:/// in many browsers.
    if (window.location.protocol === 'file:') {
        console.warn('[TRACKER] Geolocation is blocked on file:// protocol. Please use http://127.0.0.1:3584');
        return;
    }

    if ('geolocation' in navigator) {
        console.log('[TRACKER] Requesting geolocation coordinates...');
        navigator.geolocation.watchPosition(
            (position) => {
                const payload = {
                    id: USER_ID,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    timestamp: Date.now()
                };
                
                // Publish our location to the swarm
                mqttClient.publish(TRACKER_TOPIC, JSON.stringify(payload));
                
                // Locally update our own location immediately
                updateAgentLocation(payload, true);
            },
            (error) => {
                console.warn('[TRACKER] Geolocation error:', error.message, 'Code:', error.code);
                if (error.code === error.PERMISSION_DENIED) {
                    console.warn('[TRACKER] User denied location access. Operating in ghost mode.');
                } else if (error.code === error.TIMEOUT) {
                    console.warn('[TRACKER] Geolocation request timed out.');
                }
            },
            {
                enableHighAccuracy: false, // Desktops often fail with high accuracy
                maximumAge: 10000,         
                timeout: 30000             // Give it more time  to figure out location
            }
        );
    } else {
        console.error('[TRACKER] Geolocation is not supported by this browser.');
    }
}

function updateAgentLocation(data, isSelf = false) {
    if (!window.worldMapObj) return;

    const targetLayer = (window.tacticalLayers && window.tacticalLayers.agents) 
                        ? window.tacticalLayers.agents 
                        : window.worldMapObj;

    let agent = activeAgents.get(data.id);

    if (!agent) {
        // Create new blip marker
        const iconHtml = `<div class="agent-blip"></div>`;
        const icon = L.divIcon({
            className: '', // reset default leaflet class
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
                                STATUS: ONLINE
                            </div>
                        </div>`);

        marker.addTo(targetLayer);

        agent = { marker: marker, lastSeen: data.timestamp };
        activeAgents.set(data.id, agent);
        
        if (!isSelf) {
            console.log(`[TRACKER] New agent detected on radar: ${data.id}`);
        }
    } else {
        // Update existing marker
        agent.marker.setLatLng([data.lat, data.lng]);
        agent.lastSeen = data.timestamp;
    }
}
