import React from "react";
import { useParams } from "react-router-dom";
import SimilarItems from "../components/SimilarItems";
import * as routes from "../api/apiRoutes";
import appApi from "../api/appApi";
import MainProductContainer from "../components/product-detail/MainProductContainer";

const ProductDetail = () => {
  const { id } = useParams();

  // Add Item To Cart
  const addItemToCart = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzYyOTE2NTNkMzEwMjdmMjNiYWVkMTMiLCJlbWFpbCI6InNhb3ZheXRhMjEzMUBnbWFpbC5jb20iLCJpYXQiOjE2Njg3NjAzMDIsImV4cCI6MTY2ODg0NjcwMn0.6G5Tk78A_7EgslAw4yfslOC29Zf_ZypGd5dr2jIidbk";

      await appApi.post(
        routes.ADD_ITEM_TO_CART,
        routes.getAddCartBody(617171, 5, "M", 2),
        routes.getAccessTokenHeader(token)
      );
      console.log("Success");
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

  return (
    <div className=" pt-[71px] font-inter">
      <MainProductContainer id={id}/>
      <hr className="black-line w-[50%] mt-[274px]" />
      {/* SIMILAR ITEMS */}
      <SimilarItems id={id} />
    </div>
  );
};

export default ProductDetail;
