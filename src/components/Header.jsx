import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Search from './Search'
import Profile from '../images/Profile.svg'
import Cart from '../images/Cart.svg'

const Header = () => {
  const navigate = useNavigate();
  
  const navData = [
    'MEN',
    'WOMEN',
    'SALE',
    'CONTACT',
    'ABOUT'
  ]

  const handleNavClick = (navItem) => {
    const path = String(navItem).toLowerCase();
    navigate('/' + path)
  }
  return (
    <div className='w-full h-[73px] bg-header flex fixed z-10'>
      <div className='mx-[38px] my-auto flex justify-between w-full'>
        <Link to="/">
          <h1 className=' text-[30px] font-logo font-bold leading-[38px]'>KATLIA</h1>
        </Link>
        <ul className='flex'>
          {navData.map((n,i) => <li 
          className='nav-item'
          onClick={() => handleNavClick(n)}
          >
          {n}
          </li>)}
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