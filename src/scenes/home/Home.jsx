import ShoppingList from "./ShoppingList";
import MainCarousel from "./MainCarousel.jsx";
import React from "react";

function Home() {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
    </div>
  );
}

export default Home;
