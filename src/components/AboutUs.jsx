import React from 'react';
import { Typography, Box } from '@mui/material';
import { useAppContext } from './ContextProvider';
const AboutUs = () => {

  const about = localStorage.getItem('about') 

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
