import React from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton, Tooltip } from "antd";
import transparent from "../images/transparent.png";

const MixItem = ({ item, loading }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <Tooltip title={item.name && !loading && "View product"}>
      <div
        onClick={item.name && !loading ? handleViewProduct : null}
        className="flex flex-col relative cursor-pointer"
      >
        <div className={`rounded-10 ${loading ? "bg-[#C4C4C4]" : "bg-[#F6F7F8]"}`}>
          <img
            src={item.url || transparent}
            alt="Product"
            className="aspect-[3/4] h-[35vh] object-cover object-center rounded-10"
          />
        </div>
        <div className="h-[27px] w-full px-1 bg-[#DE9C7D] rounded-10 flex items-center justify-center absolute -bottom-[14px]">
          <p className="text-[15px] text-white truncate">
            {item.name && !loading ? item.name.toUpperCase() : ""}
          </p>
        </div>
      </div>
    </Tooltip>
  );
};

export default MixItem;
