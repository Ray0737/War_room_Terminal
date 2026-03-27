const minotInventory = [
    { name: "A-01 MAF", lat: 47.967194, lng: -100.584833 }, { name: "A-02", lat: 48.001556, lng: -100.456194 }, { name: "A-03", lat: 47.937250, lng: -100.370528 }, { name: "A-04", lat: 47.934639, lng: -100.480972 }, { name: "A-05", lat: 47.875222, lng: -100.435111 }, { name: "A-06", lat: 47.833167, lng: -100.515778 }, { name: "A-07", lat: 47.893639, lng: -100.585139 }, { name: "A-08", lat: 47.850694, lng: -100.654917 }, { name: "A-09", lat: 47.925000, lng: -100.671583 }, { name: "A-10", lat: 48.102750, lng: -100.626139 }, { name: "A-11", lat: 48.036750, lng: -100.589000 },
    { name: "B-01 MAF", lat: 47.909083, lng: -100.929167 }, { name: "B-02", lat: 48.076139, lng: -100.842194 }, { name: "B-03", lat: 48.071694, lng: -100.734250 }, { name: "B-04", lat: 47.992556, lng: -100.822444 }, { name: "B-05", lat: 47.927278, lng: -100.822139 }, { name: "B-06", lat: 47.861583, lng: -100.800222 }, { name: "B-07", lat: 47.831472, lng: -100.928444 }, { name: "B-08", lat: 47.887389, lng: -101.078944 }, { name: "B-09", lat: 47.949861, lng: -101.073417 }, { name: "B-10", lat: 47.978528, lng: -100.980222 }, { name: "B-11", lat: 48.039667, lng: -100.929000 },
    { name: "C-01 MAF", lat: 47.715361, lng: -101.014361 }, { name: "C-02", lat: 47.753722, lng: -100.910556 }, { name: "C-03", lat: 47.784250, lng: -100.800250 }, { name: "C-04", lat: 47.681444, lng: -100.907111 }, { name: "C-05", lat: 47.603528, lng: -100.871861 }, { name: "C-06", lat: 47.632556, lng: -100.973389 }, { name: "C-07", lat: 47.591444, lng: -101.078111 }, { name: "C-08", lat: 47.658222, lng: -101.078000 }, { name: "C-09", lat: 47.702194, lng: -101.153361 }, { name: "C-10", lat: 47.759083, lng: -101.080111 }, { name: "C-11", lat: 47.819167, lng: -101.028222 },
    { name: "D-01 MAF", lat: 47.796222, lng: -101.293639 }, { name: "D-02", lat: 47.915417, lng: -101.294583 }, { name: "D-03", lat: 47.874389, lng: -101.207667 }, { name: "D-04", lat: 47.775750, lng: -101.186056 }, { name: "D-05", lat: 47.663917, lng: -101.288111 }, { name: "D-06", lat: 47.729278, lng: -101.292750 }, { name: "D-07", lat: 47.661250, lng: -101.395056 }, { name: "D-08", lat: 47.730611, lng: -101.421722 }, { name: "D-09", lat: 47.792889, lng: -101.421861 }, { name: "D-10", lat: 47.862556, lng: -101.463833 }, { name: "D-11", lat: 47.862833, lng: -101.349944 },
    { name: "E-01 MAF", lat: 47.750861, lng: -101.678889 }, { name: "E-02", lat: 47.804444, lng: -101.523528 }, { name: "E-03", lat: 47.717556, lng: -101.519000 }, { name: "E-04", lat: 47.639417, lng: -101.495583 }, { name: "E-05", lat: 47.646583, lng: -101.597139 }, { name: "E-06", lat: 47.683694, lng: -101.681139 }, { name: "E-07", lat: 47.646389, lng: -101.761806 }, { name: "E-08", lat: 47.688333, lng: -101.837861 }, { name: "E-09", lat: 47.688417, lng: -101.934417 }, { name: "E-10", lat: 47.746389, lng: -101.884917 }, { name: "E-11", lat: 47.788056, lng: -101.807750 },
    { name: "F-01 MAF", lat: 47.896278, lng: -101.679000 }, { name: "F-02", lat: 47.965722, lng: -101.679000 }, { name: "F-03", lat: 47.978306, lng: -101.576361 }, { name: "F-04", lat: 47.920472, lng: -101.521528 }, { name: "F-05", lat: 47.862361, lng: -101.586472 }, { name: "F-06", lat: 47.862167, lng: -101.761861 }, { name: "F-07", lat: 47.833139, lng: -101.880000 }, { name: "F-08", lat: 47.881056, lng: -101.948056 }, { name: "F-09", lat: 47.920000, lng: -101.845000 }, { name: "F-10", lat: 47.977972, lng: -101.896778 }, { name: "F-11", lat: 47.977917, lng: -101.792472 },
    { name: "G-01 MAF", lat: 48.119917, lng: -101.965361 }, { name: "G-02", lat: 48.182472, lng: -101.947194 }, { name: "G-03", lat: 48.119583, lng: -101.857639 }, { name: "G-04", lat: 48.052111, lng: -101.742861 }, { name: "G-05", lat: 48.052139, lng: -101.854972 }, { name: "G-06", lat: 48.043667, lng: -101.965333 }, { name: "G-07", lat: 48.054833, lng: -102.073111 }, { name: "G-08", lat: 48.123278, lng: -102.073444 }, { name: "G-09", lat: 48.138861, lng: -102.177556 }, { name: "G-10", lat: 48.201917, lng: -102.224639 }, { name: "G-11", lat: 48.200389, lng: -102.073583 },
    { name: "H-01 MAF", lat: 47.977667, lng: -102.222528 }, { name: "H-02", lat: 48.060528, lng: -102.180250 }, { name: "H-03", lat: 47.993722, lng: -102.128556 }, { name: "H-04", lat: 47.977889, lng: -101.996861 }, { name: "H-05", lat: 47.891083, lng: -102.040722 }, { name: "H-06", lat: 47.922694, lng: -102.128972 }, { name: "H-07", lat: 47.888944, lng: -102.215139 }, { name: "H-08", lat: 47.853889, lng: -102.128861 }, { name: "H-09", lat: 47.977694, lng: -102.446861 }, { name: "H-10", lat: 47.980611, lng: -102.343472 }, { name: "H-11", lat: 48.095528, lng: -102.276333 },
    { name: "I-01 MAF", lat: 48.345806, lng: -102.309833 }, { name: "I-02", lat: 48.372417, lng: -102.173722 }, { name: "I-03", lat: 48.272667, lng: -102.224278 }, { name: "I-04", lat: 48.208028, lng: -102.353556 }, { name: "I-05", lat: 48.279694, lng: -102.375417 }, { name: "I-06", lat: 48.233083, lng: -102.461417 }, { name: "I-07", lat: 48.312639, lng: -102.500028 }, { name: "I-08", lat: 48.326917, lng: -102.602167 }, { name: "I-09", lat: 48.385750, lng: -102.400917 }, { name: "I-10", lat: 48.416167, lng: -102.466250 }, { name: "I-11", lat: 48.457639, lng: -102.408056 },
    { name: "J-01 MAF", lat: 48.414083, lng: -101.886667 }, { name: "J-02", lat: 48.455861, lng: -101.821111 }, { name: "J-03", lat: 48.348028, lng: -101.878000 }, { name: "J-04", lat: 48.327056, lng: -101.769750 }, { name: "J-05", lat: 48.389583, lng: -101.734250 }, { name: "J-06", lat: 48.286139, lng: -101.943778 }, { name: "J-07", lat: 48.356028, lng: -101.974167 }, { name: "J-08", lat: 48.289417, lng: -102.073250 }, { name: "J-09", lat: 48.360667, lng: -102.073250 }, { name: "J-10", lat: 48.420000, lng: -102.017056 }, { name: "J-11", lat: 48.492222, lng: -101.908083 },
    { name: "K-01 MAF", lat: 48.550750, lng: -102.125222 }, { name: "K-02", lat: 48.685583, lng: -102.123306 }, { name: "K-03", lat: 48.618667, lng: -102.106722 }, { name: "K-04", lat: 48.558722, lng: -102.000000 }, { name: "K-05", lat: 48.488389, lng: -102.018889 }, { name: "K-06", lat: 48.447889, lng: -102.103778 }, { name: "K-07", lat: 48.467056, lng: -102.212444 }, { name: "K-08", lat: 48.546361, lng: -102.279556 }, { name: "K-09", lat: 48.544694, lng: -102.408306 }, { name: "K-10", lat: 48.618944, lng: -102.337500 }, { name: "K-11", lat: 48.618750, lng: -102.209361 },
    { name: "L-01 MAF", lat: 48.792722, lng: -102.268611 }, { name: "L-02", lat: 48.930972, lng: -102.239861 }, { name: "L-03", lat: 48.859361, lng: -102.239806 }, { name: "L-04", lat: 48.807222, lng: -102.160611 }, { name: "L-05", lat: 48.763694, lng: -102.075139 }, { name: "L-06", lat: 48.734861, lng: -102.204111 }, { name: "L-07", lat: 48.735417, lng: -102.327750 }, { name: "L-08", lat: 48.760806, lng: -102.436917 }, { name: "L-09", lat: 48.821806, lng: -102.369194 }, { name: "L-10", lat: 48.894361, lng: -102.439278 }, { name: "L-11", lat: 48.894306, lng: -102.332722 },
    { name: "M-01 MAF", lat: 48.676667, lng: -101.881778 }, { name: "M-02", lat: 48.745333, lng: -101.824778 }, { name: "M-03", lat: 48.649889, lng: -101.712167 }, { name: "M-04", lat: 48.577583, lng: -101.712194 }, { name: "M-05", lat: 48.618972, lng: -101.812417 }, { name: "M-06", lat: 48.502972, lng: -101.740500 }, { name: "M-07", lat: 48.549889, lng: -101.842917 }, { name: "M-08", lat: 48.619472, lng: -101.948611 }, { name: "M-09", lat: 48.676694, lng: -102.012639 }, { name: "M-10", lat: 48.746222, lng: -101.977528 }, { name: "M-11", lat: 48.805972, lng: -101.912194 },
    { name: "N-01 MAF", lat: 48.763333, lng: -101.591944 }, { name: "N-02", lat: 48.888944, lng: -101.562611 }, { name: "N-03", lat: 48.827194, lng: -101.518722 }, { name: "N-04", lat: 48.763417, lng: -101.471167 }, { name: "N-05", lat: 48.690861, lng: -101.409500 }, { name: "N-06", lat: 48.703278, lng: -101.516833 }, { name: "N-07", lat: 48.622472, lng: -101.603500 }, { name: "N-08", lat: 48.688278, lng: -101.630639 }, { name: "N-09", lat: 48.763528, lng: -101.710139 }, { name: "N-10", lat: 48.818972, lng: -101.780861 }, { name: "N-11", lat: 48.825806, lng: -101.628000 },
    { name: "O-01 MAF", lat: 48.821028, lng: -101.282083 }, { name: "O-02", lat: 48.966111, lng: -101.259944 }, { name: "O-03", lat: 48.870694, lng: -101.212611 }, { name: "O-04", lat: 48.794444, lng: -101.146750 }, { name: "O-05", lat: 48.763056, lng: -101.237361 }, { name: "O-06", lat: 48.699139, lng: -101.299667 }, { name: "O-07", lat: 48.765417, lng: -101.365806 }, { name: "O-08", lat: 48.824667, lng: -101.387639 }, { name: "O-09", lat: 48.890861, lng: -101.425750 }, { name: "O-10", lat: 48.948750, lng: -101.365806 }, { name: "O-11", lat: 48.893389, lng: -101.307250 }
];


