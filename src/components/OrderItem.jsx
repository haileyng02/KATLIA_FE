import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs'
import getOrderStatus from "../utils/getOrderStatus";
import divider from "../images/Divider.svg";

const OrderItem = ({ item }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/account/order/${item.id}`);
  };

  return (
    <div
      onClick={handleOnClick}
      className="flex flex-col gap-y-[12px] border-1 border-[#F9AF5E] p-4 rounded-[5px] cursor-pointer"
    >
      <h2 className="text-[#223263] font-bold uppercase">{item?.id}</h2>
      <p className="order-detail-title">
        {"Order at E-comm: " + dayjs(item?.createdAt).format('MMMM DD, YYYY')}
      </p>
      <img src={divider} alt="Divider" />
      <div className="flex justify-between">
        <h3 className="order-detail-title">Order Status</h3>
        <p className="order-detail-value">{getOrderStatus(item?.status)}</p>
      </div>
      <div className="flex justify-between">
        <h3 className="order-detail-title">Items</h3>
        <p className="order-detail-value">
          {item?.numberOfItems + " Items purchased"}
        </p>
      </div>
      <div className="flex justify-between">
        <h3 className="order-detail-title">Price</h3>
        <p className="text-[#F9AF5E] text-[20px]">{"$" + item?.total}</p>
      </div>
    </div>
  );
};

export default OrderItem;
