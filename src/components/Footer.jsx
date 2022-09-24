import React from 'react'

const Footer = () => {
  return (
    <footer className='flex px-[150px] pt-[213px] pb-[80px] justify-between'>
      <div>
        <h4 className='footer-col-title'>HELP</h4>
        <ul className='footer-col-item'>
          <li>SHOP AT KATLIA.COM</li>
          <li>PRODUCT</li>
          <li>PAYMENT</li>
          <li>SHIPPING</li>
          <li>EXCHANGES AND RETURNS</li>
          <li>PHONE NUMBER: </li>
          <li>EMAIL: </li>
        </ul>
      </div>
      <div>
        <h4 className='footer-col-title'>FOLLOW US</h4>
        <ul className='footer-col-item'>
          <li>TIKTOK</li>
          <li>FACEBOOK</li>
          <li>INSTAGRAM</li>
        </ul>
      </div>
      <div>
        <h4 className='footer-col-title'>COMPANY</h4>
        <ul className='footer-col-item'>
          <li>ABOUT US</li>
          <li>OFFICES</li>
          <li>STORES</li>
        </ul>
      </div>
      <div>
        <h4 className='footer-col-title'>POLICIES</h4>
        <ul className='footer-col-item'>
          <li>PRIVACY POLICY</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer