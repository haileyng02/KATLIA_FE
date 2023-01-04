import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Rate } from "antd";
import { StarOutlined } from "@ant-design/icons";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

const CustomerReviews = ({ id }) => {
  const { currentUser } = useSelector((state) => state.user);

  //Get feedbacks for product
  const getFeedbacksForProduct = async (id) => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.FEEDBACKS_FOR_PRODUCT(id), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getFeedbacksForProductParamsId(id),
      });
      console.log(result.data);
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
    if (currentUser) {
      getFeedbacksForProduct(id);
    }
  }, [currentUser, id]);

  return (
    <div className="px-[150px] mt-[60px]">
      <h1 className="text-[35px] leading-[44px] font-bold">CUSTOMER REVIEWS</h1>
      <div className="mt-[10px]">
        <div className="flex">
          <div>
            <div className="flex gap-x-[3px]">
              <h3 className="font-poppins font-bold text-[10px] text-[#9098B1]">
                4.5
              </h3>
              <p className="font-poppins text-[10px] text-[#9098B1]">
                {"(5 Review)"}
              </p>
            </div>
            <Rate defaultValue={3} character={<StarOutlined />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
