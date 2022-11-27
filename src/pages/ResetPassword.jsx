import React from "react";
import { useNavigate } from "react-router-dom";
import appApi from '../api/appApi'
import * as routes from '../api/apiRoutes'

const ResetPassword = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/reset-password/verify-code')
  };
  //Verify email forgot password
  const verifyEmailForgotPassword = async () => {
    try {
      await appApi.post(
        routes.VERIFY_EMAIL_FORGOT_PASSWORD,
        routes.getVerifyForgotPasswordBody("saovayta2131@gmail.com")
      )
      console.log('Success')
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }
  return (
    <div className="px-[53px] py-16 auth-border w-[728px] mx-auto mt-[170px]">
      <h1 onClick={verifyEmailForgotPassword} className="text-40">Reser your password</h1>
      <p className="mt-[27px] text-[#888888]">
        Enter the email address you used to sign up to Riverside. We will send
        you a link to reset your password.
      </p>
      <input placeholder="Enter your email" className="auth-input mt-9" />
      <button 
      onClick={handleOnClick}
      className="auth-primary-button mt-[272px]">
        Send password reset email
      </button>
    </div>
  );
};

export default ResetPassword;