const globalMilIntelligence = [
    // --- AIR FORCE / STRATEGIC (RED) ---
    { name: "CHEYENNE MOUNTAIN", lat: 38.7442, lng: -104.8461, type: "bunker", unit: "NORAD/NORTHCOM", info: "Hardened Granite Command Complex" },
    { name: "RAVEN ROCK (SITE R)", lat: 39.7347, lng: -77.4214, type: "bunker", unit: "AJCC / Pentagon Alt", info: "Underground DoD Relocation Hub" },
    { name: "MOUNT WEATHER", lat: 39.0631, lng: -77.8889, type: "bunker", unit: "FEMA/COG", info: "Civilian Executive Continuity Center" },
    { name: "JB LANGLEY", lat: 37.0850, lng: -76.3606, type: "air", unit: "1st FW / 480th ISR", aircraft: "F-22 Raptor, T-38 Talon" },
    { name: "MINOT AFB", lat: 48.4150, lng: -101.3270, type: "air", unit: "5th BW / 91st MW", aircraft: "B-52H, Minuteman III, UH-1N" },
    { name: "GRAND FORKS AFB", lat: 47.9552, lng: -97.4011, type: "air", unit: "319th RW", aircraft: "RQ-4B Global Hawk" },
    { name: "ABU NAKHLAH", lat: 25.1165, lng: 51.3204, type: "air", unit: "379th AEW", aircraft: "B-1B, B-52H, RC-135, C-17" },
    { name: "RAMSTEIN AB", lat: 49.4368, lng: 7.6015, type: "air", unit: "86th AW", aircraft: "C-130J, C-37A, C-21" },
    { name: "ROBINS AFB", lat: 32.6401, lng: -83.5918, type: "air", unit: "461st ACW", aircraft: "E-8C Joint STARS" },
    { name: "KIRTLAND AFB", lat: 35.0402, lng: -106.6098, type: "air", unit: "58th SOW", aircraft: "CV-22, HC-130J, HH-60G" },
    { name: "GEILENKIRCHEN", lat: 50.9614, lng: 6.0431, type: "air", unit: "NATO AEW&C", aircraft: "E-3A Sentry (AWACS)" },
    { name: "OFFUTT AFB", lat: 41.1174, lng: -95.9145, type: "air", unit: "55th Wing", aircraft: "RC-135V/W, E-4B NAOC" },
    { name: "BANGOR ANGB", lat: 44.8119, lng: -68.8349, type: "air", unit: "101st ARW", aircraft: "KC-135R Stratotanker" },
    { name: "HANSCOM AFB", lat: 42.4699, lng: -71.2890, type: "air", unit: "66th ABG", aircraft: "C-12, Charter Mission Support" },
    { name: "SEYMOUR JOHNSON", lat: 35.3394, lng: -77.9606, type: "air", unit: "4th FW", aircraft: "F-15E Strike Eagle" },
    { name: "SHAW AFB", lat: 33.9727, lng: -80.4706, type: "air", unit: "20th FW", aircraft: "F-16CM Fighting Falcon" },
    { name: "WRIGHT-PATTERSON", lat: 39.8258, lng: -84.0459, type: "air", unit: "88th ABW", aircraft: "C-12, C-17 (Transients)" },
    { name: "LITTLE ROCK AFB", lat: 34.9169, lng: -92.1494, type: "air", unit: "19th AW", aircraft: "C-130J Super Hercules" },
    { name: "MOUNTAIN HOME", lat: 43.0441, lng: -115.8664, type: "air", unit: "366th FW", aircraft: "F-15E Strike Eagle" },
    { name: "TONOPAH RANGE", lat: 37.7947, lng: -116.7786, type: "air", unit: "Special Test", aircraft: "F-117A, RQ-170" },
    { name: "LAUGHLIN AFB", lat: 29.3592, lng: -100.7778, type: "air", unit: "47th FTW", aircraft: "T-6 Texan II, T-38 Talon" },
    { name: "VANDENBERG SFB", lat: 34.7420, lng: -120.5724, type: "air", unit: "SLD 30", aircraft: "Space Launch Assets" },
    { name: "CREECH AFB", lat: 36.5869, lng: -115.6736, type: "air", unit: "432nd Wing", aircraft: "MQ-9 Reaper" },
    { name: "ELLSWORTH AFB", lat: 44.1450, lng: -103.1036, type: "air", unit: "28th BW", aircraft: "B-1B Lancer" },
    { name: "FAIRCHILD AFB", lat: 47.6150, lng: -117.6558, type: "air", unit: "92nd ARW", aircraft: "KC-135R Stratotanker" },
    { name: "DOBBINS ARB", lat: 33.9153, lng: -84.5163, type: "air", unit: "94th AW", aircraft: "C-130H Hercules" },
    { name: "VANCE AFB", lat: 36.3403, lng: -97.9158, type: "air", unit: "71st FTW", aircraft: "T-1 Jayhawk, T-6, T-38" },
    { name: "KEESLER AFB", lat: 30.4111, lng: -88.9236, type: "air", unit: "403rd Wing", aircraft: "WC-130J (Hurricane Hunters)" },
    { name: "DOVER AFB", lat: 39.1295, lng: -75.4660, type: "air", unit: "436th AW", aircraft: "C-5M Super Galaxy, C-17" },
    { name: "SCOTT AFB", lat: 38.5452, lng: -89.8352, type: "air", unit: "375th AMW", aircraft: "C-21 Learjet" },
    { name: "SHEPPARD AFB", lat: 33.9850, lng: -98.4917, type: "air", unit: "80th FTW", aircraft: "T-37, T-38 Talon" },
    { name: "COLUMBUS AFB", lat: 33.6439, lng: -88.4444, type: "air", unit: "14th FTW", aircraft: "T-6, T-38, T-1" },
    { name: "MOODY AFB", lat: 30.9678, lng: -83.1931, type: "air", unit: "23rd Wing", aircraft: "A-10C, HC-130J, HH-60W" },
    { name: "YOKOTA AB", lat: 35.7486, lng: 139.3486, type: "air", unit: "374th AW", aircraft: "C-130J, CV-22B, C-12" },
    { name: "KADENA AB", lat: 26.3556, lng: 127.7675, type: "air", unit: "18th Wing", aircraft: "F-15C, KC-135R, E-3G" },
    { name: "ANDERSEN AFB", lat: 13.5781, lng: 144.9247, type: "air", unit: "36th Wing", aircraft: "B-52H, RQ-4B, MQ-4C" },
    { name: "HICKAM AFB", lat: 21.3187, lng: -157.9433, type: "air", unit: "15th Wing", aircraft: "F-22 Raptor, C-17A" },
    { name: "HOLLOMAN AFB", lat: 32.8522, lng: -106.1064, type: "air", unit: "49th Wing", aircraft: "MQ-9 Reaper, F-16" },
    { name: "MCCONNELL AFB", lat: 37.6250, lng: -97.2667, type: "air", unit: "22nd ARW", aircraft: "KC-46A Pegasus" },
    { name: "AREA 51", lat: 37.2350, lng: -115.8111, type: "air", unit: "Det 3 AFFTC", aircraft: "CLASSIFIED ASSETS" },
    { name: "PETERSON SFB", lat: 38.8222, lng: -104.7000, type: "air", unit: "Space Ops", aircraft: "C-21, Strategic Ops" },
    { name: "DYESS AFB", lat: 32.4208, lng: -99.8547, type: "air", unit: "7th BW", aircraft: "B-1B Lancer, C-130J" },
    { name: "JB ANDREWS", lat: 38.8108, lng: -76.8670, type: "air", unit: "89th AW", aircraft: "VC-25 (Air Force One), C-32A" },
    { name: "HILL AFB", lat: 41.1119, lng: -111.9733, type: "air", unit: "388th FW", aircraft: "F-35A Lightning II" },
    { name: "FE WARREN AFB", lat: 41.1500, lng: -104.8667, type: "air", unit: "90th MW", aircraft: "Minuteman III ICBM, UH-1N" },
    { name: "EIELSON AFB", lat: 64.6656, lng: -147.1014, type: "air", unit: "354th FW", aircraft: "F-35A, F-16C" },
    { name: "JB ELMENDORF", lat: 61.2514, lng: -149.8061, type: "air", unit: "3rd Wing", aircraft: "F-22 Raptor, E-3G, C-17" },
    { name: "BEALE AFB", lat: 39.1361, lng: -121.4361, type: "air", unit: "9th RW", aircraft: "U-2S, RQ-4 Global Hawk" },
    { name: "TRAVIS AFB", lat: 38.2625, lng: -121.9328, type: "air", unit: "60th AMW", aircraft: "C-5M, KC-10A, KC-46" },
    { name: "JB MCCHORD", lat: 47.1375, lng: -122.4764, type: "air", unit: "62nd AW", aircraft: "C-17 Globemaster III" },
    { name: "EDWARDS AFB", lat: 34.9050, lng: -117.8836, type: "air", unit: "412th TW", aircraft: "F-35, F-22, B-21 (Test)" },
    { name: "PLANT 42", lat: 34.6339, lng: -118.0842, type: "air", unit: "Lockheed/Northrop", aircraft: "B-21 Raider, RQ-180" },
    { name: "BARKSDALE AFB", lat: 32.5008, lng: -93.6625, type: "air", unit: "2nd BW", aircraft: "B-52H Stratofortress" },
    { name: "TINKER AFB", lat: 35.4147, lng: -97.3867, type: "air", unit: "552nd ACW", aircraft: "E-3 Sentry, KC-135R" },
    { name: "EGLIN AFB", lat: 30.4833, lng: -86.5167, type: "air", unit: "96th TW", aircraft: "F-15EX, F-35A, F-16" },
    { name: "HURLBURT FIELD", lat: 30.4278, lng: -86.6892, type: "air", unit: "1st SOW", aircraft: "AC-130J, MC-130J, CV-22B" },
    { name: "TYNDALL AFB", lat: 30.0694, lng: -85.5761, type: "air", unit: "325th FW", aircraft: "F-35A Lightning II" },
    { name: "MACDILL AFB", lat: 27.8494, lng: -82.5211, type: "air", unit: "6th ARW", aircraft: "KC-135R Stratotanker" },
    { name: "JB CHARLESTON", lat: 32.8936, lng: -80.0403, type: "air", unit: "437th AW", aircraft: "C-17 Globemaster III" },
    { name: "LUKE AFB", lat: 33.5350, lng: -112.3831, type: "air", unit: "56th FW", aircraft: "F-35A, F-16C/D" },
    { name: "MALMSTROM AFB", lat: 47.5053, lng: -111.1839, type: "air", unit: "341st MW", aircraft: "Minuteman III, UH-1N" },
    { name: "AVIANO AB", lat: 46.0319, lng: 12.5964, type: "air", unit: "31st FW", aircraft: "F-16C/D" },
    { name: "OSAN AB", lat: 37.0906, lng: 127.0297, type: "air", unit: "51st FW", aircraft: "A-10C, F-16C, U-2S" },
    { name: "KUNSAN AB", lat: 35.9272, lng: 126.6158, type: "air", unit: "8th FW", aircraft: "F-16C Fighting Falcon" },

    // --- NAVAL BASES (DARK BLUE) ---
    { name: "NAS FALLON", lat: 39.4161, lng: -118.7003, type: "naval", unit: "TOPGUN", aircraft: "F-16, F/A-18E/F, EA-18G" },
    { name: "NAS PATUXENT", lat: 38.2860, lng: -76.4116, type: "naval", unit: "NAWCAD", aircraft: "F-35B/C, P-8A, MQ-4C" },
    { name: "NAS LEMOORE", lat: 36.3328, lng: -119.9525, type: "naval", unit: "SF Wing PAC", aircraft: "F/A-18E/F, F-35C" },
    { name: "NAS WHIDBEY", lat: 48.3518, lng: -122.6559, type: "naval", unit: "VAQ Wing", aircraft: "EA-18G, P-8A, EP-3E" },
    { name: "NAS PENSACOLA", lat: 30.3522, lng: -87.3195, type: "naval", unit: "Blue Angels", aircraft: "F/A-18E/F, T-45 Goshawk" },
    { name: "NAS JACKSONVILLE", lat: 30.2358, lng: -81.6806, type: "naval", unit: "Patrol Wing 11", aircraft: "P-8A Poseidon, MH-60R" },
    { name: "NAS NORTH ISLAND", lat: 32.6994, lng: -117.2153, type: "naval", unit: "CNAP", aircraft: "F/A-18, CMV-22B, MH-60" },
    { name: "NAS SIGONELLA", lat: 37.4017, lng: 14.9222, type: "naval", unit: "NAVSTA", aircraft: "P-8A, MQ-4C, RQ-4B" },
    { name: "NS ROTA", lat: 36.6472, lng: -6.3475, type: "naval", unit: "FDNF-E", aircraft: "MH-60R Seahawk" },
    { name: "NS NORFOLK", lat: 36.9367, lng: -76.3033, type: "naval", unit: "USFFC", aircraft: "Carrier Air Wing Assets" },
    { name: "NSA BAHRAIN", lat: 26.2111, lng: 50.6011, type: "naval", unit: "5th Fleet", aircraft: "MH-53E, MH-60R" },
    { name: "NAS ATSUGI", lat: 35.4544, lng: 139.4500, type: "naval", unit: "CVW-5 (Det)", aircraft: "MH-60R/S Seahawk" },
    { name: "CHINA LAKE", lat: 35.6853, lng: -117.6911, type: "naval", unit: "NAWCWD", aircraft: "Test & Eval Aircraft" },

    // --- ARMY / MARINE / SPECIAL (GREEN) ---
    { name: "MCB QUANTICO", lat: 38.5039, lng: -77.3023, type: "marine", unit: "HMX-1", aircraft: "VH-3D, VH-60N, MV-22B" },
    { name: "MCAS YUMA", lat: 32.6566, lng: -114.6060, type: "marine", unit: "MAWTS-1", aircraft: "F-35B, AV-8B, KC-130J" },
    { name: "MCAS IWAKUNI", lat: 34.1439, lng: 132.2359, type: "marine", unit: "MAG-12", aircraft: "F-35B, EA-18G, KC-130J" },
    { name: "POPE FIELD", lat: 35.1706, lng: -79.0147, type: "army", unit: "43rd AMOG", aircraft: "C-130H, C-17 (Support)" },
    { name: "BIGGS FIELD", lat: 31.8491, lng: -106.3768, type: "army", unit: "1st AD CAB", aircraft: "AH-64E, CH-47F, UH-60M" },
    { name: "HUNTER FIELD", lat: 32.0151, lng: -81.1444, type: "army", unit: "3rd ID CAB", aircraft: "AH-64E, MH-6M, MH-47G" },
    { name: "MCAS FUTENMA", lat: 26.2741, lng: 127.7554, type: "marine", unit: "MAG-36", aircraft: "MV-22B Osprey, UH-1Y" },
    { name: "MCAS KANEOHE", lat: 21.4500, lng: -157.7680, type: "marine", unit: "MAG-24", aircraft: "MV-22B, AH-1Z, UH-1Y" },
    { name: "MCAS NEW RIVER", lat: 34.7081, lng: -77.4381, type: "marine", unit: "MAG-26", aircraft: "MV-22B, CH-53K King Stallion" },
    { name: "MCAS CHERRY PT", lat: 34.9011, lng: -76.8808, type: "marine", unit: "2nd MAW", aircraft: "F-35B, KC-130J, EA-6B (Retired)" },
    { name: "MCAS MIRAMAR", lat: 32.8683, lng: -117.1425, type: "marine", unit: "3rd MAW", aircraft: "F-35B/C, F/A-18C/D, CH-53E" },
    { name: "FORT LIBERTY", lat: 35.1394, lng: -78.9991, type: "army", unit: "160th SOAR", aircraft: "MH-47G, MH-60M, AH-6M" },
    { name: "CAMP HUMPHREYS", lat: 36.9675, lng: 127.0317, type: "army", unit: "2nd CAB", aircraft: "AH-64E Apache, UH-60M" },
    { name: "CAMP LEMONNIER", lat: 11.5475, lng: 43.1494, type: "army", unit: "CJTF-HOA", aircraft: "MQ-9 Reaper, C-130J" }
];

