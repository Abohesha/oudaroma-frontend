import React,{useState,useEffect} from 'react';
import { Typography, Box } from '@mui/material';

const AboutUs = () => {

  const [about, setAbout] = useState("")

  const getAboutUs = async () =>{

    const res = await fetch("https://oudaroma-backend-server.onrender.com/utils/get-utils",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    });
    const data = await res.json()
    setAbout(data.about)
  }

  useEffect(()=>{
    getAboutUs()
  },[])

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        About Us
      </Typography>
      <br />
      <br />
      <br />
      
      <Typography variant="body1" textAlign="justify">
        {about}
      </Typography>
    </Box>
  );
};

export default AboutUs;
