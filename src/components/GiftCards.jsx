import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Modal, Backdrop } from '@mui/material';

const GiftCards = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [giftCards, setGiftCards] = useState([])

  const handleOpenImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const getGiftCards = async () =>{

    const res = await fetch("https://oudaroma-backend-server.onrender.com/utils/get-utils",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    });
    const data = await res.json()
    setGiftCards(data.giftcards)
  }

  useEffect(()=>{
    getGiftCards()
  },[])

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Gift Cards
      </Typography>

      <Box display="flex" justifyContent="center" flexWrap="wrap" gap="20px" marginTop="40px">
        {giftCards.map((giftcard)=>(
          <Card sx={{ maxWidth: 345 }} onClick={() => handleOpenImage(`${giftcard.pic}`)}>
          <CardMedia
            component="img"
            height="140"
            image={giftcard.pic}
            alt="First Gift Card"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {giftcard.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {giftcard.description}
            </Typography>
          </CardContent>
        </Card>
        ))}

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