const MM3_KPH = 24140;
const siloPos = { lat: 48.4150, lng: -101.3270 };
let map;

if (document.getElementById('map')) {
    map = L.map('map', { zoomControl: false, center: [48.3, -100.8], zoom: 8 });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
}

let activeCellId = null;
let impactLayer = L.layerGroup().addTo(map);
let trajectoryLayer = L.layerGroup().addTo(map);
let previewLayer = L.layerGroup().addTo(map);
let siloLayer = L.layerGroup().addTo(map);
let baseLayer = L.layerGroup().addTo(map);

// --- RENDER ASSETS ---
function renderAssets() {
    minotInventory.forEach(s => {
        const icon = L.divIcon({ className: '', html: `<div class="tag-silo" onclick="showIntel('silo', '${s.name}')">${s.name}</div>`, iconSize: [40, 15] });
        L.marker([s.lat, s.lng], { icon: icon }).addTo(siloLayer);
    });
    globalMilIntelligence.forEach(b => {
        const icon = L.divIcon({ className: '', html: `<div class="tag-base" onclick="showIntel('base', '${b.name}')">${b.name}</div>`, iconSize: [80, 15] });
        L.marker([b.lat, b.lng], { icon: icon }).addTo(baseLayer);
    });
}
renderAssets();

// --- INTEL FUNCTIONS ---
function showIntel(type, name) {
    const win = document.getElementById('base-window');
    const h = document.getElementById('base-name');
    const c = document.getElementById('base-content');
    win.style.display = 'block';
    h.innerText = name;

    if (type === 'silo') {
        const data = minotInventory.find(x => x.name === name);
        c.innerHTML = `TYPE: ${data.type}<br>STATUS: ${data.status}<br>COORD: ${data.lat}, ${data.lng}`;
    } else {
        const data = globalMilIntelligence.find(x => x.name === name);
        c.innerHTML = `UNIT: ${data.unit}<br>ASSETS: ${data.aircraft}<br>COORD: ${data.lat}, ${data.lng}`;
    }
}
function closeIntel() { document.getElementById('base-window').style.display = 'none'; }
function toggleLayer(layer, show) { show ? map.addLayer(layer) : map.removeLayer(layer); }

