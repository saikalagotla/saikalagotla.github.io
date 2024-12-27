import React from "react";
import { Typography, Box, Button } from "@mui/material";
import PDF from "../../assets/Kalagotla_Sai_Resume.pdf";

function About({ mode }) {
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
            color: mode === "dark" ? "#777BA4" : "#36367B",
          }}
          fontFamily={"sans-serif"}
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
          fontFamily={"sans-serif"}
        >
          Front-end + Full-stack Developer
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "15px", sm: "15px", md: "15px", lg: "20px" },
            color: mode === "dark" ? "#A9A3C1" : "#575380",
          }}
          fontFamily={"sans-serif"}
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
            color: "#FBEAEB",
            border: "2px solid #FBEAEB",
            "&:hover": {
              border: "2px solid orange",
              color: "orange",
            },
          }}
        >
          <Typography>Resume</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default About;
