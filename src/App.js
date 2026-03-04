import "./app.scss";
import About from "./components/about/About";
import Project from "./components/projects/Project";
import { Box, Typography } from "@mui/material";
import pixelgramImage from "./assets/pixelgram.png";
import crowdChordLoginImage from "./assets/CrowdChordLogin.png";
import crowdChordArtistsImage from "./assets/CrowdChordArtistsPage.png";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import cloud from "./assets/cloud.png";
import cloud2 from "./assets/cloud2.png";
import Professional from "./components/professional/Professional";
import RoadAndTrain from "./components/RoadAndTrain/RoadAndTrain";
import cognizantLogo from "./assets/cognizantLogo.png";
import directvLogo from "./assets/DirecTvLogo.png";
import Contact from "./components/contact/Contact";

const projects = [
  {
    projectName: "CrowdChord",
    subName: "Connecting Artists and Audiences",
    imageSrc: [crowdChordLoginImage, crowdChordArtistsImage],
    description: [
      "Developed application to help artists connect with their audience using React Native and Firebase.",
      "Implemented secure login using Google Firebase, ensuring data protection and user privacy.",
    ],
  },
  {
    projectName: "Pixelgram",
    subName: "Social Media Platform",
    imageSrc: pixelgramImage,
    description: [
      "Created a full stack social media web application using Angular, HTML, CSS, and Spring.",
      "Developed a robust REST API with Spring to handle queries and authentication for a seamless UX.",
    ],
  },
  {
    projectName: "FlavorQuest",
    subName: "Restaurant Recommendation",
    imageSrc: pixelgramImage,
    description: [
      "Developeb a web application to help users decide where to dine using React Native and Firebase.",
      "Implemented secure login and registration system using Firebase authentication.",
      "Utilized HTTP requests and user location  to query the Yelp API for local restaurant information.",
    ],
  },
];

// Cloud config: random positions across full scroll, no overlap (vertical slots + staggered animation)
const CLOUD_IMAGES = [cloud, cloud2];
const NUM_CLOUDS = 8;
const NUM_VERTICAL_SLOTS = 20; // slots across 4 pages to avoid vertical overlap
const SLOT_HEIGHT_PCT = 100 / NUM_VERTICAL_SLOTS;

function getCloudPositions() {
  const positions = [];
  const usedSlots = new Set();
  for (let i = 0; i < NUM_CLOUDS; i++) {
    let slot;
    do {
      slot = Math.floor(Math.random() * NUM_VERTICAL_SLOTS);
    } while (usedSlots.has(slot));
    usedSlots.add(slot);
    const topPct =
      slot * SLOT_HEIGHT_PCT + Math.random() * (SLOT_HEIGHT_PCT * 0.6);
    const duration = 18 + Math.random() * 14;
    const delay = (i / NUM_CLOUDS) * duration * 0.8 + Math.random() * 3;
    positions.push({
      id: i,
      top: `${topPct}%`,
      src: CLOUD_IMAGES[i % CLOUD_IMAGES.length],
      duration: `${duration}s`,
      delay: `${delay}s`,
      size: 240 + Math.random() * 80,
    });
  }
  return positions;
}

const cloudPositions = getCloudPositions();

// Birds in the sky: half left→right (like clouds), half right→left. Flap speed matches flight speed.
// Colors complement app palette: navy (#2F3C7E), blush (#FBEAEB), sun amber (#ffb300), train blues, grass greens.
const BIRD_COLORS = [
  "#8b6b7c", // dusty mauve (blush family)
  "#a65d4a", // terracotta (warm, complements navy)
  "#b8860b", // dark golden (sun palette)
  "#4a5f7a", // slate blue (train/navy)
  "#2a3a4e", // deep navy
  "#5a7a65", // sage (grass family)
];
const BIRD_COUNT = 6;
function getBirdPositions() {
  const positions = [];
  for (let i = 0; i < BIRD_COUNT; i++) {
    const topPct = 8 + Math.random() * 45;
    const durationSec = 22 + Math.random() * 18;
    const duration = `${durationSec}s`;
    const delay = Math.random() * 28;
    // Explicitly half right (left→right), half left (right→left)
    const direction = i < BIRD_COUNT / 2 ? "right" : "left";
    const flapDurationSec = 0.35 + (durationSec / 50) * 0.4;
    positions.push({
      id: i,
      top: `${topPct}%`,
      direction,
      duration,
      delay: `${delay}s`,
      size: 24 + Math.random() * 14,
      flapDuration: `${flapDurationSec}s`,
      color: BIRD_COLORS[i % BIRD_COLORS.length],
    });
  }
  return positions;
}
const birdPositions = getBirdPositions();

