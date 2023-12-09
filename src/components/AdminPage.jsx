import React, {useEffect, useState} from 'react'
import {storage} from '../firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

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



    </div>
  )
}

export default AdminPage