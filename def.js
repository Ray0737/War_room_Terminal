/**
 * LIVE DEFCON TRACKER
 * Fetches real-time alert levels from the DEFCON Warning System.
 * This is an external OSINT source; the US Military does not publish live levels.
 */
async function getDefconStatus() {
    const levelDisplay = document.getElementById('defconLevel');
    const statusText = document.getElementById('defconStatus');

    // CORS proxy is necessary to fetch from external domains in a browser
    const PROXY_URL = "https://corsproxy.io/?";
    const TARGET_URL = "https://api.defconwarningsystem.com/v1/status";

    try {
        const response = await fetch(PROXY_URL + encodeURIComponent(TARGET_URL));

        if (!response.ok) throw new Error("EXTERNAL_SOURCE_OFFLINE");

        const data = await response.json();

        // data.level: 1-5 (Integer)
        // data.description: Official condition text from source
        renderDefcon(data.level, data.description.toUpperCase());

    } catch (error) {
        console.error("DEFCON_SYNC_ERROR:", error);

        // No fake data/fallback. If the link breaks, the UI shows it.
        if (levelDisplay) {
            levelDisplay.innerText = "??";
            levelDisplay.style.color = "#555";
        }
        if (statusText) {
            statusText.innerHTML = `STATUS: UNREACHABLE <br> 
                                   <small style="font-size:0.5rem; opacity:0.5">CHECK: <a href="https://defconwarningsystem.com" target="_blank" style="color:#00ff41">DEFCONWARNINGSYSTEM.COM</a></small>`;
        }
    }
}

function renderDefcon(level, description) {
    const levelEl = document.getElementById('defconLevel');
    const statusEl = document.getElementById('defconStatus');

    if (levelEl) {
        levelEl.innerText = level;

        // Logic: 1-3 (High Alert) = Red; 4-5 = Green
        const isCritical = level <= 3;
        levelEl.style.color = isCritical ? "#ff0000" : "#00ff41";
        levelEl.style.textShadow = isCritical ? "0 0 15px #ff0000" : "0 0 15px #00ff41";
    }

    if (statusEl) {
        // Displays official status + a clickable verification link
        statusEl.innerHTML = `STATUS: ${description} 
                             <a href="https://defconwarningsystem.com" target="_blank" 
                                style="color:inherit; text-decoration:none; opacity: 0.3; font-size: 0.5rem; margin-left: 5px;">
                                [VERIFY_SOURCE]
                             </a>`;
    }
}

// Initial pull
getDefconStatus();

// ---------------------------------------------------------------------------------------------------


