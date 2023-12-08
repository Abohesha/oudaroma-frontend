import React, { useState, useEffect } from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [carouselHeight, setCarouselHeight] = useState(isNonMobile ? "700px" : "300px");

  useEffect(() => {
    const updateCarouselHeight = () => {
      const images = Object.values(heroTextureImports);
      if (images.length > 0) {
        const firstImage = new Image();
        firstImage.src = images[0];
        firstImage.onload = () => {
          const aspectRatio = firstImage.height / firstImage.width;
          const newHeight = aspectRatio * window.innerWidth;
          setCarouselHeight(`${newHeight}px`);
        };
      }
    };

    updateCarouselHeight();

    window.addEventListener("resize", updateCarouselHeight);
    return () => {
      window.removeEventListener("resize", updateCarouselHeight);
    };
  }, []);

  return (
    <Box sx={{ marginTop: "50px" }}> {/* Adjust the top margin */}
      <Carousel
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(onClickHandler) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              color: "white",
              padding: "5px",
              zIndex: "10",
            }}
          >
            <NavigateBeforeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
        renderArrowNext={(onClickHandler) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              color: "white",
              padding: "5px",
              zIndex: "10",
            }}
          >
            <NavigateNextIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
        style={{ height: carouselHeight }}
      >
        {Object.values(heroTextureImports).map((texture, index) => (
          <Box
            key={`carousel-image-${index}`}
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <br />
            <br />
            <img
              src={texture}
              alt={`carousel-${index}`}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default MainCarousel;
