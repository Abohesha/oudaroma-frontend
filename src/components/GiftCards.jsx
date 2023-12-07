import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Modal, Backdrop } from '@mui/material';

const GiftCards = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Gift Cards
      </Typography>

      <Box display="flex" justifyContent="center" flexWrap="wrap" gap="20px" marginTop="40px">
        <Card sx={{ maxWidth: 345 }} onClick={() => handleOpenImage("https://firebasestorage.googleapis.com/v0/b/oudaroma-9445a.appspot.com/o/WhatsApp%20Image%202023-12-06%20at%2011.45.30_704c0b10.jpg?alt=media&token=f2bf5a92-5f59-4547-9b26-54a2090f8529")}>
          <CardMedia
            component="img"
            height="140"
            image="https://firebasestorage.googleapis.com/v0/b/oudaroma-9445a.appspot.com/o/WhatsApp%20Image%202023-12-06%20at%2011.45.30_704c0b10.jpg?alt=media&token=f2bf5a92-5f59-4547-9b26-54a2090f8529"
            alt="First Gift Card"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              First Gift Card Title
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description or details about the first gift card.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345 }} onClick={() => handleOpenImage("https://firebasestorage.googleapis.com/v0/b/oudaroma-9445a.appspot.com/o/WhatsApp%20Image%202023-12-06%20at%2011.50.42_c9396f9d.jpg?alt=media&token=f47360f5-90de-4fcc-b8ef-a689052b0277")}>
          <CardMedia
            component="img"
            height="140"
            image="https://firebasestorage.googleapis.com/v0/b/oudaroma-9445a.appspot.com/o/WhatsApp%20Image%202023-12-06%20at%2011.50.42_c9396f9d.jpg?alt=media&token=f47360f5-90de-4fcc-b8ef-a689052b0277"
            alt="Second Gift Card"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Second Gift Card Title
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description or details about the second gift card.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Modal open={!!selectedImage} onClose={handleCloseImage} BackdropComponent={Backdrop}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
          onClick={handleCloseImage}
        >
          <img
            src={selectedImage}
            alt="Selected Gift Card"
            style={{ maxHeight: '90%', maxWidth: '90%', cursor: 'pointer' }}
            onClick={(e) => e.stopPropagation()}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default GiftCards;
