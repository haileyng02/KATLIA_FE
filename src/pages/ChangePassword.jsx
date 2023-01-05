import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Spin } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import PasswordInput from "../components/PasswordInput";
import { openNotification } from "../actions/notification";
import logOutProgress from "../utils/logOutProgress";

const ChangePassword = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  //Change password
  const changePassword = async (oldPass, newPass, confirmPass) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.put(
        routes.CHANGE_PASSWORD,
        routes.getChangePasswordBody({ oldPass, newPass, confirmPass }),
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data);
      dispatch(openNotification({
        type: "success",
        message: "Your password has been changed!",
        description:
          "Please re-login to the website.",
      }))
      logOutProgress(dispatch,navigate);
    } catch (err) {
      form.setFields([
        {
          name: "current",
          errors: [err.response.data.message],
        },
      ]);
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
    form.validateFields().then((values) => {
      if (values.new !== values.confirm) {
        form.setFields([
          {
            name: "confirm",
            errors: ["The passwords do not match"],
          },
        ]);
      } else {
        changePassword(values.current, values.new, values.confirm);
      }
    });
  };

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col">
        <h1 className="account-title">Change Password</h1>
        <p className="text-account-divider mt-3 w-[70%]">
          Password must contain at least 6 letters.
        </p>
        {/* Current password */}
        <Form form={form}>
          <PasswordInput
            custom={"mt-[25px]"}
            label="Current password"
            name={"current"}
            rules={[
              {
                required: true,
                message: "Please enter current password",
              },
            ]}
          />
          {/* New password */}
          <PasswordInput
            custom={"mt-[25px]"}
            label="New password"
            name={"new"}
            rules={[
              {
                required: true,
                message: "Please enter new password",
              },
              {
                validator: (_, value) => {
                  if (value.length >= 6 || !value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      "Password must contain at least 6 letters"
                    );
                  }
                },
              },
            ]}
          />
          {/* Confirm password */}
          <PasswordInput
            custom={"mt-[19px]"}
            label="Confirm password"
            name={"confirm"}
            rules={[
              {
                required: true,
                message: "Please confirm new password",
              },
            ]}
          />
        </Form>
        {/* Confirm */}
        <button
          onClick={handleOk}
          className="default-button w-[213px] h-[71px] mt-[30px] self-end"
        >
          Confirm
        </button>
      </div>
    </Spin>
  );
};

export default ChangePassword;
