import React from "react";

export default function MaterialCard(props) {
  return (
    <div className="home-page-new-products-item">
      <img
        className=""
        src={props.material.coverImageUrl}
        alt={props.material.name}
      />
      <div className="home-page-new-products-item-content ">
        <h3>{props.material.name}</h3>
        <p>{props.material.description}</p>
      </div>
    </div>
  );
}
