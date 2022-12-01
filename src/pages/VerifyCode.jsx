import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import signInProcess from "../utils/signInProcess";
import loadingIcon from "../images/loading.gif";

const VerifyCode = ({ type }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = location.state;
  let otp = "";

  const handleOnClick = async () => {
    if (otp === "") setError("Please enter OTP");
    else {
      setError("");
      setLoading(true);
      if (type === "signup") await signUpByEmailAndOTP();
      else await checkOTPForgotPassword();
      setLoading(false);
    }
  };

  //signUpByEmailAndOTP
  const signUpByEmailAndOTP = async () => {
    try {
      const result = await appApi.post(
        routes.SIGN_UP_OTP,
        routes.getSignupOTPBody(email, parseInt(otp))
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
        routes.getOTPForgotPassword(email, parseInt(otp))
      );
      console.log(result);
      if (result.data.message === 'OTP correct') {
        navigate('/signin')
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
            {"Enter the verification code sent to email " + email}
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
            <span className="text-primary">Resend again</span>
          </p>
        </div>
      </Spin>
    </div>
  );
};

export default VerifyCode;
