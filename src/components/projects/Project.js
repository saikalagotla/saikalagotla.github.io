import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import Gear from "../../assets/gear.png";

function Project({
  mode,
  name,
  subName,
  imageSrc,
  description,
  index,
  variant,
}) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        padding: "50px",
        backgroundColor: "#17141D",
        width: "33%",
        minWidth: "300px",
        margin: "20px",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 24,
          transform: "translateY(-5px)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        },
      }}
    >
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src={Gear}
          style={{ height: "50px", width: "50px", borderRadius: "50%" }}
        ></img>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "15px", md: "15px", lg: "20px" },
              color: mode === "dark" ? "#FFFFFF" : "#36367B",
            }}
            fontFamily={"sans-serif"}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "15px", md: "15px", lg: "20px" },
              color: mode === "dark" ? "#A9A3C1" : "#36367B",
              marginBottom: "10px",
            }}
            fontFamily={"sans-serif"}
          >
            {subName}
          </Typography>
        </Box>
      </Box>
      {description.map((desc) => {
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
    </Paper>
  );
}

export default Project;
