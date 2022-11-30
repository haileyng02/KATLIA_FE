import React, { useState, useEffect } from "react";
import FeaturedThumbnail from "../components/FeaturedThumbnail";
import getTop4 from "../api/getTop4";
import forWomenPic from "../images/home_for-women.png";

const ForWomenFeatured = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    getTop4("women", setItems);
  }, []);

  return (
    <div className="mt-[59px] px-[57px]">
      {/* Title */}
      <img
        src={forWomenPic}
        alt="FOR WOMEN"
        className="max-w-[333px] h-auto ml-[579px]"
      />
      {/* Featured */}
      {items && (
        <div className="flex justify-between mt-[89px]">
          <FeaturedThumbnail
            item={items[0]}
            container="basis-[20.74%]"
            image="aspect-[275/394]"
          />
          <FeaturedThumbnail
            item={items[1]}
            container="basis-[18.3%]"
            image="aspect-[243/315]"
          />
          <FeaturedThumbnail
            item={items[2]}
            container="basis-[23.8%]"
            image="aspect-[315/452]"
          />
          <FeaturedThumbnail
            item={items[3]}
            container="basis-[19.08%]"
            image="aspect-[253/404]"
          />
        </div>
      )}
    </div>
  );
};

export default ForWomenFeatured;
