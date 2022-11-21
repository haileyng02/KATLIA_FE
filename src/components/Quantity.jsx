import React, { useState } from "react";
import MinusIcon from "../images/MinusIcon.svg";
import PlusIcon from "../images/PlusIcon.svg";

const Quantity = ({ custom = "", quantity=1 }) => {
  const [value, setValue] = useState(quantity);

  const handleMinusClick = () => {
    if (value > 1) setValue(value - 1);
  };

  const handlePlusClick = () => {
    setValue(value + 1);
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value < 1) return;
    setValue(e.target.value);
  }

  return (
    <div className={`bg-[#F6F7F8] rounded-[5px] flex items-center ${custom}`}>
      <div className="quantity-button" onClick={handleMinusClick}>
        <img src={MinusIcon} alt="Minus" className="m-auto" />
      </div>
      <input value={value} className="w-12 h-12 text-center bg-transparent" onChange={(e)=>handleOnChange(e)}/>
      <div className="quantity-button" onClick={handlePlusClick}>
        <img src={PlusIcon} alt="Plus" className="m-auto" />
      </div>
    </div>
  );
};

export default Quantity;
