import "./app.scss";
import About from "./components/about/About";
import Project from "./components/projects/Project";
import { Box, Typography } from "@mui/material";
import pixelgramImage from "./assets/pixelgram.png";
import crowdChordLoginImage from "./assets/CrowdChordLogin.png";
import crowdChordArtistsImage from "./assets/CrowdChordArtistsPage.png";
import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import cloud from "./assets/cloud.png";
import cloud2 from "./assets/cloud2.png";
import mountains from "./assets/mountains3.png";
import Professional from "./components/professional/Professional";
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

const experiences = [
  {
    title: "DirecTV- Cognizant | Front-end Web Developer",
    timePeriod: "Sep 2023- Present",
    description: [
      "Implemented composable software to support reusability and modularity throughout the DirecTv website, resulting in a 25% reduction in development time, and stylistic consistency.",
      "Developed and integrated new features enhancing functionality and increasing user engagement.",
      "Led efforts to improve website accessibility, resulting in a 30% increase in accessibility score.",
      "Built reusable React components based on provided designs using Material UI.",
      "Collaborated with cross-functional teams using Jira and Microsoft Teams to deliver consistent results and meet project deadlines.",
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
  const [scrollProgress, setScrollProgress] = useState(0);

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const [counter, setCounter] = useState(1);

  // Track scroll position inside Parallax to drive sun→moon and background
  useEffect(() => {
    const container = ref.current?.container?.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const space = ref.current?.space ?? window.innerHeight;
      const totalScroll = space * 3; // 4 pages: scroll 0..3 viewport heights
      const progress = Math.min(1, Math.max(0, scrollTop / totalScroll));
      setScrollProgress(progress);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* SUN / MOON - fixed to viewport top right */}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          width: 140,
          height: 140,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #fff9e6, #ffd54f 40%, #ffb300)",
            boxShadow: "0 0 60px 20px rgba(255, 213, 79, 0.5), 0 0 120px 40px rgba(255, 179, 0, 0.25)",
            opacity: 1 - scrollProgress,
            transition: "opacity 0.25s ease-out",
          }}
        />
        {/* Moon: full moon (pale circle, no dark overlay) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #fffef8, #e8e4d9 50%, #d4cfc4)",
            boxShadow: "0 0 24px 8px rgba(232, 228, 217, 0.5)",
            opacity: scrollProgress,
            transition: "opacity 0.25s ease-out",
          }}
        />
      </Box>

      <Box sx={{ position: "absolute", inset: 0 }}>
        <Parallax pages={4} ref={ref}>
        {/* BACKGROUND - darkens as you scroll (sun → night) */}
        <ParallaxLayer
          factor={4}
          style={{
            background: `linear-gradient(${lerpHex("#2F3C7E", "#0f0f23", scrollProgress)}, ${lerpHex("#FBEAEB", "#1a1a2e", scrollProgress)})`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        {/* BACKGROUND */}

        {/* ABOUT TOP CLOUD LAYER */}
        <ParallaxLayer
          speed={2}
          offset={0}
          style={{
            alignContent: "center",
          }}
        >
          <Box
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              gap: "20px",
              "& img": {},
            }}
          >
            <img src={cloud} style={styles.imageTop} />
            <img src={cloud2} style={styles.imageTop} />
            <img src={cloud} style={styles.imageTop} />
            <img src={cloud2} style={styles.imageTop} />
            <img src={cloud2} style={styles.imageTop} />
            <img src={cloud2} style={styles.imageTop} />
          </Box>
        </ParallaxLayer>
        {/* ABOUT TOP CLOUD LAYER */}

        {/* ABOUT BOTTOM CLOUD LAYER */}
        <ParallaxLayer
          offset={0}
          speed={2}
          style={{
            alignContent: "center",
            // paddingBottom: "10%",
          }}
        >
          <Box
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
              gap: "20px",
            }}
          >
            <img src={cloud2} style={styles.imageBottom} />
            <img src={cloud} style={styles.imageBottom} />
            <img src={cloud} style={styles.imageBottom} />
            <img src={cloud2} style={styles.imageBottom} />
            <img src={cloud2} style={styles.imageBottom} />
            <img src={cloud2} style={styles.imageBottom} />
          </Box>
        </ParallaxLayer>
        {/* ABOUT BOTTOM CLOUD LAYER */}

        {/* ABOUT SECTION */}
        <ParallaxLayer speed={1} offset={0}>
          <About mode={mode} />
        </ParallaxLayer>
        {/* ABOUT SECTION */}

        {/* PROFESSIONAL EXPERIENCE */}
        <ParallaxLayer offset={1} speed={0.5}>
          <Box
            style={{
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "30px", lg: "40px" },
                color: mode === "dark" ? "#FBEAEB" : "#36367B",
              }}
            >
              Professional Experience
            </Typography>
          </Box>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1}>
          <Box
            style={{
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Professional mode={mode} experiences={experiences} />
          </Box>
        </ParallaxLayer>
        {/* PROFESSIONAL EXPERIENCE */}

        {/* PROJECTS SECTION */}
        <ParallaxLayer offset={2} speed={0.5}>
          <Box
            style={{
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "30px", lg: "40px" },
                color: mode === "dark" ? "#2F3C7E" : "#36367B",
              }}
              fontFamily={"sans-serif"}
            >
              Personal Projects
            </Typography>
          </Box>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={1}>
          <Box
            style={{
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Projects projects={projects} mode={mode} />
          </Box>
        </ParallaxLayer>
        {/* PROJECTS SECTION */}

        {/* MOUNTAINS */}
        <ParallaxLayer offset={3} speed={0.5}>
          <Box
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <img
              src={mountains}
              style={{
                // height: "500px",
                width: "110%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Box>
        </ParallaxLayer>
        {/* MOUNTAINS */}

        {/* CONTACT */}
        <ParallaxLayer offset={3} speed={0.5}>
          <Box
            style={{
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "30px", lg: "40px" },
                color: mode === "dark" ? "#2F3C7E" : "#36367B",
              }}
              fontFamily={"sans-serif"}
            >
              Socials
            </Typography>
          </Box>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={1}>
          <Contact mode={mode} />
        </ParallaxLayer>
        {/* CONTACT */}
      </Parallax>
      </Box>
    </Box>
  );
}

export default App;
