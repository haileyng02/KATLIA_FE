import React from "react";
import MinusIcon from "../images/MinusIcon.svg";
import PlusIcon from "../images/PlusIcon.svg";

const Quantity = ({ custom = "", quantity, setQuantity }) => {
  const handleMinusClick = () => {
    if (quantity > 1) setQuantity(quantity - 1); 
  };

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };

  const handleOnChange = (e) => {
    const quantity = e.target.value;
    if (isNaN(quantity) || quantity < 0) return;
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div
      className={`bg-[#F6F7F8] rounded-5 grid grid-cols-3 ${custom}`}
    >
      <button onClick={handleMinusClick}>
        <img src={MinusIcon} alt="Minus" className="m-auto" />
      </button>
      <input
        value={quantity}
        className="text-center bg-[#F6F7F8] font-inder text-[18px] text-[#262626]"
        onChange={(e) => handleOnChange(e)}
      />
      <button onClick={handlePlusClick}>
        <img src={PlusIcon} alt="Plus" className="m-auto" />
      </button>
    </div>
  );
};

export default Quantity;
