import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import AccountInput from "../components/AccountInput";
import DefaultSelect from "../components/DefaultSelect";
import provinceApi from "../api/provinceApi";
import handleApiCallError from "../utils/handleApiCallError";
import sortByName from "../utils/sortByName";
import normalizeText from "../utils/normalizeText";

const AddressForm = ({ currItem }) => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: "",
    isDefault: false,
  });

  useEffect(() => {
    fetchProvinces();
    if (currItem) setCurrAddress(currItem);
    else
      setCurrAddress({
        address: "",
        province: "",
        district: "",
        ward: "",
        note: "",
        isDefault: false,
      });
  }, [currItem]);

  const setCurrAddress = async (currItem) => {
    setAddress((prev) => ({
      ...prev,
      name: currItem.name,
      phoneNumber: currItem.phoneNumber,
      address: currItem.address,
      note: currItem.note,
      province: currItem.province,
      isDefault : currItem.isDefault
    }));

    await fetchDistricts(currItem.province);
    setAddress((prev) => ({
      ...prev,
      district: currItem.district,
    }));

    await fetchWards(currItem.district);
    setAddress((prev) => ({
      ...prev,
      ward: currItem.ward,
    }));
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

  // Handle user's changes in input
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    console.log(key);
    console.log(value);

    if (key === "province" && value !== "default") {
      setAddress({
        ...address,
        province: value,
        district: "",
        ward: "",
      });
      fetchDistricts(value);
      return;
    }

    if (key === "district" && value !== "default") {
      setAddress({
        ...address,
        district: value,
        ward: "",
      });
      fetchWards(value);
      return;
    }

    if (key === "ward" && value !== "ward") {
    }

    if (e.target.name === "phone") {
      setAddress({
        ...address,
        phone: e.target.value.replace(/\D/g, ""),
      });
      return;
    }

    setAddress({
      ...address,
      [key]: value,
    });
  };

  return (
    <>
      <AccountInput
        name="name"
        label={"Full name"}
        value={address.name || ""}
        handleChange={handleChange}
      />
      <AccountInput
        name="phoneNumber"
        label={"Contact number"}
        value={address.phoneNumber || ""}
        handleChange={handleChange}
      />
      <AccountInput
        name="address"
        label={"Your address"}
        value={address.address || ""}
        handleChange={handleChange}
      />
      <div className="flex gap-x-[74px]">
        <DefaultSelect
          name="province"
          custom={"flex-1"}
          label="Province"
          items={province}
          value={address.province}
          handleChange={handleChange}
        />
        <DefaultSelect
          name="district"
          custom={"flex-1"}
          label="District"
          items={district}
          value={address.district}
          handleChange={handleChange}
        />
      </div>
      <div className="flex gap-x-[74px]">
        <DefaultSelect
          name="ward"
          custom={"flex-1"}
          label="Ward"
          items={ward}
          value={address.ward}
          handleChange={handleChange}
        />
        <AccountInput
          name="note"
          custom={"flex-1"}
          label="Note"
          value={address.note || ""}
          handleChange={handleChange}
        />
      </div>
      <div className="flex mt-6 justify-between">
        <p>Set as Default Address</p>
        <Switch className="bg-gray-300" checked={address.isDefault}/>
      </div>
    </>
  );
};

export default AddressForm;
