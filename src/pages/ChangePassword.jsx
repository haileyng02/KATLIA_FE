import React from 'react'
import PasswordInput from '../components/PasswordInput'

const ChangePassword = () => {
  return (
    <div className='flex flex-col'>
      <h1 className='account-title'>Change Password</h1>
      <p className='text-account-divider mt-3 w-[70%]'>Password must contain at least 1 letter, 1 number and 1 symbol. Minimum length is 12 characters.</p>
      {/* New password */}
      <PasswordInput custom={'mt-[25px]'} label='New password'/>
      {/* New password */}
      <PasswordInput custom={'mt-[19px]'} label='Confirm password'/>
      {/* Confirm */}
      <button className='default-button w-[213px] h-[71px] mt-[30px] self-end'>Confirm</button>
    </div>  
  )
}

export default ChangePassword