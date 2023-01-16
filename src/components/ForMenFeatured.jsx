import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FeaturedThumbnail from "../components/FeaturedThumbnail";
import getTop4 from "../api/getTop4";
import forMenPic from "../images/home_for-men.png";

const ForMenFeatured = () => {
  const [items, setItems] = useState();
  const { menItems } = useSelector((state) => state.featured);
  const dispatch = useDispatch();

  useEffect(() => {
    if (menItems) {
      setItems(menItems);
    } else {
      getTop4("men", setItems,dispatch);
    }
  }, []);

  return (
    <div className="mt-[59px] px-[45px] relative pt-[130px]">
      {/* Title */}
      <img
        src={forMenPic}
        alt="FOR MEN"
        className="absolute top-0 left-[202px] w-[234px] h-[156px]"
      />
      {/* Featured */}
      <div className="flex justify-between">
        <FeaturedThumbnail
          item={items && items[0]}
          container="basis-[20.4%] mt-[132px]"
          image="aspect-[11/15]"
        />
        <FeaturedThumbnail
          item={items && items[1]}
          container="basis-[20.4%] mt-[132px]"
          image="aspect-[11/15]"
        />
        <FeaturedThumbnail
          item={items && items[2]}
          container="basis-[21.5%] self-start"
          image="aspect-square"
        />
        <FeaturedThumbnail
          item={items && items[3]}
          container="basis-[20.4%] mt-[145px]"
          image="aspect-[11/15]"
        />
      </div>
    </div>
  );
};

export default ForMenFeatured;
