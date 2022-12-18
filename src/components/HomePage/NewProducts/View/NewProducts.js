import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewMaterialsAsync } from "../newProductsSlice";
import {
  selectNewProducts,
  selectNewProductsLoading,
} from "../newProductsSlice";
import MaterialCard from "../../../Material/MaterialCard/View/MaterialCard";

export default function NewProducts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectNewProductsLoading);
  const products = useSelector(selectNewProducts);
  useEffect(() => {
    dispatch(getNewMaterialsAsync());
  }, []);

  return (
    <div className="home-page-new-products">
      <div className="home-page-new-products-header">
        <h2>Yeni Ürünler</h2>
        <Link to="/">Tümünü Gör</Link>
      </div>
      {isLoading ? (
        <div className="home-page-new-products-loading">Yükleniyor...</div>
      ) : (
        <div className="home-page-new-products-content">
          {products &&
            products.map((product) => <MaterialCard material={product} />)}
        </div>
      )}
    </div>
  );
}
