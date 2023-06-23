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
        <Link to="/newMaterials">Tümünü Gör</Link>
      </div>
      {isLoading ? (
        <div className="home-page-new-products-loading">Yükleniyor...</div>
      ) : (
        <div className="home-page-new-products-content">
          {products &&
            products.map((product) => (
              <MaterialCard material={product} />
              // <Link
              //   to="/product/details"
              //   className="home-page-new-products-item"
              // >
              //   <img
              //     className=""
              //     src={product.coverImageUrl}
              //     alt={product.name}
              //   />
              //   <div className="home-page-new-products-item-content">
              //     <h3 className="home-page-new-products-item-content-title">{product.name}</h3>
              //     <p className="home-page-new-products-item-content-subtitle">{product.description}</p>
              //   </div>
              // </Link>
            ))}
        </div>
      )}
    </div>
  );
}
