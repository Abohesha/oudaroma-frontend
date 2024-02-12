import React, {useEffect, useState} from 'react'
import {storage} from '../firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import { useNavigate, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {  TextField, Button } from '@mui/material';
import { Box, Typography, Card, CardMedia, CardContent, Modal, Backdrop } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

const AdminPage = () => {
    const navigate = useNavigate()
    const items = useSelector((state) => state.cart.items);

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
    const [aboutText, setAboutText] = useState("");

    const [aboutUsEditable, setAboutUsEditable] = useState(false);

    const [giftCards, setGiftCards] = useState([])
    const [isAddingGiftCard, setIsAddingGiftCard] = useState(false)
    const [giftCardEditable, setGiftCardEditable] = useState(false)
    const [isGiftCardPicUploaded, setIsGiftCardPicUploaded] = useState(false)

    const [giftCardInputs, setGiftCardInputs] = useState(giftCards.map(() => ({ name: '', description: '', pic: null, picURL:'' })));

    const [newGiftCardName, setNewGiftCardName] = useState('')
    const [newGiftCardDesc, setNewGiftCardDesc] = useState('')
    const [newGiftCardPic, setNewGiftCardPic] = useState('')
    const [newGiftCardPicURL, setNewGiftCardPicURL] = useState('')

    const [announcementEditable, setAnnouncementEditable] = useState(false)
    const [announcementText, setAnnouncementText] = useState()
    const [announcementPic, setAnnouncementPic] = useState()
    const [announcementPicURL, setAnnouncementPicURL] = useState()
    const [isAnnouncementPicUpload, setIsAnnouncementPicUploaded] = useState(false)


    const getAllPerfume = async () =>{
        const res = await fetch('https://oudaroma-backend-server.onrender.com/item/get-all-items',{
            method:"GET"
        })
        
        const data = await res.json()
        setAllPerfumeData(data);
        
    }

    useEffect(() => {
      getAboutUs();
      getGiftCards();
      getAnnouncement();
    }, []);
    

    useEffect(()=>{
        getAllPerfume()
    },[])

    const filteredPerfumes = allPerfumeData.filter((perfume) =>
    perfume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



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
        console.log(imagesURLs)
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
        setGiftCardInputs(data.giftcards.map(() => ({ name: '', description: '', pic: null, picURL:'' })))
      }
      
      
      const getAboutUs = async () =>{
  
        const res = await fetch("https://oudaroma-backend-server.onrender.com/utils/get-utils",{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
          }
        });
        const data = await res.json()
        setAboutText(data.about)
      }
  
