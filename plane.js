/**
 * plane.js — USAF / Military Aircraft Live Tracker
 * Fetches from OpenSky Network (free, no auth required for basic states)
 * Filters: US Military ICAO hex block (AE0000–AEFFFF) + known callsign prefixes
 * Renders: rotating plane SVG icons on the worldMap Leaflet instance
 * Refreshes: every 45 seconds
 */

(function () {
    // ── Config ──────────────────────────────────────────────────────────────
    const REFRESH_MS = 45000;
    const OPENSKY_URL = 'https://opensky-network.org/api/states/all';

    // US Military ICAO hex range: AE0000–AEFFFF
    const MIL_HEX_MIN = 0xAE0000;
    const MIL_HEX_MAX = 0xAEFFFF;

    // Known USAF/DoD callsign prefixes (partial match)
    const MIL_CALLSIGNS = [
        'RCH', 'REACH', 'SPAR', 'SAM', 'VENUS', 'JAKE', 'TOPCAT', 'DOOM',
        'USAF', 'MAGMA', 'OLIVE', 'IRON', 'COBRA', 'FURY', 'GHOST',
        'HAWK', 'VIPER', 'EAGLE', 'RAPTOR', 'BONE', 'BUFF', 'SPIRIT',
        'TIGER', 'HERKY', 'PAVE', 'VALOR', 'KNIFE', 'RANGER', 'RAVEN',
        'JOLLY', 'PEDRO', 'KING', 'DUKE', 'ACE', 'BARON', 'LANCE',
        'ATLAS', 'GLOBE', 'REACH', 'BISON', 'WOLF', 'REBEL'
    ];

    // State columns from OpenSky
    const COL = {
        icao24: 0, callsign: 1, origin: 2, lat: 6, lng: 5,
        altitude: 7, on_ground: 8, velocity: 9, heading: 10,
        vert_rate: 11, squawk: 14
    };

    // ── SVG plane icon factory ───────────────────────────────────────────────
    function makePlaneIcon(heading, isSpecial) {
        const color = isSpecial ? '#ff3e3e' : '#ffffff';
        const glow = isSpecial ? 'rgba(255,62,62,0.6)' : 'rgba(255,255,255,0.4)';
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                 style="transform: rotate(${heading}deg); filter: drop-shadow(0 0 3px ${glow});">
                <polygon points="11,1 14,13 11,11 8,13" fill="${color}" opacity="0.95"/>
                <polygon points="5,10 11,12 17,10 11,13" fill="${color}" opacity="0.7"/>
                <polygon points="8,16 11,14 14,16 11,20" fill="${color}" opacity="0.6"/>
            </svg>`;
        return L.divIcon({
            className: '',
            html: svg,
            iconSize: [22, 22],
            iconAnchor: [11, 11]
        });
    }

    // ── Helpers ──────────────────────────────────────────────────────────────
    function isMillHex(icao24) {
        const hex = parseInt(icao24, 16);
        return hex >= MIL_HEX_MIN && hex <= MIL_HEX_MAX;
    }

    function isMilCallsign(callsign) {
        if (!callsign) return false;
        const cs = callsign.trim().toUpperCase();
        return MIL_CALLSIGNS.some(p => cs.startsWith(p));
    }

    function fmtAlt(m) {
        if (m == null) return 'N/A';
        return `${Math.round(m * 3.281).toLocaleString()} ft`;
    }

    function fmtSpd(ms) {
        if (ms == null) return 'N/A';
        return `${Math.round(ms * 1.944)} kts`;
    }

    function fmtHdg(deg) {
        if (deg == null) return 'N/A';
        const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return `${Math.round(deg)}° (${dirs[Math.round(deg / 45) % 8]})`;
    }

    // ── Main tracker class ───────────────────────────────────────────────────
    class MilTracker {
        constructor(map) {
            this.map = map;
            this.layer = L.layerGroup().addTo(map);
            this.markers = {}; // icao24 → marker
            this.active = true;
            this.lastCount = 0;
            this.hudEl = this._buildHUD();
            this.fetch();
            this._interval = setInterval(() => this.fetch(), REFRESH_MS);
        }

        _buildHUD() {
            const container = document.getElementById('planeHUD-container');
            if (!container) return null;

            const div = document.createElement('div');
            div.id = 'planeHUD';
            div.style.cssText = `
                display: flex; align-items: center; gap: 12px;
                color: #fff; font-family: var(--font-mono); width: auto;
            `;
            div.innerHTML = `
                <div style="display:flex; gap:12px; align-items:center;">
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <div style="text-align: center;">
                            <div style="font-size:0.4rem; color:rgba(255, 255, 255, 0.61); letter-spacing:0.5px; font-weight:700; font-family:var(--font-main);">FLYING</div>
                            <div id="planeCount" style="font-size:1.1rem; color:#fff; font-weight:900; letter-spacing:0.5px; line-height:0.9;">--</div>
                        </div>
                        <div style="border-left: 1px solid rgba(255,255,255,0.1); padding-left: 10px;">
                            <div style="font-size:0.4rem; color:rgba(255, 255, 255, 0.61); letter-spacing:0.5px; font-weight:700; font-family:var(--font-main);">SYNC</div>
                            <div id="planeSync" style="font-size:0.5rem; color:white; line-height:1; font-weight:600;">--:--:-- Z</div>
                        </div>
                    </div>
                    
                    <div id="planeStatus" style="font-size:0.45rem; color:rgba(255,255,255,0.4); letter-spacing:0.5px; font-weight:600; min-width: 80px; text-transform: uppercase;">INITIALIZING...</div>
                    
                    <div style="display:flex; gap:5px;">
                        <button id="planeToggle" onclick="window.milTracker.toggle()"
                            style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); color:#fff;
                                   font-size:0.45rem; padding:2px 10px; cursor:pointer; letter-spacing:0.5px;
                                   transition:all 0.2s; font-family:var(--font-main); font-weight:800;">
                            HIDE
                        </button>
                        <button onclick="window.milTracker.fetch()"
                            style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); color:rgba(255,255,255,0.3);
                                   font-size:0.45rem; padding:2px 10px; cursor:pointer; letter-spacing:0.5px;
                                   transition:all 0.2s; font-family:var(--font-main); font-weight:700;">
                            SYNC
                        </button>
                    </div>
                </div>
            `;

            container.appendChild(div);
            return div;
        }

        _updateHUD(count, status) {
            const countEl = document.getElementById('planeCount');
            const syncEl = document.getElementById('planeSync');
            const statEl = document.getElementById('planeStatus');
            if (countEl) countEl.textContent = count.toString().padStart(3, '0');
            if (syncEl) {
                const now = new Date();
                syncEl.textContent = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} Z`;
            }
            if (statEl) statEl.textContent = status;
        }

        async fetch() {
            this._updateHUD(this.lastCount, 'FETCHING_OPENSKY...');
            try {
                const resp = await fetch(OPENSKY_URL, {
                    headers: { 'Accept': 'application/json' }
                });
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const data = await resp.json();
                const states = data.states || [];

                // Filter: military hex block OR known callsign
                const mil = states.filter(s => {
                    if (!s[COL.lat] || !s[COL.lng]) return false;
                    const isMilCS = isMilCallsign(s[COL.callsign]);
                    if (s[COL.on_ground] && !isMilCS) return false;
                    return isMillHex(s[COL.icao24]) || isMilCS;
                });

                this._renderAircraft(mil);
                this.lastCount = mil.length;
                this._updateHUD(mil.length, `TRACKING_${mil.length}_CONTACTS`);
            } catch (err) {
                this._updateHUD(this.lastCount, `ERR: ${err.message.substring(0, 28)}`);
                console.warn('[plane.js] OpenSky fetch failed:', err);
            }
        }

        _renderAircraft(states) {
            const seen = new Set();

            states.forEach(s => {
                const icao = s[COL.icao24];
                const lat = s[COL.lat];
                const lng = s[COL.lng];
                const heading = s[COL.heading] || 0;
                const callsign = (s[COL.callsign] || icao).trim().toUpperCase();
                const altitude = s[COL.altitude];
                const velocity = s[COL.velocity];
                const squawk = s[COL.squawk] || '----';
                const origin = s[COL.origin] || 'UNKNOWN';
                const vrate = s[COL.vert_rate];

                const isSpecial = isMilCallsign(callsign); // red for known callsigns
                const icon = makePlaneIcon(heading, isSpecial);

                // Vertical rate indicator
                let vertStr = '→ LEVEL';
                if (vrate != null) {
                    if (vrate > 0.5) vertStr = `↑ ${Math.round(vrate * 196)} fpm`;
                    else if (vrate < -0.5) vertStr = `↓ ${Math.abs(Math.round(vrate * 196))} fpm`;
                }

                const popupHtml = `
                    <div style="font-family:var(--font-mono); font-size:0.6rem;">
                        <div style="color:#fff; margin-bottom:5px; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:2px; letter-spacing:1px;">
                            ${isSpecial ? '⚡ USAF_ASSET' : 'MIL_AIRCRAFT'}
                        </div>
                        <strong style="color:${isSpecial ? '#ff3e3e' : '#fff'}; letter-spacing:1px; font-size:0.65rem;">${callsign}</strong><br>
                        <div style="margin-top:5px; color:rgba(255,255,255,0.6); line-height:1.6;">
                            ICAO: <span style="color:#fff;">${icao.toUpperCase()}</span><br>
                            ALT: <span style="color:#fff;">${fmtAlt(altitude)}</span><br>
                            SPD: <span style="color:#fff;">${fmtSpd(velocity)}</span><br>
                            HDG: <span style="color:#fff;">${fmtHdg(heading)}</span><br>
                            VERT: <span style="color:#fff;">${vertStr}</span><br>
                            SQK: <span style="color:#ffde03;">${squawk}</span><br>
                            CTRY: <span style="color:rgba(255,255,255,0.4);">${origin}</span>
                        </div>
                    </div>`;

                if (this.markers[icao]) {
                    this.markers[icao].setLatLng([lat, lng]).setIcon(icon);
                    this.markers[icao].getPopup().setContent(popupHtml);
                } else {
                    const m = L.marker([lat, lng], { icon })
                        .bindPopup(popupHtml)
                        .addTo(this.layer);
                    this.markers[icao] = m;
                }
                seen.add(icao);
            });

            // Remove stale markers
            Object.keys(this.markers).forEach(icao => {
                if (!seen.has(icao)) {
                    this.layer.removeLayer(this.markers[icao]);
                    delete this.markers[icao];
                }
            });
        }

        toggle() {
            this.active = !this.active;
            const btn = document.getElementById('planeToggle');
            const legendBtn = document.getElementById('toggle-plane');
            const led = legendBtn ? legendBtn.querySelector('.status-led') : null;

            if (this.active) {
                this.layer.addTo(this.map);
                if (btn) btn.textContent = 'HIDE';
                if (legendBtn) legendBtn.style.opacity = '1';
                if (led) {
                    led.style.background = '#ffffff';
                    led.style.boxShadow = '0 0 5px #ffffff';
                }
            } else {
                this.map.removeLayer(this.layer);
                if (btn) btn.textContent = 'SHOW';
                if (legendBtn) legendBtn.style.opacity = '0.3';
                if (led) {
                    led.style.background = '#444';
                    led.style.boxShadow = 'none';
                }
            }
        }

        destroy() {
            clearInterval(this._interval);
            this.map.removeLayer(this.layer);
            const hud = document.getElementById('planeHUD');
            if (hud) hud.remove();
        }
    }

    // ── Init — wait for worldMap to be ready ─────────────────────────────────
    function tryInit() {
        if (window.worldMapObj) {
            window.milTracker = new MilTracker(window.worldMapObj);
        } else {
            setTimeout(tryInit, 500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        tryInit();
    }
})();
