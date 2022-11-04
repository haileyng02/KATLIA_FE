import React from 'react'
import { useNavigate } from "react-router-dom";
import appApi from '../api/appApi';

const VerifyCode = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/reset-password/new-password')
  }
  //signUpByEmailAndOTP
  const signUpByEmailAndOTP = async () => {
    try {
      await appApi.post(
        routes.SIGN_UP_OTP,
        routes.getSignupOTPBody("saovayta2131@gmail.com", "0")
      );
      
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  };

  return (
    <div className='auth-border mt-[170px] mx-auto w-[728px] px-[53px] py-16'>
      <h1 className='text-40'>Verify Code</h1>
      <p className='text-[#888888] mt-[27px]'>Enter the verification code sent to email abc@gmail.com</p>
      <input className='mt-[117px] h-[125px] black-rounded-border text-[45px] px-8 text-center'/>
      <button 
      onClick={handleOnClick}
      className='auth-primary-button mt-[130px]'>Verify</button>
      <p className='text-black70 mt-[9px] text-center'>Did not receive the verification OTP? <span className='text-primary'>Resend again</span></p>
    </div>
  )
}

export default VerifyCode 