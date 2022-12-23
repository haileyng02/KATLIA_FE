import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import AccountInput from "../components/AccountInput";
import defaultAvatar from "../images/DefaultAvatar.svg";
import dateIcon from "../images/DateIcon.svg";
import changeAvatar from "../images/ChangeAvatar.svg";
import { DatePicker, Form, Radio, Spin } from "antd";
import { useSelector } from "react-redux";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import AddressSelect from "../components/AddressSelect";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [currItem, setCurrItem] = useState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState();

  const dateFormat = "DD/MM/YYYY";

  //Get profile
  const getProfile = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_PROFILE,
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data[0]);
      if (result.data.ava) {
        setAvatar(result.data.ava)
      }
      setCurrItem(result.data[0]);
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

  useEffect(() => {
    if (currentUser) getProfile();
  }, [currentUser]);

  useEffect(() => {
    if (currItem) {
      form.setFieldsValue({
        name: currItem.fullName,
        email: currItem.email,
        phoneNumber: currItem.phoneNumber,
        address: currItem.address,
        gender: currItem.gender,
        birthday: dayjs(currItem.birthday),
      });
    }
  }, [currItem, form]);

  //Update profile
  const updateProfile = async (
    gender,
    name,
    phoneNumber,
    birthday,
    address,
    province,
    district,
    ward
  ) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.put(
        routes.UPDATE_PROFILE,
        routes.getUpdateProfileBody(
          gender,
          name,
          phoneNumber,
          birthday,
          address,
          province,
          district,
          ward,
          ""
        ),
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
    setLoading(false);
  };

  const uploadAvatar = () => {};

  const handleSave = () => {
    form.validateFields().then((values) => {
      const birthday = new Date(values.birthday);
      updateProfile(
        values.gender,
        values.name,
        values.phoneNumber,
        birthday.toISOString(),
        values.address,
        values.province,
        values.district,
        values.ward
      );
      uploadAvatar();
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const objectUrl = URL.createObjectURL(file);
    setAvatar(objectUrl);
  };

  return (
    <div>
      <h1 className="account-title">Profile</h1>
      <Spin spinning={loading}>
        <Form form={form}>
          <div className="flex flex-col space-y-[21px] mt-1">
            <div className="image-upload">
              <label htmlFor="file-input">
                <div className="flex">
                  <div className="mx-auto relative cursor-pointer">
                    <img
                      src={avatar || defaultAvatar}
                      alt="Avatar"
                      className="w-[150px] h-[150px] rounded-full object-cover object-center"
                    />
                    <img
                      src={changeAvatar}
                      alt="Change avatar"
                      className="absolute right-1 bottom-1"
                    />
                  </div>
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            <AccountInput name={"name"} label={"Full name"} />
            <AccountInput name={"email"} label={"Your email"} readOnly />
            <AccountInput name={"phoneNumber"} label={"Contact number"} />
            <div>
              <h3 className="input-label">Gender</h3>
              <Form.Item name={"gender"} className="mt-2">
                <Radio.Group>
                  <Radio value="MALE">Male</Radio>
                  <Radio value="FEMALE">Female</Radio>
                  <Radio value="OTHER">Other</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <h3 className="font-semibold">{"Date of birth"}</h3>
            <Form.Item name={"birthday"}>
              <DatePicker
                suffixIcon={<img src={dateIcon} alt="Calendar" />}
                placeholder="dd/mm/yyyy"
                format={dateFormat}
                popupClassName="font-inter"
                className="w-full h-[45px] px-4 font-normal text-[18px] text-red-400"
              />
            </Form.Item>
            <AccountInput
              name="address"
              label={"Your address"}
              rules={[
                {
                  required: true,
                  message: "Please enter your address",
                },
              ]}
            />
            <AddressSelect
              form={form}
              currItem={currItem}
              containNote={false}
              validate={false}
            />
            <button
              onClick={handleSave}
              className="w-[139px] h-[64px] mr-0 ml-auto default-button"
            >
              Save
            </button>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default Profile;
