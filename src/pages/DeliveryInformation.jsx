import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import ErrorModal from "../components/modals/ErrorModal";
import { clearCart } from "../actions/cart";

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

const DeliveryInformation = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const cart = location.state;
  const [chosenAddress, setChosenAddress] = useState();
  const [noteValue, setNoteValue] = useState("");
  const [paymentValue, setPaymentValue] = useState(0);
  const [voucherValue, setVoucherValue] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //Put Purchase
  const putPurchase = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;

      const result = await appApi.put(
        routes.PURCHASE,
        routes.getPurchaseBody(
          chosenAddress.fullname,
          `${chosenAddress.phonenumber}`,
          getFullAddress(chosenAddress),
          parseInt(paymentValue),
          noteValue,
          voucherValue
        ),
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
      setSuccessOpen(true);
      dispatch(clearCart());
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

  const handlePurchase = () => {
    if (!chosenAddress) {
      setErrorOpen(true);
    } else {
      putPurchase();
    }
  };

  const getFullAddress = (value) =>
    value.address +
    ", " +
    value.ward?.split("_")[1] +
    ", " +
    value.district?.split("_")[1] +
    ", " +
    value.province?.split("_")[1];

  return (
    <div className="px-[150px] pt-8 deli-info">
      <Spin size="large" spinning={loading}>
        <h1 className="text-[30px] font-bold">Delivery Information</h1>
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
            <div className="flex justify-between mt-[29px] text-[#22262A] font-semibold">
              <h4 className="text-[25px]">TOTAL</h4>
              <p className="text-[25px]">{"$" + cart?.total}</p>
            </div>
          </div>
        </div>
      </Spin>
      <PurchaseSuccessModal
        data={{
          name: chosenAddress?.fullname,
          phone: chosenAddress?.phonenumber,
          address: chosenAddress && getFullAddress(chosenAddress),
          amount: cart?.total,
        }}
        open={successOpen}
        handleCancel={() => setSuccessOpen(false)}
      />
      <ErrorModal
        text="Please choose or add an address"
        open={errorOpen}
        handleCancel={() => setErrorOpen(false)}
      />
    </div>
  );
};

export default DeliveryInformation;
