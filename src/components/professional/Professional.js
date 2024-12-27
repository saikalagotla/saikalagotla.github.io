import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Experience = ({ mode, experience }) => {
  return (
    <Paper
      elevation={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        width: "40%",
        minWidth: "350px",
        backgroundColor: "#17141D",
        padding: { xs: "15px", sm: "20px", md: "30px", lg: "50px" },
        borderRadius: "20px",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 24,
          transform: "translateY(-5px)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        },
        margin: "20px",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", gap: "20px" }}>
        <img
          style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          src={experience.logo}
        />
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "15px", md: "15px", lg: "20px" },
              color: mode === "dark" ? "#FFFFFF" : "#575380",
            }}
            fontFamily={"sans-serif"}
          >
            {experience.title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "15px", md: "15px", lg: "20px" },
              color: mode === "dark" ? "#A9A3C1" : "#575380",
            }}
            fontFamily={"sans-serif"}
          >
            {experience.timePeriod}
          </Typography>
        </Box>
      </Box>
      <Box>
        {experience.description.map((desc) => {
          return (
            <Typography
              sx={{
                fontSize: { xs: "15px", sm: "15px", md: "15px", lg: "20px" },
                color: mode === "dark" ? "#A9A3C1" : "#575380",
              }}
              fontFamily={"sans-serif"}
            >
              • {desc}
            </Typography>
          );
        })}
      </Box>
    </Paper>
  );
};

const Professional = ({ mode, experiences }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "space-around",
        justifyContent: "center",
        gap: "10%",
        flexWrap: "wrap",
      }}
    >
      {experiences.map((experience) => {
        return <Experience mode={mode} experience={experience} />;
      })}
    </Box>
  );
};

export default Professional;
