import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import Profile from '../images/Profile.svg'
import Cart from '../images/Cart.svg'

const Header = () => {
  return (
    <div className='w-full h-[73px] bg-header flex fixed z-10'>
      <div className='mx-[38px] my-auto flex justify-between w-full'>
        <Link to="/">
          <h1 className=' text-[30px] font-logo font-bold leading-[38px]'>KATLIA</h1>
        </Link>
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