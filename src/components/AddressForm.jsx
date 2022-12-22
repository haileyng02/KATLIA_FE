import React, { useState, useEffect } from "react";
import { Form, Switch } from "antd";
import AccountInput from "../components/AccountInput";
import DefaultSelect from "../components/DefaultSelect";
import provinceApi from "../api/provinceApi";
import handleApiCallError from "../utils/handleApiCallError";
import sortByName from "../utils/sortByName";
import normalizeText from "../utils/normalizeText";

const AddressForm = ({ form, currItem, open,checked,setChecked }) => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  useEffect(() => {
    if (!open) return;
    fetchProvinces();
    if (currItem) {
      form.setFieldsValue({
        name: currItem.fullname,
        phoneNumber: currItem.phonenumber,
        address: currItem.address,
        note: currItem.note,
      });
      console.log(currItem.setAsDefault)
      handleCheck(currItem.setAsDefault)
      setCurrAddress(currItem);
    } else {
      form.resetFields();
    }
  }, [currItem, form, open]);

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

  const handleCheck = (value) => {
    setChecked(value);
    form.setFieldsValue({
      default: value,
    });
  }

  return (
    <Form form={form}>
      <AccountInput
        name="name"
        label={"Full name"}
        rules={[
          {
            required: true,
            message: "You must enter your name",
          },
        ]}
      />
      <AccountInput
        name="phoneNumber"
        label={"Contact number"}
        rules={[
          {
            required: true,
            message: "Please enter phone number",
          },
          {
            validator: (_, value) => {
              if (
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
                  value
                ) ||
                !value
              ) {
                return Promise.resolve();
              } else {
                return Promise.reject("This is not a phone number");
              }
            },
          },
        ]}
      />
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
      <div className="flex gap-x-[74px]">
        <DefaultSelect
          name="province"
          custom={"flex-1"}
          label="Province"
          items={province}
          handleChange={handleChangeProvince}
          rules={[{ required: true, message: "Please select province" }]}
        />
        <DefaultSelect
          name="district"
          custom={"flex-1"}
          label="District"
          items={district}
          handleChange={handleChangeDistrict}
          rules={[{ required: true, message: "Please select district" }]}
        />
      </div>
      <div className="flex gap-x-[74px]">
        <DefaultSelect
          name="ward"
          custom={"flex-1"}
          label="Ward"
          items={ward}
          rules={[{ required: true, message: "Please select ward" }]}
        />
        <AccountInput name="note" custom={"flex-1"} label="Note" />
      </div>
      <div className="flex justify-between">
        <p>Set as Default Address</p>
        <Form.Item name={"default"}>
          <Switch className="bg-gray-300" checked={checked} onChange={(value)=>handleCheck(value)}/>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddressForm;
