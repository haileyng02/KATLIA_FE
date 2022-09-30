import React from "react";
import DropDownBox from "./DropDownBox";
import DropDownIcon from "../images/DropDown.svg";
import CloseIcon from "../images/CloseOutlined.svg"

const ProductsContainer = () => {
  return (
    <div style={{ flex: 1 }} className="leading-[25px] ml-[67px]">
      {/* Items found and sort */}
      <div className="flex justify-between items-center">
        <p className="">22 items found</p>
        <div className="flex border-[0.5px] border-black py-[6px] px-2 rounded-[5px]">
          <h3>Sort by:</h3>
          <p className="text-[#F9AF5E] ml-2 sort-outline">Popular</p>
          <img src={DropDownIcon} alt="Drop down" className=" ml-4" />
        </div>
      </div>
      <hr className="black-line opacity-40 mt-[6px]" />
      {/* Filter */}
      <div className="flex mt-[23px] justify-between">
        <div className="flex gap-x-[49px]">
          <DropDownBox title="Color" />
          <DropDownBox title="Size" />
          <DropDownBox title="Prize" />
        </div>
        {/* Reset Filter */}
        <div className="flex border-[0.5px] border-black py-[6px] px-2 rounded-[5px] w-[160px] justify-between">
          <h3>Reset Filter</h3>
          <img src={CloseIcon} alt="Close"/>
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;
