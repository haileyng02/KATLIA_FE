import React from "react";
import { useLocation } from "react-router-dom";
import ProductThumbnail2 from "../components/ProductThumbnail2";
import checked from "../images/Checked.svg";
import unChecked from "../images/Unchecked.svg";
import passedLine from "../images/PassedLine.svg";
import unpassedLine from "../images/UnpassedLine.svg";

const OrderDetail = () => {
  //Get order
  const location = useLocation();
  const order = location.state;

  return (
    <div className="px-10">
      <h1 className="account-title">Order Details</h1>
      {/* Status */}
      <div className="flex mt-[59px] gap-x-[82.44px] relative">
        <div>
          <img src={order?.statusID>=1 ? checked : unChecked} alt="Status"  className="mx-auto"/>
          <p className="text-[#9098B1] mt-5">Packing</p>
        </div>
        <div>
          <img src={order?.statusID>=2 ? checked : unChecked} alt="Status"  className="mx-auto"/>
          <p className="text-[#9098B1] mt-5">Shipping</p>
        </div>
        <div>
          <img src={order?.statusID>=3 ? checked : unChecked} alt="Status"  className="mx-auto"/>
          <p className="text-[#9098B1] mt-5">Success</p>
        </div>
        <div className="absolute flex top-[20.7px] left-[20.7px] -z-10">
            <img src={order?.statusID>=1 ? passedLine : unpassedLine} alt="Status line" />
            <img src={order?.statusID>=2 ? passedLine : unpassedLine} alt="Status line" />
        </div>
      </div>
      {/* Product */}
      <h2 className="order-detail-heading mt-[43px]">Product</h2>
      <div className="flex flex-col mt-5 gap-y-[14px]">
        {order?.items?.map((item,i) => <ProductThumbnail2 key={i} item={item}/>)}
      </div>
      {/* Payment Details */}
      <h2 className="order-detail-heading mt-[34px]">Product</h2>
      <div className="flex flex-col gap-y-[21px] mt-[14px] light-blue-border">
        <div className="flex justify-between">
          <h4 className="text-[#9098B1]">{`Items (${order?.totalQty})`}</h4>
          <p className="text-kaliablue">{'$'+order?.subTotal }</p>
        </div>
        <div className="flex justify-between">
          <h4 className="text-[#9098B1]">Shipping</h4>
          <p className="text-kaliablue">{'$'+order?.shipping }</p>
        </div>
        <div className="flex justify-between">
          <h4 className="text-kaliablue">Total Price</h4>
          <p className="text-kaliayellow">{'$'+order?.totalPrice }</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
