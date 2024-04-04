import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from '../theme';
import { addToCart } from '../state';
import { useDispatch } from 'react-redux';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useLocation } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import { TextField } from '@mui/material'; 
import { useNavigate } from 'react-router-dom'; 
import {storage} from '../firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'

const EditPerfume = () => {
    const {perfume_id} = useParams()

    const location = useLocation()
    const imageId = location.pathname.split('/')[2]
    const [value, setValue] = useState("description");
    const dispatch = useDispatch();

    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [forceRerender, setForceRerender] = useState(false);

    const [name, setName] = useState("");
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Male");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("")
    const [imagesURLs , setImagesURLs] = useState([]);

    const navigate = useNavigate()

    const uploadPerfumeImage = (e) =>{
      e.preventDefault()

      for(let i=0; i < images.length; i++)
      {
          const imageRef = ref(storage, `${images[i].name + v4()}`)
          uploadBytes(imageRef, images[i]).then((snapshot)=>{
              getDownloadURL(snapshot.ref).then((url)=>{
                  setImagesURLs((prev)=>[...prev, url])
              })
          })

      }
      console.log(imagesURLs)
      alert("All Images Uploaded Successfully")
  }

   const addImageToItem = async (index , perfume_id) => {
      const res = await fetch(`http://localhost:8000/item/add-image/${perfume_id}`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: index }),
      });
  
      const data = await res.json();
      console.log(data);
  };

  const deleteImageFromItem = async (imageIndex) => {
    try {
        console.log('Deleting image at index:', imageIndex);
        const res = await fetch(`http://localhost:8000/item/delete-image/${perfume_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageIndex: imageIndex }),
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Image deleted successfully:', data);
            console.log('Updated images state:', data.image);
        } else {
            console.error('Failed to delete image');
        }
    } catch (error) {
        console.error('Error deleting image:', error);
    }
};



const handleDeleteImage = async (index) => {
  try {
      await deleteImageFromItem(index);
      setForceRerender(!forceRerender);
  } catch (error) {
      console.error('Error deleting image:', error);
  }
};

const handleaddedImage = async (index, perfume_id) => {
  try {
    await addImageToItem(index, perfume_id);
    console.log("added new Image");
  } catch (error) {
    console.error('Error adding image:', error);
  }
};


    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    console.log(perfume_id)

    async function getItem() {
        const res = await fetch(
          `https://oudaroma-backend-server.onrender.com/item/get-item-by-id/${perfume_id}`,
          {
            method: "GET",
          }
        );
        const itemJson = await res.json();
        console.log(itemJson)
        setItem(itemJson)
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

      }, [perfume_id]); // eslint-disable-line react-hooks/exhaustive-deps
    
      const handleCategoryChange = (e) =>{
        setCategory(e.target.value)
        console.log(e.target.value)
      }

      const editPerfumeInDB = async () => {
        const res = await fetch('https://oudaroma-backend-server.onrender.com/item/edit-item-by-id', {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: item._id,
            name: name.length > 0 ? name : item.name,
            price: price.length > 0 ? price : item.price,
            longDescription: longDescription.length > 0 ? longDescription : item.longDescription,
            shortDescription: shortDescription.length > 0 ? shortDescription : item.shortDescription
          })
        });
      
        const data = await res.json();
        console.log(data);
      
        setName(data.name);
        setPrice(data.price);
        setLongDescription(data.longDescription);
        setShortDescription(data.shortDescription);
      
        navigate('/');
      };
      
      

    return (
        <Box width="80%" m="80px auto">
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* IMAGES */}
          <Box flex="1 1 40%" mb="40px">
          <Carousel key={forceRerender}
          NavigateNextIcon={<NavigateNextIcon/>}
          NavigateBeforeIcon={<NavigateBeforeIcon/>}
          >
            {
              item?.image?.map((img,i)=>(     
                
                <div key={i} style={{ position: 'relative' }}>
                <img
                    alt={item?.name}
                    width="90%"
                    height="90%"
                    src={img}
                    style={{ objectFit: 'contain' }}
                />
                <button
                 
                    onClick={() => handleDeleteImage(i)}
                >
                    Delete the image
                </button>
            </div>
              ))}
  
          </Carousel>

          {item?.image && item.image.length === 0 && (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleaddedImage(e.target.files[0] , perfume_id)}
    />
     )}<button onClick={uploadPerfumeImage}>Add Image</button>
          </Box>  
          {/* ACTIONS */}
          <Box flex="1 1 50%" mb="10px">
            <Box display="flex" justifyContent="space-between">
            </Box>

            <TextField
              id="outlined-multiline-static"
              label="Input Name Here"
              multiline
              rows={2} // Set the number of visible rows
              
              placeholder="Enter long description text here..."
              variant="outlined"
              onChange={(e)=>setName(e.target.value)}
              style={{ fontSize: '18px', width: '100%' }} // Customize the font size and width
            />

            <Box m="65px 0 25px 0">
              <Typography variant="h3">

              </Typography>
              <Typography>Price: HUF  
                <input
                type="text"
                onChange={(e)=>setPrice(e.target.value)}
                />
              </Typography>
              <Typography sx={{ mt: "20px" }}>
               {/* {item?.shortDescription}*/}
              </Typography>
            </Box>
            <Box>
              <Box m="20px 0 5px 0" display="flex">
                <FavoriteBorderOutlinedIcon />
                <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
              </Box>
              <Typography>CATEGORIES: 

              <select value={category} onChange={handleCategoryChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Best Sellers">Best Sellers</option>
                    <option value="Unisex">Unisex</option>
                    <option value="New Arrivals">New Arrivals</option>
            </select>

              </Typography>
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
            <Box maxWidth="800px" margin="0 auto" padding="20px">
            <TextField
              id="outlined-multiline-static"
              label="Input Long Description Here"
              multiline
              rows={10} // Set the number of visible rows
              
              placeholder="Enter long description text here..."
              variant="outlined"
              onChange={(e)=>setLongDescription(e.target.value)}
              style={{ fontSize: '18px', width: '100%' }} // Customize the font size and width
            />
            <TextField
              id="outlined-multiline-static"
              label="Input Short Description Here"
              multiline
              rows={10} // Set the number of visible rows
              
              placeholder="Enter short description text here..."
              variant="outlined"
              onChange={(e)=>setShortDescription(e.target.value)}
              style={{ fontSize: '18px', width: '100%' }} 
            />
          </Box>
          )}
          {value === "reviews" && <div>reviews</div>}
        </Box>
        
        <button
        onClick={editPerfumeInDB}
        >
            Save
        </button>

      </Box>
  )
}

export default EditPerfume