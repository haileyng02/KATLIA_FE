import React from "react";
import { useNavigate } from 'react-router-dom'

const FeaturedThumbnail = ({item,container='',image=''}) => {
  const navigate = useNavigate();

  const handleOnClick = (product) => {
    navigate(`/product/${product.id}`, { state: product });
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
      <h5 className="featured-title">{item.title}</h5>
    </div>
  );
};

export default FeaturedThumbnail;
