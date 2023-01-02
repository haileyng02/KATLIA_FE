import React from "react";
import { Rate } from "antd";
import { StarOutlined } from '@ant-design/icons';

const CustomerReviews = () => {
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
            <Rate
              defaultValue={3}
              character={<StarOutlined />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