// --- SYSTEM CORE ---
function createNewCell() {
    const id = Date.now();
    const card = document.createElement('div');
    card.className = 'msl-card';
    card.id = `cell-${id}`;

    card.dataset.tLat = "";
    card.dataset.tLng = "";
    card.dataset.aborted = "false";
    card.dataset.launched = "false";

    card.innerHTML = `
        <div class="card-row" style="display: flex; justify-content: space-between; align-items: center;">
            <span class="card-id">LGM-30G // UNIT_${id.toString().slice(-4)}</span>
            <div style="display: flex; gap: 8px; align-items: center;">
                <span id="status-${id}" style="font-size:0.6em; color:var(--yellow)">STANDBY</span>
             
            </div>
        </div>
        <select class="sel-yield" id="yield-${id}" onchange="refreshPreview(${id})">
            <option value="350">W87 (350 KT)</option>
            <option value="475">W88 (475 KT)</option>
            <option value="1200">B83 (1.2 MT)</option>
        </select>
        <div class="telemetry-display">
            <div class="time-text" id="time-${id}">00:00</div>
            <div id="dist-${id}" style="font-size:0.6em; color:#444">0 KM</div>
        </div>
        <div class="btn-stack">
            <button class="btn-sm target-btn" id="t-btn-${id}" onclick="engageTargeting(${id})">SET TARGET</button>
            <button class="btn-sm abort-btn" id="a-btn-${id}" onclick="abortMissile(${id})" disabled>ABORT</button>
            <button class="btn-sm launch-btn" id="l-btn-${id}" onclick="launch(${id})" disabled>CONFIRM LAUNCH</button>
        </div>
    `;
    document.getElementById('deck').appendChild(card);

    // AUTO-SLIDE: When a new unit is added, scroll the deck to the end
    card.scrollIntoView({ behavior: 'smooth', inline: 'end' });
}

