import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const ItemDetails = () => {

  const location = useLocation()
  const imageId = location.pathname.split('/')[2]

  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(0);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    const res = await fetch(
      `https://oudaroma-backend-server.onrender.com/item/get-item-by-id/${imageId}`,
      {
        method: "GET",
      }
    );
    const itemJson = await res.json();
    setItem(itemJson);
    console.log(itemJson)
  }

  async function getItems() {
    const res = await fetch(
      `https://oudaroma-backend-server.onrender.com/item/get-all-items`,
      {
        method: "GET",
      }
    );
    const itemsJson = await res.json();
    setItems(itemsJson);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  
/*
  <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>

   */     

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
        <Carousel
        NavigateNextIcon={<NavigateNextIcon/>}
        NavigateBeforeIcon={<NavigateBeforeIcon/>}
        >
          {
            item?.image?.map((img,i)=>(     
              
              <img
                key={i}
                alt={item?.name}
                width="100%"
                height="100%"
                src={item?.image}
                style={{ objectFit: "contain" }}
              />
      
            ))
          }

        </Carousel>
        </Box>  
        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.name}</Typography>
            <Typography>HUF {item?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.longDescription}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount((prevState)=>Math.max(prevState - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0.5px" }}>{count}</Typography>
              
              <IconButton onClick={() => setCount((prevState)=>prevState + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.category.map(c=>{return c +' '})}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.longDescription}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;