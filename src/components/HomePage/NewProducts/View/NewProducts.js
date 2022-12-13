import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewMaterialsAsync } from "../newProductsSlice";
import {
  selectNewProducts,
  selectNewProductsLoading,
} from "../newProductsSlice";

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
            products.map((product) => (
              <Link
                to="/product/details"
                className="home-page-new-products-item"
              >
                <img
                  className=""
                  src={product.coverImageUrl}
                  alt={product.name}
                />
                <div className="home-page-new-products-item-content ">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
