import React from 'react'
import appApi from '../api/appApi';
import * as routes from '../api/apiRoutes'

const NewPassword = () => {
  //New password after verify
  const newPasswordAfterVerify = async () => {
    try {
      await appApi.patch(
        routes.NEW_PASSWORD_AFTER_VERIFY,
        routes.getNewPasswordBody("saovayta2131@gmail.com", "654321")
      )
      console.log('Changed password')
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
    <div className='auth-border mt-[170px] w-[728px] mx-auto px-[52px] py-16'>
      <h1 className='text-40'>New Password</h1>
      <p className='mt-[27px] text-[#888888]'>Enter your new account password, please fill in the fields below.</p>
      <input
      placeholder='New Password' 
      className='auth-input mt-[34px]'/>
      <input
      placeholder='Confirm Password' 
      className='auth-input mt-5'/>
      <button onClick={newPasswordAfterVerify} className='auth-primary-button mt-[248px]'>Confirm</button>
    </div>
  )
}

export default NewPassword