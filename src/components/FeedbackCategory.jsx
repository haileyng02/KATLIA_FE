import React from "react";

const FeedbackCategory = ({ title, value, setCurrFilter, currFilter }) => {
  return (
    <div
      onClick={() => setCurrFilter(title)}
      className={`${
        title === currFilter ? "text-primary" : "text-black"
      } p-[10px] min-w-[70px] bg-white font-inter text-[11px] flex items-center justify-center cursor-pointer hover:text-primary`}
    >
      {value != null ? `${title} (${value})` : title}
    </div>
  );
};

export default FeedbackCategory;