const getAnnouncement = async () => {
  const res = await fetch("https://oudaroma-backend-server.onrender.com/utils/get-utils", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  const data = await res.json();

  const announcementText = data.announcement.text.replace(/\n/g, '<br>');
  setAnnouncementText(announcementText);
  setAnnouncementPic(data.announcement.pic);
};

useEffect(() => {
  getAboutUs();
  getGiftCards();
  getAnnouncement();
}, []);

  
      const handleAboutTextChange = (e) => {
        const newText = e.target.value.replace(/\n/g, '<br>');
        setAboutText(newText);
      };
      
      const handleUpdateAbout = async () => {
        const formattedText = aboutText;
      
        const res = await fetch('https://oudaroma-backend-server.onrender.com/utils/update-utils', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            about: formattedText,
          }),
        });
      
        const data = await res.json();
        await window.location.reload();
      };      
      

      const uploadPicToFirebaseAndSetGiftCard = (e, idx) =>{
        console.log(idx)
        e.preventDefault()
        const updatedInputs = [...giftCardInputs]
        
        console.log('updated inputs before upload:',updatedInputs)

        if(giftCardInputs[idx].pic){
          const imageRef = ref(storage, `${giftCardInputs[idx]?.pic?.name + v4()}`)
          uploadBytes(imageRef, giftCardInputs[idx]?.pic).then((snapshot)=>{
              getDownloadURL(snapshot.ref).then((url)=>{
                  updatedInputs[idx].picURL = url
              })
          })
        }
        setGiftCardInputs((prev)=>updatedInputs)
        setIsGiftCardPicUploaded(true)

        console.log('updated inputs after upload:',updatedInputs)

      }

      const handleGiftCardChange = (index, field, value) => {
        const updatedInputs = [...giftCardInputs];
        updatedInputs[index][field] = value;
        setGiftCardInputs(updatedInputs);
      };
      
    
      const handleCardEdit = async (giftcard, idx) =>{
    
        const copyGiftCards = await [...giftCards]

        console.log('gift cards before update', copyGiftCards)
        console.log('gift card to be updated: ', giftcard)

        const newGiftCard = {
          "name": giftCardInputs[idx].name,
          "description":giftCardInputs[idx].description,
          "pic": giftCardInputs[idx].picURL
        }

        const updatedGiftCards = await copyGiftCards.map((g, index)=>{
          return index === idx ? newGiftCard : g
        })
        
        console.log('updated gift card arr: ', updatedGiftCards)
        
        const res = await fetch('https://oudaroma-backend-server.onrender.com/utils/update-utils', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept":"application/json"
        },
        body: JSON.stringify({ 
          giftcards: updatedGiftCards
          }),
      })
      
        const data = await res.json()

        console.log(data)

        
      }

      const handleCardAdd = async () => {
        
        const newGiftCardMeta = {
          "name": newGiftCardName,
          "description": newGiftCardDesc,
          "pic": newGiftCardPicURL
        }

        const copyGiftCards = await [...giftCards]

        copyGiftCards.push(newGiftCardMeta)

        const res = await fetch('https://oudaroma-backend-server.onrender.com/utils/update-utils', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept":"application/json"
        },
        body: JSON.stringify({ 
          giftcards: copyGiftCards
          }),
      })
      
        const data = await res.json()

        console.log(data)
        await window.location.reload()
      }

      const handleCardDelete = async (giftcard, idx) => {
        
        const copyGiftCards = [...giftCards]

        const updatedGiftCards = copyGiftCards.splice(idx, 1)

        
        const res = await fetch('https://oudaroma-backend-server.onrender.com/utils/update-utils', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept":"application/json"
        },
        body: JSON.stringify({ 
          giftcards: updatedGiftCards
         }),
      })
      
        const data = await res.json()
        await window.location.reload()

        console.log(`Delete card: ${giftcard.name}`);
      };



      const handleAnnouncementTextChange = (e) => {
        const newText = e.target.value.replace(/\n/g, '<br>');
        setAnnouncementText(newText);
      };

      const uploadAnnouncementPicToFirebaseAndSet = (e) => {
        e.preventDefault();
      
        if (announcementPic) {
          const imageRef = ref(storage, `${announcementPic?.name + v4()}`);
          uploadBytes(imageRef, announcementPic).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              setAnnouncementPicURL(url);
            });
          });
        }
      
        setIsAnnouncementPicUploaded(true);
      };
    
      const handleUpdateAnnouncement = async () => {
        try {
          if (announcementPic) {
            const imageRef = ref(storage, `${announcementPic?.name + v4()}`);
            await uploadBytes(imageRef, announcementPic);
            const url = await getDownloadURL(imageRef);
            setAnnouncementPicURL(url);
          }
      
          const updatedAnnouncement = {
            text: announcementText,
            pic: announcementPicURL
          };
      
          const res = await fetch('https://oudaroma-backend-server.onrender.com/utils/update-utils', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              announcement: updatedAnnouncement
            }),
          });
      
          if (res.status === 200) {
            setIsAnnouncementPicUploaded(true);
            console.log('Announcement updated successfully.');
            await window.location.reload()
          } else {
            console.error('Failed to update announcement.');
          }
        } catch (error) {
          console.error('Error updating announcement:', error);
        }
      };
      

    
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
            <h2>Edit Perfume</h2>
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
        {!aboutUsEditable ? (
          <div>
            <Typography variant="body1" textAlign="justify">
              {aboutText}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setAboutUsEditable(true)}>
              Edit
            </Button>
          </div>
        ) : (
          <div>
            <TextField
              multiline
              value={aboutText}
              onChange={handleAboutTextChange}
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

      <div>
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap="20px" marginTop="40px">
        {giftCards.map((giftcard, idx)=>(

          <div>
          <Card key={giftcard.name} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={`${giftcard.pic}`}A
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

          <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={() => setGiftCardEditable(true)}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => handleCardDelete(giftcard, idx)}>
                Delete
              </Button>
          </Box>
        </Card>
        <Box>
        {giftCardEditable ? (
            <Box key={idx} display="flex" justifyContent="space-between" gap="20px">
              <TextField
                key={idx}
                multiline
                value={giftCardInputs[idx].name}
                onChange={(e)=>handleGiftCardChange(idx, 'name', e.target.value)}
                variant="outlined"
                fullWidth
                rows={1}
                placeholder='Gift Card Title...'
              />

              <TextField
               key={idx}
                multiline
                value={giftCardInputs[idx].description}
                onChange={(e)=>handleGiftCardChange(idx, 'description', e.target.value)}
                variant="outlined"
                fullWidth
                rows={1}
                placeholder='Gift Card Description...'
              />

              <input
              type="file"
              onChange={(e)=>handleGiftCardChange(idx, 'pic', e.target.files[0])}
              key={idx}
              />
              
              <Button key={idx} variant="contained" color="primary" onClick={(e)=>uploadPicToFirebaseAndSetGiftCard(e, idx)}>
                  Upload Pic 
              </Button>
              {isGiftCardPicUploaded ? (
                <div>
                <DoneIcon key={idx}/>
                </div>
              ):(
                <div></div>
              )}
              <Button key={idx} variant="contained" color="primary" onClick={(e)=>handleCardEdit(giftcard, idx)}>
                  Done
              </Button>
            </Box>
          ): (
            <div>
            </div>
          )}

        </Box>

        </div>       
        ))}

          <Box display="flex-row" justifyContent="space-between" marginTop="10px" onClick={()=>setIsAddingGiftCard(true)}>
            <Button variant="contained" color="primary" >
                    Add Gift Card
            </Button>
            {
              isAddingGiftCard ? (
                <div>
                  <TextField
                    multiline
                    value={newGiftCardName}
                    onChange={(e)=>setNewGiftCardName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    rows={1}
                    placeholder='Gift Card Title...'
                  />

                  <TextField
                    multiline
                    value={newGiftCardDesc}
                    onChange={(e)=>setNewGiftCardDesc(e.target.value)}
                    variant="outlined"
                    fullWidth
                    rows={1}
                    placeholder='Gift Card Description...'
                  />

                  <input
                    type="file"
                    onChange={(e)=>{setNewGiftCardPic(e.target.files[0])}}
                   
                  />

                <Button variant="contained" color="primary" onClick={(e)=>{
                    if(newGiftCardPic){
                      const imageRef = ref(storage, `${newGiftCardPic?.name + v4()}`)
                      uploadBytes(imageRef, newGiftCardPic).then((snapshot)=>{
                          getDownloadURL(snapshot.ref).then((url)=>{
                              setNewGiftCardPicURL(url)
                          })
                      })
                    }
                    setIsGiftCardPicUploaded(true)
                }}>
                  Upload Pic 
                </Button>
                {isGiftCardPicUploaded ? (
                  <DoneIcon/>
                ):(
                  <div>
                  </div>
                )}

                <Button variant="contained" color="primary" onClick={()=>handleCardAdd()}>
                  Add New Card
                </Button>


                </div>
              ):(
                <div>
                </div>
              )
            }
          
          </Box>
          
          </Box>
      

    </div>
      
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' }}>
          <h2>Edit Announcement</h2>
          {!announcementEditable ? (
          <div>
            <Typography variant="body1" textAlign="justify">
              {announcementText}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setAnnouncementEditable(true)}>
              Edit
            </Button>
          </div>
        ) : (
          <div>
            <TextField
              multiline
              value={announcementText}
              onChange={handleAnnouncementTextChange}
              variant="outlined"
              fullWidth
              rows={6}
            />

            <input
            type="file"
            onChange={(e)=>setAnnouncementPic(e.target.files[0])}
            />

            <Button variant="contained" color="primary" onClick={(e)=>uploadAnnouncementPicToFirebaseAndSet(e)}>
              Upload Pic
            </Button>
            {isAnnouncementPicUpload ? (
              <DoneIcon/>
            ):(
              <div>
              </div>
            )}
            <Button variant="contained" color="primary" onClick={(e)=>handleUpdateAnnouncement()}>
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage