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
  myDiv
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
  }

  return (
    <Modal
      open={open}
      centered
      width={950}
      footer={null}
      bodyStyle={{
        paddingLeft: 100,
        paddingRight: 100,
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
        <div className="flex gap-x-[162px] mt-6 justify-between h-[71px] text-[36px]">
          <button
            onClick={handleCancel}
            className="flex-1 border-1 border-gray-400 rounded-[7px] hover:border-secondary hover:text-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleOk}
            className="flex-1 bg-primary hover:bg-secondary text-white rounded-[7px]"
          >
            {currItem ? "Confirm" : "Add Address"}
          </button>
        </div>
      </Spin>
    </Modal>
  );
};

export default AddAddressModal;
