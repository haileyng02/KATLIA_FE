import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Input, Spin } from "antd";
import AddressContainer from "../components/AddressContainer";
import ProductThumbnail3 from "../components/ProductThumbnail3";
import codIcon from "../images/codIcon.svg";
import cardIcon from "../images/cardIcon.svg";
import paypalIcon from "../images/paypalIcon.svg";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import PurchaseSuccessModal from "../components/modals/PurchaseSuccessModal";

const { TextArea } = Input;

const paymentMethods = [
  {
    id: 0,
    name: "COD",
    image: codIcon,
  },
  {
    id: 1,
    name: "Credit Card Or Debit",
    image: cardIcon,
  },
  {
    id: 2,
    name: "Paypal",
    image: paypalIcon,
  },
];

const order = {
  items: [
    {
      id: 1,
      name: "FADED MINIMALIST T-SHIRT",
      size: "M",
      image:
        "https://s3-alpha-sig.figma.com/img/7fd6/9ca2/43dcb0397f74f59ddfef712c719f06c0?Expires=1667174400&Signature=OrHn-7fiXM091SFUWqemgSfzIF5hmA9gtQ2Enlbi1dbJNm8wyFYrpVtsu3xRfR1MCrlTXCysD8QelowW3N5pShd1DdrREH55WPM7h1qrKCMLyDyJQdJ8QktPpKSSlwgQ3TpbduwN7fZB6oEH6Lgd2L9BsxFC6Z7kYzR1ckypopbz-oogl~jaobJDIZBxrvcQWM1XEAHAPyuiMB2tsTKRnlAvYwJpkjMh4B4wxfr78mJHTXZBPXYVxOKblvh32RTWL7DXxpXMfQYF9U0c1~ZmnoccVRzT2VVsrZpdKp3PpTXseGgrg2Iq0AQe0DUpbnZNM6XUvUoqfiTIb54joxYNag__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      price: 41.52,
    },
    {
      id: 2,
      name: "FADED MINIMALIST T-SHIRT",
      size: "M",
      image:
        "https://s3-alpha-sig.figma.com/img/7fd6/9ca2/43dcb0397f74f59ddfef712c719f06c0?Expires=1667174400&Signature=OrHn-7fiXM091SFUWqemgSfzIF5hmA9gtQ2Enlbi1dbJNm8wyFYrpVtsu3xRfR1MCrlTXCysD8QelowW3N5pShd1DdrREH55WPM7h1qrKCMLyDyJQdJ8QktPpKSSlwgQ3TpbduwN7fZB6oEH6Lgd2L9BsxFC6Z7kYzR1ckypopbz-oogl~jaobJDIZBxrvcQWM1XEAHAPyuiMB2tsTKRnlAvYwJpkjMh4B4wxfr78mJHTXZBPXYVxOKblvh32RTWL7DXxpXMfQYF9U0c1~ZmnoccVRzT2VVsrZpdKp3PpTXseGgrg2Iq0AQe0DUpbnZNM6XUvUoqfiTIb54joxYNag__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      price: 41.52,
    },
  ],
  subtotal: 41.52,
  shippingFee: 2,
  total: 42.51,
};

