import React from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { useState } from "react";

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isError, setError] = useState(false);

  const email = location.state;
  let otp='';

  const handleOnClick = () => {
    // navigate('/reset-password/new-password')
    console.log(otp);
  };
  //signUpByEmailAndOTP
  const signUpByEmailAndOTP = async () => {
    try {
      await appApi.post(
        routes.SIGN_UP_OTP,
        routes.getSignupOTPBody(email, "817731")
      );
      console.log("Success");
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
      <h1 className="text-40">Verify Code</h1>
      <p className="text-[#888888] mt-[27px]">
        {"Enter the verification code sent to email " + email}
      </p>
      <input
        className="mt-[117px] h-[125px] black-rounded-border text-[45px] px-8 text-center"
        maxLength={6}
        onChange={e=>{
          otp = e.target.value;
        }}
      />
      <p hidden={true} className="text-red-600">
        Please enter OTP
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
  );
};

export default VerifyCode;
