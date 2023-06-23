import React, { useEffect } from "react";
import {
  categoriesSelector,
  categoriesLoadingSelector,
  getCategoriesAsync,
  getSubCategoriesAsync,
  subcategoriesLoadingSelector,
  subcategoriesSelector,
} from "../../CategoriesPage/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const categoriesLoading = useSelector(categoriesLoadingSelector);

  const subcategories = useSelector(subcategoriesSelector);
  const subcategoriesLoading = useSelector(subcategoriesLoadingSelector);

  useEffect(() => {
    if (categoriesLoading) return;
    if (categories && categories.length > 0) return;
    dispatch(getCategoriesAsync());
  }, []);

  useEffect(() => {
    if (subcategoriesLoading) return;
    if (subcategories && subcategories.length > 0) return;

    dispatch(getSubCategoriesAsync());
  }, []);

  return (
    <div className="categories-page-root">
      {categoriesLoading || subcategoriesLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="categories-page-content-grid">
          {categories.map((category) => {
            return (
              <Link
                to={`/categoryMaterials?id=${category.categoryId}&name=${category.categoryName}`}
                className="categories-page-category-container"
                key={category.id}
              >
                <div className="categories-category-row">
                  <img
                    src={category.categoryIconUrl}
                    alt={category.categoryName}
                    className="categories-page-category-container-image"
                  />
                  <h2>{category.categoryName}</h2>
                </div>
                {subcategories.filter(
                  (subcategory) =>
                    subcategory.categoryId === category.categoryId
                ).length > 0 ? (
                  <div className="categories-page-category-container-list">
                    {subcategories
                      .filter(
                        (subcategory) =>
                          subcategory.categoryId === category.categoryId
                      )
                      .map((subcategory) => {
                        return (
                          <Link
                            to={`/categoryMaterials?id=${subcategory.id}&name=${subcategory.name}&type=subcategory`}
                            className="categories-subcategory-item"
                            key={subcategory.categoryId}
                          >
                            <img
                              className="categories-page-subcategory-image"
                              src={`${subcategory.icon}`}
                            />
                            <div>{subcategory.name}</div>
                          </Link>
                        );
                      })}
                  </div>
                ) : (
                  <p>Bu kategori altında alt kategori bulunmamaktadır.</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