function hideCell(id) {
    const cell = document.getElementById(`cell-${id}`);
    if (!cell) return;

    // 1. If this was the active targeting cell, clear it
    if (activeCellId === id) {
        activeCellId = null;
        impactLayer.clearLayers();
    }

    // 2. Clear any active map previews for this unit
    if (unitPreviews[id]) {
        previewLayer.removeLayer(unitPreviews[id]);
        delete unitPreviews[id];
    }

    // 3. If the missile was in-flight, stop the timer and adjust the global count
    if (cell.dataset.launched === "true" && cell.dataset.aborted === "false") {
        clearInterval(parseInt(cell.dataset.intervalId));
        const activeCount = document.getElementById('g-active');
        activeCount.innerText = Math.max(0, parseInt(activeCount.innerText) - 1);

        // Remove trajectory line if it exists
        trajectoryLayer.eachLayer(l => {
            if (L.stamp(l) == cell.dataset.lineId) trajectoryLayer.removeLayer(l);
        });
    }

    // 4. Remove the element from the UI
    cell.remove();
}

let unitPreviews = {};

function refreshPreview(id) {
    const cell = document.getElementById(`cell-${id}`);
    if (!cell || !cell.dataset.tLat) return;

    // Remove existing preview group for this specific ID
    if (unitPreviews[id]) {
        previewLayer.removeLayer(unitPreviews[id]);
    }

    const lat = parseFloat(cell.dataset.tLat);
    const lng = parseFloat(cell.dataset.tLng);
    const y = parseInt(document.getElementById(`yield-${id}`).value);

    // Scaling math for blast zones
    const r1 = Math.pow(y, 0.4) * 110;
    const r2 = Math.pow(y, 0.33) * 750;

    const g = L.layerGroup();

    // Create the "Thermal" and "Pressure" rings
    L.circle([lat, lng], { color: '#FFD700', weight: 1, fillOpacity: 0.2, radius: r1 }).addTo(g);
    L.circle([lat, lng], { color: '#FF3B3B', weight: 1, fillOpacity: 0.1, radius: r2 }).addTo(g);
    L.circle([lat, lng], { color: '#FF8C00', weight: 1, fillOpacity: 0.05, radius: r2 * 2.5 }).addTo(g);
    L.circle([lat, lng], { color: '#444', weight: 1, fillOpacity: 0, radius: r2 * 4 }).addTo(g);

    // Add back to the map and track the reference
    g.addTo(previewLayer);
    unitPreviews[id] = g;
}

function engageTargeting(id) {
    const cell = document.getElementById(`cell-${id}`);

    // Stop if missile is already gone
    if (cell.dataset.launched === "true") return;

    if (activeCellId) document.getElementById(`cell-${activeCellId}`).classList.remove('targeting');
    activeCellId = id;
    document.getElementById(`cell-${id}`).classList.add('targeting');
}

// --- UPDATED TARGETING LOGIC ---
map.on('click', function (e) {
    if (!activeCellId) return;

    const cell = document.getElementById(`cell-${activeCellId}`);
    if (cell.dataset.launched === "true") return;

    const dist = getDist(siloPos.lat, siloPos.lng, e.latlng.lat, e.latlng.lng);

    cell.dataset.tLat = e.latlng.lat;
    cell.dataset.tLng = e.latlng.lng;
    cell.dataset.seconds = Math.round((dist / MM3_KPH) * 3600);

    document.getElementById(`dist-${activeCellId}`).innerText = `${Math.round(dist)} KM`;
    document.getElementById(`time-${activeCellId}`).innerText = formatTime(cell.dataset.seconds);
    document.getElementById(`l-btn-${activeCellId}`).disabled = false;
    document.getElementById(`status-${activeCellId}`).innerText = "LOCKED";

    // DO NOT CLEAR impactLayer here. 
    // Instead, just call refreshPreview to show the temporary target rings.
    refreshPreview(activeCellId);
});
function launch(id) {
    const cell = document.getElementById(`cell-${id}`);

    // LOCK TARGETING AND YIELD
    cell.dataset.launched = "true";
    document.getElementById(`yield-${id}`).disabled = true;

    // Disconnect from global active selection
    if (activeCellId === id) {
        cell.classList.remove('targeting');
        activeCellId = null;
    }

    const lat = parseFloat(cell.dataset.tLat);
    const lng = parseFloat(cell.dataset.tLng);
    const y = parseInt(document.getElementById(`yield-${id}`).value);

    // Lock visuals
    refreshPreview(id);

    document.getElementById(`l-btn-${id}`).disabled = true;
    document.getElementById(`t-btn-${id}`).disabled = true;

    const ab = document.getElementById(`a-btn-${id}`);
    ab.disabled = false;
    ab.classList.add('active');

    document.getElementById(`status-${id}`).innerText = "IN-FLIGHT";
    document.getElementById(`g-active`).innerText = parseInt(document.getElementById(`g-active`).innerText) + 1;

    const line = L.polyline([[siloPos.lat, siloPos.lng], [lat, lng]], {
        color: 'red',
        weight: 1,
        dashArray: '4, 4'
    }).addTo(trajectoryLayer);

    cell.dataset.lineId = L.stamp(line);

    let rem = parseInt(cell.dataset.seconds);
    const timer = setInterval(() => {
        if (cell.dataset.aborted === "true") return clearInterval(timer);
        document.getElementById(`time-${id}`).innerText = formatTime(rem);
        if (rem-- <= 0) {
            clearInterval(timer);
            detonate(lat, lng, y, id);
        }
    }, 1000);
    cell.dataset.intervalId = timer;
}
function abortMissile(id) {
    const cell = document.getElementById(`cell-${id}`);
    cell.dataset.aborted = "true";
    clearInterval(cell.dataset.intervalId);

    // --- CHANGE: Remove the preview when aborted ---
    if (unitPreviews[id]) {
        previewLayer.removeLayer(unitPreviews[id]);
        delete unitPreviews[id];
    }

    trajectoryLayer.eachLayer(l => { if (L.stamp(l) == cell.dataset.lineId) trajectoryLayer.removeLayer(l); });
    document.getElementById(`status-${id}`).innerText = "CANCELLED";
    document.getElementById(`g-active`).innerText = Math.max(0, parseInt(document.getElementById(`g-active`).innerText) - 1);
}

