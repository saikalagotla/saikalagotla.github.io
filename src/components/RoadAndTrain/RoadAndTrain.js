import React, { memo } from "react";
import { Box } from "@mui/material";

// Colors for people on train (complementary to app: navy, blush, amber, train blues, grass)
const PERSON_COLORS = ["#8b6b7c", "#a65d4a", "#b8860b", "#4a5f7a", "#2a3a4e", "#5a7a65"];
// At least 2 people per car; no people on main engine. Car 1, 2, 3, 4, caboose = 5 cars × 2 = 10 people.
const PEOPLE_ON_TRAIN = [
  { x: 185, y: 16 }, { x: 218, y: 16 },   // car 1 (boxcar)
  { x: 256, y: 14 }, { x: 288, y: 14 },   // car 2
  { x: 328, y: 15 }, { x: 352, y: 15 },   // car 3
  { x: 392, y: 14 }, { x: 422, y: 14 },   // car 4
  { x: 458, y: 10 }, { x: 486, y: 10 },   // caboose
];

function PersonCutout({ x, y, color, animClass }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <g className={`person-on-train ${animClass}`}>
        {/* Front view: head centered */}
        <rect x="-2" y="0" width="4" height="4" rx="0.5" fill={color} />
        {/* Body centered */}
        <rect x="-2.5" y="4" width="5" height="5" rx="0.5" fill={color} />
        {/* Left arm (longer, up and out from left shoulder) */}
        <g transform="translate(-1.8, 4) rotate(-35) translate(0, -3.8)">
          <rect x="-0.5" y="0" width="1" height="3.8" rx="0.3" fill={color} />
        </g>
        {/* Right arm (longer, up and out from right shoulder) */}
        <g transform="translate(1.8, 4) rotate(35) translate(0, -3.8)">
          <rect x="-0.5" y="0" width="1" height="3.8" rx="0.3" fill={color} />
        </g>
        {/* Left leg (well spaced so both visible) */}
        <g transform="translate(-1.15, 9) rotate(-8)">
          <rect x="-0.55" y="0" width="1.1" height="3" rx="0.2" fill={color} />
        </g>
        {/* Right leg (well spaced so both visible) */}
        <g transform="translate(1.15, 9) rotate(8)">
          <rect x="-0.55" y="0" width="1.1" height="3" rx="0.2" fill={color} />
        </g>
      </g>
    </g>
  );
}

