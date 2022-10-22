import React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import nameIcon from '../images/Profile2.svg'
import emailIcon from '../images/emailIcon.svg'
import lockIcon from '../images/lock2.svg'

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/signin");
  };
  return (
    <div className="auth-border mx-[150px] my-8 px-[189px] py-[116px]">
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
      <button className="mt-[37px] auth-primary-button">SIGN UP</button>
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
