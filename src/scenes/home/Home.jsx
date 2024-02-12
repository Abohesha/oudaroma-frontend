import Announcement from "../../components/Announcement.jsx";
import ShoppingList from "./ShoppingList";
import MainCarousel from "./MainCarousel.jsx";
import React, { useState , useEffect } from "react";
import '../home/Home.css'

function Home() {
  const [announcementData, setAnnouncementData] = useState({});

  const getAnnouncementData = async () => {
    const res = await fetch("https://oudaroma-backend-server.onrender.com/utils/get-utils", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    const data = await res.json();
    setAnnouncementData(data.announcement);
  };

  useEffect(() => {
    getAnnouncementData();
  }, []);

  return (
    <div className="home">
      <MainCarousel /> 
      <Announcement text={announcementData.text} pic={announcementData.pic} />
      <div className="running-stripe"></div>
      <ShoppingList />
     
    </div>
  );
}

export default Home;