import React from "react";
import { Link } from "react-router-dom";

export default function MaterialCard(props) {
  return (
    <Link
      to={{
        pathname: `/material/details/${props.material.id}`,
        state: { material: props.material },
      }}
      className="home-page-new-products-item"
    >
      <img
        className=""
        src={props.material.coverImageUrl}
        alt={props.material.name}
      />
      <div className="home-page-new-products-item-content">
        <h3 className="home-page-new-products-item-content-title">{props.material.name}</h3>
        <p className="home-page-new-products-item-content-subtitle">{props.material.description}</p>
      </div>
    </Link>
  );
}
