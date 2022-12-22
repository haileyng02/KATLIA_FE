import React, { useState } from "react";
import { Spin, Tooltip } from "antd";
import deleteIcon from "../images/DeleteIcon2.svg";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import WarningModal from "./modals/WarningModal";

const AddressItem = ({ data, editAddress, currentUser, getAllAddress }) => {
  const [loading, setLoading] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const theme = {
    style: data.setAsDefault
      ? "text-[#F9AF5E] underline underline-offset-4"
      : "border-1 border-black60 text-black60 hover:text-black hover:border-black cursor-pointer",
    text: data.setAsDefault ? "Default" : "Set as Default",
  };

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

  //Update address
  const handleSetAsDefault = async () => {
    if (data.setAsDefault === true) return;
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.put(
        routes.UPDATE_ADDRESS(data.id),
        routes.getAddAddressBody(
          data.fullname,
          data.phonenumber,
          data.address,
          data.province,
          data.district,
          data.ward,
          data.note,
          true
        ),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getUpdateAddressIdParams("63a07f64900f9f3f53baa7a0"),
        }
      );
      console.log(result);
      getAllAddress();
      window.scrollTo(0,0);
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
    <div className="border-1 border-black px-[50px] py-[34px]">
      <Spin spinning={loading}>
        <div className="flex gap-x-[26px] items-center">
          <h2 className="text-[#223263] capitalize">{data.fullname}</h2>
          <div className="w-[1px] h-[23px] bg-black"></div>
          <p className="address-phone">
            {"(+84) " + data.phonenumber.substring(1)}
          </p>
        </div>
        <p className="mt-8 text-[#9098B1] max-w-[85%] capitalize">
          {data.address +
            ", " +
            data.ward.substring(data.ward.indexOf("_") + 1) +
            ", " +
            data.district.substring(data.district.indexOf("_") + 1) +
            ", " +
            data.province.substring(data.province.indexOf("_") + 1)}
        </p>
        <div className="mt-[54px] address-modify-container">
          <div onClick={handleSetAsDefault} className={`${theme.style} px-[10px] rounded-[5px]`}>
            <p>{theme.text}</p>
          </div>
          <div className="flex gap-x-[25px]">
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
      </Spin>
      <WarningModal
        text={"Are you sure you want to detele this address?"}
        open={warningOpen}
        handleCancel={() => setWarningOpen(false)}
        handleOk={deleteAddress}
      />
    </div>
  );
};

export default AddressItem;
