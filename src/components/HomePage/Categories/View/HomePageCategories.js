import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getTopFiveCategoriesAsync,
  selectTopFiveCategories,
  selectTopFiveCategoriesLoading,
} from "../homePageCategoriesSlice";

export default function HomePageCategories() {
  const dispatch = useDispatch();
  const topFiveCategories = useSelector(selectTopFiveCategories);
  const loadingState = useSelector(selectTopFiveCategoriesLoading);
  useEffect(() => {
    if (topFiveCategories.length === 0 && !loadingState) {
      dispatch(getTopFiveCategoriesAsync());
      // toast.promise(dispatch(getTopFiveCategoriesAsync()), {
      //   pending: "Kategoriler yükleniyor...",
      //   success: "Kategoriler yüklendi.",
      //   error: "Kategoriler yüklenemedi.",
      // });
    }
  }, []);

  return (
    <div className="home-page-category">
      <div className="home-page-category-header">
        <h2>Popüler Kategoriler</h2>
        <Link to="/">Tümünü Gör</Link>
      </div>
      {loadingState && <h3>Kategoriler yükleniyor...</h3>}
      {!loadingState && topFiveCategories.length === 0 && (
        <h3>Kategori Bulunamadı.</h3>
      )}
      <div className="home-page-category-content">
        {topFiveCategories.map((category) => (
          <div className="home-page-category-item">
            <img src={category.categoryIconUrl} alt="categoryImage" />
            <div className="home-page-category-item-content">
              <div className="home-page-category-item-content-title">
                {category.categoryName}
              </div>
              <div className="home-page-category-item-content-subtitle">
                {category.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
