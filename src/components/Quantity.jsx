import React, {useState} from "react";
import MinusIcon from "../images/MinusIcon.svg";
import PlusIcon from "../images/PlusIcon.svg";

const Quantity = ({custom='', quantity}) => {
  const [value,setValue] = useState(quantity)

  const handleMinusClick = () => {
    if (value > 1)
      setValue(value-1)
  }

  const handlePlusClick = () => {
    setValue(value+1)
  }

  return (
    <div className={`bg-[#F6F7F8] rounded-[5px] flex items-center ${custom}`}>
      <div className="quantity-button"
        onClick={handleMinusClick}>
        <button>
          <img src={MinusIcon} alt="Minus" className="m-auto" />
        </button>
      </div>
      <input value={value} className="w-12 h-12 text-center bg-transparent" />
      <div className="quantity-button"
        onClick={handlePlusClick}>
        <button>
          <img src={PlusIcon} alt="Plus" className="m-auto" />
        </button>
      </div>
    </div>
  );
};

export default Quantity;
