import React from "react";
import DropDownIcon from '../images/DropDown.svg'

const DropDownBox = ({title}) => {
  return (
    <div className="flex border-[0.5px] border-black py-[6px] px-2 rounded-[5px] w-[201px] justify-between">
      <h3>{title}</h3>
      <img src={DropDownIcon} alt="Drop down" className=" ml-4" />
    </div>
  );
};

export default DropDownBox;
