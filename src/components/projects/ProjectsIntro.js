import { Box, Typography } from "@mui/material";
import React from "react";

function ProjectsIntro({ mode }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "20px", sm: "20px", md: "30px", lg: "40px" },
          color: mode === "dark" ? "#777BA4" : "#36367B",
          // background: "linear-gradient(to right, #259784 0%, #6967CE 100%)",
          // WebkitBackgroundClip: "text",
          // WebkitTextFillColor: "transparent",
        }}
        fontFamily={"sans-serif"}
      >
        Personal Projects
      </Typography>
    </Box>
  );
}

export default ProjectsIntro;