function RoadAndTrain() {
  return (
    <Box
      className="road-and-train-scene"
      sx={{
        width: "100%",
        position: "relative",
        overflowX: "hidden",
        overflowY: "visible",
        display: "block",
      }}
    >
      <svg
        viewBox="0 0 1200 280"
        preserveAspectRatio="xMidYMax slice"
        style={{
          width: "100%",
          display: "block",
          minHeight: "200px",
        }}
      >
        <defs>
          {/* Dirt road gradient */}
          <linearGradient id="dirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B7355" />
            <stop offset="50%" stopColor="#6B5344" />
            <stop offset="100%" stopColor="#5C4033" />
          </linearGradient>
          {/* Rock gradient */}
          <linearGradient id="rockGradient" x1="0%" y1="0%" x2="1" y2="1">
            <stop offset="0%" stopColor="#7A7A7A" />
            <stop offset="100%" stopColor="#4A4A4A" />
          </linearGradient>
          {/* Rail gradient */}
          <linearGradient id="railGradient" x1="0%" y1="0%" x2="0%" y2="1">
            <stop offset="0%" stopColor="#5a5a5a" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>
          {/* Wood tie gradient */}
          <linearGradient id="tieGradient" x1="0%" y1="0%" x2="1" y2="0">
            <stop offset="0%" stopColor="#4a3728" />
            <stop offset="100%" stopColor="#2d1f14" />
          </linearGradient>
          {/* Grass greens */}
          <linearGradient id="grassGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#2d5a27" />
            <stop offset="100%" stopColor="#4a7c43" />
          </linearGradient>
        </defs>

        {/* Dirt road - irregular path (extends up so tracks sit on top of it) */}
        <path
          d="M -50 280 L -50 105 Q 100 95 250 108 Q 400 100 550 102 Q 700 98 850 108 Q 1000 102 1150 98 L 1250 98 L 1250 280 Z"
          fill="url(#dirtGradient)"
        />

        {/* Rocks on the road */}
        <ellipse cx="120" cy="200" rx="15" ry="10" fill="url(#rockGradient)" />
        <ellipse cx="380" cy="185" rx="12" ry="8" fill="url(#rockGradient)" />
        <ellipse cx="520" cy="195" rx="10" ry="7" fill="url(#rockGradient)" />
        <ellipse cx="720" cy="188" rx="14" ry="9" fill="url(#rockGradient)" />
        <ellipse cx="950" cy="192" rx="11" ry="7" fill="url(#rockGradient)" />
        <circle cx="280" cy="178" r="7" fill="url(#rockGradient)" />
        <circle cx="620" cy="182" r="6" fill="url(#rockGradient)" />
        <circle cx="820" cy="175" r="8" fill="url(#rockGradient)" />

        {/* Railroad ties and rails - drawn ON TOP of dirt */}
        {[...Array(35)].map((_, i) => (
          <rect
            key={`tie-${i}`}
            x={i * 70 - 50}
            y="128"
            width="60"
            height="14"
            rx="2"
            fill="url(#tieGradient)"
          />
        ))}
        <rect x="-100" y="118" width="1400" height="8" fill="url(#railGradient)" />
        <rect x="-100" y="144" width="1400" height="8" fill="url(#railGradient)" />
      </svg>

      {/* Grass layer - only below tracks (y > 155), on top of train */}
      <Box
        className="grass-layer"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 11,
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox="0 0 1200 280"
          preserveAspectRatio="xMidYMax slice"
          style={{ width: "100%", height: "100%", display: "block", minHeight: "200px" }}
        >
          <defs>
            <linearGradient id="grassGradientOverlay" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2d5a27" />
              <stop offset="100%" stopColor="#4a7c43" />
            </linearGradient>
          </defs>
          {[
            [40, 118], [90, 122], [130, 120], [180, 125], [230, 121], [280, 124], [330, 119], [380, 123], [430, 120], [480, 122], [530, 118], [580, 124], [630, 121], [680, 123], [730, 119], [780, 125], [830, 122], [880, 120], [930, 124], [980, 121], [1030, 123], [1080, 119], [1130, 122], [1180, 120],
            [60, 135], [120, 138], [170, 134], [220, 139], [270, 136], [320, 133], [370, 138], [420, 135], [470, 137], [520, 132], [570, 136], [620, 139], [670, 134], [720, 137], [770, 133], [820, 138], [870, 135], [920, 136], [970, 132], [1020, 138], [1070, 134], [1120, 137], [1160, 135],
            [80, 150], [140, 152], [200, 148], [260, 154], [310, 150], [360, 153], [410, 149], [460, 155], [510, 151], [560, 148], [610, 154], [660, 150], [710, 152], [760, 147], [810, 153], [860, 149], [910, 154], [960, 151], [1010, 148], [1060, 153], [1110, 150], [1150, 152],
            [50, 165], [110, 168], [160, 164], [210, 170], [250, 166], [300, 172], [350, 167], [400, 171], [450, 166], [500, 169], [550, 165], [600, 170], [650, 168], [700, 164], [750, 171], [800, 167], [850, 169], [900, 165], [950, 170], [1000, 166], [1050, 172], [1100, 168], [1140, 170], [1190, 166],
            [70, 180], [130, 183], [190, 179], [240, 185], [290, 181], [340, 184], [390, 180], [440, 186], [490, 182], [540, 179], [590, 184], [640, 181], [690, 185], [740, 180], [790, 183], [840, 179], [890, 185], [940, 181], [990, 184], [1040, 180], [1090, 183], [1130, 181], [1180, 184],
            [90, 195], [150, 198], [200, 194], [260, 199], [310, 195], [360, 197], [420, 193], [470, 198], [520, 195], [570, 192], [620, 197], [670, 194], [720, 199], [770, 195], [820, 191], [870, 197], [920, 194], [970, 198], [1020, 195], [1070, 192], [1120, 197], [1160, 194],
            [60, 208], [120, 212], [180, 207], [230, 211], [280, 208], [330, 213], [380, 209], [430, 212], [480, 208], [530, 211], [580, 207], [630, 212], [680, 209], [730, 213], [780, 208], [830, 211], [880, 207], [930, 212], [980, 209], [1030, 211], [1080, 208], [1130, 212], [1180, 209],
            [100, 222], [160, 225], [220, 221], [270, 226], [320, 223], [370, 227], [420, 222], [470, 225], [520, 221], [570, 226], [620, 223], [670, 227], [720, 222], [770, 225], [820, 221], [870, 226], [920, 223], [970, 227], [1020, 222], [1070, 225], [1120, 221], [1160, 226],
            [75, 238], [140, 241], [200, 237], [250, 242], [300, 239], [350, 243], [400, 238], [450, 242], [500, 237], [550, 241], [600, 239], [650, 243], [700, 238], [750, 242], [800, 237], [850, 241], [900, 239], [950, 243], [1000, 238], [1050, 242], [1100, 237], [1150, 241], [1195, 239],
          ].filter(([x, y]) => y > 155).filter((_, i) => i % 2 === 0).map(([x, y], i) => (
            <g key={`g1-${i}`} className={`grass-blade grass-delay-${i % 4}`} style={{ transformOrigin: `${x}px ${y}px` }}>
              <path d={`M ${x} ${y} Q ${x + 2} ${y - 7} ${x + 4} ${y - 14}`} stroke="url(#grassGradientOverlay)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          ))}
          {[
            [55, 128], [115, 131], [165, 127], [215, 132], [265, 129], [315, 126], [365, 131], [415, 128], [465, 130], [515, 127], [565, 132], [615, 129], [665, 131], [715, 127], [765, 132], [815, 128], [865, 130], [915, 127], [965, 131], [1015, 128], [1065, 132], [1115, 129], [1165, 130],
            [85, 143], [145, 146], [195, 142], [245, 147], [295, 144], [345, 141], [395, 146], [445, 143], [495, 145], [545, 142], [595, 147], [645, 144], [695, 146], [745, 142], [795, 147], [845, 143], [895, 145], [945, 142], [995, 147], [1045, 144], [1095, 146], [1145, 142], [1195, 145],
            [65, 158], [125, 161], [175, 157], [225, 162], [275, 159], [325, 156], [375, 161], [425, 158], [475, 160], [525, 157], [575, 162], [625, 159], [675, 161], [725, 157], [775, 162], [825, 158], [875, 160], [925, 157], [975, 161], [1025, 158], [1075, 162], [1125, 159], [1175, 160],
            [95, 173], [155, 176], [205, 172], [255, 177], [305, 174], [355, 171], [405, 176], [455, 173], [505, 175], [555, 172], [605, 177], [655, 174], [705, 176], [755, 172], [805, 177], [855, 173], [905, 175], [955, 172], [1005, 176], [1055, 173], [1105, 177], [1155, 174], [1195, 176],
            [45, 188], [105, 191], [185, 187], [235, 192], [285, 189], [335, 186], [385, 191], [435, 188], [485, 190], [535, 187], [585, 192], [635, 189], [685, 191], [735, 187], [785, 192], [835, 188], [885, 190], [935, 187], [985, 191], [1035, 188], [1085, 192], [1135, 189], [1185, 190],
            [110, 202], [170, 205], [220, 201], [270, 206], [320, 203], [370, 200], [420, 205], [470, 202], [520, 204], [570, 201], [620, 206], [670, 203], [720, 205], [770, 201], [820, 206], [870, 202], [920, 204], [970, 201], [1020, 206], [1070, 203], [1120, 205], [1170, 202],
            [70, 216], [130, 219], [190, 215], [240, 220], [290, 217], [340, 214], [390, 219], [440, 216], [490, 218], [540, 215], [590, 220], [640, 217], [690, 219], [740, 215], [790, 220], [840, 216], [890, 218], [940, 215], [990, 219], [1040, 216], [1090, 218], [1140, 215], [1190, 219],
            [90, 232], [150, 235], [210, 231], [260, 236], [310, 233], [360, 230], [410, 235], [460, 232], [510, 234], [560, 231], [610, 236], [660, 233], [710, 235], [760, 231], [810, 236], [860, 232], [910, 234], [960, 231], [1010, 235], [1060, 232], [1110, 234], [1160, 231], [1185, 235],
          ].filter(([x, y]) => y > 155).filter((_, i) => i % 2 === 0).map(([x, y], i) => (
            <g key={`g2-${i}`} className={`grass-blade grass-delay-${i % 4}`} style={{ transformOrigin: `${x}px ${y}px` }}>
              <path d={`M ${x} ${y} Q ${x - 1} ${y - 5} ${x - 2} ${y - 10}`} stroke="url(#grassGradientOverlay)" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          ))}
        </svg>
      </Box>

      {/* Train 1 - aligned on tracks, animated right to left */}
      <Box
        className="train-animate"
        sx={{
          position: "absolute",
          bottom: "46%",
          right: 0,
          zIndex: 10,
          width: { xs: "560px", sm: "700px", md: "960px", lg: "1100px" },
          height: "auto",
        }}
      >
        <svg
          viewBox="0 -95 520 175"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <linearGradient id="trainBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d5a80" />
              <stop offset="100%" stopColor="#1a2a40" />
            </linearGradient>
            <linearGradient id="trainCab" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5a7a9a" />
              <stop offset="100%" stopColor="#2a4a6a" />
            </linearGradient>
            <linearGradient id="wheelGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#333" />
            </linearGradient>
            <linearGradient id="carGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5c4a3a" />
              <stop offset="100%" stopColor="#3d2e22" />
            </linearGradient>
            <linearGradient id="carGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a5c6a" />
              <stop offset="100%" stopColor="#2a3a45" />
            </linearGradient>
            <linearGradient id="carGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5a4a3d" />
              <stop offset="100%" stopColor="#3a2e24" />
            </linearGradient>
            <linearGradient id="carGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a5560" />
              <stop offset="100%" stopColor="#2d3540" />
            </linearGradient>
            <linearGradient id="carGrad5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#554a3d" />
              <stop offset="100%" stopColor="#352e26" />
            </linearGradient>
            <filter id="smokeFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0" result="smoke" />
              <feBlend in="SourceGraphic" in2="smoke" mode="normal" />
            </filter>
            <radialGradient id="smokeGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#e8e8e8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a0a0a0" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Locomotive body */}
          <rect x="10" y="25" width="100" height="45" rx="4" fill="url(#trainBody)" />
          {/* Cab */}
          <rect x="110" y="20" width="55" height="50" rx="4" fill="url(#trainCab)" />
          {/* Cab windows */}
          <rect x="120" y="28" width="18" height="16" rx="2" fill="#87CEEB" />
          <rect x="142" y="28" width="18" height="16" rx="2" fill="#87CEEB" />
          {/* Chimney / smokestack */}
          <rect x="35" y="8" width="20" height="22" rx="2" fill="#2a2a2a" />
          {/* Chimney smoke - puffs rise and fade (drawn on top of chimney) */}
          <g className="train-smoke" filter="url(#smokeFilter)">
            <circle cx="45" cy="8" r="6" fill="url(#smokeGrad)" className="smoke-puff smoke-puff-1" />
            <circle cx="45" cy="8" r="5" fill="url(#smokeGrad)" className="smoke-puff smoke-puff-2" />
            <circle cx="45" cy="8" r="7" fill="url(#smokeGrad)" className="smoke-puff smoke-puff-3" />
            <circle cx="45" cy="8" r="5" fill="url(#smokeGrad)" className="smoke-puff smoke-puff-4" />
          </g>
          {/* Locomotive wheels */}
          <circle cx="45" cy="72" r="12" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />
          <circle cx="85" cy="72" r="12" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />
          <circle cx="125" cy="72" r="12" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />
          <circle cx="155" cy="72" r="12" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />
          {/* Front detail */}
          <rect x="5" y="38" width="8" height="20" rx="1" fill="#1a1a1a" />

          {/* Car 1 - boxcar */}
          <rect x="172" y="28" width="62" height="42" rx="3" fill="url(#carGrad1)" stroke="#2a2520" strokeWidth="1" />
          <rect x="178" y="34" width="18" height="30" rx="1" fill="#1a1510" />
          <circle cx="188" cy="72" r="10" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />
          <circle cx="218" cy="72" r="10" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />

          {/* Car 2 - boxcar */}
          <rect x="240" y="26" width="64" height="44" rx="3" fill="url(#carGrad2)" stroke="#252a30" strokeWidth="1" />
          <rect x="248" y="32" width="20" height="32" rx="1" fill="#151a20" />
          <circle cx="262" cy="72" r="10" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />
          <circle cx="294" cy="72" r="10" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />

          {/* Car 3 - boxcar */}
          <rect x="310" y="27" width="60" height="43" rx="3" fill="url(#carGrad3)" stroke="#2a2520" strokeWidth="1" />
          <rect x="318" y="33" width="16" height="31" rx="1" fill="#1a1510" />
          <circle cx="328" cy="72" r="10" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />
          <circle cx="356" cy="72" r="10" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />

          {/* Car 4 - boxcar */}
          <rect x="376" y="26" width="62" height="44" rx="3" fill="url(#carGrad4)" stroke="#252a30" strokeWidth="1" />
          <rect x="384" y="32" width="18" height="32" rx="1" fill="#151a20" />
          <circle cx="398" cy="72" r="10" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />
          <circle cx="428" cy="72" r="10" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />

          {/* Car 5 - caboose-style */}
          <rect x="444" y="22" width="56" height="48" rx="4" fill="url(#carGrad5)" stroke="#2a2520" strokeWidth="1" />
          <rect x="452" y="30" width="12" height="14" rx="1" fill="#87CEEB" />
          <rect x="468" y="30" width="12" height="14" rx="1" fill="#87CEEB" />
          <circle cx="458" cy="72" r="10" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />
          <circle cx="486" cy="72" r="10" fill="url(#wheelGrad)" stroke="#444" strokeWidth="2" />

          {/* People on top - different colors, bouncing & swaying */}
          {PEOPLE_ON_TRAIN.map((p, i) => (
            <PersonCutout key={i} x={p.x} y={p.y} color={PERSON_COLORS[i % PERSON_COLORS.length]} animClass={`person-move-${i + 1}`} />
          ))}
        </svg>
      </Box>

      {/* Train 2 - same animation, delayed so a train is always on screen */}
      <Box
        className="train-animate train-delay"
        sx={{
          position: "absolute",
          bottom: "46%",
          right: 0,
          zIndex: 10,
          width: { xs: "560px", sm: "700px", md: "960px", lg: "1100px" },
          height: "auto",
        }}
      >
        <svg
          viewBox="0 -95 520 175"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <linearGradient id="trainBody2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d5a80" />
              <stop offset="100%" stopColor="#1a2a40" />
            </linearGradient>
            <linearGradient id="trainCab2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5a7a9a" />
              <stop offset="100%" stopColor="#2a4a6a" />
            </linearGradient>
            <linearGradient id="wheelGrad2" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#333" />
            </linearGradient>
            <linearGradient id="carGrad1b" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5c4a3a" />
              <stop offset="100%" stopColor="#3d2e22" />
            </linearGradient>
            <linearGradient id="carGrad2b" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a5c6a" />
              <stop offset="100%" stopColor="#2a3a45" />
            </linearGradient>
            <linearGradient id="carGrad3b" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5a4a3d" />
              <stop offset="100%" stopColor="#3a2e24" />
            </linearGradient>
            <linearGradient id="carGrad4b" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a5560" />
              <stop offset="100%" stopColor="#2d3540" />
            </linearGradient>
            <linearGradient id="carGrad5b" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#554a3d" />
              <stop offset="100%" stopColor="#352e26" />
            </linearGradient>
            <filter id="smokeFilter2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0" result="smoke" />
              <feBlend in="SourceGraphic" in2="smoke" mode="normal" />
            </filter>
            <radialGradient id="smokeGrad2" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#e8e8e8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a0a0a0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="10" y="25" width="100" height="45" rx="4" fill="url(#trainBody2)" />
          <rect x="110" y="20" width="55" height="50" rx="4" fill="url(#trainCab2)" />
          <rect x="120" y="28" width="18" height="16" rx="2" fill="#87CEEB" />
          <rect x="142" y="28" width="18" height="16" rx="2" fill="#87CEEB" />
          <rect x="35" y="8" width="20" height="22" rx="2" fill="#2a2a2a" />
          <g className="train-smoke" filter="url(#smokeFilter2)">
            <circle cx="45" cy="8" r="6" fill="url(#smokeGrad2)" className="smoke-puff smoke-puff-1" />
            <circle cx="45" cy="8" r="5" fill="url(#smokeGrad2)" className="smoke-puff smoke-puff-2" />
            <circle cx="45" cy="8" r="7" fill="url(#smokeGrad2)" className="smoke-puff smoke-puff-3" />
            <circle cx="45" cy="8" r="5" fill="url(#smokeGrad2)" className="smoke-puff smoke-puff-4" />
          </g>
          <circle cx="45" cy="72" r="12" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <circle cx="85" cy="72" r="12" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <circle cx="125" cy="72" r="12" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <circle cx="155" cy="72" r="12" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <rect x="5" y="38" width="8" height="20" rx="1" fill="#1a1a1a" />
          <rect x="172" y="28" width="62" height="42" rx="3" fill="url(#carGrad1b)" stroke="#2a2520" strokeWidth="1" />
          <rect x="178" y="34" width="18" height="30" rx="1" fill="#1a1510" />
          <circle cx="188" cy="72" r="10" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <circle cx="218" cy="72" r="10" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <rect x="240" y="26" width="64" height="44" rx="3" fill="url(#carGrad2b)" stroke="#252a30" strokeWidth="1" />
          <rect x="248" y="32" width="20" height="32" rx="1" fill="#151a20" />
          <circle cx="262" cy="72" r="10" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <circle cx="294" cy="72" r="10" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <rect x="310" y="27" width="60" height="43" rx="3" fill="url(#carGrad3b)" stroke="#2a2520" strokeWidth="1" />
          <rect x="318" y="33" width="16" height="31" rx="1" fill="#1a1510" />
          <circle cx="328" cy="72" r="10" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <circle cx="356" cy="72" r="10" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <rect x="376" y="26" width="62" height="44" rx="3" fill="url(#carGrad4b)" stroke="#252a30" strokeWidth="1" />
          <rect x="384" y="32" width="18" height="32" rx="1" fill="#151a20" />
          <circle cx="398" cy="72" r="10" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <circle cx="428" cy="72" r="10" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <rect x="444" y="22" width="56" height="48" rx="4" fill="url(#carGrad5b)" stroke="#2a2520" strokeWidth="1" />
          <rect x="452" y="30" width="12" height="14" rx="1" fill="#87CEEB" />
          <rect x="468" y="30" width="12" height="14" rx="1" fill="#87CEEB" />
          <circle cx="458" cy="72" r="10" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />
          <circle cx="486" cy="72" r="10" fill="url(#wheelGrad2)" stroke="#444" strokeWidth="2" />

          {PEOPLE_ON_TRAIN.map((p, i) => (
            <PersonCutout key={i} x={p.x} y={p.y} color={PERSON_COLORS[i % PERSON_COLORS.length]} animClass={`person-move-${i + 1}`} />
          ))}
        </svg>
      </Box>
    </Box>
  );
}

export default memo(RoadAndTrain);
