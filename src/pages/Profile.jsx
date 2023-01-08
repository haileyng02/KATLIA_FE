import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import AccountInput from "../components/AccountInput";
import defaultAvatar from "../images/DefaultAvatar.svg";
import dateIcon from "../images/DateIcon.svg";
import changeAvatar from "../images/ChangeAvatar.svg";
import { DatePicker, Form, Radio, Skeleton, Spin } from "antd";
import { useSelector } from "react-redux";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import DefaultSelect from "../components/DefaultSelect";
import provinceApi from "../api/provinceApi";
import handleApiCallError from "../utils/handleApiCallError";
import sortByName from "../utils/sortByName";
import normalizeText from "../utils/normalizeText";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [currItem, setCurrItem] = useState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState();
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  useEffect(() => {
    fetchProvinces();
    if (currItem) {
      setCurrAddress(currItem);
    }
  }, [currItem]);

  const setCurrAddress = async (currItem) => {
    form.setFieldsValue({
      province: currItem.province,
    });

    await fetchDistricts(currItem.province);
    form.setFieldsValue({
      district: currItem.district,
    });

    await fetchWards(currItem.district);
    form.setFieldsValue({
      ward: currItem.ward,
    });
  };

  // Fetch province at first render\
  const fetchProvinces = async () => {
    try {
      const response = await provinceApi.get("/p");
      setProvince(sortByName(normalizeText(response.data)));
    } catch (err) {
      handleApiCallError(err);
    }
  };

  // Fetch district after selected province
  const fetchDistricts = async (province) => {
    try {
      const str = String(province);
      const code = str.substring(0, str.indexOf("_"));
      const response = await provinceApi.get(`p/${code}`, {
        params: {
          depth: 2,
        },
      });
      setDistrict(sortByName(normalizeText(response.data.districts)));
      setWard([]);
    } catch (err) {
      handleApiCallError(err);
    }
  };

  // Fetch wards after selected district
  const fetchWards = async (district) => {
    try {
      const str = String(district);
      const code = str.substring(0, str.indexOf("_"));
      const response = await provinceApi.get(`d/${code}`, {
        params: {
          depth: 2,
        },
      });

      setWard(sortByName(normalizeText(response.data.wards)));
    } catch (err) {
      handleApiCallError(err);
    }
  };

  const handleChangeProvince = (value) => {
    if (value !== "default") {
      fetchDistricts(value);
    }
  };

  const handleChangeDistrict = (value) => {
    if (value !== "default") {
      fetchWards(value);
    }
  };

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
      if (result.data[0].ava) {
        setAvatar(result.data[0].ava);
      } else {
        setAvatar("null");
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
  };

  useEffect(() => {
    if (currentUser) getProfile();
  }, [currentUser]);

  useEffect(() => {
    if (avatar) setLoading(false);
  }, [avatar]);

  useEffect(() => {
    if (currItem) {
      form.setFieldsValue({
        name: currItem.fullName,
        email: currItem.email,
        phoneNumber: currItem.phoneNumber,
        address: currItem.address,
        gender: currItem.gender,
        birthday: currItem.birthday && dayjs(currItem.birthday),
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
  };

  const uploadAvatar = async () => {
    if (file) {
      //Call api update ava
      console.log(file);
      const token = currentUser.token;
      const formData = new FormData();

      formData.append("file", file);
      await appApi.patch("/profile/updateAva", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    }
  };

  const handleSave = async () => {
    form.validateFields().then(async (values) => {
      setLoading(true);
      const birthday = new Date(values.birthday);
      await updateProfile(
        values.gender,
        values.name,
        values.phoneNumber,
        birthday.toISOString(),
        values.address,
        values.province,
        values.district,
        values.ward
      );
      await uploadAvatar();
      setLoading(false);
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
                    {avatar ? (
                      <img
                        src={avatar === "null" ? defaultAvatar : avatar}
                        alt="Avatar"
                        className="w-[150px] h-[150px] rounded-full object-cover object-center"
                      />
                    ) : (
                      <Skeleton.Image
                        active
                        className="w-[150px] h-[150px]"
                        style={{
                          borderRadius: 300,
                          height: "150px",
                          width: "150px",
                        }}
                      />
                    )}
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
            <AccountInput name="address" label={"Your address"} />
            <div className="flex gap-x-[74px]">
              <DefaultSelect
                name="province"
                custom={"flex-1"}
                label="Province"
                items={province}
                handleChange={handleChangeProvince}
              />
              <DefaultSelect
                name="district"
                custom={"flex-1"}
                label="District"
                items={district}
                handleChange={handleChangeDistrict}
              />
            </div>
            <div className="flex gap-x-[74px]">
              <DefaultSelect
                name="ward"
                custom={"flex-1"}
                label="Ward"
                items={ward}
              />
            </div>
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
