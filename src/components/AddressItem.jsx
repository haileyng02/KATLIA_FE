import React from "react";
import deleteIcon from "../images/DeleteIcon2.svg";

const AddressItem = ({data,editAddress}) => {
  const theme ={
    style: data.isDefault ? 'border-[#F9AF5E] text-[#F9AF5E]' : 'border-black cursor-pointer',
    text: data.isDefault ? 'Default' : 'Set as Default'
  }

  return (
    <div className="border-1 border-black px-[50px] py-[34px]">
      <div className="flex gap-x-[26px] items-center">
        <h2 className="text-[#223263]">{data.name}</h2>
        <div className="w-[1px] h-[23px] bg-black"></div>
        <p className="text-[#9098B1] font-poppins">
          {"(+84) " + data.phoneNumber}
        </p>
      </div>
      <p className="mt-8 text-[#9098B1] max-w-[85%]">
        {data.address}
      </p>
      <div className="flex mt-[54px] items-center justify-between">
        <div 
        className={`border-1 ${theme.style} px-[10px] rounded-[5px]`}>
          <p>{theme.text}</p>
        </div>
        <div className="flex gap-x-[25px]">
          <img src={deleteIcon} alt="Delete" />
          <button 
          onClick={editAddress}
          className="bg-primary px-6 py-4 rounded-[5px] text-white text-[14px] font-bold font-poppins">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressItem;
