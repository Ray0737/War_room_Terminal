// --- STRATEGIC ASSET LIBRARIES ---
const globalAircraftIntelligence = [
    // --- 5TH & 6TH GEN / STEALTH ---
    { id: "F-35", name: "F-35A Lightning II", maker: "Lockheed Martin", type: "Multi-role", gen: "5th Gen", role: "Stealth Strike", engine: "1x P&W F135-PW-100", maxSpeed: "Mach 1.6", status: "ACTIVE", weapons: { gun: "25mm GAU-22/A", missiles: "4x Internal (AIM-120/9X)" }, range: "1,200 nmi", rcs: "0.005 m²" },
    { id: "F-22", name: "F-22A Raptor", maker: "Lockheed Martin", type: "Air Superiority", gen: "5th Gen", role: "Stealth Fighter", engine: "2x P&W F119-PW-100", maxSpeed: "Mach 2.25", status: "ACTIVE", weapons: { gun: "20mm M61A2 Vulcan", missiles: "6x AIM-120, 2x AIM-9" }, range: "1,600 nmi", rcs: "0.0001 m²" },
    { id: "F-117", name: "F-117A Nighthawk", maker: "Lockheed", type: "Attack", gen: "1st Gen Stealth", role: "Precision Strike", engine: "2x GE F404-F1D2", maxSpeed: "617 mph", status: "TRAINING/RESERVE", weapons: { gun: "N/A", missiles: "2x GBU-27 Paveway" }, range: "930 nmi", rcs: "0.003 m²" },
    { id: "B-21", name: "B-21 Raider", maker: "Northrop Grumman", type: "Stealth Bomber", gen: "6th Gen", role: "Strategic Strike", engine: "2x P&W (Classified)", maxSpeed: "High Subsonic", status: "INITIAL PROD", weapons: { gun: "N/A", missiles: "B61-12 / JASSM-ER" }, range: "Global", rcs: "0.00001 m²" },
    { id: "YF-22", name: "YF-22 Lightning II", maker: "Lockheed/Boeing", type: "Prototype", gen: "5th Gen", role: "ATF Competitor", engine: "2x P&W F119", maxSpeed: "Mach 2.2", status: "MUSEUM", weapons: { gun: "20mm M61", missiles: "Internal Test Bays" }, range: "600 nmi", rcs: "0.0002 m²" },
    { id: "YF-23", name: "Black Widow II", maker: "Northrop/McDonnell", type: "Prototype", gen: "5th Gen", role: "ATF Competitor", engine: "2x P&W YF119", maxSpeed: "Mach 2.2+", status: "MUSEUM", weapons: { gun: "20mm M61", missiles: "4x AIM-120" }, range: "750 nmi", rcs: "0.00008 m²" },
    { id: "YF-32", name: "X-32 JSF", maker: "Boeing", type: "Prototype", gen: "5th Gen", role: "JSF Competitor", engine: "1x P&W F119-PW-614", maxSpeed: "Mach 1.6", status: "RETIRED", weapons: { gun: "25mm GAU-22", missiles: "Internal Bays" }, range: "850 nmi", rcs: "0.05 m²" },

    // --- 4TH GEN LEGACY & INTERCEPTORS ---
    { id: "F-18", name: "F/A-18E/F Super Hornet", maker: "Boeing", type: "Multi-role", gen: "4.5 Gen", role: "Carrier Strike", engine: "2x GE F414-GE-400", maxSpeed: "Mach 1.8", status: "ACTIVE", weapons: { gun: "20mm M61A2", missiles: "11x External Stations" }, range: "1,275 nmi", rcs: "1.0 m²" },
    { id: "F-16", name: "F-16C Fighting Falcon", maker: "General Dynamics", type: "Multi-role", gen: "4th Gen", role: "Light Fighter", engine: "1x GE F110-GE-129", maxSpeed: "Mach 2.05", status: "ACTIVE", weapons: { gun: "20mm M61A1", missiles: "6x AIM-120 / AIM-9" }, range: "2,280 nmi", rcs: "1.2 m²" },
    { id: "F-15", name: "F-15EX Eagle II", maker: "Boeing", type: "Strike Fighter", gen: "4.5 Gen", role: "Air Superiority", engine: "2x GE F110-GE-129", maxSpeed: "Mach 2.5", status: "ACTIVE", weapons: { gun: "20mm M61A1", missiles: "12x AMRAAM Stations" }, range: "2,100 nmi", rcs: "10 m²" },
    { id: "F-14", name: "F-14D Super Tomcat", maker: "Grumman", type: "Interceptor", gen: "4th Gen", role: "Fleet Defense", engine: "2x GE F110-GE-400", maxSpeed: "Mach 2.34", status: "RETIRED", weapons: { gun: "20mm M61A1", missiles: "6x AIM-54 Phoenix" }, range: "1,600 nmi", rcs: "3.0 m²" },
    { id: "F-5", name: "F-5E Tiger II", maker: "Northrop", type: "Light Fighter", gen: "3rd Gen", role: "Adversary/Export", engine: "2x GE J85-GE-21", maxSpeed: "Mach 1.6", status: "ACTIVE/AGRESSOR", weapons: { gun: "2x 20mm M39A2", missiles: "2x AIM-9 Sidewinder" }, range: "870 nmi", rcs: "1.5 m²" },
    { id: "F-4", name: "F-4E Phantom II", maker: "McDonnell Douglas", type: "Interseptor", gen: "3rd Gen", role: "Multi-role Strike", engine: "2x GE J79-GE-17A", maxSpeed: "Mach 2.23", status: "RESERVE/FOREIGN", weapons: { gun: "20mm M61 Vulcan", missiles: "4x AIM-7, 4x AIM-9" }, range: "1,450 nmi", rcs: "25 m²" },
    { id: "F-2", name: "Mitsubishi F-2", maker: "Mitsubishi/Lockheed", type: "Multi-role", gen: "4th Gen", role: "Support Fighter", engine: "1x GE F110-IHI-129", maxSpeed: "Mach 2.0", status: "ACTIVE", weapons: { gun: "20mm JM61A1", missiles: "AAM-3 / AAM-4 / ASM-2" }, range: "450 nmi", rcs: "0.8 m²" },

    // --- ATTACK & CLOSE AIR SUPPORT ---
    { id: "A-10", name: "A-10C Thunderbolt II", maker: "Fairchild Republic", type: "CAS", gen: "3rd Gen", role: "Tank Killer", engine: "2x GE TF34-GE-100", maxSpeed: "439 mph", status: "ACTIVE", weapons: { gun: "30mm GAU-8 Avenger", missiles: "AGM-65 Maverick" }, range: "2,240 nmi", rcs: "25 m²" },
    { id: "AC-130", name: "AC-130J Ghostrider", maker: "Lockheed Martin", type: "Gunship", gen: "4th Gen", role: "COIN / CAS", engine: "4x RR AE 2100D3", maxSpeed: "416 mph", status: "ACTIVE", weapons: { gun: "105mm Howitzer / 30mm GAU-23", missiles: "Griffin / Hellfire" }, range: "2,500 nmi", rcs: "80 m²" },

    // --- STRATEGIC BOMBERS ---
    { id: "B-1", name: "B-1B Lancer", maker: "Rockwell", type: "Bomber", gen: "4th Gen", role: "Supersonic Strike", engine: "4x GE F101-GE-102", maxSpeed: "Mach 1.25", status: "ACTIVE", weapons: { gun: "N/A", missiles: "75,000 lbs Ordnance" }, range: "5,100 nmi", rcs: "10 m²" },
    { id: "B-2", name: "B-2 Spirit", maker: "Northrop Grumman", type: "Stealth Bomber", gen: "5th Gen", role: "Global Strike", engine: "4x GE F118-GE-100", maxSpeed: "Mach 0.95", status: "ACTIVE", weapons: { gun: "N/A", missiles: "16x B61 / B83 Nuclear" }, range: "6,000 nmi", rcs: "0.0001 m²" },
    { id: "B-52", name: "B-52H Stratofortress", maker: "Boeing", type: "Heavy Bomber", gen: "2nd Gen", role: "Global Strike", engine: "8x P&W TF33-P-3", maxSpeed: "650 mph", status: "ACTIVE", weapons: { gun: "N/A", missiles: "70,000 lbs Ordnance" }, range: "8,800 nmi", rcs: "100 m²" },

    // --- RECONNAISSANCE & SPECIAL ---
    { id: "SR-71", name: "SR-71 Blackbird", maker: "Lockheed Skunk Works", type: "Strategic Recon", gen: "3rd Gen", role: "High-Alt Surveillance", engine: "2x P&W J58 Axial-flow", maxSpeed: "Mach 3.3", status: "RETIRED", weapons: { gun: "N/A", missiles: "N/A" }, range: "2,900 nmi", rcs: "0.01 m²" },
    { id: "SR-72", name: "SR-72 (Darkstar Concept)", maker: "Lockheed Martin", type: "Hypersonic Recon", gen: "6th Gen", role: "ISR / Strike", engine: "TBCC Hypersonic", maxSpeed: "Mach 6.0", status: "CLASSIFIED", weapons: { gun: "N/A", missiles: "HSSW (Hypersonic Strike)" }, range: "Global", rcs: "0.0001 m²" },
    { id: "U-2", name: "U-2S Dragon Lady", maker: "Lockheed", type: "High-Alt Recon", gen: "2nd Gen", role: "ISR", engine: "1x GE F118-GE-101", maxSpeed: "475 mph", status: "ACTIVE", weapons: { gun: "N/A", missiles: "N/A" }, range: "6,400 nmi", rcs: "15 m²" },
    { id: "E-3", name: "E-3 Sentry (AWACS)", maker: "Boeing", type: "Command & Control", gen: "3rd Gen", role: "Airborne Radar", engine: "4x P&W TF33-P-100A", maxSpeed: "530 mph", status: "ACTIVE", weapons: { gun: "N/A", missiles: "Electronic Warfare" }, range: "5,000 nmi", rcs: "120 m²" },
    { id: "AF-1", name: "VC-25B (Air Force One)", maker: "Boeing", type: "Strategic Transport", gen: "4th Gen", role: "Presidential Transport", engine: "4x GE CF6-80C2B1", maxSpeed: "Mach 0.92", status: "ACTIVE", weapons: { gun: "N/A", missiles: "ECM Flares/Chaff" }, range: "6,800 nmi", rcs: "150 m²" },

    // --- ROTARY WING (HELICOPTERS) ---
    { id: "AH-64", name: "AH-64E Apache Guardian", maker: "Boeing", type: "Attack Heli", gen: "4th Gen", role: "Tank Killer", engine: "2x GE T700-GE-701D", maxSpeed: "182 mph", status: "ACTIVE", weapons: { gun: "30mm M230 Chain Gun", missiles: "16x Hellfire / Hydra 70" }, range: "260 nmi", rcs: "15 m²" },
    { id: "AH-60", name: "MH-60L Direct Action", maker: "Sikorsky", type: "Attack/Utility", gen: "4th Gen", role: "Special Ops Support", engine: "2x GE T700-GE-701C", maxSpeed: "180 mph", status: "ACTIVE", weapons: { gun: "2x M134 Minigun", missiles: "Hydra / Hellfire" }, range: "320 nmi", rcs: "10 m²" },
    { id: "AH-1", name: "AH-1Z Viper", maker: "Bell", type: "Attack Heli", gen: "4th Gen", role: "Marine CAS", engine: "2x GE T700-GE-401C", maxSpeed: "200 mph", status: "ACTIVE", weapons: { gun: "20mm M197 Gatling", missiles: "AIM-9 / Hellfire" }, range: "310 nmi", rcs: "8 m²" },
    { id: "UH-60", name: "UH-60M Black Hawk", maker: "Sikorsky", type: "Utility Heli", gen: "4th Gen", role: "Troop Transport", engine: "2x GE T700-GE-701D", maxSpeed: "183 mph", status: "ACTIVE", weapons: { gun: "2x M240H", missiles: "N/A" }, range: "310 nmi", rcs: "12 m²" },
    { id: "UH-1", name: "UH-1Y Venom", maker: "Bell", type: "Utility Heli", gen: "4th Gen", role: "Marine Utility", engine: "2x GE T700-GE-401C", maxSpeed: "189 mph", status: "ACTIVE", weapons: { gun: "M134 / GAU-21", missiles: "Hydra 70" }, range: "350 nmi", rcs: "10 m²" },
    { id: "CH-47", name: "CH-47F Chinook", maker: "Boeing", type: "Heavy Lift", gen: "4th Gen", role: "Cargo/Troop", engine: "2x Lycoming T55-GA-714A", maxSpeed: "196 mph", status: "ACTIVE", weapons: { gun: "3x M240 / M60", missiles: "N/A" }, range: "400 nmi", rcs: "45 m²" },
    { id: "CH-53", name: "CH-53K King Stallion", maker: "Sikorsky", type: "Heavy Lift", gen: "4th Gen", role: "Marine Transport", engine: "3x GE T408", maxSpeed: "196 mph", status: "ACTIVE", weapons: { gun: "2x .50 Cal GAU-21", missiles: "N/A" }, range: "454 nmi", rcs: "50 m²" },

    // --- TANKERS & TRANSPORT ---
    { id: "KC-135", name: "KC-135R Stratotanker", maker: "Boeing", type: "Aerial Refueling", gen: "3rd Gen", role: "Tanker", engine: "4x CFM56", maxSpeed: "580 mph", status: "ACTIVE", weapons: { gun: "N/A", missiles: "N/A" }, range: "11,000 nmi", rcs: "100 m²" },
    { id: "KC-46", name: "KC-46A Pegasus", maker: "Boeing", type: "Aerial Refueling", gen: "4th Gen", role: "Tanker / Cargo", engine: "2x P&W 4062", maxSpeed: "570 mph", status: "ACTIVE", weapons: { gun: "N/A", missiles: "N/A" }, range: "6,300 nmi", rcs: "90 m²" },
    { id: "KC-130", name: "KC-130J Super Hercules", maker: "Lockheed Martin", type: "Tanker / Transport", gen: "4th Gen", role: "Marine Refueling", engine: "4x RR AE 2100D3", maxSpeed: "417 mph", status: "ACTIVE", weapons: { gun: "Harvest HAWK Kit", missiles: "Hellfire / Griffin" }, range: "2,800 nmi", rcs: "75 m²" },
    { id: "C-130", name: "C-130J Super Hercules", maker: "Lockheed Martin", type: "Transport", gen: "4th Gen", role: "Tactical Airlift", engine: "4x RR AE 2100D3", maxSpeed: "417 mph", status: "ACTIVE", weapons: { gun: "N/A", missiles: "N/A" }, range: "2,000 nmi", rcs: "80 m²" },
    { id: "C-17", name: "C-17 Globemaster III", maker: "McDonnell Douglas/Boeing", type: "Strategic Airlift", gen: "4th Gen", role: "Heavy Cargo", engine: "4x P&W F117-PW-100", maxSpeed: "515 mph", status: "ACTIVE", weapons: { gun: "N/A", missiles: "N/A" }, range: "2,400 nmi", rcs: "110 m²" },
    { id: "C-5", name: "C-5M Super Galaxy", maker: "Lockheed Martin", type: "Strategic Airlift", gen: "3rd Gen", role: "Outsized Cargo", engine: "4x GE F138-GE-100", maxSpeed: "518 mph", status: "ACTIVE", weapons: { gun: "N/A", missiles: "N/A" }, range: "4,800 nmi", rcs: "160 m²" },

    // --- UNMANNED AERIAL SYSTEMS (DRONES) ---
    { id: "MQ-9", name: "MQ-9 Reaper", maker: "General Atomics", type: "UCAV", gen: "4th Gen", role: "Hunter-Killer", engine: "1x Honeywell TPE331-10", maxSpeed: "300 mph", status: "ACTIVE", weapons: { gun: "N/A", missiles: "4x Hellfire, 2x GBU-12" }, range: "1,150 nmi", rcs: "0.1 m²" },
    { id: "MQ-1", name: "MQ-1B Predator", maker: "General Atomics", type: "UAV", gen: "3rd Gen", role: "ISR / Strike", engine: "1x Rotax 914F", maxSpeed: "135 mph", status: "RETIRED", weapons: { gun: "N/A", missiles: "2x AGM-114 Hellfire" }, range: "675 nmi", rcs: "0.3 m²" },
    { id: "RQ-4", name: "RQ-4 Global Hawk", maker: "Northrop Grumman", type: "HALE UAV", gen: "4th Gen", role: "Strategic ISR", engine: "1x RR F137-RR-100", maxSpeed: "391 mph", status: "ACTIVE", weapons: { gun: "N/A", missiles: "N/A (SIGINT/ELINT)" }, range: "12,300 nmi", rcs: "0.5 m²" },
    { id: "RQ-170", name: "RQ-170 Sentinel", maker: "Lockheed Martin", type: "Stealth UAV", gen: "5th Gen", role: "Tactical Recon", engine: "Garrett TFE731", maxSpeed: "Classified", status: "ACTIVE", weapons: { gun: "N/A", missiles: "N/A" }, range: "Classified", rcs: "0.001 m²" },
    { id: "RQ-180", name: "RQ-180 (White Bat)", maker: "Northrop Grumman", type: "Stealth ISR", gen: "6th Gen", role: "Strategic Recon", engine: "2x Classified", maxSpeed: "High Subsonic", status: "CLASSIFIED", weapons: { gun: "N/A", missiles: "Electronic Warfare" }, range: "Global", rcs: "0.00005 m²" },
    { id: "X-47B", name: "X-47B UCAS-D", maker: "Northrop Grumman", type: "Carrier UAV", gen: "5th Gen", role: "Strike Prototype", engine: "1x P&W F100-220U", maxSpeed: "Mach 0.9", status: "PROTOTYPE", weapons: { gun: "N/A", missiles: "2,000lb Internal Bay" }, range: "2,100 nmi", rcs: "0.001 m²" },
    { id: "MQ-25", name: "MQ-25 Stingray", maker: "Boeing", type: "Carrier UAV", gen: "5th Gen", role: "Aerial Refueling", engine: "1x RR AE 3007N", maxSpeed: "Subsonic", status: "TESTING", weapons: { gun: "N/A", missiles: "N/A (Refueling Pod)" }, range: "500 nmi", rcs: "0.01 m²" },
    { id: "MQ-4C", name: "MQ-4C Triton", maker: "Northrop Grumman", type: "Maritime UAV", gen: "4th Gen", role: "Persistent Maritime ISR", engine: "1x RR AE 3007", maxSpeed: "357 mph", status: "ACTIVE", weapons: { gun: "N/A", missiles: "N/A" }, range: "8,200 nmi", rcs: "0.5 m²" },
    { id: "MANTA", name: "Manta Ray UUV", maker: "Northrop Grumman", type: "Autonomous Vehicle", gen: "6th Gen", role: "Deep Sea / Strategic", engine: "Energy Harvesting", maxSpeed: "Classified", status: "PROTOTYPE", weapons: { gun: "N/A", missiles: "Classified Payloads" }, range: "Extreme Endurance", rcs: "N/A (Acoustic Stealth)" }
];

