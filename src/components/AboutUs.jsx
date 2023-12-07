import React from 'react';
import { Typography, Box } from '@mui/material';

const AboutUs = () => {
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        About Us
      </Typography>
      <br />
      <br />
      <br />
      
      <Typography variant="body1" textAlign="justify">
        Perfume has a transformative quality that awakens something in all of us, from admiring the
        precious liquid inside the beautiful bottles, to an aroma that can teleport you to a time or
        place in an instant. "Perfume is the key to our memories" according to Kate Lord Brown,
        author of the book "The Perfume Garden".
      </Typography>
    </Box>
  );
};

export default AboutUs;
