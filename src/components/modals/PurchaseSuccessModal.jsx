import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import successIcon from "../../images/success.svg";
import { useEffect } from "react";

const PurchaseSuccessModal = ({ open, handleCancel, data }) => {
  const navigate = useNavigate();

  const handleContinueShoping = () => {
    navigate("/");
    handleCancel();
  };

  const handleViewOrders = () => {
    navigate("/account/order");
    handleCancel();
  };

  return (
    <Modal open={open} onCancel={handleViewOrders} centered footer={null}>
      <div className="flex flex-col items-center">
        <img src={successIcon} alt="Success" />
        <h1 className="font-inter font-bold text-[25px] mt-[20px]">SUCCESS</h1>
        <p className="font-inter font-[18px] mt-[5px]">
          Thanks for your order.
        </p>
        <div className="mt-[11px] w-full flex flex-col items-start p-5 border-[#00000080] border-[0.5px] rounded-5">
          <h2 className="font-inter font-semibold text-[15px]">
            ORDER AND SHIPPING DETAIL
          </h2>
          <div className="row justify-between w-full font-inter">
            <p className="text-[15px]">Order Amount</p>
            <p className="text-[15px] text-kaliayellow">{"$" + data.amount}</p>
          </div>
          <div className="font-poppins">
            <h3 className="text-[15px] mt-[17px]">Delivery Information</h3>
            <p className="text-[12px]">{data.name + ", " + data.phone}</p>
            <p className="text-[12px]">{data.address}</p>
          </div>
        </div>
        <button
          onClick={handleContinueShoping}
          className="w-full h-[30px] rounded-5 font-inter text-[15px] bg-primary hover:bg-secondary text-white my-[10px]"
        >
          CONTINUE SHOPPING
        </button>
        <button
          onClick={handleViewOrders}
          className="w-full h-[30px] rounded-5 font-inter text-[15px] border-[0.5px] border-[#00000080] text-[#000000B5] hover:text-black hover:border-1 hover:border-black"
        >
          VIEW YOUR ORDERS
        </button>
      </div>
    </Modal>
  );
};

export default PurchaseSuccessModal;
