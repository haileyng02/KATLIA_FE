import React, { useState, useEffect } from "react";
import { Modal, Form, Spin, Switch } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import AccountInput from "../components/AccountInput";
import DefaultSelect from "../components/DefaultSelect";
import provinceApi from "../api/provinceApi";
import handleApiCallError from "../utils/handleApiCallError";
import sortByName from "../utils/sortByName";
import normalizeText from "../utils/normalizeText";

const AddAddressModal = ({
  open,
  handleCancel,
  currItem,
  currentUser,
  getAllAddress,
  myDiv,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  useEffect(() => {
    if (open != null && !open) return;
    fetchProvinces();
    if (currItem) {
      setCurrAddress(currItem);
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
      form.setFieldsValue({
        district: null,
        ward: null
      });
      fetchDistricts(value);
    }
  };

  const handleChangeDistrict = (value) => {
    if (value !== "default") {
      form.setFieldsValue({
        ward: null
      });
      fetchWards(value);
    }
  };

  //Add address
  const addAddress = async (
    name,
    phone,
    address,
    province,
    district,
    ward,
    note,
    isDefault
  ) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.post(
        routes.ADD_ADDRESS,
        routes.getAddAddressBody(
          name,
          phone,
          address,
          province,
          district,
          ward,
          note,
          isDefault
        ),
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
      getAllAddress();
      myDiv?.scrollTo({
        behavior: "smooth",
        right: 200,
      });
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
  const updateAddress = async (
    name,
    phone,
    address,
    province,
    district,
    ward,
    note,
    isDefault
  ) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.put(
        routes.UPDATE_ADDRESS(currItem.id),
        routes.getAddAddressBody(
          name,
          phone,
          address,
          province,
          district,
          ward,
          note,
          isDefault
        ),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getUpdateAddressIdParams(currItem.id),
        }
      );
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

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        if (currItem) {
          updateAddress(
            values.name,
            values.phoneNumber,
            values.address,
            values.province,
            values.district,
            values.ward,
            values.note,
            checked
          );
        } else {
          addAddress(
            values.name,
            values.phoneNumber,
            values.address,
            values.province,
            values.district,
            values.ward,
            values.note,
            checked
          );
        }
      })
      .then((_) => handleCancel());
  };

  const onCancel = () => {
    handleCancel();
    form.resetFields();
  };

  useEffect(() => {
    if (!open) return;
    if (currItem) {
      form.setFieldsValue({
        name: currItem.fullname,
        phoneNumber: currItem.phonenumber,
        address: currItem.address,
        note: currItem.note,
      });
      handleCheck(currItem.setAsDefault);
    } else {
      form.resetFields();
      handleCheck(false);
    }
  }, [open]);

  const handleCheck = (value) => {
    setChecked(value);
    form.setFieldsValue({
      default: value,
    });
  };

  return (
    <Modal
      open={open}
      centered
      width={950}
      footer={[
        <button
          onClick={onCancel}
          className="h-[40px] px-4 border-1 border-gray-400 rounded-[7px] hover:border-secondary hover:text-secondary"
        >
          Cancel
        </button>,
        <button
          onClick={handleOk}
          className="h-[40px] px-4 bg-primary hover:bg-secondary text-white rounded-[7px] ml-2 mr-[40px]"
        >
          {currItem ? "Confirm" : "Add Address"}
        </button>,
      ]}
      bodyStyle={{
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 30,
        paddingBottom: 30,
      }}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <h1 className="text-[30px] font-semibold">
          {currItem ? "Edit Address" : "Add Address"}
        </h1>
        <div className="flex flex-col space-y-[21px] mt-[9px]">
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
              {<AccountInput name="note" custom={"flex-1"} label="Note" />}
            </div>
            <div className="flex justify-between mt-[20px]">
              <p>Set as Default Address</p>
              <Form.Item name={"default"}>
                <Switch
                  className="bg-gray-300"
                  checked={checked}
                  onChange={(value) => handleCheck(value)}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
};

export default AddAddressModal;