const DeliveryInformation = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const cart = location.state;
  const [chosenAddress, setChosenAddress] = useState();
  const [noteValue, setNoteValue] = useState("");
  const [paymentValue, setPaymentValue] = useState(0);
  const [voucherValue, setVoucherValue] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //Put Purchase
  const putPurchase = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;

      const result = await appApi.put(
        routes.PURCHASE,
        routes.getPurchaseBody(
          chosenAddress.name,
          `${chosenAddress.phoneNumber}`,
          chosenAddress.fullAddress,
          parseInt(paymentValue),
          noteValue,
          voucherValue
        ),
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
      setSuccessOpen(true);
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
  //Get Order History
  const getOrderHistory = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzYyOTE2NTNkMzEwMjdmMjNiYWVkMTMiLCJlbWFpbCI6InNhb3ZheXRhMjEzMUBnbWFpbC5jb20iLCJpYXQiOjE2Njg3NjAzMDIsImV4cCI6MTY2ODg0NjcwMn0.6G5Tk78A_7EgslAw4yfslOC29Zf_ZypGd5dr2jIidbk";
      const data = await appApi.get(
        routes.GET_ORDER_HISTORY,
        routes.getAccessTokenHeader(token)
      );

      console.log(data);
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

  const handlePurchase = () => {
    console.log(chosenAddress.phoneNumber);
    putPurchase();
  };

  return (
    <div className="px-[150px] pt-8 deli-info">
      <Spin size="large" spinning={loading}>
        <h1 onClick={getOrderHistory} className="text-[30px] font-bold">
          Delivery Information
        </h1>
        <div className="flex mt-[40px] justify-between">
          {/* Left side */}
          <div className="w-[59%]">
            <h2> Delivery Address</h2>
            <AddressContainer
              setChosenAddress={setChosenAddress}
              chosenAddress={chosenAddress}
              type={2}
              custom="flex gap-x-[29px]"
            />
            <h2 className=" mt-[33px]">Note</h2>
            <TextArea
              value={noteValue}
              onChange={(e) => setNoteValue(e.target.value)}
              className="border-1 border-black w-full mt-[19px] text-20"
            />
            <h2 className="mt-[19px]">Payment Details</h2>
            <div className="flex flex-col gap-y-[23px] mt-[30px]">
              {paymentMethods.map((p, i) => {
                return (
                  <div
                    key={i}
                    className="flex black-rounded-border w-full px-6 py-[11px] items-center"
                  >
                    <input
                      type={"radio"}
                      name="payment"
                      className="w-7 h-7 text-primary"
                      checked={paymentValue === p.id}
                      onChange={() => setPaymentValue(p.id)}
                    />
                    <img src={p.image} alt="COD" className="ml-6" />
                    <p className="ml-[21px] text-kaliablue">{p.name}</p>
                  </div>
                );
              })}
            </div>
            <button
              onClick={handlePurchase}
              className="mt-[35px] deli-button h-[71px] text-[24px] rounded-[8.53px]"
            >
              Payment Now
            </button>
          </div>
          <span className="w-[1px] bg-account-divider  self-stretch" />
          {/* Right side */}
          <div className="flex flex-col w-[36%]">
            <h2>Order Summary</h2>
            <div className="flex flex-col gap-y-2 mt-[25px] overflow-y-auto max-h-[40vh]">
              {cart?.cartItems.map((item, i) => {
                return <ProductThumbnail3 key={i} item={item} />;
              })}
            </div>
            <div className="flex mt-[55px] gap-x-8">
              <Input
                placeholder="Discount Code"
                className="border-b-1 border-[#F6F7F8]  flex-1 text-20"
                onChange={(e) => setVoucherValue(e.target.value)}
                value={voucherValue}
              />
              <button className="bg-primary hover:bg-secondary rounded-[5px] text-white w-[77px]">
                Apply
              </button>
            </div>
            <div className="flex justify-between mt-[37px] text-[#262626]">
              <h4>Subtotal</h4>
              <p>{"$" + cart?.subtotal}</p>
            </div>
            <div className="flex justify-between mt-[27px] text-[#262626]">
              <h4>Shipping fee</h4>
              <p>{"$" + cart?.ship}</p>
            </div>
            <div className="flex justify-between mt-[27px] text-[#262626]">
              <h4>Discount</h4>
              <p>{"$" + cart?.discount}</p>
            </div>
            <span className="h-[1px] bg-[#F6F7F8] self-stretch mt-7" />
            <div className="flex justify-between mt-[29px] text-[#22262A]">
              <h4>TOTAL</h4>
              <p>{"$" + cart?.total}</p>
            </div>
          </div>
        </div>
      </Spin>
      <PurchaseSuccessModal
        data={{
          name: chosenAddress?.name,
          phone: chosenAddress?.phoneNumber,
          address: chosenAddress?.fullAddress,
          amount: cart?.total,
        }}
        open={successOpen}
        handleCancel={() => setSuccessOpen(false)}
      />
    </div>
  );
};

export default DeliveryInformation;
