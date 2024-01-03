import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import "./Homepage.css";

function Homepage() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      setFade(true);
    }, 2300);
  });

  return (
    <div className="container">
      {show ? (
        <div className="opener">
          <div className="wave">
            <h1>👋</h1>
          </div>
        </div>
      ) : (
        <div className="home">
          <Navbar />
        </div>
      )}
    </div>
  );
}

export default Homepage;