function detonate(lat, lng, y, id) {
    document.getElementById(`time-${id}`).innerText = "IMPACT";
    document.getElementById(`g-active`).innerText = Math.max(0, parseInt(document.getElementById(`g-active`).innerText) - 1);

    // 1. REMOVE the temporary preview rings for this specific unit
    if (unitPreviews[id]) {
        previewLayer.removeLayer(unitPreviews[id]);
        delete unitPreviews[id];
    }

    // 2. CREATE Permanent impact rings in the IMPACT LAYER
    // These use the same math but are added to impactLayer so they STAY forever.
    const r1 = Math.pow(y, 0.4) * 110;
    const r2 = Math.pow(y, 0.33) * 750;

    // Fireball/Crater (Permanent)
    L.circle([lat, lng], { color: '#ff4500', fillColor: '#ff4500', fillOpacity: 0.8, radius: r1, stroke: false }).addTo(impactLayer);

    // Radiation/Pressure Zone (Permanent)
    L.circle([lat, lng], { color: '#ff0000', weight: 2, fillOpacity: 0.2, radius: r2 }).addTo(impactLayer);

    // Fallout Zone (Permanent)
    L.circle([lat, lng], { color: '#444', weight: 1, fillOpacity: 0.1, radius: r2 * 2 }).addTo(impactLayer);

    // Update Death Toll
    const total = parseInt(document.getElementById('g-deaths').innerText.replace(/,/g, '')) + Math.floor(y * 1400);
    document.getElementById('g-deaths').innerText = total.toLocaleString();
}
function resetAll() {
    impactLayer.clearLayers();
    trajectoryLayer.clearLayers();
    previewLayer.clearLayers();
    unitPreviews = {}; // Reset the tracking object

    document.getElementById('g-deaths').innerText = "0";
    document.getElementById('g-active').innerText = "0";
    activeCellId = null;
    document.getElementById('deck').innerHTML = "";
    createNewCell();
}

