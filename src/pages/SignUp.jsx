import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Form, Button, Spin } from "antd";
import nameIcon from "../images/Profile2.svg";
import emailIcon from "../images/emailIcon.svg";
import lockIcon from "../images/lock2.svg";
import loadingIcon from "../images/loading.gif";
import api from "../api/appApi";
import * as routes from "../api/apiRoutes";

const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  const handleSignIn = () => {
    navigate("/signin");
  };

  //verifyEmailForSignUp
  const createNewAccount = async (email, name, password) => {
    setLoading(true);
    try {
      const result = await api.post(
        routes.SIGN_UP,
        routes.getSignupBody(email, name, password)
      );
      console.log(result);
      if (result.data.name === "ForbiddenException") {
        form.setFields([
          {
            name: "email",
            errors: ["Email already exists"],
          },
        ]);
      } else
        navigate("/signup/verify-code", { state: { email, name, password } });
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

  const onFinish = (values) => {
    createNewAccount(values.email, values.name, values.password);
  };

  return (
    <div className="auth-border w-[1000px] mx-auto mt-[115px] px-[189px] py-[116px]">
      <Spin
        size="large"
        spinning={isLoading}
        indicator={
          <img src={loadingIcon} alt="Loading" className="w-14 h-14" />
        }
      >
        <div className="flex flex-col items-center">
          <h1 className="text-[45px]">Let's Get Started</h1>
          <p className="mt-[2px]">Create an new account.</p>
          <Form
            form={form}
            className="mt-[50px] flex flex-col w-full gap-y-1"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "You must enter your name",
                },
              ]}
            >
              <Input
                prefix={
                  <img src={nameIcon} alt="Name" className="auth-prefix" />
                }
                placeholder="Full Name"
                className="auth-input"
              />
            </Form.Item>
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
              <Input
                prefix={
                  <img src={emailIcon} alt="Email" className="auth-prefix" />
                }
                placeholder="Your Email"
                className="auth-input"
              />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "You must enter password",
                },
                {
                  min: 6,
                  message: "Your password must contain at least 6 characters",
                },
              ]}
            >
              <Input
                prefix={
                  <img src={lockIcon} alt="Password" className="auth-prefix" />
                }
                placeholder="Password"
                type="password"
                className="auth-input"
              />
            </Form.Item>
            <Form.Item
              name={"confirmPassword"}
              rules={[
                {
                  required: true,
                  message: "You must confirm password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={
                  <img
                    src={lockIcon}
                    alt="Confirm Password"
                    className="auth-prefix"
                  />
                }
                placeholder="Confirm Password"
                type="password"
                className="auth-input"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                htmlType="submit"
                className="mt-[37px] auth-primary-button"
              >
                SIGN UP
              </Button>
            </Form.Item>
          </Form>
          <p className="mt-[33px] text-black70">
            Already have an account?
            <span
              onClick={handleSignIn}
              className="text-primary cursor-pointer"
            >
              {" "}
              Sign in
            </span>
          </p>
        </div>
      </Spin>
    </div>
  );
};

export default SignUp;
