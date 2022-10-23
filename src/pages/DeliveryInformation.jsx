import React, {useState} from "react";
import codIcon from "../images/codIcon.svg";
import cardIcon from "../images/cardIcon.svg";
import paypalIcon from "../images/paypalIcon.svg";
import AddressContainer from "../components/AddressContainer";

const paymentMethods = [
  {
    name: "COD",
    image: codIcon,
  },
  {
    name: "Credit Card Or Debit",
    image: cardIcon,
  },
  {
    name: "Paypal",
    image: paypalIcon,
  },
];

const DeliveryInformation = () => {
  return (
    <div className="px-[150px] pt-8 deli-info">
      <h1 className="text-[30px] font-bold">Delivery Information</h1>
      <div className="flex mt-[58px]">
        <div>
          <h2>Delivery Address</h2>
          <AddressContainer type={2} custom="flex gap-x-[29px]"/>
          <h2 className=" mt-[33px]">Note</h2>
          <textarea className="border-1 border-black w-full h-[140px] mt-[19px]" />
          <h2 className="mt-[19px]">Payment Details</h2>
          <div className="flex flex-col gap-y-[23px] mt-[30px]">
            {paymentMethods.map((p, i) => {
              return <div key={i} className="flex black-rounded-border w-full px-6 py-[11px] items-center">
                <input type={"radio"} name="payment" className="w-7 h-7" />
                <img src={p.image} alt="COD" className="ml-6" />
                <p className="ml-[21px] text-kaliablue">{p.name}</p>
              </div>;
            })}
          </div>
          <button className="mt-[35px] deli-button h-[71px] text-[24px] rounded-[8.53px]">Payment Now</button>
        </div>
        <span className="w-[1px] bg-account-divider ml-[34px] self-stretch"/>
        <div className="ml-[34px]">
          <h2>Order Summary</h2>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInformation;
