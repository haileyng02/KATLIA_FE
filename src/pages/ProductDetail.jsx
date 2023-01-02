import React from "react";
import { useParams } from "react-router-dom";
import SimilarItems from "../components/SimilarItems";
import MainProductContainer from "../components/product-detail/MainProductContainer";
import CustomerReviews from "../components/CustomerReviews";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className=" pt-[71px] font-inter">
      <MainProductContainer id={id}/>
      <CustomerReviews/>
      <hr className="black-line w-[50%] mt-[274px]" />
      {/* SIMILAR ITEMS */}
      <SimilarItems id={id} />
    </div>
  );
};

export default ProductDetail;
