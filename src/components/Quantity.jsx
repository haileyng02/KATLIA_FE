import React from "react";
import MinusIcon from "../images/MinusIcon.svg";
import PlusIcon from "../images/PlusIcon.svg";

const Quantity = ({custom=''}) => {
  return (
    <div className={`bg-[#F6F7F8] rounded-[5px] flex items-center ${custom}`}>
      <button className="quantity-button">
        <img src={MinusIcon} alt="Minus" className="m-auto" />
      </button>
      <input value={2} className="w-12 h-12 text-center bg-transparent" />
      <button className="quantity-button">
        <img src={PlusIcon} alt="Plus" className="m-auto" />
      </button>
    </div>
  );
};

export default Quantity;
