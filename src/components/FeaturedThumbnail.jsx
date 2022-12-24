import React from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const FeaturedThumbnail = ({ item, container = "", image = "" }) => {
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
        {item ? (
          <img
            src={item?.image}
            alt="Men Featured"
            className={`${image} featured-image`}
          />
        ) : (
          <Skeleton.Image active className={`w-full h-full ${image} featured-image`} style={{width:'100%',height:'100%'}}/>
        )}
      </div>
      {item ? <h5 className="featured-title">{capitalizeFirstLetter(item?.name)}</h5> : <Skeleton active className="mt-4"/>}
    </div>
  );
};

export default FeaturedThumbnail;
