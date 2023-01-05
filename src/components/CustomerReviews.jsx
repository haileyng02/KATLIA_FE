import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import FeedbackCategory from "./FeedbackCategory";
import FeedbackContainer from "./FeedbackContainer";

const CustomerReviews = ({ id }) => {
  const [data, setData] = useState();
  const [feedbacks, setFeedbacks] = useState();
  const [currFilter, setCurrFilter] = useState("All");

  const filters = [
    { title: "All" },
    {
      title: "5 Star",
      value: data?.rate5,
    },
    {
      title: "4 Star",
      value: data?.rate4,
    },
    {
      title: "3 Star",
      value: data?.rate3,
    },
    {
      title: "2 Star",
      value: data?.rate2,
    },
    {
      title: "1 Star",
      value: data?.rate1,
    },
    {
      title: "With Comments",
      value: data?.withCmt,
    },
    {
      title: "With Media",
      value: data?.withMedia,
    },
  ];

  //Get feedbacks for product
  const getFeedbacksForProduct = async (id) => {
    try {
      const result = await appApi.get(routes.FEEDBACKS_FOR_PRODUCT(id), {
        ...routes.getFeedbacksForProductParamsId(id),
      });
      console.log(result.data);
      setData(result.data);
      setFeedbacks(result.data.feedbacks);
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
    getFeedbacksForProduct(id);
  }, [id]);

  useEffect(() => {
    if (!data) return;
    switch (currFilter) {
      case "All":
        setFeedbacks(data.feedbacks);
        break;
      case "5 Star":
        setFeedbacks(data.feedbacks.filter((value) => value.rate === 5));
        break;
      case "4 Star":
        setFeedbacks(data.feedbacks.filter((value) => value.rate === 4));
        break;
      case "3 Star":
        setFeedbacks(data.feedbacks.filter((value) => value.rate === 3));
        break;
      case "2 Star":
        setFeedbacks(data.feedbacks.filter((value) => value.rate === 2));
        break;
      case "1 Star":
        setFeedbacks(data.feedbacks.filter((value) => value.rate === 1));
        break;
      case "With Comments":
        setFeedbacks(data.feedbacks.filter((value) => value.comment));
        break;
      case "With Media":
        setFeedbacks(data.feedbacks.filter((value) => value.photo));
        break;
      default:
        break;
    }
  }, [currFilter]);

  return (
    <div className="px-[150px] mt-[200px]">
      <h1 className="text-[35px] leading-[44px] font-bold">CUSTOMER REVIEWS</h1>
      {/* General */}
      <div className="mt-[40px] py-[22px] pl-[50px] pr-[40px] bg-[#9098B12B] rounded-10">
        <div className="between-row">
          {/* Rate Average */}
          <div>
            <div className="flex gap-x-[3px]">
              <h3 className="font-poppins font-bold text-[11px] text-[#9098B1]">
                {data?.overall?._avg?.rate?.toFixed(1)}
              </h3>
              <p className="font-poppins text-[11px] text-[#9098B1]">
                {`(${data?.overall?._count || 0} Reviews)`}
              </p>
            </div>
            <Rate
              value={data?.overall?._avg?.rate?.toFixed(1)}
              allowHalf
              disabled
              className="flex-none shrink-0"
            />
          </div>
          {/* Category */}
          <div className="row justify-end gap-x-[2.5%] w-full">
            {filters.map((filter, i) => (
              <FeedbackCategory
                key={i}
                {...filter}
                setCurrFilter={setCurrFilter}
                currFilter={currFilter}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Feedbacks */}
      <FeedbackContainer feedbacks={feedbacks} />
    </div>
  );
};

export default CustomerReviews;
