import React from "react";
import AccountInput from "../components/AccountInput";
import DefaultRadioInput from "../components/DefaultRadioInput"
import AddressForm from "../components/AddressForm";
import defaultAvatar from "../images/DefaultAvatar.svg";
import dateIcon from "../images/DateIcon.svg";
import changeAvatar from "../images/ChangeAvatar.svg"
import { DatePicker } from "antd";

const Profile = () => {

  const dateFormat = "DD/MM/YYYY";

  return (
    <div>
      <h1 className="account-title">Profile</h1>
      <div className="flex flex-col space-y-[21px] mt-1">
        <div className="flex">
          <div className="mx-auto relative cursor-pointer">
            <img src={defaultAvatar} alt="Avatar" />
            <img src={changeAvatar} alt="Change avatar" className="absolute right-1 bottom-1"/>
          </div>
        </div>
        <AccountInput label={"Full name"} />
        <AccountInput label={"Your email"} />
        <AccountInput label={"Contact number"} />
        <div>
          <h3 className="input-label">Gender</h3>
          <div className="mt-[10px] flex gap-x-[39px]">
            <DefaultRadioInput label={"Male"} />
            <DefaultRadioInput label={"Female"} />
            <DefaultRadioInput label={"Other"} />
          </div>
        </div>
        <label className="input-label">
          Date of birth
          <DatePicker
            suffixIcon={<img src={dateIcon} alt="Calendar" />}
            placeholder="dd/mm/yyyy"
            format={dateFormat}
            popupClassName="font-inter"
            className="default-input text-red-400"
          />
        </label>
        <AddressForm/>
        <button className="w-[139px] h-[64px] mr-0 ml-auto default-button">
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;