const globalGroundAssets = [
    { id: "M1A2-SEPv3", unit: "1st Armored Div", type: "MBT", engine: "AGT1500 Turbine", armor: "Chobham/DU", status: "ACTIVE", armament: "120mm M256" },
    { id: "M2A3-BRADLEY", unit: "3rd Infantry Div", type: "IFV", engine: "Cummins VTA-903T", armor: "Steel/Aluminum", status: "ACTIVE", armament: "25mm Bushmaster / TOW" },
    { id: "M142-HIMARS", unit: "17th Field Artillery", type: "MLRS", engine: "Caterpillar 3126P", armor: "Light Plated", status: "ACTIVE", armament: "6x GMLRS / 1x PrSM" },
    { id: "M109A7-PIM", unit: "1st Cavalry Div", type: "Self-Propelled Howitzer", engine: "675hp Cummins", armor: "Aluminum/Kevlar", status: "ACTIVE", armament: "155mm M284 Cannon" },
    { id: "JLTV-A1", unit: "82nd Airborne", type: "Utility Vehicle", engine: "6.6L Duramax Diesel", armor: "Scalable Kit", status: "ACTIVE", armament: "M2 .50 Cal RWS" },
    { id: "STRYKER-MGS", unit: "2nd Stryker Bde", type: "Mobile Gun System", engine: "Caterpillar 3126", armor: "Bolt-on Ceramic", status: "ACTIVE", armament: "105mm M68A1E4" },
    { id: "PATRIOT-PAC3", unit: "11th ADA Brigade", type: "SAM System", engine: "M901 Launch Station", armor: "N/A", status: "READY", armament: "PAC-3 MSE Missiles" },
    { id: "L-3-HARRIS-TRV", unit: "USASOC", type: "Tactical Recon", engine: "Electric/Hybrid", armor: "Lightweight Composite", status: "DEPLOYED", armament: "SIGINT Suite" },
    { id: "M113A3-APC", unit: "NG Readiness", type: "Transport", engine: "Detroit Diesel 6V53T", armor: "Aluminum", status: "RESERVE", armament: "M2HB Machine Gun" },
    { id: "PANDUR-II", unit: "UN Peacekeeper", type: "8x8 APC", engine: "Cummins ISLe 450", armor: "STANAG Level 4", status: "ACTIVE", armament: "30mm RCWS" },
    { id: "M1-PANTHER", unit: "Engineer Corps", type: "Mine Clearing Tank", engine: "AGT1500 Turbine", armor: "Heavy Anti-Mine", status: "READY", armament: "Mine Plow / Rollers" },
    { id: "BUFFALO-MPCV", unit: "EOD Task Force", type: "MRAP", engine: "Mack ASET AI-400", armor: "V-Hull Anti-Blast", status: "ACTIVE", armament: "Robotic Claw / OGPK" },
    { id: "M-ATV", unit: "MARSOC", type: "MRAP", engine: "Caterpillar C7", armor: "Plasan Composite", status: "DEPLOYED", armament: "M240G 7.62mm" },
    { id: "COUGAR-HE", unit: "USMC", type: "6x6 MRAP", engine: "Caterpillar C7", armor: "Steel/Composite", status: "ACTIVE", armament: "M2 .50 Cal" },
    { id: "HUMVEE-M1114", unit: "Global Security", type: "UAH", engine: "6.5L V8 Diesel", armor: "Up-armored Steel", status: "ACTIVE", armament: "Mk19 Grenade Launcher" }
];

