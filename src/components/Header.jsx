import React from 'react'
import Search from './Search'
import Profile from '../images/Profile.svg'
import Cart from '../images/Cart.svg'

const Header = () => {
  return (
    <div className=' w-screen h-[110px] bg-header flex'>
      <div className='mx-[38px] my-auto flex justify-between w-full'>
        <h1 className=' text-[36px] font-logo font-bold leading-[39px]'>KATLIA</h1>
        <ul className='flex'>
          <li className='nav-item'>MEN</li>
          <li className='nav-item'>WOMEN</li>
          <li className='nav-item'>SALE</li>
          <li className='nav-item'>CONTACT</li>
          <li className='nav-item'>ABOUT</li>
        </ul>
        <Search/>
        <div className='flex'>
          <img src={Profile} alt='Profile icon' className=' w-7'/>
          <img src={Cart} alt='Cart icon' className=' w-8 ml-[15px]'/>
        </div>
      </div>
    </div>
  )
}

export default Header