function getDist(lat1, lon1, lat2, lon2) {
    const R = 6371; const dLat = (lat2 - lat1) * Math.PI / 180; const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatTime(s) { const m = Math.floor(s / 60); const sec = s % 60; return `${m}:${sec < 10 ? '0' + sec : sec}`; }

createNewCell();

window.onload = function () {
    document.getElementById('entry-protocol').style.display = 'flex';
};

function dismissEntry() {
    const modal = document.getElementById('entry-protocol');
    modal.style.opacity = '0';
    setTimeout(() => { modal.style.display = 'none'; }, 500);
}

// Ensure it shows on load
window.onload = function () {
    document.getElementById('entry-protocol').style.display = 'flex';
};
function toggleSearch() {
    const wrap = document.getElementById('header-search-wrap');
    const input = document.getElementById('aircraft-search');

    // Toggle the search bar
    if (wrap.style.display === 'none' || wrap.style.display === '') {
        wrap.style.display = 'flex';
        input.focus();
    } else {
        wrap.style.display = 'none';
    }
    // NOTICE: We removed the line that closes 'visibility-panel'
}

function toggleVisibilityPanel() {
    const panel = document.getElementById('visibility-panel');

    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';

        // --- ADDED: Ensure it comes to the front when opened ---
        if (typeof focusPanel === "function") {
            focusPanel('visibility-panel');
        }
    } else {
        panel.style.display = 'none';
    }
}

function toggleDeck(show) {
    const deck = document.getElementById('deck');

    if (show) {
        deck.style.display = 'flex';
    } else {
        deck.style.display = 'none';
    }

    // CRITICAL: When the deck appears/disappears, the map container 
    // changes size. We must tell Leaflet to redraw or it will stay grey.
    setTimeout(() => {
        map.invalidateSize();
    }, 200);
}

// --- OPTIONAL: Mouse Wheel Horizontal Scroll ---
document.getElementById('deck').addEventListener('wheel', (evt) => {
    if (evt.deltaY !== 0) {
        evt.preventDefault();
        document.getElementById('deck').scrollLeft += evt.deltaY;
    }
});

// Run on startup
function initSystemState() {
    // Ensure panels are hidden
    document.getElementById('visibility-panel').style.display = 'none';
    document.getElementById('deck').style.display = 'none';

    // Ensure the checkbox matches the hidden state
    document.getElementById('checkDeck').checked = false;
}

initSystemState();

function toggleManual() {
    const overlay = document.getElementById('manual-overlay');
    if (overlay.style.display === 'none' || overlay.style.display === '') {
        overlay.style.display = 'flex';
        // Optional: Close other panels when manual is open
        document.getElementById('visibility-panel').style.display = 'none';
    } else {
        overlay.style.display = 'none';
    }
}

// Optional: Close manual with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") document.getElementById('manual-overlay').style.display = 'none';
});

function clearBlastsOnly() {
    // 1. Wipe the permanent explosion circles
    impactLayer.clearLayers();

    // 2. Wipe the temporary targeting circles
    previewLayer.clearLayers();

    // 3. Reset the tracking object so the code doesn't look for old rings
    unitPreviews = {};

    // 4. Reset the death toll (optional - remove this line if you want to keep the score)
    document.getElementById('g-deaths').innerText = "0";

    console.log("TACTICAL_PURGE: Blast radii removed. Assets retained.");
}
