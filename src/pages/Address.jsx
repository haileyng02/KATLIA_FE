import React from "react";
import AddressContainer from "../components/AddressContainer";

const Address = () => {
  return (
    <div>
      <h1 className="account-title">Address</h1>
      <AddressContainer type={1}/>
    </div>
  );
};

export default Address;
