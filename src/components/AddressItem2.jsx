import React, { useState } from "react";
import { Spin, Tooltip } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import WarningModal from "./modals/WarningModal";
import deleteIcon from "../images/DeleteIcon2.svg";

const AddressItem2 = ({
  data,
  editAddress,
  onClick,
  chosen,
  currentUser,
  getAllAddress,
}) => {
  const [loading, setLoading] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  //Delete address
  const deleteAddress = async () => {
    setWarningOpen(false);
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.delete(routes.DELETE_ADDRESS(data.id), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getDeleteAddressBody(data.id),
      });
      console.log(result);
      getAllAddress();
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

  return (
    <div
      className={`${
        chosen ? "border-2 border-[#C85A27]" : "border-1 border-black"
      }  mt-6 px-[26px] py-[20px] w-[370px] flex flex-col justify-between`}
    >
      <p
        className={`${
          data?.setAsDefault ? "text-[#F9AF5E]" : "text-transparent"
        } underline underline-offset-4 font-inter mb-2`}
      >
        Default
      </p>
      <h3 className="text-[#223263] capitalize">{data?.fullname}</h3>
      <p className="text-[#9098B1] mt-[17px] capitalize">
        {(data?.note ? `(${data?.note}) ` : "") +
          data?.address +
          ", " +
          data?.ward.substring(data?.ward.indexOf("_") + 1) +
          ", " +
          data?.district.substring(data?.district.indexOf("_") + 1) +
          ", " +
          data?.province.substring(data?.province.indexOf("_") + 1)}
      </p>
      <p className="address-phone mt-4">{"(+84) " + data?.phonenumber}</p>
      <div
        className={`flex items-center ${
          !chosen ? "justify-between" : "justify-end"
        } mt-5`}
      >
        {!chosen ? (
          <div
            onClick={onClick}
            className={
              "border-1 border-[#000000B5] text-[#000000B5] hover:border-black hover:text-black cursor-pointer px-[10px] rounded-[5px]"
            }
          >
            <p>Choose Address</p>
          </div>
        ) : null}
        <div className="flex gap-x-[12px]">
          <Tooltip title="Delete address">
            <img
              src={deleteIcon}
              alt="Delete"
              className="cursor-pointer"
              onClick={() => setWarningOpen(true)}
            />
          </Tooltip>
          <button onClick={editAddress} className="edit-button">
            Edit
          </button>
        </div>
      </div>
      <WarningModal
        text={"Are you sure you want to detele this address?"}
        open={warningOpen}
        handleCancel={() => setWarningOpen(false)}
        handleOk={deleteAddress}
      />
    </div>
  );
};

export default AddressItem2;
