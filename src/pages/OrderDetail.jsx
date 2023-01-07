import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import ProductThumbnail2 from "../components/ProductThumbnail2";
import checked from "../images/Checked.svg";
import unChecked from "../images/Unchecked.svg";
import passedLine from "../images/PassedLine.svg";
import unpassedLine from "../images/UnpassedLine.svg";
import canceledIcon from "../images/canceled.svg";
import appApi from "../api/appApi";
import RateProductModal from "../components/modals/RateProductModal";

const OrderDetail = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { orderID } = useParams();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [rateOpen, setRateOpen] = useState(false);

  //Get order detail
  const getOrderDetail = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(`/order/detail/${orderID}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          id: orderID,
        },
      });

      console.log(result);
      setOrder(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
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
        {order?.order.status !== 5 ? (
          <>
            <div>
              <img
                src={order?.order.status >= 2 ? checked : unChecked}
                alt="Status"
                className="mx-auto"
              />
              <p className="text-[#9098B1] mt-5">Packing</p>
            </div>
            <div>
              <img
                src={order?.order.status >= 3 ? checked : unChecked}
                alt="Status"
                className="mx-auto"
              />
              <p className="text-[#9098B1] mt-5">Shipping</p>
            </div>
            <div>
              <img
                src={order?.order.status === 4 ? checked : unChecked}
                alt="Status"
                className="mx-auto"
              />
              <p className="text-[#9098B1] mt-5">Success</p>
            </div>
            <div className="absolute flex top-[20.7px] left-[20.7px] -z-10">
              <img
                src={order?.order.status >= 2 ? passedLine : unpassedLine}
                alt="Status line"
              />
              <img
                src={order?.order.status >= 3 ? passedLine : unpassedLine}
                alt="Status line"
              />
            </div>
          </>
        ) : (
          <div>
            <img src={canceledIcon} alt="Status" className="mx-auto" />
            <p className="text-[#9098B1] mt-5">Canceled</p>
          </div>
        )}
      </div>
      {/* Address */}
      <h2 className="order-detail-heading mt-[43px]">Receiver's Information</h2>
      <div className="mt-[14px] light-blue-border">
        {!loading ? (
          <>
            <h3 className="text-kaliablue">{order?.order.receiverName}</h3>
            <p className="text-[#9098B1] mt-[15px]">{order?.order.address}</p>
            <p className="text-[#9098B1] font-poppins mt-[16px]">
              {"(+84) " + order?.order.receiverPhone}
            </p>
          </>
        ) : (
          <Skeleton active />
        )}
      </div>
      {/* Note */}
      <h2 className="order-detail-heading mt-[43px]">Note</h2>
      <div className="mt-[14px] light-blue-border">
        {!loading ? (
          <p className="text-[#9098B1]">{order?.order.note}</p>
        ) : (
          <Skeleton active />
        )}
      </div>
      {/* Product */}
      <h2 className="order-detail-heading mt-[43px]">Product</h2>
      <div className="flex flex-col overflow-y-auto max-h-[380px] mt-5 gap-y-[14px]">
        {order ? (
          order?.itemList.map((item, i) => (
            <ProductThumbnail2 key={i} item={item} loading={loading} />
          ))
        ) : (
          <div className="flex light-blue-border flex-none">
            <div className="w-[124px] mr-5">
              <Skeleton.Image
                style={{ width: "100%", height: "100%" }}
                active={true}
                className="aspect-square h-full"
              />
            </div>
            <Skeleton />
          </div>
        )}
      </div>
      {/* Payment Details */}
      <h2 className="order-detail-heading mt-[34px]">Payment Details</h2>
      <div className="flex flex-col gap-y-[21px] mt-[14px] light-blue-border">
        {order ? (
          <>
            <div className="flex justify-between">
              <h4 className="text-[#9098B1]">{`Items (${order?.numberOfItems})`}</h4>
              <p className="text-kaliablue">
                {"$" + (order?.order.total - order?.order.shippingFee)}
              </p>
            </div>
            <div className="flex justify-between">
              <h4 className="text-[#9098B1]">Shipping</h4>
              <p className="text-kaliablue">{"$" + order?.order.shippingFee}</p>
            </div>
            <div className="flex justify-between">
              <h4 className="text-kaliablue">Total Price</h4>
              <p className="text-kaliayellow">{"$" + order?.order.total}</p>
            </div>
          </>
        ) : (
          <Skeleton active />
        )}
      </div>
      <button
        className={`w-[232px] h-[71px] mt-5 rounded-10 text-[30px] text-white float-right ${
          order?.order.status !== 4 || order?.isFeedback
            ? "bg-[#888888] cursor-not-allowed"
            : " bg-primary hover:bg-secondary"
        }`}
        disabled={order?.order.status !== 4 || order?.isFeedback}
        onClick={() => setRateOpen(true)}
      >
        Rate Products
      </button>
      <RateProductModal
        open={rateOpen}
        handleCancel={() => setRateOpen(false)}
        items={order?.itemList}
        currentUser={currentUser}
        orderId={orderID}
        getOrderDetail={getOrderDetail}
      />
    </div>
  );
};

export default OrderDetail;