const globalOrdnanceLibrary = [
    // --- 15 GUNS ---
    { name: "M416", class: "Assault Rifle", info: "Gas-operated 5.56mm. Enhanced reliability.", velocity: "880 m/s", range: "500m" },
    { name: "HK416", class: "Spec-Ops Rifle", info: "Preferred Tier 1 platform. Piston driven.", velocity: "917 m/s", range: "600m" },
    { name: "MP7", class: "PDW", info: "Armor-piercing 4.6mm personal defense weapon.", velocity: "735 m/s", range: "200m" },
    { name: "M134 MINIGUN", class: "Rotary MG", info: "6-barrel 7.62mm. High rate of fire.", velocity: "853 m/s", range: "1000m" },
    { name: "GAU-8 AVENGER", class: "Autocannon", info: "30mm tank killer found on A-10.", velocity: "1,010 m/s", range: "1,200m" },
    { name: "M61 VULCAN", class: "Rotary Cannon", info: "20mm standard aircraft cannon.", velocity: "1,050 m/s", range: "1,500m" },
    { name: "M82 BARRETT", class: "Anti-Materiel", info: "Semi-auto .50 BMG long range rifle.", velocity: "853 m/s", range: "1,800m" },
    { name: "MK18", class: "CQB Carbine", info: "Short-barrel 5.56mm for urban ops.", velocity: "790 m/s", range: "300m" },
    { name: "AKM", class: "Assault Rifle", info: "Standard 7.62x39mm rugged platform.", velocity: "715 m/s", range: "400m" },
    { name: "M240B", class: "GPMG", info: "Belt-fed 7.62mm suppression weapon.", velocity: "853 m/s", range: "800m" },
    { name: "M2HB", class: "Heavy MG", info: "The 'Ma Deuce' .50 cal machine gun.", velocity: "890 m/s", range: "2,000m" },
    { name: "MK14 EBR", class: "Marksman Rifle", info: "Enhanced 7.62mm battle rifle.", velocity: "853 m/s", range: "800m" },
    { name: "MP5K", class: "SMG", info: "Compact 9mm for close protection.", velocity: "375 m/s", range: "100m" },
    { name: "M320", class: "GL", info: "40mm grenade launcher attachment.", velocity: "76 m/s", range: "400m" },
    { name: "AT4", class: "Anti-Tank", info: "Disposable 84mm recoilless launcher.", velocity: "290 m/s", range: "300m" },

    // --- 10 AMMO TYPES ---
    { name: "5.56x45mm NATO", class: "Rifle Ammo", info: "Standard ball rounds / SS109.", velocity: "900 m/s", range: "500m" },
    { name: "7.62x51mm NATO", class: "Full Power", info: "Match grade sniper / LMG rounds.", velocity: "850 m/s", range: "800m" },
    { name: ".50 BMG", class: "Anti-Materiel", info: "Armor piercing incendiary (API).", velocity: "900 m/s", range: "2000m" },
    { name: ".45 ACP", class: "Pistol Ammo", info: "High stopping power, subsonic.", velocity: "250 m/s", range: "50m" },
    { name: "9mm NATO", class: "Handgun Ammo", info: "Global standard sidearm caliber.", velocity: "380 m/s", range: "50m" },
    { name: "30mm API", class: "Cannon Ammo", info: "Depleted Uranium tank killer.", velocity: "1010 m/s", range: "1200m" },
    { name: "120mm M829", class: "Tank Shell", info: "SABOT kinetic energy penetrator.", velocity: "1670 m/s", range: "4000m" },
    { name: ".338 LAPUA", class: "Sniper Ammo", info: "Extreme long range precision.", velocity: "914 m/s", range: "1500m" },
    { name: "4.6x30mm", class: "PDW Ammo", info: "High penetration sub-caliber.", velocity: "725 m/s", range: "200m" },
    { name: "40mm HEDP", class: "Grenade", info: "Dual purpose high explosive shell.", velocity: "76 m/s", range: "400m" },

    // --- 20 MISSILES / BOMBS ---
    { name: "AIM-9X SIDEWINDER", class: "Air-to-Air", info: "Infrared heat seeking missile.", warhead: "High Explosive", energy: "Mach 2.5+" },
    { name: "AIM-120 AMRAAM", class: "Air-to-Air", info: "Active radar beyond visual range.", warhead: "Blast Frag", range: "160km" },
    { name: "AGM-114 HELLFIRE", class: "Air-to-Ground", info: "Laser-guided tank killer.", warhead: "HEAT", range: "11km" },
    { name: "GBU-12 PAVEWAY", class: "Smart Bomb", info: "Laser-guided 500lb bomb.", warhead: "Mk 82", range: "14km" },
    { name: "GBU-31 JDAM", class: "GPS Bomb", info: "All-weather precision 2000lb.", warhead: "Mk 84", range: "28km" },
    { name: "MOAB", class: "Massive Ordnance", info: "Mother of All Bombs (GBU-43/B).", warhead: "18,000 lbs H6", range: "Drop" },
    { name: "B61-12", class: "Nuclear", info: "Variable yield tactical nuclear bomb.", warhead: "Nuclear (0.3-50kt)", range: "Guided" },
    { name: "JASSM-ER", class: "Cruise Missile", info: "Stealthy stand-off missile.", warhead: "1000lb Penetrator", range: "925km" },
    { name: "AGM-65 MAVERICK", class: "Air-to-Ground", info: "Close air support missile.", warhead: "125lb Shaped Charge", range: "22km" },
    { name: "GBU-39 SDB", class: "Small Diameter", info: "Precision glide bomb.", warhead: "Multipurpose", range: "110km" },
    { name: "TOW 2B", class: "ATGM", info: "Wire-guided top-attack missile.", warhead: "Shaped Charge", range: "4.5km" },
    { name: "FIM-92 STINGER", class: "MANPADS", info: "Shoulder fired anti-air.", warhead: "Frag", range: "4.8km" },
    { name: "M982 EXCALIBUR", class: "Artillery Shell", info: "GPS-guided 155mm round.", warhead: "High Explosive", range: "40km" },
    { name: "AGM-158C LRASM", class: "Anti-Ship", info: "Stealthy anti-ship missile.", warhead: "Blast Frag", range: "370km" },
    { name: "RGM-84 HARPOON", class: "Anti-Ship", info: "Sea-skimming cruise missile.", warhead: "488lb Penetrator", range: "124km" },
    { name: "AIM-54 PHOENIX", class: "Air-to-Air", info: "Long range F-14 interceptor.", warhead: "Blast Frag", range: "190km" },
    { name: "M26 ROCKET", class: "MLRS Rocket", info: "Submunition artillery rocket.", warhead: "644 Dual-Purpose", range: "32km" },
    { name: "GBU-57 MOP", class: "Bunker Buster", info: "Massive Ordnance Penetrator.", warhead: "5,300 lbs HE", range: "Gravity" },
    { name: "AGM-88 HARM", class: "Anti-Radiation", info: "Targets enemy radar systems.", warhead: "Frag", range: "150km" },
    { name: "CBU-105", class: "Cluster Bomb", info: "Sensor fuzed weapon.", warhead: "40x Skeet", range: "Glide" }
];

