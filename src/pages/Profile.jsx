import React, { useEffect } from "react";
import AccountInput from "../components/AccountInput";
import DefaultRadioInput from "../components/DefaultRadioInput"
import AddressForm from "../components/AddressForm";
import defaultAvatar from "../images/DefaultAvatar.svg";
import dateIcon from "../images/DateIcon.svg";
import changeAvatar from "../images/ChangeAvatar.svg"
import { DatePicker } from "antd";
import { useSelector } from "react-redux";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dateFormat = "DD/MM/YYYY";

  //Get profile
  const getProfile = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_PROFILE,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  }

  useEffect(() => {
    if(currentUser) getProfile()
  }, [currentUser])

  //Update profile
  const updateProfile = async () => {
    try {
      const token = currentUser.token;
      console.log(routes.getUpdateProfileBody("FEMALE", "Nguyen Kien", "0975305060", "", "", "", "", "", ""),);
      const result = await appApi.put(
        routes.UPDATE_PROFILE,
        routes.getUpdateProfileBody("MALE", "Nguyen Kien", "0338411557", "2022-12-21T03:48:14.773Z", "", "", "", "", ""),
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
  
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  }

  useEffect(() => {
    if(currentUser) updateProfile()
  }, [currentUser])

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