import React from "react";
import { useDispatch } from "react-redux";
import { updateCartItem, plusCart, minusCart } from "../actions/cart";
import MinusIcon from "../images/MinusIcon.svg";
import PlusIcon from "../images/PlusIcon.svg";

const Quantity = ({
  custom = "",
  quantity,
  setQuantity,
  isCart,
  onUpdate,
  instock,
  setError,
}) => {
  const dispatch = useDispatch();

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onUpdate(quantity - 1);
      if (isCart) dispatch(minusCart());
    }
  };

  const handlePlusClick = () => {
    if (quantity === instock) {
      setError("Item has reached its maximum quantity");
      return;
    }
    setQuantity(quantity + 1);
    onUpdate(quantity + 1);
    if (isCart) dispatch(plusCart());
  };

  const handleOnChange = (e) => {
    let newVal = e.target.value;
    if (isNaN(newVal) || newVal < 0) return;
    if (newVal > instock) {
      newVal = instock;
      setError(`There are only ${instock} quantity remaining for this item`);
    }
    if (newVal === "") newVal = 1;
    if (isCart) dispatch(updateCartItem(quantity, parseInt(newVal)));
    setQuantity(parseInt(newVal));
    onUpdate(parseInt(newVal));
  };

  return (
    <div className={`bg-[#F6F7F8] rounded-5 grid grid-cols-3 ${custom}`}>
      <button
        onClick={handleMinusClick}
        className={quantity === 1 && "cursor-not-allowed"}
      >
        <svg
          width="9"
          height="4"
          viewBox="0 0 9 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="m-auto"
        >
          <path
            d="M7.6811 0.956528H1.21633C0.640033 0.956528 0.172852 1.42371 0.172852 2.00001C0.172852 2.5763 0.640032 3.04348 1.21633 3.04348H7.6811C8.25739 3.04348 8.72458 2.5763 8.72458 2.00001C8.72458 1.42371 8.25739 0.956528 7.6811 0.956528Z"
            fill={quantity !== 1 ? "#C85A27" : "#CDCDCD"}
          />
        </svg>
      </button>
      <input
        value={quantity}
        className="text-center bg-[#F6F7F8] font-inder text-[18px] text-[#262626]"
        onChange={(e) => handleOnChange(e)}
      />
      <button
        onClick={handlePlusClick}
        className={quantity === instock && "cursor-not-allowed"}
      >
        <svg
          width="9"
          height="10"
          viewBox="0 0 9 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="m-auto"
        >
          <path
            d="M7.78388 3.95653H1.31911C0.742816 3.95653 0.275635 4.42371 0.275635 5.00001C0.275635 5.5763 0.742815 6.04348 1.31911 6.04348H7.78388C8.36018 6.04348 8.82736 5.5763 8.82736 5.00001C8.82736 4.42371 8.36018 3.95653 7.78388 3.95653Z"
            fill={!instock || quantity < instock ? "#C85A27" : "#CDCDCD"}
          />
          <path
            d="M5.62036 8.10494L5.62036 1.89505C5.62036 1.30467 5.14177 0.82608 4.5514 0.82608C3.96102 0.82608 3.48243 1.30467 3.48243 1.89505L3.48243 8.10494C3.48243 8.69531 3.96102 9.17391 4.5514 9.17391C5.14177 9.17391 5.62036 8.69531 5.62036 8.10494Z"
            fill={!instock || quantity < instock ? "#C85A27" : "#CDCDCD"}
          />
        </svg>
      </button>
    </div>
  );
};

export default Quantity;