// --- UNIFIED SEARCH SYSTEM ---

const searchMappings = {
    'aircraft-search': 'aircraft',
    'ground-search': 'ground',
    'ordnance-search': 'ordnance'
};

Object.keys(searchMappings).forEach(id => {
    document.getElementById(id).addEventListener('input', (e) => {
        handleSearch(e.target.value, searchMappings[id]);
    });
});

function handleSearch(query, type) {
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '';

    if (!query || query.length < 1) return;
    const q = query.toUpperCase();
    let matches = [];

    // 1. DATA FILTERING
    if (type === 'aircraft') {
        matches = globalAircraftIntelligence.filter(a => a.id.includes(q) || a.name.toUpperCase().includes(q));
    } else if (type === 'ground') {
        matches = globalGroundAssets.filter(v => v.id.includes(q) || v.unit.toUpperCase().includes(q));
    } else if (type === 'ordnance') {
        matches = globalOrdnanceLibrary.filter(o => o.name.toUpperCase().includes(q) || o.class.toUpperCase().includes(q));
    }

    // 2. RENDERING RESULTS
    matches.forEach(m => {
        const item = document.createElement('div');
        item.className = 'search-item';
        item.style.cssText = "padding: 8px; border-bottom: 1px solid #222; cursor: pointer; font-family: 'IBM Plex Mono', monospace;";

        const label = m.id || m.name;
        const subLabel = m.type || m.unit || m.class;

        item.innerHTML = `
            <div style="color:#0f0; font-weight:bold; font-size: 0.9em;">> ${label}</div>
            <div style="color:#666; font-size:0.75em; margin-left: 10px;">${subLabel}</div>
        `;

        // 3. FIXED ONCLICK LOGIC
        item.onclick = () => {
            if (type === 'aircraft') {
                updateSidebarIntel(m);
                document.getElementById('aircraft-search').value = m.id;
            }
            else if (type === 'ground') {
                showGroundIntel(m.id); // Call the specific ground function
                document.getElementById('ground-search').value = m.id;
            }
            else if (type === 'ordnance') {
                showAmmoIntel(m.name); // Call the specific ammo function
                document.getElementById('ordnance-search').value = m.name;
            }

            resultsDiv.innerHTML = ''; // Hide results after selection
        };
        resultsDiv.appendChild(item);
    });
}

