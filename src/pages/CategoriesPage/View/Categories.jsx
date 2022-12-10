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
    <div>
      <h1>Kategoriler</h1>
      {categoriesLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div>categories is : {JSON.stringify(categories) ?? "null"}</div>
      )}

      {subcategoriesLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div>subcategories is : {JSON.stringify(subcategories) ?? "null"}</div>
      )}
    </div>
  );
}
