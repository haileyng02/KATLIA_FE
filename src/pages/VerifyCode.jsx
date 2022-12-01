import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { openNotification } from "../actions/notification";
import signInProcess from "../utils/signInProcess";
import loadingIcon from "../images/loading.gif";

const VerifyCode = ({ type }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const account = location.state;
  let otp = "";

  const handleOnClick = async () => {
    if (otp === "") setError("Please enter OTP");
    else {
      setError("");
      setLoading(true);
      if (type === "signup") await signUpByEmailAndOTP();
      else if (type === "forget") await checkOTPForgotPassword();
      setLoading(false);
    }
  };

  const handleResent = async () => {
    setLoading(true);
    if (type === "signup") await createNewAccount();
    else if (type === "forget") await verifyEmailForgotPassword();
    setLoading(false);
  };

  //signUpByEmailAndOTP
  const signUpByEmailAndOTP = async () => {
    try {
      const result = await appApi.post(
        routes.SIGN_UP_OTP,
        routes.getSignupOTPBody(account.email, parseInt(otp))
      );
      if (result.data.access_token != null) {
        signInProcess({
          token: result.data.access_token,
          notification: {
            type: "success",
            message: "Success",
            description:
              "Congratulations, your account has been successfully created.",
          },
          isChecked: false,
          dispatch,
          navigate,
        });
      } else {
        setError("Incorrect OTP");
      }
      console.log(result);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  //Check otp forgot password
  const checkOTPForgotPassword = async () => {
    try {
      const result = await appApi.post(
        routes.CHECK_OTP_FORGOT_PASSWORD,
        routes.getOTPForgotPassword(account.email, parseInt(otp))
      );
      console.log(result);
      if (result.data.message === "OTP correct") {
        dispatch(
          openNotification({
            type: "success",
            message: "Password changed!",
            description: "Your password has been changed successfully.",
          })
        );
        navigate("/signin");
      } else {
        setError("Incorrect OTP");
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  //verifyEmailForSignUp
  const createNewAccount = async () => {
    try {
      const result = await appApi.post(
        routes.SIGN_UP,
        routes.getSignupBody(account.email, account.name, account.password)
      );
      console.log(result);
      dispatch(
        openNotification({
          type: "success",
          message: "OTP sent",
          description: "OTP has been sent successfully!",
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
  };

  //Verify email forgot password
  const verifyEmailForgotPassword = async () => {
    try {
      const result = await appApi.post(
        routes.VERIFY_EMAIL_FORGOT_PASSWORD,
        routes.getVerifyForgotPasswordBody(account.email)
      );
      console.log(result);
      dispatch(
        openNotification({
          type: "success",
          message: "OTP sent",
          description: "OTP has been sent successfully!",
        })
      );
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="auth-border mt-[70px] mx-auto w-[728px] px-[53px] py-16">
      <Spin
        size="large"
        spinning={loading}
        indicator={
          <img src={loadingIcon} alt="Loading" className="w-10 h-10" />
        }
      >
        <div className="flex flex-col">
          <h1 className="text-40">Verify Code</h1>
          <p className="text-[#888888] mt-[27px]">
            {"Enter the verification code sent to email " + account.email}
          </p>
          <input
            className="mt-[117px] h-[125px] black-rounded-border text-[45px] px-8 text-center"
            maxLength={6}
            onChange={(e) => {
              otp = e.target.value;
            }}
          />
          <p hidden={error === ""} className="text-red-600">
            {error}
          </p>
          <button
            onClick={handleOnClick}
            className="auth-primary-button mt-[130px]"
          >
            Verify
          </button>
          <p className="text-black70 mt-[9px] text-center">
            Did not receive the verification OTP?{" "}
            <span
              onClick={() => handleResent()}
              className="text-primary cursor-pointer"
            >
              Resend again
            </span>
          </p>
        </div>
      </Spin>
    </div>
  );
};

export default VerifyCode;
