import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Spin } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import loadingIcon from "../images/loading2.gif";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOnClick = () => {
    form.validateFields().then((values) => {
      verifyEmailForgotPassword(values.email);
    });
  };
  //Verify email forgot password
  const verifyEmailForgotPassword = async (email) => {
    setLoading(true);
    try {
      const result = await appApi.post(
        routes.VERIFY_EMAIL_FORGOT_PASSWORD,
        routes.getVerifyForgotPasswordBody(email)
      );
      console.log(result);
      navigate("/reset-password/verify-code", { state: {email} });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        form.setFields([
          {
            name: "email",
            errors: [err.response.data.message],
          },
        ]);
      } else {
        // console.log(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="px-[53px] py-16 auth-border w-[728px] mx-auto mt-[170px]">
      <Spin
        spinning={loading}
        indicator={<img src={loadingIcon} alt="Loading" className="w-8 h-8" />}
      >
        <h1 className="text-40">Reset your password</h1>
        <p className="mt-[27px] text-[#888888]">
          Enter the email address you used to sign up to Katlia. We will send
          you a link to reset your password.
        </p>
        <Form form={form}>
          <Form.Item
            name={"email"}
            rules={[
              {
                required: true,
                message: "You must enter your email",
              },
              {
                type: "email",
                message: "This is not a valid email",
              },
            ]}
          >
            <Input placeholder="Enter your email" className="auth-input mt-9" />
          </Form.Item>
        </Form>
        <button
          onClick={handleOnClick}
          className="auth-primary-button mt-[250px]"
        >
          Send password reset email
        </button>
      </Spin>
    </div>
  );
};

export default ResetPassword;
