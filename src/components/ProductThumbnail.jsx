import React from "react";
import { Link } from "react-router-dom";

const ProductThumbnail = ({ item, imageCustom='', custom='' }) => {
  return (
    <Link to={`/product/${item.id}`} state={item.id} className={custom}>
      <div className="h-full">
        <img
          src={item.image}
          alt="Item"
          className={`aspect-[2/3] object-cover object-center ${imageCustom}`}
        />
        <div className={`mt-[23px] leading-6 ${imageCustom} max-h-fit`}>
          {item.colorNumber === 1 || (
            <p>{"+" + (item.colorNumber - 1) + " COLOURS"}</p>
          )}
          <h2 className="product-name">{item.name}</h2>
          {item.salePrice ? (
            <div className="between-row justify-end">
              <p className="text-primary">{item.salePrice + "$"}</p>
              <p className="text-[#817575] line-through">{item.price + "$"}</p>
            </div>
          ) : (
            <p style={{ color: "rgba(200, 90, 39, 0.57)" }}>
              {item.price + " $"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductThumbnail;