// --- INTEL UI HANDLERS ---

function updateSidebarIntel(ac) {
    const display = document.getElementById('sidebar-intel-display');
    const details = document.getElementById('sb-details');
    display.style.display = 'block';

    document.getElementById('sb-name').innerHTML = `
        ${ac.id} ${ac.name}
        <div style="color: #666; font-size: 0.6em; margin-top: 2px; font-weight: normal;">
            MANUFACTURER: ${ac.maker.toUpperCase()}
        </div>`;

    details.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px;">
            <div><span style="color: #666;">TYPE:</span><br>${ac.type}</div>
            <div><span style="color: #666;">GEN:</span><br>${ac.gen}</div>
            <div><span style="color: #666;">SPEED:</span><br>${ac.maxSpeed}</div>
            <div><span style="color: #666;">RANGE:</span><br>${ac.range}</div>
        </div>
        <div style="margin-top: 10px;"><span style="color: #666;">ENGINE:</span><br>${ac.engine}</div>
        <div style="margin-top: 10px;"><span style="color: #666;">RCS:</span> <span style="color: #0f0;">${ac.rcs}</span></div>
        
        <div style="margin-top: 12px; border-top: 1px dashed #444; padding-top: 8px;">
            <div style="color: #FF3B3B; font-weight: bold; font-size: 0.85em;">WEAPON SYSTEMS</div>
            <div style="font-size: 0.9em; color: #ccc;">
                <span style="color: #888;">GUN:</span> ${ac.weapons.gun}<br>
                <span style="color: #888;">MSL:</span> ${ac.weapons.missiles}
            </div>
        </div>
        <div class="status-badge" style="margin-top: 15px; padding: 6px; background: rgba(255,215,0,0.1); border: 1px solid #FFD700; text-align: center; color: #FFD700; font-weight: bold;">
            STATUS: ${ac.status}
        </div>`;
}
// --- BIG INTEL WINDOW (IBM PLEX MONO STYLE) ---
// --- SHARED CONFIG FOR TRIPLE-STACKING ---
const SIDEBAR_CONFIG = {
    width: 320,
    left: 20,
    gap: 15,
    top: 60
};

// Helper to calculate position based on type
function getStackedPosition(type) {
    const baseLeft = SIDEBAR_CONFIG.left + SIDEBAR_CONFIG.width + SIDEBAR_CONFIG.gap;

    // If it's ammo, move it one more "slot" to the right
    if (type === 'ordnance') {
        return baseLeft + SIDEBAR_CONFIG.width + SIDEBAR_CONFIG.gap;
    }
    // Ground stays in the first slot next to sidebar
    return baseLeft;
}

function getIntelWindowStyle(type) {
    return `
        display: block; 
        position: absolute; 
        top: ${SIDEBAR_CONFIG.top}px; 
        left: ${getStackedPosition(type)}px; 
        width: 320px; 
        max-height: 80vh; 
        background: rgba(5, 5, 5, 0.95); 
        border: 1px solid #444; 
        padding: 20px; 
        z-index: 2500; 
        backdrop-filter: blur(15px); 
        color: white; 
        font-family: 'IBM Plex Mono', monospace; 
        overflow-y: auto;
    `;
}

function showGroundIntel(name) {
    const win = document.getElementById('intel-window');
    const data = globalGroundAssets.find(x => x.id === name);
    if (!data) return;

    win.style.cssText = getIntelWindowStyle('ground');

    win.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; border-bottom: 1px solid #444; padding-bottom: 0.5rem;">
            <div style="display: flex; flex-direction: column;">
                <span style="color: #666; font-size: 0.6em; letter-spacing: 2px; font-weight: bold;">INTEL_QUERY_RESULTS</span>
                <span style="color: #FFD700; font-weight: bold; font-size: 1em; letter-spacing: 1px;">${data.id.toUpperCase()}</span>
            </div>
            <button class="btn btn-outline-secondary btn-sm" style="font-size: 0.7em;"
                        onclick="document.getElementById('intel-window').style.display='none'; document.getElementById('ground-search').value='';">CLOSE</button>
        </div>
        <div style="font-size: 0.75em; color: #ccc; line-height: 1.6;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div><span style="color: #666;">UNIT:</span><br>${data.unit}</div>
                <div><span style="color: #666;">TYPE:</span><br>${data.type}</div>
                <div><span style="color: #666;">ENGINE:</span><br>${data.engine || 'N/A'}</div>
                <div><span style="color: #666;">ARMOR:</span><br>${data.armor || 'N/A'}</div>
            </div>
            <div style="margin-top: 15px; padding: 6px; background: rgba(255, 215, 0, 0.1); border: 1px solid #FFD700; text-align: center; color: #FFD700; font-weight: bold;">
                STATUS: ACTIVE
            </div>
        </div>
    `;
}
function showAmmoIntel(name) {
    const win = document.getElementById('ammo-window');
    const data = globalOrdnanceLibrary.find(x => x.name === name);
    if (!data) return;

    win.style.cssText = getIntelWindowStyle('ordnance');

    win.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; border-bottom: 1px solid #444; padding-bottom: 0.5rem;">
            <div style="display: flex; flex-direction: column;">
                <span style="color: #666; font-size: 0.6em; letter-spacing: 2px; font-weight: bold;">ORDNANCE_DATA_SHEET</span>
                <span style="color: #FFD700; font-weight: bold; font-size: 1em; letter-spacing: 1px;">${data.name.toUpperCase()}</span>
            </div>
            <button class="btn btn-outline-secondary btn-sm" style="font-size: 0.7em;"
                        onclick="document.getElementById('ammo-window').style.display='none'; document.getElementById('ordnance-search').value='';">CLOSE</button>
        </div>
        <div style="font-size: 0.75em; color: #ccc; line-height: 1.6;">
            <div style="margin-bottom: 8px; color: #888;">${data.info}</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; border-top: 1px dashed #444; padding-top: 10px;">
                <div><span style="color: #666;">CLASS:</span><br>${data.class}</div>
                <div><span style="color: #666;">VELOCITY:</span><br>${data.velocity || 'N/A'}</div>
                <div><span style="color: #666;">RANGE:</span><br>${data.range || 'N/A'}</div>
                <div><span style="color: #666;">WARHEAD:</span><br>${data.warhead || 'N/A'}</div>
            </div>
            <div style="margin-top: 15px; padding: 6px; background: rgba(255, 59, 59, 0.1); border: 1px solid #FF3B3B; text-align: center; color: #FF3B3B; font-weight: bold;">
                STATUS: ARMED
            </div>
        </div>
    `;
}