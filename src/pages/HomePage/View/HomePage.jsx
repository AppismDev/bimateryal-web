import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
