import React from "react";
import { Input, Form } from "antd";

const AccountInput = ({ label, custom, value, handleChange, name, rules }) => {
  return (
    <div className={custom}>
      <h3 className="input-label">{label}</h3>
      <Form.Item name={name} rules={rules}>
        <Input
          className={`default-input ${name!=='note'&&'capitalize'}`}
          value={value}
          onChange={handleChange}
        />
      </Form.Item>
    </div>
  );
};

export default AccountInput;