const assetDatabase = [
    // --- AIRFORCE / NAVY JETS (THE COMPLETE STACK) ---
    { id: "F-14D", name: "Super Tomcat", cat: "AIRCRAFT", specs: { mfr: "Grumman", type: "Interceptor", gen: "4th", speed: "Mach 2.34", rcs: "10m²", payload: "14,500lb", range: "1,600nm", engine: "2x F110-GE-400", loadout: "6x AIM-54, 20mm M61" } },
    { id: "F-15EX", name: "Eagle II", cat: "AIRCRAFT", specs: { mfr: "Boeing", type: "Air Superiority", gen: "4.5", speed: "Mach 2.5", rcs: "2.5m²", payload: "29,500lb", range: "2,100nm", engine: "2x F110-GE-129", loadout: "12x AMRAAM, 20mm M61" } },
    { id: "F-16C", name: "Viper", cat: "AIRCRAFT", specs: { mfr: "GD/LM", type: "Multi-role", gen: "4th", speed: "Mach 2.05", rcs: "1.2m²", payload: "17,000lb", range: "2,200nm", engine: "1x F110-GE-129", loadout: "6x AIM-120, 20mm M61" } },
    { id: "F/A-18E/F", name: "Super Hornet", cat: "AIRCRAFT", specs: { mfr: "Boeing", type: "Carrier Multi", gen: "4.5", speed: "Mach 1.8", rcs: "1.0m²", payload: "17,750lb", range: "1,275nm", engine: "2x F414-GE-400", loadout: "AIM-120/Harpoon, 20mm" } },
    { id: "F-22A", name: "Raptor", cat: "AIRCRAFT", specs: { mfr: "LM", type: "Stealth Fighter", gen: "5th", speed: "Mach 2.25", rcs: "0.0001m²", payload: "5,000lb (Int)", range: "1,600nm", engine: "2x F119-PW-100", loadout: "6x AIM-120, 2x AIM-9" } },
    { id: "F-35C", name: "Lightning II", cat: "AIRCRAFT", specs: { mfr: "LM", type: "Carrier Stealth", gen: "5th", speed: "Mach 1.6", rcs: "0.005m²", payload: "18,000lb", range: "1,200nm", engine: "1x F135-PW-100", loadout: "4x AIM-120 (Int), 25mm" } },
    { id: "F-117A", name: "Nighthawk", cat: "AIRCRAFT", specs: { mfr: "LM", type: "Stealth Attack", gen: "2nd Gen Stealth", speed: "Mach 0.92", rcs: "0.003m²", payload: "4,000lb", range: "930nm", engine: "2x F404-F1D2", loadout: "2x GBU-27, No Gun" } },
    { id: "YF-23", name: "Black Widow II", cat: "AIRCRAFT", specs: { mfr: "Northrop", type: "Prototype Stealth", gen: "5th", speed: "Mach 2.2+", rcs: "0.00008m²", payload: "4,000lb (Int)", range: "2,400nm", engine: "2x YF120-GE", loadout: "4x AIM-120, 20mm M61" } },
    { id: "SR-71", name: "Blackbird", cat: "AIRCRAFT", specs: { mfr: "LM", type: "Strategic Recon", gen: "Legacy ISR", speed: "Mach 3.3+", rcs: "0.01m²", payload: "N/A (Sensors)", range: "2,900nm", engine: "2x Pratt & Whitney J58", loadout: "Unarmed" } },
    { id: "SR-72", name: "Darkstar", cat: "AIRCRAFT", specs: { mfr: "LM", type: "Hypersonic Strike", gen: "6th", speed: "Mach 6.0", rcs: "0.00005m²", payload: "Classified", range: "Global", engine: "TBCC Hypersonic", loadout: "Precision Strike (Int)" } },
    { id: "U-2S", name: "Dragon Lady", cat: "AIRCRAFT", specs: { mfr: "LM", type: "High-Alt Recon", gen: "Legacy ISR", speed: "Mach 0.67", rcs: "0.5m²", payload: "5,000lb", range: "6,000nm", engine: "1x GE F118-101", loadout: "Unarmed / ASARS-2" } },
    // --- BOMBER FLEET ---
    { id: "B-1B", name: "Lancer", cat: "AIRCRAFT", type: "Supersonic Bomber", specs: { mfr: "Rockwell", payload: "75,000 lb", engine: "4x F101-GE-102", speed: "Mach 1.25" } },
    { id: "B-2A", name: "Spirit", cat: "AIRCRAFT", type: "Stealth Bomber", specs: { mfr: "Northrop", rcs: "0.0001 m²", payload: "40,000 lb", engine: "4x F118-GE-100" } },
    { id: "B-21", name: "Raider", cat: "AIRCRAFT", type: "6th Gen Bomber", specs: { rcs: "0.00001 m²", status: "INITIAL_PROD", payload: "Classified", range: "Global" } },
    { id: "B-52H", name: "Stratofortress", cat: "AIRCRAFT", type: "Heavy Bomber", specs: { mfr: "Boeing", engine: "8x TF33-P-3", payload: "70,000 lb", range: "8,800 nm" } },
    { id: "SR-71", name: "Blackbird", cat: "AIRCRAFT", type: "Strategic Recon", specs: { mfr: "LM Skunk Works", speed: "Mach 3.3+", alt: "85,000ft", engine: "2x Pratt & Whitney J58", status: "RETIRED", note: "Titanium Airframe" } },
    { id: "SR-72", name: "Darkstar", cat: "AIRCRAFT", type: "Hypersonic ISR/Strike", specs: { mfr: "LM Skunk Works", speed: "Mach 6.0+", alt: "100,000ft+", propulsion: "TBCC Hypersonic", status: "DEVELOPMENT", role: "Penetrating ISR" } },
    { id: "U-2S", name: "Dragon Lady", cat: "AIRCRAFT", type: "High-Alt Recon", specs: { mfr: "Lockheed", alt: "70,000ft+", endurance: "12hr+", sensors: "SYERS-2C / ASARS-2B", status: "ACTIVE", range: "6,000nm" } },
    // --- TRANSPORT & TANKERS ---
    { id: "C-130J", name: "Super Hercules", cat: "AIRCRAFT", type: "Tactical Airlift", specs: { mfr: "Lockheed Martin", engine: "4x RR AE 2100D3", payload: "42,000 lb", speed: "417 mph" } },
    { id: "C-17A", name: "Globemaster III", cat: "AIRCRAFT", type: "Strategic Airlift", specs: { payload: "170,900 lb", engine: "4x F117-PW-100", runway: "3,500 ft" } },
    { id: "C-5M", name: "Super Galaxy", cat: "AIRCRAFT", type: "Heavy Strategic", specs: { payload: "281,000 lb", engine: "4x F138-GE-100", range: "4,800 nm" } },
    { id: "KC-135R", name: "Stratotanker", cat: "AIRCRAFT", type: "Aerial Refueling", specs: { fuel_cap: "200,000 lb", engine: "4x CFM56", range: "11,000 nm", status: "ACTIVE" } },
    { id: "KC-10A", name: "Extender", cat: "AIRCRAFT", type: "Heavy Tanker", specs: { fuel_cap: "356,000 lb", engine: "3x CF6-50C2", status: "PHASING_OUT" } },
    { id: "KC-46A", name: "Pegasus", cat: "AIRCRAFT", type: "Modern Tanker", specs: { fuel_cap: "212,000 lb", engine: "2x PW4062", radar: "RVS System" } },
    { id: "AC-130J", name: "Ghostrider", cat: "AIRCRAFT", type: "Heavy Gunship", specs: { mfr: "Lockheed", gun: "105mm M102, 30mm GAU-23/A", missiles: "AGM-176 Griffin, Hellfire", engine: "4xRR AE 2100D3", role: "CAS / ISR", status: "ACTIVE" } },
    { id: "AC-130U", name: "Spooky II", cat: "AIRCRAFT", type: "Heavy Gunship", specs: { mfr: "Lockheed", gun: "105mm, 40mm Bofors, 25mm GAU-12", radar: "APQ-180", engine: "4xAllison T56", status: "RETIRED", note: "Triple-Gun Threat" } },
    { id: "AC-130W", name: "Stinger II", cat: "AIRCRAFT", type: "Precision Strike", specs: { mfr: "Lockheed", gun: "30mm GAU-23/A", missiles: "GBU-39 SDB, AGM-176", speed: "300mph", role: "Special Ops", status: "ACTIVE" } },
    // --- UNMANNED AERIAL VEHICLES (UAV / UCAV) ---
    { id: "MQ-1B", name: "Predator", cat: "AIRCRAFT", type: "MALE UAV", specs: { mfr: "GA-ASI", engine: "Rotax 914", speed: "135mph", missiles: "2xHellfire", status: "RETIRED/RESERVE" } },
    { id: "MQ-9B", name: "Reaper", cat: "AIRCRAFT", type: "Hunter-Killer", specs: { mfr: "GA-ASI", endurance: "27hr", alt: "50k ft", missiles: "8xHellfire/GBU-12", engine: "TPE331-10" } },
    { id: "RQ-4B", name: "Global Hawk", cat: "AIRCRAFT", type: "High-Alt ISR", specs: { mfr: "Northrop", range: "12k nm", endurance: "34hr+", alt: "60k ft", sensors: "SIGINT/EO/IR" } },
    { id: "MQ-4C", name: "Triton", cat: "AIRCRAFT", type: "Maritime ISR", specs: { mfr: "Northrop", role: "Naval Surveillance", endurance: "30hr", range: "8,200nm", radar: "MFAS" } },
    { id: "RQ-170", name: "Sentinel", cat: "AIRCRAFT", type: "Stealth Recon", specs: { mfr: "LM", design: "Flying Wing", status: "CLASSIFIED", role: "Low-Observable ISR", engine: "TF34" } },
    { id: "RQ-180", name: "White Bat", cat: "AIRCRAFT", type: "Stealth ISR", specs: { mfr: "Northrop", gen: "Next-Gen Stealth", alt: "70k ft+", status: "CLASSIFIED", role: "Penetrating ISR" } },
    { id: "MQ-25", name: "Stingray", cat: "AIRCRAFT", type: "Carrier Tanker", specs: { mfr: "Boeing", role: "Aerial Refueling", platform: "CVN-78/68", fuel: "15k lb", status: "FIELDING" } },
    { id: "XQ-58A", name: "Valkyrie", cat: "AIRCRAFT", type: "Loyal Wingman", specs: { mfr: "Kratos", speed: "Mach 0.85", range: "3,000nm", role: "Autonomous Escort", status: "TESTING" } },
    { id: "MQ-1C", name: "Gray Eagle", cat: "AIRCRAFT", type: "Army UCAV", specs: { mfr: "GA-ASI", endurance: "25hr", missiles: "4xHellfire", engine: "Heavy Fuel Engine", status: "ACTIVE" } },
    { id: "RQ-7B", name: "Shadow", cat: "AIRCRAFT", type: "Tactical UAV", specs: { mfr: "AAI", range: "125km", launch: "Catapult", endurance: "9hr", status: "ACTIVE" } },
    { id: "RQ-21A", name: "Blackjack", cat: "AIRCRAFT", type: "Small Tactical", specs: { mfr: "Boeing Insitu", endurance: "16hr", speed: "90mph", launch: "Launcher Rail", status: "ACTIVE" } },
    { id: "RQ-11B", name: "Raven", cat: "AIRCRAFT", type: "SUAS", specs: { mfr: "AV", weight: "4.2lb", launch: "Hand-Launch", range: "10km", status: "INFANTRY_STD" } },
    { id: "MQ-20", name: "Avenger", cat: "AIRCRAFT", type: "Stealth UCAV", specs: { mfr: "GA-ASI", engine: "Turbofan", speed: "460mph", payload: "Internal/3.5k lb", status: "ACTIVE" } },

    // --- HELICOPTERS (ROTARY WING) ---
    { id: "UH-1Y", name: "Venom (Huey)", cat: "AIRCRAFT", type: "Utility Helo", specs: { mfr: "Bell", speed: "189 mph", engine: "2x GE T700", weapons: "M134, Rockets" } },
    { id: "AH-1Z", name: "Viper (Cobra)", cat: "AIRCRAFT", type: "Attack Helo", specs: { mfr: "Bell", gun: "20mm M197", missiles: "16x Hellfire", speed: "200 mph" } },
    { id: "UH-60M", name: "Black Hawk", cat: "AIRCRAFT", type: "Utility Transport", specs: { mfr: "Sikorsky", speed: "183 mph", engine: "2x T700-GE", capacity: "11 Troops" } },
    { id: "CH-47F", name: "Chinook", cat: "AIRCRAFT", type: "Heavy Lift", specs: { rotor: "Tandem", speed: "196 mph", payload: "24,000 lb", engine: "2x Lycoming" } },
    { id: "AH-64E", name: "Apache", cat: "AIRCRAFT", type: "Attack Helo", specs: { gun: "30mm M230", radar: "Longbow FCR", engine: "2x T700-GE", status: "ACTIVE" } },
    { id: "CH-53K", name: "King Stallion", cat: "AIRCRAFT", type: "Heavy Lift", specs: { mfr: "Sikorsky", payload: "36,000 lb", engine: "3x GE T408", speed: "200 mph" } },

    { id: "CVN-78", name: "Gerald R. Ford", cat: "NAVY", type: "Nuclear Carrier", specs: { mfr: "Newport News", propulsion: "2x A1B Nuclear", launch: "EMALS", deck: "75+ Aircraft", speed: "30+ knots", range: "Unlimited" } },
    { id: "CVN-68", name: "Nimitz Class", cat: "NAVY", type: "Nuclear Carrier", specs: { mfr: "Newport News", propulsion: "2x A4W Nuclear", deck: "60-90 Units", vls: "NSSM / Sea Sparrow", speed: "30 knots" } },
    { id: "LHA-6", name: "America Class", cat: "NAVY", type: "Helo Carrier", specs: { role: "Amphibious Assault", aircraft: "F-35B, MV-22, MH-60", displacement: "45,000 tons", propulsion: "Gas Turbine" } },
    { id: "CG-47", name: "Ticonderoga", cat: "NAVY", type: "Guided Missile Cruiser", specs: { radar: "Aegis SPY-1B", vls: "122 Cells", weapons: "Tomahawk, Harpoon, 5-inch Gun", speed: "32 knots" } },
    { id: "DDG-51", name: "Arleigh Burke", cat: "NAVY", type: "Guided Missile Destroyer", specs: { gen: "Flight III", radar: "AN/SPY-6", vls: "96 Cells", missiles: "SM-6, Tomahawk", speed: "30+ knots" } },
    { id: "SSN-774", name: "Virginia Class", cat: "NAVY", type: "Attack Submarine", specs: { propulsion: "S9G Nuclear", depth: "800+ ft", weapons: "Mk48 Torpedo, Tomahawk", feature: "VPM (Payload Module)" } },
    { id: "SSBN-726", name: "Ohio Class", cat: "NAVY", type: "Ballistic Missile Sub", specs: { role: "Strategic Deterrence", missiles: "24x Trident II D5", range: "Unlimited", status: "READY" } },
    // --- US NAVAL FLEET (EXPANDED) ---
    { id: "DDG-1000", name: "Zumwalt Class", cat: "NAVY", type: "Stealth Destroyer", specs: { mfr: "Bath Iron Works", propulsion: "Integrated Electric", vls: "80 Cells", speed: "30 knots", draft: "27.6 ft", status: "ACTIVE" } },
    { id: "LCS-1", name: "Freedom Class", cat: "NAVY", type: "Littoral Combat Ship", specs: { mfr: "Lockheed Martin", propulsion: "CODAG / Waterjets", speed: "45+ knots", draft: "14.1 ft", armament: "57mm Mk 110, RAM", role: "Coastal Ops" } },
    { id: "LCS-2", name: "Independence Class", cat: "NAVY", type: "LCS Trimaran", specs: { mfr: "Austal USA", hull: "Trimaran", speed: "40+ knots", draft: "15.1 ft", armament: "57mm Mk 110, SeaRAM", status: "ACTIVE" } },
    { id: "LPD-17", name: "San Antonio Class", cat: "NAVY", type: "Amphibious Transport", specs: { mfr: "Huntington Ingalls", displacement: "25,000 tons", capacity: "600+ Marines", speed: "22 knots", armament: "2x 30mm Bushmaster" } },
    { id: "LHD-1", name: "Wasp Class", cat: "NAVY", type: "Amphibious Assault", specs: { propulsion: "Steam/Gas Turbine", aircraft: "F-35B, MV-22", capacity: "1,800 Marines", speed: "22 knots", status: "ACTIVE" } },
    { id: "SSN-21", name: "Seawolf Class", cat: "NAVY", type: "Attack Submarine", specs: { mfr: "General Dynamics", speed: "35 knots (Sub)", depth: "2,000 ft", weapons: "8x 26-inch Tubes", status: "ELITE_STRIKE" } },
    { id: "SSBN-826", name: "Columbia Class", cat: "NAVY", type: "Strategic Deterrence", specs: { role: "Nuclear Triad", missiles: "16x Trident II D5", propulsion: "Electric Drive", status: "UNDER_CONSTRUCTION", length: "560 ft" } },
    { id: "FFG-62", name: "Constellation Class", cat: "NAVY", type: "Guided Missile Frigate", specs: { mfr: "Fincantieri", radar: "EASR", vls: "32 Cells", speed: "26+ knots", range: "6,000 nm", status: "DEVELOPMENT" } },
    { id: "MCM-1", name: "Avenger Class", cat: "NAVY", type: "Mine Countermeasures", specs: { hull: "Wood/Fiberglass", role: "Mine Hunting", sonar: "SQQ-32", speed: "11 knots", status: "ACTIVE" } },

    // --- GROUND FORCES ---
    { id: "M1A2 SEPv3", name: "Abrams", cat: "GROUND", type: "Main Battle Tank", specs: { weapon: "120mm M256", armor: "NGAP", engine: "AGT1500 Turbine", speed: "42mph", range: "265mi" } },
    { id: "M2A3", name: "Bradley", cat: "GROUND", type: "IFV", specs: { gun: "25mm Bushmaster", missiles: "TOW 2B", engine: "Cummins VTA-903T", speed: "41mph", capacity: "6-7 Troops" } },
    { id: "M142", name: "HIMARS", cat: "GROUND", type: "Rocket Art", specs: { unit: "17th FA", armament: "6xGMLRS / 1xATACMS", range: "300km+", chassis: "FMTV 5-Ton" } },
    { id: "M109A7", name: "Paladin", cat: "GROUND", type: "SPH", specs: { weapon: "155mm M284", range: "30km", armor: "Aluminum/Kevlar", engine: "675hp Cummins" } },
    { id: "JLTV", name: "Oshkosh", cat: "GROUND", type: "LUV", specs: { engine: "6.6L Duramax", armor: "Scalable Core", weapon: "M2 .50 Cal RWS", speed: "70mph" } },

    // --- NEW ADDITIONS: ARMOR & TRANSPORT ---
    { id: "M1126", name: "Stryker ICV", cat: "GROUND", type: "APC", specs: { wheels: "8x8", speed: "60mph", armor: "Ceramic Add-on", capacity: "9 Troops", weapon: ".50 Cal/MK19" } },
    { id: "M1296", name: "Dragoon", cat: "GROUND", type: "IFV", specs: { variant: "Stryker 30mm", gun: "XM813 Bushmaster", role: "Direct Fire", speed: "60mph", status: "ACTIVE" } },
    { id: "M1224", name: "MaxxPro", cat: "GROUND", type: "MRAP", specs: { design: "V-Hull", engine: "MaxxForce D9", weight: "14 Tons", protection: "IED/Blast", status: "ACTIVE" } },
    { id: "ACV", name: "Amphibious Combat", cat: "GROUND", type: "Amphibious IFV", specs: { mfr: "BAE", speed: "65mph Land / 6kts Sea", capacity: "13 Marines", gun: "30mm Remote" } },
    { id: "M1117", name: "Guardian", cat: "GROUND", type: "ASV", specs: { role: "Security/Escort", armor: "IBD Modular", weapon: "40mm MK19 / .50 Cal", speed: "63mph" } },
    { id: "M113A3", name: "Gavin", cat: "GROUND", type: "APC", specs: { role: "Battlefield Utility", speed: "42mph", armor: "Aluminum", status: "PHASING_OUT" } },

    // --- GROUND-BASED AIR DEFENSE (GBAD) ---
    { id: "AN/TWQ-1", name: "Avenger", cat: "GROUND", type: "Short-Range SAM", specs: { platform: "HMMWV", missiles: "8xStinger", gun: ".50 Cal M2", radar: "Forward Area" } },
    { id: "MIM-104", name: "Patriot", cat: "GROUND", type: "Long-Range SAM", specs: { variant: "PAC-3 MSE", range: "160km", target: "BMD/Cruise/Aero", radar: "AN/MPQ-65" } },
    { id: "THAAD", name: "Terminal High Alt", cat: "GROUND", type: "Anti-Ballistic", specs: { range: "200km", altitude: "150km", radar: "AN/TPY-2", speed: "Mach 8.2" } },
    { id: "C-RAM", name: "Centurion", cat: "GROUND", type: "Point Defense", specs: { gun: "20mm M61A1", rate: "4500rpm", role: "Counter Rocket/Artillery", status: "ACTIVE" } },

    // --- SPECIALIZED & UNMANNED GROUND ---
    { id: "M1150", name: "ABV", cat: "GROUND", type: "Assault Breacher", specs: { chassis: "M1 Abrams", gear: "Full Width Mine Plow", armament: "M58 MICLIC", role: "Mine Clearing" } },
    { id: "RCV-L", name: "Light Robot", cat: "GROUND", type: "UGCV", specs: { weight: "7 Tons", weapon: "M249 / Javelin", control: "Remote/Autonomous", status: "TESTING" } },
    // --- ORDNANCE: GUNS & AMMO ---
    { id: "M17/M18", name: "Modular Handgun", cat: "ORDNANCE", type: "Pistol", specs: { cal: "9x19mm", mag: "17/21 rds", mfr: "SIG Sauer", status: "ACTIVE" } },
    { id: "M4A1", name: "Carbine", cat: "ORDNANCE", type: "Assault Rifle", specs: { cal: "5.56mm", rate: "700-950rpm", range: "500m", optics: "M68/ACOG" } },
    { id: "XM7", name: "Next-Gen Rifle", cat: "ORDNANCE", type: "Assault Rifle", specs: { cal: "6.8x51mm", mfr: "SIG Sauer", feature: "Suppressor Native", status: "FIELDING" } },
    { id: "MK18", name: "CQBR", cat: "ORDNANCE", type: "Carbine", specs: { cal: "5.56mm", barrel: "10.3in", role: "VBSS/Spec-Ops", platform: "USSOCOM" } },
    { id: "M249", name: "SAW", cat: "ORDNANCE", type: "LMG", specs: { cal: "5.56mm", rate: "800rpm", feed: "Belt/Mag", range: "800m" } },
    { id: "M240B", name: "Medium MG", cat: "ORDNANCE", type: "GPMG", specs: { cal: "7.62mm", rate: "650-950rpm", range: "1100m", weight: "27lbs" } },
    { id: "M2HB", name: "Ma Deuce", cat: "ORDNANCE", type: "Heavy MG", specs: { cal: ".50 BMG", rate: "450-600rpm", range: "1800m", platform: "M1A2/Tripod" } },
    { id: "M110", name: "SASS", cat: "ORDNANCE", type: "Sniper Rifle", specs: { cal: "7.62mm", mfr: "KAC", range: "800m+", optics: "Leupold 3.5-10x" } },
    { id: "MK22", name: "ASR", cat: "ORDNANCE", type: "Sniper System", specs: { cal: ".338 Norma", mfr: "Barrett", bolt: "Multi-Caliber", status: "ACTIVE" } },
    { id: "M82A1/M107", name: "SASR", cat: "ORDNANCE", type: "Anti-Materiel", specs: { cal: ".50 BMG", range: "1800m", mag: "10rd", action: "Semi-Auto" } },

    // --- SUPPORT & HEAVY SYSTEMS ---
    { id: "M320", name: "GLM", cat: "ORDNANCE", type: "Grenade Launcher", specs: { cal: "40mm", range: "400m", role: "Standalone/Underslung", status: "ACTIVE" } },
    { id: "MK19", name: "Mod 3", cat: "ORDNANCE", type: "Auto-Grenade", specs: { cal: "40mm High-Vel", rate: "375rpm", range: "2200m", platform: "Vehicle/Tripod" } },
    { id: "M3 MAAWS", name: "Carl Gustaf", cat: "ORDNANCE", type: "Recoilless Rifle", specs: { cal: "84mm", ammo: "HE/HEAT/ADM", weight: "15lbs", range: "1000m" } },
    { id: "SMAW", name: "Mk 153", cat: "ORDNANCE", type: "Assault Weapon", specs: { cal: "83mm", role: "Bunker Defeat", optics: "9mm Spotter Rifle", status: "USMC" } },
    { id: "AT4 / M72 LAW", name: "Rocket", cat: "ORDNANCE", type: "Disposable AT", specs: { cal: "84mm/66mm", role: "Light Armor", weight: "15/5.5lbs", status: "ACTIVE" } },

    // --- AMMUNITION & SHELLS ---
    { id: "5.56mm NATO", name: "M855A1", cat: "ORDNANCE", type: "Ammo", specs: { velocity: "915m/s", weight: "62gr", pen: "Steel @ 350m", status: "STANDARD" } },
    { id: "7.62mm NATO", name: "M80A1", cat: "ORDNANCE", type: "Ammo", specs: { velocity: "850m/s", weight: "130gr", range: "800m", status: "STANDARD" } },
    { id: "6.8mm", name: "Common Cartridge", cat: "ORDNANCE", type: "Ammo", specs: { hybrid: "Steel/Brass Case", velocity: "900m/s+", platform: "XM7/XM250" } },
    { id: ".50 BMG", name: "M33/M8", cat: "ORDNANCE", type: "Heavy Ammo", specs: { velocity: "890m/s", weight: "660gr", energy: "18k Joules", platform: "M2/M82" } },
    { id: "20mm PGU", name: "Vulcan Round", cat: "ORDNANCE", type: "Cannon Ammo", specs: { platform: "M61 Vulcan", velocity: "1050m/s", role: "Air-to-Air", status: "ACTIVE" } },
    { id: "25mm M791", name: "APDSD-T", cat: "ORDNANCE", type: "Cannon Ammo", specs: { platform: "M2 Bradley", velocity: "1345m/s", role: "Armor Pen", status: "ACTIVE" } },
    { id: "30mm GAU-8", name: "PGU-14/B", cat: "ORDNANCE", type: "Cannon Ammo", specs: { platform: "A-10", core: "Depleted Uranium", velocity: "1010m/s", role: "Tank Killer" } },
    { id: "105mm Shell", name: "M1 HE", cat: "ORDNANCE", type: "Artillery", specs: { platform: "AC-130J/M119", range: "11.5km", weight: "33lbs", status: "ACTIVE" } },
    { id: "120mm M829", name: "Sabot", cat: "ORDNANCE", type: "Tank Round", specs: { platform: "M1A2", core: "DU Dart", velocity: "1670m/s", role: "Kinetic Energy" } },
    { id: "155mm M795", name: "HE Round", cat: "ORDNANCE", type: "Artillery", specs: { platform: "M777/M109", weight: "103lbs", range: "22.5km", status: "ACTIVE" } },

    // --- BOMBS (DUMB & GUIDED) ---
    { id: "MK 82/83/84", name: "LDGP", cat: "ORDNANCE", type: "Gravity Bomb", specs: { weight: "500/1k/2k lb", filler: "Tritonal", platform: "Multi-role", status: "ACTIVE" } },
    { id: "GBU-12", name: "Paveway II", cat: "ORDNANCE", type: "LGB", specs: { weight: "500lb", guidance: "Laser", platform: "AIRCRAFT", accuracy: "<1m" } },
    { id: "GBU-31/38", name: "JDAM", cat: "ORDNANCE", type: "GPS Bomb", specs: { weight: "2000/500 lb", guidance: "GPS/INS", accuracy: "5m CEP", status: "ACTIVE" } },
    { id: "GBU-39 SDB", name: "Small Bomb", cat: "ORDNANCE", type: "Precision Glide", specs: { weight: "250lb", range: "110km", guidance: "GPS/INS", feature: "Internal Bay" } },
    { id: "GBU-53/B", name: "StormBreaker", cat: "ORDNANCE", type: "Tri-Mode Bomb", specs: { seeker: "Radar/IR/Laser", range: "72km+", target: "Moving", status: "ACTIVE" } },
    { id: "GBU-57 MOP", name: "Penetrator", cat: "ORDNANCE", type: "Massive Ordnance", specs: { weight: "30,000lb", core: "Hardened Steel", role: "Deep Bunker", platform: "B-2/B-21" } },
    { id: "GBU-43/B", name: "MOAB", cat: "ORDNANCE", type: "Thermobaric", specs: { weight: "21,600lb", yield: "11t TNT", guidance: "GPS", status: "DETERRENT" } },
    { id: "B61", name: "Tactical Nuke", cat: "ORDNANCE", type: "Guided Nuclear", specs: { yield: "0.3-340kt", guidance: "Dial-a-Yield", platform: "F-15/F-35/B-2", status: "READY" } },

    // --- MISSILES & ROCKETS ---
    { id: "AIM-9X", name: "Sidewinder", cat: "ORDNANCE", type: "Short-Range AAM", specs: { seeker: "IR/HOBS", speed: "Mach 2.5", range: "22nm", platform: "AIRCRAFT" } },
    { id: "AIM-120D", name: "AMRAAM", cat: "ORDNANCE", type: "BVR AAM", specs: { seeker: "Active Radar", range: "160km", speed: "Mach 4.0", guidance: "GPS/Inertial" } },
    { id: "AGM-114", name: "Hellfire", cat: "ORDNANCE", type: "ATGM", specs: { seeker: "Laser", range: "11km", platform: "AH-64/MQ-9", warhead: "HEAT" } },
    { id: "AGM-179", name: "JAGM", cat: "ORDNANCE", type: "Multi-Mode Missile", specs: { seeker: "Semi-Laser/Radar", range: "8km", role: "Air-to-Ground", status: "ACTIVE" } },
    { id: "AGM-158", name: "JASSM", cat: "ORDNANCE", type: "Cruise Missile", specs: { rcs: "Stealth", range: "370km+", warhead: "1000lb", status: "ACTIVE" } },
    { id: "AGM-88", name: "HARM", cat: "ORDNANCE", type: "Anti-Radiation", specs: { role: "SEAD", seeker: "Passive Radar", target: "SAM Radars", status: "ACTIVE" } },
    { id: "AGM-84", name: "Harpoon", cat: "ORDNANCE", type: "Anti-Ship", specs: { seeker: "Active Radar", range: "124km", warhead: "488lb", status: "ACTIVE" } },
    { id: "FGM-148", name: "Javelin", cat: "ORDNANCE", type: "Man-Portable AT", specs: { seeker: "IR/Fire-and-Forget", mode: "Top-Attack", pen: "800mm+ RHA", status: "ACTIVE" } },
    { id: "FIM-92", name: "Stinger", cat: "ORDNANCE", type: "MANPADS", specs: { seeker: "IR/UV", range: "4.8km", role: "Anti-Air", status: "ACTIVE" } },
    { id: "MIM-104", name: "Patriot", cat: "ORDNANCE", type: "SAM System", specs: { variant: "PAC-3 MSE", range: "160km", radar: "AN/MPQ-65", role: "ABM/AA" } },
    { id: "BGM-109", name: "Tomahawk", cat: "ORDNANCE", type: "Cruise Missile", specs: { range: "1600km", guidance: "TERCOM/GPS", warhead: "1000lb", platform: "NAVY" } },
    { id: "RIM-161", name: "SM-3", cat: "ORDNANCE", type: "Interceptor", specs: { role: "Ballistic Missile Defense", ceiling: "160km+", speed: "Mach 10", status: "ACTIVE" } },
    { id: "RIM-174", name: "ERAM", cat: "ORDNANCE", type: "SM-6", specs: { role: "AAW/ASUW/BMD", range: "240km+", seeker: "Active Radar", status: "ACTIVE" } },
    { id: "Hydra 70", name: "Rocket", cat: "ORDNANCE", type: "Unguided Rocket", specs: { cal: "70mm", platform: "AH-64/F-16", warhead: "HE/AP/Militarized", status: "ACTIVE" } },
    { id: "APKWS", name: "Guided Hydra", cat: "ORDNANCE", type: "Laser Rocket", specs: { seeker: "Semi-Active Laser", range: "5km+", accuracy: "<0.5m", status: "ACTIVE" } },
    { id: "M26 / M30 / M31", name: "GMLRS", cat: "ORDNANCE", type: "Rocket Art", specs: { platform: "HIMARS", range: "15-92km", guidance: "GPS", warhead: "200lb Unitary" } },
    { id: "PrSM", name: "Precision Missile", cat: "ORDNANCE", type: "Ballistic Missile", specs: { platform: "M142/M270", range: "499km+", guidance: "GPS/IMU", status: "FIELDING" } }
];

