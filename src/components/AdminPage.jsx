import React, {useEffect, useState} from 'react'
import {storage} from '../firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import { useNavigate, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button } from '@mui/material';


const AdminPage = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState("");
    const [password, setPassword] = useState("")
    const [category, setCategory] = useState("Male");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("")
    const [imagesURLs, setImagesURLs] = useState([])
    const [allPerfumeData, setAllPerfumeData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [aboutText, setAboutText] = useState(
        `Perfume has a transformative quality that awakens something in all of us, from admiring the
        precious liquid inside the beautiful bottles, to an aroma that can teleport you to a time or
        place in an instant. "Perfume is the key to our memories" according to Kate Lord Brown,
        author of the book "The Perfume Garden".`
      );


      const [editable, setEditable] = useState(false);
      const handleTextChange = (e) => {
        setAboutText(e.target.value);
      };
      
      const handleUpdateAbout = () => {
        fetch('your_backend_endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ aboutText }),
        })
        .then((response) => {
          if (response.ok) {
            console.log('About Us text updated successfully!');
            // Perform any additional actions upon successful update
          } else {
            console.error('Failed to update About Us text');
            // Handle the failed update scenario
          }
        })
        .catch((error) => {
          console.error('Error updating About Us text:', error);
          // Handle errors from the API call
        })
        .finally(() => {
          // Set editable back to false after updating
          setEditable(false);
        });
      };
      


    const items = useSelector((state) => state.cart.items);

    console.log(items)

    const getAllPerfume = async () =>{
        const res = await fetch('https://oudaroma-backend-server.onrender.com/item/get-all-items',{
            method:"GET"
        })
        
        const data = await res.json()
        setAllPerfumeData(data);
        
    }

    useEffect(()=>{
        getAllPerfume()
    },[])

    const filteredPerfumes = allPerfumeData.filter((perfume) =>
    perfume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


    console.log(allPerfumeData)

    const uploadPerfume = (e) =>{
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

        alert("All Images Uploaded Successfully")
    }


    const addPerfumtToDB =  (e) => {
        e.preventDefault()
        
        if(password.toString() === "123")
        {
            fetch(`https://oudaroma-backend-server.onrender.com/item/add-item`,{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name:name,
                    image:imagesURLs,
                    price:price,
                    category:category,
                    shortDescription:shortDescription,
                    longDescription:longDescription
                })
            }).then((res)=>{
                console.log(res)
                if(res.status == 200){
                    navigate('/')
                }
            })
        }
    }


    const deletePerfume = async (itemId) => {
        try {
          const res = await fetch(`https://oudaroma-backend-server.onrender.com/item/delete-item`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id:itemId
            })
          });
      
          if (res.status === 200) {
          
            console.log(`Perfume with ID ${itemId} deleted successfully`);
            window.location.reload()
          } else {
            console.error(`Failed to delete perfume with ID ${itemId}`);
          }
        } catch (error) {
          console.error("Error deleting perfume:", error);
        }
      };
      

    console.log(imagesURLs)

  return (
    <div>
        <br/>
        <br/>
        <form onSubmit={(e)=>addPerfumtToDB(e)}>

        <div>
        <h1>Name:</h1>
        <input 
        type="text" 
        placeholder='enter name'
        onChange={(e)=>setName(e.target.value)}
        />
        </div>

        <div>
        <h1>Image:</h1>
        <input 
        type="file" 
        placeholder='enter name'
        multiple
        onChange={(e)=>setImages((prevFiles)=>[...prevFiles, ...e.target.files])}
        />
        <button onClick={(e)=>uploadPerfume(e)}>upload</button>
        </div>

        <div>
        <h1>Price:</h1>
        <input 
        type="text" 
        placeholder='enter price'
        onChange={(e)=>setPrice(e.target.value)}
        />
        </div>

        <div>
        <h1>Category:</h1>
        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Unisex">Unisex</option>
        <option value="New Arrivals">New Arrivals</option>
        <option value="Best Sellers">Best Sellers</option>
        <option value="Top Rated">Top Rated</option>
    </select>
        </div>

        <div>
        <h1>Short Description:</h1>
        <input 
        type="text" 
        placeholder='enter short description'
        onChange={(e)=>setShortDescription(e.target.value)}
        />
        </div>

        <div>
        <h1>Long Description:</h1>
        <input 
        type="text" 
        placeholder='enter short description'
        onChange={(e)=>setLongDescription(e.target.value)}
        />
        </div>

        


        <div>
            <h1>Password</h1>
            <input
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            />
        </div>

        <div>
            <button type="submit">
                Submit
            </button>
        </div>
        </form>

        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Delete Product</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {filteredPerfumes.map((perfume) => (
          <div key={perfume._id} style={{ marginBottom: '10px' }}>
            <p>{perfume.name}</p>
            <button onClick={() => deletePerfume(perfume._id)}>Delete</button>
            <p>  </p>
            <button onClick={() => {navigate(`/edit-perfume/${perfume._id}`)}}>Edit</button>
            
          </div>
        ))}
      </div>
            </div>


            
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' }}>
        <h2>Edit About Us</h2>
        {!editable ? (
          <div>
            <Typography variant="body1" textAlign="justify">
              {aboutText}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setEditable(true)}>
              Edit
            </Button>
          </div>
        ) : (
          <div>
            <TextField
              multiline
              value={aboutText}
              onChange={handleTextChange}
              variant="outlined"
              fullWidth
              rows={6}
            />
            <Button variant="contained" color="primary" onClick={handleUpdateAbout}>
              Save
            </Button>
          </div>
        )}
      </div>


    </div>
  )
}

export default AdminPage