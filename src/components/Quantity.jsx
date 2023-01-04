import React from "react";
import { useDispatch } from "react-redux";
import { updateCartItem, plusCart, minusCart } from "../actions/cart";
import MinusIcon from "../images/MinusIcon.svg";
import PlusIcon from "../images/PlusIcon.svg";

const Quantity = ({ custom = "", quantity, setQuantity, isCart, onUpdate }) => {
  const dispatch = useDispatch();

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onUpdate(quantity-1);
      if (isCart) dispatch(minusCart());
    }
  };

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
    onUpdate(quantity+1);
    if (isCart) dispatch(plusCart());
  };

  const handleOnChange = (e) => {
    const newVal = e.target.value;
    if (isNaN(newVal) || newVal < 0) return;
    if (isCart) dispatch(updateCartItem(quantity, parseInt(e.target.value)));
    setQuantity(parseInt(e.target.value));
    onUpdate(parseInt(e.target.value));
  };

  return (
    <div className={`bg-[#F6F7F8] rounded-5 grid grid-cols-3 ${custom}`}>
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
