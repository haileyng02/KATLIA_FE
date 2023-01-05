import React from "react";
import { Rate } from "antd";
import dayjs from "dayjs";
import defaultAva from "../images/feedback-default-ava.svg"

const transparent =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png";

const Feedback = ({ feedback }) => {
  return (
    <div className="row justify-between gap-x-[7%]">
      {/* User */}
      <div className="row gap-x-[20px]">
        {/* Avatar */}
        <img
          src={feedback.ava || defaultAva}
          alt="Avatar"
          className="h-12 w-12 rounded-full object-cover object-center"
        />
        {/* Rate */}
        <div>
          <h3 className="font-inter font-medium text-[14px]">{feedback.username}</h3>
          <Rate value={feedback.rate} allowHalf disabled />
          <p className="font-inter text-[11px] text-[#9098B1] mt-[10px]">
            {dayjs(feedback.date).format("MMMM D, YYYY")}
          </p>
        </div>
      </div>
      {/* Comment */}
      <p className="font-inter text-[12px] text-[#9098B1] flex-1">
        {feedback.comment}
      </p>
      {/* Image */}
      <img
        src={feedback.photo || transparent}
        alt="Product"
        className="w-[72px] h-[72px] object-cover object-center"
      />
    </div>
  );
};

export default Feedback;
