import React from 'react'
import { Input, Button } from 'antd'
import profileIcon from '../images/Profile2.svg'
import lockIcon from '../images/lock2.svg'
import googleIcon  from "../images/google_icon.svg"
import facebookIcon from '../images/facebook_icon.svg'
import authGif from '../images/auth-gif.gif'
import { useNavigate } from 'react-router-dom'
import appApi from '../api/appApi'

const SignIn = () => {
    const navigate = useNavigate()
    const handleOnClick = (path) => {
        navigate('/'+path);
    }
    //Sign in with email and password
    const signInWithEmailAndPassword = async () => {
        try {
            await appApi.po
        } catch (error) {
            
        }
    }

  return (
    <div className='px-[150px] py-8 flex'>
        <div className='auth-border items-center px-[89px] py-[50px]  w-[58%]'>
            <h1 className='text-[45px]'>Welcome To Katlia!</h1>
            <p className='mt-[9px]'>Sign in to continue.</p>
            <Input
            prefix={<img src={profileIcon} alt='Email' className='auth-prefix'/>}
            placeholder="Enter your email"
            className='auth-input mt-8'
            />
            <Input
            prefix={<img src={lockIcon} alt='Password' className='auth-prefix'/>}
            placeholder="Password"
            className='auth-input mt-7'
            />
            <div className='flex mt-[25px] justify-between w-full'>
                <div className='flex items-center'>
                    <input type={"checkbox"} name="remember" className='accent-black w-[18px] h-[18px] mr-[6px]'/>
                    <label for="remember" className='text-[14px]'>Remember for 30 days</label>
                </div>
                <p 
                onClick={() => handleOnClick('reset-password')}
                className='underline text-[14px] cursor-pointer'>Forgot password</p>
            </div>
            <button className='mt-[23px] auth-primary-button'>SIGN IN</button>
            <div className='flex mt-8 items-center justify-between w-full'>
                <span className='auth-line'></span>
                <p className='mx-2'>or</p>
                <span className='auth-line'></span>
            </div>
            <Button 
            icon={<img src={googleIcon} alt='Google'/>}
            className='mt-8 auth-input auth-button'>Sign in with Google</Button>
            <Button 
            icon={<img src={facebookIcon} alt='Facebook'/>}
            className='mt-[26px] auth-input auth-button'>Sign in with Facebook</Button>
            <p className='mt-[34px] text-black70'>Don't have an account? 
            <span 
            onClick={() => handleOnClick('signup')}
            className='text-primary cursor-pointer'> Sign up for free</span></p>
        </div>
        <img src={authGif} alt='Fashion' className='w-[42%] object-cover rounded-[5px]'/>
    </div>
  )
}

export default SignIn