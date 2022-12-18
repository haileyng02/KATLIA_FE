import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductThumbnail2 from "../components/ProductThumbnail2";
import checked from "../images/Checked.svg";
import unChecked from "../images/Unchecked.svg";
import passedLine from "../images/PassedLine.svg";
import unpassedLine from "../images/UnpassedLine.svg";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

const OrderDetail = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { orderID } = useParams();

  //Get order detail
  const getOrderDetail = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        `/order/detail/${orderID}`,
        {
          headers: {
            Authorization: 'Bearer ' + token
          },
          params: {
            id: orderID
          }
        }
      );

      console.log(result);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    if (currentUser) getOrderDetail();
  }, [currentUser]);

  return (
    <div className="px-10">
      <h1 onClick={getOrderDetail} className="account-title">
        Order Details
      </h1>
      {/* Status */}
      <div className="flex mt-[59px] gap-x-[82.44px] relative">
        <div>
          <img
            src={orderID?.statusID >= 1 ? checked : unChecked}
            alt="Status"
            className="mx-auto"
          />
          <p className="text-[#9098B1] mt-5">Packing</p>
        </div>
        <div>
          <img
            src={orderID?.statusID >= 2 ? checked : unChecked}
            alt="Status"
            className="mx-auto"
          />
          <p className="text-[#9098B1] mt-5">Shipping</p>
        </div>
        <div>
          <img
            src={orderID?.statusID >= 3 ? checked : unChecked}
            alt="Status"
            className="mx-auto"
          />
          <p className="text-[#9098B1] mt-5">Success</p>
        </div>
        <div className="absolute flex top-[20.7px] left-[20.7px] -z-10">
          <img
            src={orderID?.statusID >= 1 ? passedLine : unpassedLine}
            alt="Status line"
          />
          <img
            src={orderID?.statusID >= 2 ? passedLine : unpassedLine}
            alt="Status line"
          />
        </div>
      </div>
      {/* Product */}
      <h2 className="order-detail-heading mt-[43px]">Product</h2>
      <div className="flex flex-col mt-5 gap-y-[14px]">
        {orderID?.items?.map((item, i) => (
          <ProductThumbnail2 key={i} item={item} />
        ))}
      </div>
      {/* Payment Details */}
      <h2 className="order-detail-heading mt-[34px]">Product</h2>
      <div className="flex flex-col gap-y-[21px] mt-[14px] light-blue-border">
        <div className="flex justify-between">
          <h4 className="text-[#9098B1]">{`Items (${orderID?.totalQty})`}</h4>
          <p className="text-kaliablue">{"$" + orderID?.subTotal}</p>
        </div>
        <div className="flex justify-between">
          <h4 className="text-[#9098B1]">Shipping</h4>
          <p className="text-kaliablue">{"$" + orderID?.shipping}</p>
        </div>
        <div className="flex justify-between">
          <h4 className="text-kaliablue">Total Price</h4>
          <p className="text-kaliayellow">{"$" + orderID?.totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
