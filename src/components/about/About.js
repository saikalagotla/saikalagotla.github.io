import React from "react";
import { Typography, Box, Button } from "@mui/material";
import PDF from "../../assets/Kalagotla_Sai_Resume.pdf";

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

function About({ mode, scrollProgress = 0 }) {
  const textColor = lerpHex("#1a1a2e", "#FBEAEB", scrollProgress);
  const subtextColor = lerpHex("#2F3C7E", "#E8E4E8", scrollProgress);
  const buttonColor = lerpHex("#1a1a2e", "#FBEAEB", scrollProgress);
  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginLeft: { xs: "20px", sm: "20px", md: "50px", lg: "100px" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "30px", sm: "30px", md: "40px", lg: "50px" },
            color: textColor,
            textShadow: "0 1px 2px rgba(0,0,0,0.08)",
          }}
        >
          Sai Dheeraj Kalagotla
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "30px", sm: "30px", md: "40px", lg: "50px" },
            background: "linear-gradient(to right, #259784 0%, #6967CE 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Full-stack Developer
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "15px", sm: "15px", md: "15px", lg: "20px" },
            color: subtextColor,
            textShadow: "0 1px 2px rgba(0,0,0,0.08)",
          }}
        >
          I'm a passionate software developer with a love for creating
          innovative and efficient solutions through code.
        </Typography>
        <Button
          href={PDF}
          target="_blank"
          variant="outlined"
          sx={{
            fontSize: { xs: "20px", sm: "20px", md: "20px", lg: "25px" },
            marginTop: "2%",
            width: "fit-content",
            color: buttonColor,
            border: `2px solid ${buttonColor}`,
            "&:hover": {
              border: "2px solid #ff9800",
              color: "#ff9800",
            },
          }}
        >
          <Typography sx={{ color: "inherit" }}>Resume</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default About;
