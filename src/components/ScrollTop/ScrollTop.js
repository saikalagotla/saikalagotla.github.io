import React from "react";
import { Button, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ScrollTop = () => {
  const [atTop, setAtTop] = React.useState("true");

  return (
    <Box
      sx={{
        position: "sticky",
        top: "93vh",
        left: "50vw",
        borderRadius: "50%",
        height: "32px",
        width: "32px",
      }}
    >
      <Button
        onClick={() => {
          window.scroll({ top: 0, behavior: "smooth" });
        }}
        sx={{ borderRadius: "50%", height: "32px", width: "32px" }}
      >
        <ArrowUpwardIcon />
      </Button>
    </Box>
  );
};

export default ScrollTop;
