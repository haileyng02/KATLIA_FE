import React from "react";
import deleteIcon from "../images/DeleteIcon2.svg";

const AddressItem2 = ({ data,editAddress }) => {
  const theme = {
    style: data.isDefault
      ? "border-[#F9AF5E] text-[#F9AF5E]"
      : "border-black cursor-pointer",
    text: data.isDefault ? "Default" : "Choose Address",
  };
  return (
    <div className="border-1 border-black mt-6 p-[26px] w-[370px] flex flex-col justify-between">
      <h3 className="text-[#223263]">{data.name}</h3>
      <p className="text-[#9098B1] mt-[17px]">{data.address}</p>
      <p className="address-phone mt-4">{'(+84) '+data.phoneNumber}</p>
      <div className="address-modify-container mt-5">
        <div 
        className={`border-1 ${theme.style} px-[10px] rounded-[5px]`}>
          <p>{theme.text}</p>
        </div>
        <div className="flex gap-x-[12px]">
          <img src={deleteIcon} alt="Delete" />
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

export default AddressItem2;
