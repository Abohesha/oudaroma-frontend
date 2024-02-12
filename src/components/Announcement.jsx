import React from "react";
import '../scenes/home/Home.css';
import { Typography } from "@mui/material";

const Announcement = ({ text, pic }) => {
  console.log('picUR:', pic); 
  return (
    <div className="announcement">
      <div className="text-container">
        <div className="text">
      <Typography color={"white"} variant="body1" textAlign="center" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      </div>
      {pic && <img className="announcement-img" src={pic} alt="Announcement" />}
    </div>
  );
};

export default Announcement;
