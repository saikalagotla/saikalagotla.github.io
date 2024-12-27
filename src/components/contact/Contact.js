import { Box, Button, Typography } from "@mui/material";
import React from "react";
import LinkedinLogo from "../../assets/linkedin.png";
import GithubLogo from "../../assets/github.png";
import EmailLogo from "../../assets/email.png";

const Contact = ({ mode }) => {
  const sendEmail = () => {
    window.location = "mailto:saikalagotla@gmail.com";
  };

  return (
    <Box
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        href="https://www.linkedin.com/in/saikalagotla/"
        target="_blank"
        style={{ borderRadius: "20px" }}
      >
        <img src={LinkedinLogo} style={{ width: "100px", hieght: "100px" }} />
      </Button>
      <Button
        href="https://github.com/PSYK1"
        target="_blank"
        style={{ borderRadius: "20px" }}
      >
        <img src={GithubLogo} style={{ width: "100px", hieght: "100px" }} />
      </Button>
      <Button
        onClick={() => sendEmail()}
        target="_blank"
        style={{ borderRadius: "20px" }}
      >
        <img src={EmailLogo} style={{ width: "100px", hieght: "100px" }} />
      </Button>
    </Box>
  );
};

export default Contact;
