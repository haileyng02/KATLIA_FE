import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Spin } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { openNotification } from "../actions/notification";
import loadingIcon from "../images/loading2.gif";

const NewPassword = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const email = location.state;

  //New password after verify
  const newPasswordAfterVerify = async (password) => {
    setLoading(true);
    try {
      const result = await appApi.patch(
        routes.NEW_PASSWORD_AFTER_VERIFY,
        routes.getNewPasswordBody(email, password)
      );
      console.log(result);
      navigate('/signin')
      dispatch(
        openNotification({
          type: "success",
          message: "Password changed!",
          description: "Your password has been changed successfully.",
        })
      );
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

  const handleOnClick = () => {
    form.validateFields().then((values) => {
      console.log(values.password);
      newPasswordAfterVerify(values.password);
    });
  };

  return (
    <div className="auth-border mt-[170px] w-[728px] mx-auto px-[52px] py-16">
      <Spin
        spinning={loading}
        indicator={<img src={loadingIcon} alt="Loading" className="w-8 h-8" />}
      >
        <h1 className="text-40">New Password</h1>
        <p className="mt-[27px] text-[#888888]">
          Enter your new account password, please fill in the fields below.
        </p>
        <Form form={form}>
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
            <Input.Password
              placeholder="New Password"
              className="auth-input mt-[34px]"
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
            <Input.Password
              placeholder="Confirm Password"
              className="auth-input mt-5"
            />
          </Form.Item>
        </Form>
        <button
          onClick={() => handleOnClick()}
          className="auth-primary-button mt-[248px]"
        >
          Confirm
        </button>
      </Spin>
    </div>
  );
};

export default NewPassword;
