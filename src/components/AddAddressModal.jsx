import React from "react";
import AccountInput from "../components/AccountInput";
import AddressForm from "./AddressForm";
import { Modal, Switch } from "antd";

const AddAddressModal = ({isModalOpen,handleCancel,currItem}) => {
  return (
    <Modal
      open={isModalOpen}
      centered
      width={950}
      footer={null}
      bodyStyle={{
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 30,
        paddingBottom: 30,
      }}
      onCancel={handleCancel}
    >
      <h1 className="text-[30px] font-bold">{currItem ? 'Edit Address' : 'Add Address'}</h1>
      <div className="flex flex-col space-y-[21px] mt-[9px]">
        <AccountInput label={"Full name"} value={currItem?.name}/>
        <AccountInput label={"Contact number"} value={currItem?.phoneNumber}/>
        <AddressForm />
      </div>
      <div className="flex mt-6 justify-between">
        <p>Set as Default Address</p>
        <Switch className="bg-gray-300" />
      </div>
      <div className="flex gap-x-[162px] mt-6 justify-between h-[71px] text-[36px]">
        <button 
        onClick={handleCancel}
        className="flex-1 border-1 border-gray-400 rounded-[7px]">Cancel</button>
        <button className="flex-1 bg-primary text-white rounded-[7px]">Confirm</button>
      </div>
    </Modal>
  );
};

export default AddAddressModal;
