import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { signIn } from "../actions/auth";
import loadingIcon from "../images/loading.gif";

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = location.state;
  let otp = "";

  const handleOnClick = () => {
    if (otp === "") setError("Please enter OTP");
    else {
      setError("");
      signUpByEmailAndOTP();
    }
  };

  //signUpByEmailAndOTP
  const signUpByEmailAndOTP = async () => {
    setLoading(true);
    try {
      const result = await appApi.post(
        routes.SIGN_UP_OTP,
        routes.getSignupOTPBody(email, parseInt(otp))
      );
      if (result.data.access_token != null) {
        dispatch(signIn(result.data.access_token));
        localStorage.setItem('user',result.data.access_token);
        navigate('/',{state:{
          notification: {
            type: 'success',
            message: 'Success',
            description : 'Congratulations, your account has been successfully created.'
          }
        }});
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
    setLoading(false);
  };

  return (
    <div className="auth-border mt-[70px] mx-auto w-[728px] px-[53px] py-16">
      <Spin
        size="large"
        spinning={loading}
        indicator={
          <img src={loadingIcon} alt="Loading" className="w-14 h-14" />
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
