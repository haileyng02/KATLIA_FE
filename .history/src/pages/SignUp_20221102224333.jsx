import React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import nameIcon from '../images/Profile2.svg'
import emailIcon from '../images/emailIcon.svg'
import lockIcon from '../images/lock2.svg'
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'
import { useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/signin");
  };

  const signUpByEmailAndOTP = async () => {
    try {
      await api.post(
        routes.SIGN_UP, 
        routes.getSignupBody("saovayta2131@gmail.com", "Kien", "123456")
        );
      console.log('Success');
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
    <div className="auth-border items-center w-[1000px] mx-auto mt-[115px] px-[189px] py-[116px]">
      <h1 className="text-[45px]">Let's Get Started</h1>
      <p className="mt-[2px]">Create an new account.</p>
      <div className="mt-[50px] flex flex-col gap-y-7 w-full">
          <Input 
          prefix={<img src={nameIcon} alt='Name' className="auth-prefix"/>}
          placeholder='Full Name'
          className='auth-input'/>
          <Input 
          prefix={<img src={emailIcon} alt='Email' className="auth-prefix"/>}
          placeholder='Your Email'
          className='auth-input'/>
          <Input 
          prefix={<img src={lockIcon} alt='Password' className="auth-prefix"/>}
          placeholder='Password'
          className='auth-input'/>
          <Input 
          prefix={<img src={lockIcon} alt='Password again' className="auth-prefix"/>}
          placeholder='Password Again'
          className='auth-input'/>
      </div>
      <button onClick={signUpByEmailAndOTP} className="mt-[37px] auth-primary-button">SIGN UP</button>
      <p className="mt-[33px] text-black70">
        Already have an account?
        <span onClick={handleSignIn} className="text-primary cursor-pointer">
          {" "}
          Sign in
        </span>
      </p>
    </div>
  );
};

export default SignUp;
