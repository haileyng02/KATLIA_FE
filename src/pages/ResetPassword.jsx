import React from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/reset-password/verify-code')
  };
  return (
    <div className="px-[53px] py-16 auth-border w-[728px] mx-auto mt-[170px]">
      <h1 className="text-40">Reser your password</h1>
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
