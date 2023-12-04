import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import {useLocation} from "react-router-dom"


const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("All");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");
  const location = useLocation();

  const handleChange = (event, newValue) => {
      setValue(newValue);

  };

  console.log(items)



  useEffect(()=>{
    if(location.search.length > 0){
      const category = location.search.split("=")[1]
      setValue(category.split('%20').length == 2 ? category.replace('%20','') : category)
    }else{
      setValue("All")
    }
  })
  

  async function getItems() {
    const res = await fetch(
      "https://oudaroma-backend.onrender.com/item/get-all-items",
      { method: "GET" }
    );
    const itemsJson = await res.json();
    dispatch(setItems(itemsJson));
 
  }

  useEffect(()=>{
    getItems()
  },[])




  console.log(items)




  const topRatedItems = items.filter(
    (item) => Array.isArray(item.category) && item.category.includes("TopRated")
  );
  const newArrivalsItems = items.filter(
    (item) => Array.isArray(item.category) && item.category.includes("NewArrivals")
  );
  const bestSellersItems = items.filter(
    (item) => Array.isArray(item.category) && item.category.includes("BestSellers")
  );
  const UnisexItems = items.filter(
    (item) => Array.isArray(item.category) && item.category.includes("Unisex")
  );
  const MaleItems = items.filter(
    (item) => Array.isArray(item.category) && item.category.includes("Male")
  );
  const FemaleItems = items.filter(
    (item) =>Array.isArray(item.category) &&  item.category.includes("Female")
  );

  console.log(bestSellersItems)

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured {value.replace("%20"," ")} <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >

      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "All" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "NewArrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "BestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
            
          ))}
        {value === "TopRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Male" &&
          MaleItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Female" &&
          FemaleItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Unisex" &&
          UnisexItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
