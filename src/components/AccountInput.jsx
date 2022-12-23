import React from "react";
import { Input, Form } from "antd";
import ReadOnlySuffix from "./ReadOnlySuffix";

const AccountInput = ({ label, custom, value, handleChange, name, rules,readOnly }) => {
  return (
    <div className={custom}>
      <h3 className="input-label">{label}</h3>
      <Form.Item name={name} rules={rules}>
        <Input
          className={`default-input ${
            name !== "note" && name !== "email" && "capitalize"
          }`}
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
          suffix={readOnly && <ReadOnlySuffix />}
        />
      </Form.Item>
    </div>
  );
};

export default AccountInput;
