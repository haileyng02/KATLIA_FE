import React from 'react'

const NewPassword = () => {
  return (
    <div className='auth-border mt-[170px] w-[728px] mx-auto px-[52px] py-16'>
      <h1 className='text-40'>New Password</h1>
      <p className='mt-[27px] text-[#888888]'>Enter your new account password, please fill in the fields below.</p>
      <input
      placeholder='New Password' 
      className='auth-input mt-[34px]'/>
      <input
      placeholder='Confirm Password' 
      className='auth-input mt-5'/>
      <button className='auth-primary-button mt-[248px]'>Confirm</button>
    </div>
  )
}

export default NewPassword