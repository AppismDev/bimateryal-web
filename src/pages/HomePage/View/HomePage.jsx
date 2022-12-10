import React, { useEffect } from "react";
import HomePageCategories from "../../../components/HomePage/Categories/View/HomePageCategories";
import NewProducts from "../../../components/HomePage/NewProducts/View/NewProducts";
import PopularUsers from "../../../components/HomePage/PopularUsers/View/PopularUsers";

function HomePage() {
  return (
    <div className="home-page-container">
      <HomePageCategories />
      <PopularUsers />
      <NewProducts />
    </div>
  );
}

export default HomePage;
