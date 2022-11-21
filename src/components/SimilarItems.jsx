import React, { useState, useEffect } from "react";
import ProductThumbnail from "../components/ProductThumbnail";
import * as routes from "../api/apiRoutes";
import appApi from "../api/appApi";

const SimilarItems = ({id}) => {
  const [items, setItems] = useState();

  //Get 4 Similar Items
  const get4SimilarItems = async () => {
    try {
      const data = await appApi.get(
        routes.GET_4SIMILAR_ITEMS(id),
        routes.get4SimilarItems(id)
      );
      console.log(data);
      setItems(data.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    get4SimilarItems();
  }, []);

  return (
    <div className="mt-[141px] px-[150px]">
      <h2
        className=" text-[35px] leading-[44px] font-bold"
      >
        SIMILAR ITEMS
      </h2>
      <div className="mt-[47px] grid grid-flow-col auto-cols-[29%] gap-x-[86px] overflow-x-auto pb-[53px]">
        {items?.map((item, i) => {
          return <ProductThumbnail item={item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default SimilarItems;