const experiences = [
  {
    title: "DirecTV- Cognizant | Front-end Web Developer",
    timePeriod: "Sep 2023- Present",
    description: [
      "Developed and maintained the primary client-facing web application using React, Node.js, and Express.js",
      "Built and maintained a shared component library used across 4 cross-functional teams. Led a full restructuring of the component base to improve efficiency and reduce overhead costs.",
      "Improved application response latency by implementing Redis caching and optimizing database queries.",
      "Optimized code to improve application performance and decrease load time by 72%.",
      "Led efforts to improve website accessibility, resulting in a 30% increase in accessibility score.",
      "Built reusable React components using Material UI based on provided UI/UX designs.",
      "Conducted rigorous testing to ensure accessibility compliance and cross-browser compatibility.",
      "Collaborated with cross-functional teams using Jira and Microsoft Teams to deliver consistent results and meet project deadlines.",
      "Used Test Driven Development methodology with Jasmine for unit and integration testing.",
      "Developed and shipped user facing features on a biweekly basis.",
      "Developed and integrated new features enhancing functionality and increasing user engagement.",
    ],
    logo: directvLogo,
  },
  {
    title: "Cognizant | Full Stack Developer",
    timePeriod: "Aug 2022- Present",
    description: [
      "Developed innovative full-stack applications in a scrum team, leveraging Angular, and Spring.",
      "Developed and integrated new features enhancing functionality and increasing user engagement.",
      "Created modular components in Angular, leading to improved code reusability and maintainability.",
      "Seamlessly connected Angular components to RESTAPI backend using Redux and Axios.",
      "Ensured application quality by conducting rigorous testing with Jasmine Testing Framework.",
    ],
    logo: cognizantLogo,
  },
];

const Projects = ({ projects, mode }) => {
  return (
    <Box
      id="projects"
      sx={{
        scrollMarginTop: "60px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "space-around",
        padding: { xs: "15px", sm: "20px", md: "30px", lg: "50px" },
        flexWrap: "wrap",
      }}
    >
      {projects.map((value, index) => {
        return (
          <Project
            mode={mode}
            name={value.projectName}
            subName={value.subName}
            imageSrc={value.imageSrc}
            description={value.description}
            index={index}
            variant={value.variant}
          />
        );
      })}
    </Box>
  );
};

