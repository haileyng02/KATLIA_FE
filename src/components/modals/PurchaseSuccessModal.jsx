import React from "react";
import { Modal } from "antd";
import successIcon from "../../images/success.svg";

const PurchaseSuccessModal = ({ open, handleCancel }) => {
  return (
    <Modal open={open} onCancel={handleCancel} centered footer={null}>
      <center>
        <img src={successIcon} alt="Success" />
        <h1 className="font-inter font-bold text-[25px] mt-[20px]">SUCCESS</h1>
        <p className="font-inter font-[18px] mt-[5px]">Thanks for your order.</p>
        <div className="mt-[11px] flex flex-col items-start p-5 border-[#00000080] border-[0.5px] rounded-5">
          <h2 className="font-inter font-semibold text-[15px]">ORDER AND SHIPPING DETAIL</h2>
        </div>
      </center>
    </Modal>
  );
};

export default PurchaseSuccessModal;
