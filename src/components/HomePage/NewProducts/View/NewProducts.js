import React from "react";
import { Link } from "react-router-dom";
const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    description: "Product 1 (100TL)",
    image:
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    description: "Product 2 (200TL)",
    image:
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    description: "Product 3 (300TL)",
    image:
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: 400,
    description: "Product 4 (400TL)",

    image:
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
  },
  {
    id: 5,
    name: "Product 5",
    price: 500,
    description: "Product 5 (500TL)",
    image:
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
  },
  {
    id: 6,
    name: "Product 6",
    price: 600,
    description: "Product 6 (600TL)",
    image:
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
  },
  {
    id: 7,
    name: "Product 7",
    price: 700,
    description: "Product 7 (700TL)",
    image:
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
  },
  {
    id: 8,
    name: "Product 8",
    price: 800,
    description: "Product 8 (800TL)",
    image:
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
  },
  {
    id: 9,
    name: "Product 9",
    price: 900,
    description: "Product 9 (900TL)",
    image:
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
  },
  {
    id: 10,

    name: "Product 10",
    price: 1000,
    description: "Product 10 (1000TL)",
    image:
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
  },
];

export default function NewProducts() {
  return (
    <div className="home-page-new-products">
      <div className="home-page-new-products-header">
        <h2>Yeni Ürünler</h2>
        <Link to="/">Tümünü Gör</Link>
      </div>
      <div className="home-page-new-products-content">
        {products.map((product) => (
          <Link to="/product/details" className="home-page-new-products-item">
            <img className="" src={product.image} alt={product.name} />
            <div className=".home-page-new-products-item-content ">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
