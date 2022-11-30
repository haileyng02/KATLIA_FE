import React from "react";
import { useNavigate } from 'react-router-dom'
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const FeaturedThumbnail = ({item,container='',image=''}) => {
  const navigate = useNavigate();

  const handleOnClick = (product) => {
    navigate(`/product/${product.id}`, { state: product.id });
  };
  return (
    <div
      className={`${container} hover:cursor-pointer`}
      onClick={() => handleOnClick(item)}
    >
      <div className="home__for-men">
        <img
          src={item.image}
          alt="Men Featured"
          className={`${image} featured-image`}
        />
      </div>
      <h5 className="featured-title">{capitalizeFirstLetter(item.name)}</h5>
    </div>
  );
};

export default FeaturedThumbnail;
