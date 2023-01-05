import React from "react";
import { Input, Form } from "antd";
import lockIcon from "../images/lock.svg";
import openedEyeIcon from "../images/eye.svg";
import closedEyeIcon from "../images/eyeClosed.svg";

const PasswordInput = ({ custom, label,name,rules }) => {
  return (
    <div className={custom}>
      <h2 className="text-account-divider">{label}</h2>
      <Form.Item name={name} rules={rules}>
        <Input.Password
          prefix={<img src={lockIcon} alt="Lock" className="mr-4" />}
          iconRender={(visible) =>
            visible ? (
              <img src={openedEyeIcon} alt="Opened eye" />
            ) : (
              <img src={closedEyeIcon} alt="Closed eye" />
            )
          }
          autoComplete="new-password"
          className="changepassword-input"
        />
      </Form.Item>
    </div>
  );
};

export default PasswordInput;