let currentFilter = 'ALL';

function renderAssets(data) {
    const grid = document.getElementById('assetGrid');
    document.getElementById('assetCount').innerText = `[ ${data.length} : RECORDS_FOUND ]`;

    grid.innerHTML = data.map(asset => `
        <div class="col-12 col-xl-6 mb-3">
            <div class="strat-card p-3 h-100" 
                 style="background: rgba(255, 255, 255, 0.02); 
                        backdrop-filter: blur(4px); 
                        border-bottom: 1px solid rgba(255,255,255,0.05);
                        transition: all 0.2s ease;">
                
                <div class="d-flex justify-content-between align-items-baseline mb-1">
                    <h5 class="text-white mb-0" style="font-size: 1rem; letter-spacing: 1.5px; font-family: var(--font-main);text-transform: uppercase;">
                        <span style="opacity: 0.5;"></span>${asset.id} ${asset.name}
                    </h5>
                    <span style="font-size: 0.5rem; color: #c8c8c8; font-family: var(--font-mono); text-transform: uppercase;">
                        ${asset.cat} <span style="color: #ffffff;">//</span> ${asset.type}
                    </span>
                </div>
                
                <div class="row g-3 mt-1" style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 8px;">
                    ${Object.entries(asset.specs).map(([key, val]) => `
                        <div class="col-4 col-md-3">
                            <div style="font-size: 0.5rem; color: #c8c8c8; text-transform: uppercase; letter-spacing: 0.5px;">${key}</div>
                            <div style="font-size: 0.65rem; font-family: var(--font-mono); color: #eee; margin-top: 1px;">${val}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function filterCategory(cat, btn) {
    currentFilter = cat;
    document.querySelectorAll('.type-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    searchAssets();
}

function searchAssets() {
    const query = document.getElementById('assetSearch').value.toUpperCase();
    const filtered = assetDatabase.filter(a => {
        const matchesCat = currentFilter === 'ALL' || a.cat === currentFilter;
        const matchesSearch = a.id.includes(query) || a.name.toUpperCase().includes(query);
        return matchesCat && matchesSearch;
    });
    renderAssets(filtered);
}

document.addEventListener('DOMContentLoaded', () => renderAssets(assetDatabase));