import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import AboutUs from './components/AboutUs';
import GiftCards from "./components/GiftCards.jsx";
import AdminPage from "./components/AdminPage";
import Footer from "./scenes/global/Footer.jsx";
import CartMenu from "./scenes/global/CartMenu";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import ContactComponent from "./components/ContactComponent.jsx"; 
import EditPerfume from "./components/EditPerfume.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-rasha-123456789" element={<AdminPage/>} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="/edit-perfume/:perfume_id" element={<EditPerfume />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
          <Route path="/Contact" element={<ContactComponent />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/GiftCards" element={<GiftCards />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;