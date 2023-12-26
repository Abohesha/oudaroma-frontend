// AppContext.js

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [about, setAbout] = useState("")
  const [announcement, setAnnouncement] = useState("hi this is announcement");
  const [giftCards, setGiftCards] = useState([
    {
      picture: 'gift_card_1.png',
      text: 'Gift Card 1',
    },
    {
      picture: 'gift_card_2.png',
      text: 'Gift Card 2',
    },
  ]);
  
  const updateAbout = (newAbout) => {
    setAbout(newAbout);
  };

  const updateAnnouncement = (newAnnouncement) => {
    setAnnouncement(newAnnouncement);
  };

  const updateGiftCards = (newGiftCards) => {
    setGiftCards(newGiftCards);
  };

  return (
    <AppContext.Provider
      value={{
        about,
        announcement,
        giftCards,
        updateAbout,
        updateAnnouncement,
        updateGiftCards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
