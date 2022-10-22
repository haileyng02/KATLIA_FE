import React from 'react'

const VerifyCode = () => {
  return (
    <div className='auth-border mt-[170px] mx-auto w-[728px] px-[53px] py-16'>
      <h1 className='text-40'>Verify Code</h1>
      <p className='text-[#888888] mt-[27px]'>Enter the verification code sent to email abc@gmail.com</p>
      <input className='mt-[117px] h-[125px] border-1 border-black rounded-[10px] text-[45px] px-8 text-center'/>
      <button className='auth-primary-button mt-[130px]'>Verify</button>
      <p className='text-black70 mt-[9px] text-center'>Did not receive the verification OTP? <span className='text-primary'>Resend again</span></p>
    </div>
  )
}

export default VerifyCode 