import React from "react";
import deleteIcon from "../images/DeleteIcon2.svg";

const AddressItem2 = ({ data, editAddress, onClick, chosen }) => {
  return (
    <div
      onClick={() => onClick()}
      className={`${
        chosen ? "border-2 border-[#C85A27]" : "border-1 border-black"
      }  mt-6 px-[26px] py-[20px] w-[370px] flex flex-col justify-between`}
    >
      <p
        className={`${
          data.isDefault ? "text-[#F9AF5E]" : "text-transparent"
        } underline underline-offset-4 font-inter mb-2`}
      >
        Default
      </p>
      <h3 className="text-[#223263]">{data.name}</h3>
      <p className="text-[#9098B1] mt-[17px]">{data.fullAddress}</p>
      <p className="address-phone mt-4">{"(+84) " + data.phoneNumber}</p>
      <div
        className={`flex items-center ${
          !chosen ? "justify-between" : "justify-end"
        } mt-5`}
      >
        {!chosen ? (
          <div
            className={
              "border-1 border-[#000000B5] text-[#000000B5] hover:border-black hover:text-black cursor-pointer px-[10px] rounded-[5px]"
            }
          >
            <p>Choose Address</p>
          </div>
        ) : null}
        <div className="flex gap-x-[12px]">
          <img src={deleteIcon} alt="Delete" />
          <button onClick={editAddress} className="edit-button">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressItem2;
