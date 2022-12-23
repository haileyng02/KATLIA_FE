import React, { useState, useEffect } from "react";
import { Form, Switch } from "antd";
import AccountInput from "../components/AccountInput";
import AddressSelect from "./AddressSelect";

const AddressForm = ({ form, currItem, open, checked, setChecked }) => {
  useEffect(() => {
    if (!open) return;
    if (currItem) {
      form.setFieldsValue({
        name: currItem.fullname,
        phoneNumber: currItem.phonenumber,
        address: currItem.address,
        note: currItem.note,
      });
      console.log(currItem.setAsDefault);
      handleCheck(currItem.setAsDefault);
    } else {
      form.resetFields();
      handleCheck(false);
    }
  }, [currItem, form, open]);

  const handleCheck = (value) => {
    setChecked(value);
    form.setFieldsValue({
      default: value,
    });
  };

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
      <AddressSelect form={form} open={open} currItem={currItem} containNote validate/>
      <div className="flex justify-between">
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
  );
};

export default AddressForm;
