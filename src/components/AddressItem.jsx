import React from "react";
import deleteIcon from "../images/DeleteIcon2.svg";

const AddressItem = ({data,editAddress,deleteAddress}) => {
  const theme ={
    style: data.isDefault ? 'border-[#F9AF5E] text-[#F9AF5E]' : 'border-black cursor-pointer',
    text: data.isDefault ? 'Default' : 'Set as Default'
  }

  return (
    <div className="border-1 border-black px-[50px] py-[34px]">
      <div className="flex gap-x-[26px] items-center">
        <h2 className="text-[#223263]">{data.name}</h2>
        <div className="w-[1px] h-[23px] bg-black"></div>
        <p className="address-phone">
          {"(+84) " + data.phoneNumber}
        </p>
      </div>
      <p className="mt-8 text-[#9098B1] max-w-[85%]">
        {data.fullAddress}
      </p>
      <div className="mt-[54px] address-modify-container">
        <div 
        className={`border-1 ${theme.style} px-[10px] rounded-[5px]`}>
          <p>{theme.text}</p>
        </div>
        <div className="flex gap-x-[25px]">
          <img src={deleteIcon} alt="Delete" className="cursor-pointer" onClick={deleteAddress}/>
          <button 
          onClick={editAddress}
          className="edit-button">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressItem;
