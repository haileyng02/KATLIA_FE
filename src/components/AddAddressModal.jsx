import React, { useState, useEffect } from "react";
import { Modal, Form, Spin } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import AddressForm from "./AddressForm";

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

  useEffect(() => {}, [currItem, form, open]);

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
          ...routes.getUpdateAddressIdParams("63a07f64900f9f3f53baa7a0"),
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

  return (
    <Modal
      open={open}
      centered
      width={950}
      footer={[
        <button
          onClick={handleCancel}
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
          <AddressForm
            form={form}
            currItem={currItem || ""}
            open={open}
            checked={checked}
            setChecked={setChecked}
          />
        </div>
      </Spin>
    </Modal>
  );
};

export default AddAddressModal;