// Interpolate between two hex colors (t: 0 = colorA, 1 = colorB)
function lerpHex(hexA, hexB, t) {
  const parse = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const [r1, g1, b1] = parse(hexA);
  const [r2, g2, b2] = parse(hexB);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${b})`;
}

function App() {
  let mode = useSelector((state) => state.colorMode.value);

  const ref = useRef();
  const sunRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetPosRef = useRef({ x: null, y: null });
  const currentPosRef = useRef({ x: null, y: null });

  const sunSize = 32; // cursor-sized
  const LERP = 0.22; // snappier when used as cursor

  // Sun as custom cursor: track mouse in ref only (no React state → no re-renders every frame)
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth lerp: update sun position via DOM ref (avoids 60fps setState re-renders)
  useEffect(() => {
    let rafId;
    const tick = () => {
      const target = targetPosRef.current;
      const current = currentPosRef.current;
      const el = sunRef.current;
      if (target.x == null || target.y == null) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      if (current.x == null || current.y == null) {
        currentPosRef.current = { x: target.x, y: target.y };
        if (el) {
          el.style.left = target.x + "px";
          el.style.top = target.y + "px";
          el.style.visibility = "visible";
        }
      } else {
        const x = current.x + (target.x - current.x) * LERP;
        const y = current.y + (target.y - current.y) * LERP;
        currentPosRef.current = { x, y };
        if (el) {
          el.style.left = x + "px";
          el.style.top = y + "px";
          el.style.visibility = "visible";
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const [counter, setCounter] = useState(1);

  // Track scroll: RAF + throttle so we only re-render when progress changes meaningfully
  const lastProgressRef = useRef(0);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    let rafId = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const { scrollTop, scrollHeight, clientHeight } = container;
        const maxScroll = Math.max(0, scrollHeight - clientHeight);
        const progress =
          maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;
        if (Math.abs(progress - lastProgressRef.current) > 0.012) {
          lastProgressRef.current = progress;
          setScrollProgress(progress);
        }
      });
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Stars: single SVG (one DOM node) for better performance
  const starPositions = useMemo(() => {
    const list = [];
    for (let i = 0; i < 45; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: 0.8 + Math.random() * 1.2,
        opacity: 0.6 + Math.random() * 0.4,
      });
    }
    return list;
  }, []);

  // Memoize scroll-derived values to avoid repeated lerpHex calls per frame
  const scrollStyles = useMemo(
    () => ({
      bgStart: lerpHex("#2F3C7E", "#0f0f23", scrollProgress),
      bgEnd: lerpHex("#FBEAEB", "#1a1a2e", scrollProgress),
      cloudShadow: lerpHex("#8a8583", "#e8e8e8", scrollProgress),
      titleColor: lerpHex("#1a1a2e", "#FBEAEB", scrollProgress),
      starsOpacity:
        scrollProgress >= 0.75
          ? Math.min(1, (scrollProgress - 0.75) / 0.25)
          : 0,
    }),
    [scrollProgress],
  );

  const styles = {
    container: {
      width: "100%",
      height: "100%",
    },
    imageTop: {
      width: "300px",
      filter: `drop-shadow(0px 30px 40px #8a8583)`,
      zIndex: 1,
    },
    imageBottom: {
      width: "300px",
      filter: `drop-shadow(0px 30px 40px #8a8583)`,
    },
  };

  return (
    <Box className="container" style={{ position: "relative" }}>
      {/* SUN / MOON - position updated via ref (no re-renders); opacity still from scroll */}
      <Box
        ref={sunRef}
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          visibility: "hidden",
          transform: "translate(-50%, -50%)",
          width: sunSize,
          height: sunSize,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, #fff9e6, #ffd54f 40%, #ffb300)",
            boxShadow:
              "0 0 12px 4px rgba(255, 213, 79, 0.5), 0 0 24px 8px rgba(255, 179, 0, 0.25)",
            opacity: 1 - scrollProgress,
            transition: "opacity 0.25s ease-out",
          }}
        />
        {/* Moon: full moon (pale circle) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, #fffef8, #e8e4d9 50%, #d4cfc4)",
            boxShadow: "0 0 8px 2px rgba(232, 228, 217, 0.5)",
            opacity: scrollProgress,
            transition: "opacity 0.25s ease-out",
          }}
        />
      </Box>

      {/* Fixed background - darkens as you scroll (sun → night) */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: `linear-gradient(${scrollStyles.bgStart}, ${scrollStyles.bgEnd})`,
          backgroundSize: "cover",
        }}
      />

      {/* Stars - single SVG for performance, fade in when scrolled to bottom */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: scrollStyles.starsOpacity,
          transition: "opacity 0.4s ease-out",
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{ display: "block" }}
          preserveAspectRatio="none"
        >
          {starPositions.map((s) => (
            <circle
              key={s.id}
              cx={`${s.x}%`}
              cy={`${s.y}%`}
              r={s.r}
              fill={`rgba(255,255,255,${s.opacity})`}
            />
          ))}
        </svg>
      </Box>

      {/* Fixed clouds - behind content; smaller on smaller screens */}
      <Box
        className="clouds-container"
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {cloudPositions.map((c) => (
          <Box
            key={c.id}
            className="cloud-float"
            sx={{
              position: "absolute",
              top: c.top,
              left: 0,
              width: {
                xs: c.size * 0.35,
                sm: c.size * 0.55,
                md: c.size * 0.75,
                lg: c.size,
              },
              height: "auto",
              "& img": {
                width: "100%",
                height: "auto",
                display: "block",
              },
            }}
            style={{
              filter: `drop-shadow(0px 30px 40px ${scrollStyles.cloudShadow})`,
              transform: "translateX(-100%)",
              animation: `cloudFloat ${c.duration} linear ${c.delay} infinite`,
            }}
          >
            <img src={c.src} alt="" />
          </Box>
        ))}
      </Box>

      {/* Birds in the sky - shadow style, sideways profile (rotateY), flapping; half L→R, half R→L */}
      <Box
        className="birds-container"
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          perspective: "800px",
        }}
      >
        {birdPositions.map((b) => (
          <Box
            key={b.id}
            className={
              b.direction === "right" ? "bird-fly-right" : "bird-fly-left"
            }
            sx={{
              position: "absolute",
              top: b.top,
              left: b.direction === "right" ? 0 : "auto",
              right: b.direction === "left" ? 0 : "auto",
              width: b.size,
              height: b.size * 0.7,
              // Start hidden and off-screen so visible during animation delay; animation will override
              opacity: 0,
              transform:
                b.direction === "right"
                  ? "translateX(calc(-100vw - 100%))"
                  : "scaleX(-1) translateX(calc(100vw + 100%))",
              animation: `birdFly${b.direction === "right" ? "Right" : "Left"} ${b.duration} linear ${b.delay} infinite`,
            }}
          >
            {/* Rotate on Y so bird looks like it's flying sideways (profile), not into the screen */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                transform:
                  b.direction === "right"
                    ? "rotateY(-25deg)"
                    : "rotateY(25deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <svg
                viewBox="0 0 28 16"
                fill="none"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.35))",
                }}
              >
                {/* Body - colored silhouette */}
                <ellipse
                  cx="14"
                  cy="8"
                  rx="2"
                  ry="3"
                  fill={b.color}
                  fillOpacity="0.9"
                />
                {/* Left wing - flaps down/up */}
                <g
                  className="bird-wing-left"
                  style={{ animationDuration: b.flapDuration }}
                >
                  <path
                    d="M14 8 Q6 4 2 6 Q6 10 14 8"
                    fill={b.color}
                    fillOpacity="0.9"
                    stroke={b.color}
                    strokeOpacity="0.7"
                    strokeWidth="0.8"
                  />
                </g>
                {/* Right wing - flaps down/up (mirrored) */}
                <g
                  className="bird-wing-right"
                  style={{ animationDuration: b.flapDuration }}
                >
                  <path
                    d="M14 8 Q22 4 26 6 Q22 10 14 8"
                    fill={b.color}
                    fillOpacity="0.9"
                    stroke={b.color}
                    strokeOpacity="0.7"
                    strokeWidth="0.8"
                  />
                </g>
              </svg>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Scrollable content column - sections stacked one after the other */}
      <Box
        ref={ref}
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* ABOUT SECTION */}
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <About mode={mode} scrollProgress={scrollProgress} />
        </Box>

        {/* PROFESSIONAL EXPERIENCE */}
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            py: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "30px", lg: "40px" },
                color: scrollStyles.titleColor,
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Professional Experience
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Professional mode={mode} experiences={experiences} />
          </Box>
        </Box>

        {/* PROJECTS SECTION */}
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            py: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "30px", lg: "40px" },
                color: scrollStyles.titleColor,
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Personal Projects
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Projects projects={projects} mode={mode} />
          </Box>
        </Box>

        {/* SOCIALS / CONTACT + ROAD & TRAIN AT BOTTOM */}
        <Box
          sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "30px", lg: "40px" },
                color: scrollStyles.titleColor,
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Socials
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Contact mode={mode} />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              flexShrink: 0,
            }}
          >
            <RoadAndTrain />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
