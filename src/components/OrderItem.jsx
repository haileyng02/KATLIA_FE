import React from "react";
import { useNavigate } from "react-router-dom";
import divider from "../images/Divider.svg";

const OrderItem = ({ item }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/account/order/${item.id}`, { state: item });
  };

  const getOrderStatus = (statusID) => {
    switch (statusID) {
      case 1:
        return "Packing";
      case 2:
        return "Shipping";
      case 3:
        return "Success";
      default:
    }
  };
  return (
    <div
      onClick={handleOnClick}
      className="flex flex-col gap-y-[12px] border-1 border-[#F9AF5E] p-4 rounded-[5px] cursor-pointer"
    >
      <h2 className="text-[#223263] font-bold">{item.id}</h2>
      <p className="order-detail-title">{"Order at E-comm: " + item.date}</p>
      <img src={divider} alt="Divider" />
      <div className="flex justify-between">
        <h3 className="order-detail-title">Order Status</h3>
        <p className="order-detail-value">{getOrderStatus(item.statusID)}</p>
      </div>
      <div className="flex justify-between">
        <h3 className="order-detail-title">Items</h3>
        <p className="order-detail-value">
          {item.totalQty + " Items purchased"}
        </p>
      </div>
      <div className="flex justify-between">
        <h3 className="order-detail-title">Price</h3>
        <p className="text-[#F9AF5E]">{"$" + item.price}</p>
      </div>
    </div>
  );
};

export default OrderItem;
