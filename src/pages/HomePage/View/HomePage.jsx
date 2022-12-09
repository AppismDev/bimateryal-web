import React from "react";
import { useSelector } from "react-redux";
import HomePageCategories from "../../../components/HomePage/Categories/View/HomePageCategories";
import NewProducts from "../../../components/HomePage/NewProducts/View/NewProducts";
import PopularUsers from "../../../components/HomePage/PopularUsers/View/PopularUsers";
import { user } from "../../SignInPage/signInSlice";
const products = [
  {
    avatar:
      "https://productimages.hepsiburada.net/s/273/550/110000258934394.jpg/format:webp",
    date: "Joined in 2013",
    header: "Acer Aspire 3 A315-56-327T ",
    description:
      "Intel Core i3 1005G1 8GB 256GB SSD Freedos 15.6 FHD Taşınabilir Bilgisayar NX.HS5EY.006",
  },
  {
    avatar:
      "https://productimages.hepsiburada.net/s/125/222-222/110000075577551.jpg/format:webp",
    date: "Joined in 2013",
    header: "Ne İçin Varsan Onun İçin Yaşa",
    description: "Hikmet Anıl Öztekin",
  },
  {
    avatar:
      "https://productimages.hepsiburada.net/s/26/550/10164714111026.jpg/format:webp",
    date: "Joined in 2013",
    header: "Pilsan Bingo Kaydırak Seti",
    description: "Primary Contact",
  },
];

function HomePage() {
  const userValue = useSelector(user);
  return (
    <div className="home-page-container">
      <div>{
        JSON.stringify(userValue)
      }</div>
      <HomePageCategories />
      <PopularUsers />
      <NewProducts />
    </div>
  );
}

export default HomePage;
