import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";


function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            Parfüméria
          </Typography>
          <div>
          Perfume has a transformative quality that awakens something in all of us, from admiring the precious liquid inside the beautiful bottles, to an aroma that can teleport you to a time or place in an instant. “Perfume is the key to our memories” according to Kate Lord Brown, author of the book “The Perfume Garden”.
          </div>
        </Box>

        {/* <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box> */}



        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            Debrecen, battyany utca 11/D
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: oudaroma@oudaroma.net
          </Typography>
          <Box>
          <Typography mb="30px">Phone number:
           +36704341278  (English and Arabic speakers)
           +36309783757
           </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
