import React from "react";
import { Link } from "react-router-dom";
const categories = [
  {
    categoryImage: "https://cdn-icons-png.flaticon.com/512/1903/1903162.png",
    categoryName: "Kitap",
    categoryDescription: "Okuma Kitapları",
  },
  {
    categoryImage: "https://cdn-icons-png.flaticon.com/512/1903/1903162.png",
    categoryName: "Elektronik",
    categoryDescription: "Çalışır durumdaki cihazlar",
  },
  {
    categoryImage: "https://cdn-icons-png.flaticon.com/512/1903/1903162.png",
    categoryName: "Kırtasiye",
    categoryDescription: "Eğitim Materyalleri",
  },
  {
    categoryImage: "https://cdn-icons-png.flaticon.com/512/1903/1903162.png",
    categoryName: "Kitap",
    categoryDescription: "Sağlam durumdaki oyuncaklar",
  },
  {
    categoryImage: "https://cdn-icons-png.flaticon.com/512/1903/1903162.png",
    categoryName: "Kitap",
    categoryDescription: "Sağlam durumdaki oyuncaklar",
  },
];

export default function HomePageCategories() {
  return (
    <div className="home-page-category">
      <div className="home-page-category-header">
        <h2>Popüler Kategoriler</h2>
        <Link to="/">Tümünü Gör</Link>
      </div>
      <div className="home-page-category-content">
        {categories.map((category) => (
          <div className="home-page-category-item">
            <img src={category.categoryImage} alt="categoryImage" />
            <div className="home-page-category-item-content">
              <div className="home-page-category-item-content-title">
                {category.categoryName}
              </div>
              <div className="home-page-category-item-content-subtitle">
                {category.categoryDescription}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
