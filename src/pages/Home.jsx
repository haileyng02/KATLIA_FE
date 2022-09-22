import React from 'react'
import mainPic1 from '../images/main-1.png'
import mainPic2 from '../images/main-2.png'
import mainArrow from '../images/shop-now-arrow.svg'

const Home = () => {
  return (
    <div className='px-[105px] py-[92px]'>
      {/* Main */}
      <div className=' h-[763px] relative'>
        {/* Title */}
        <div className='absolute left-[100px]'>
          <div className='flex gap-[73px]'>
            <div className='main-title'>
              <h1>KATLI</h1>
              <h1 className=' text-[#C85A27]'>A</h1>
            </div>
            <div className='main-title'>
              <h1 className=' text-[#C85A27]'>O</h1>
              <h1>NLINE</h1>
            </div>
          </div>
          <div className='main-title absolute -right-[48px]'>
            <h1>STORE</h1>
          </div>
        </div>
        <div className='h-full flex justify-between'>
          {/* IMG */}
          <div className='flex'>
            <img src={mainPic1} alt='Katlia Home' className='w-[324px] self-end mb-[70px]'/>
            <img src={mainPic2} alt='Katlia Home' className='w-[262px] self-start ml-7'/>
          </div>
          {/* INTRO */}
          <div className=' mb-[216px] self-end'>
            <p className=' text-20 leading-[25px] max-w-[405px]'>The customer is at the very center of our special business model, which includes design, production, distribute activities and sales through a wide network of our own stores.</p>
            {/* SHOP NOW */}
            <div className=' mt-[30px] relative'>
              <h3 className='text-20 leading-[25px] underline text-center'>SHOP NOW</h3>
              <img src={mainArrow} alt='Arrow' className=' absolute top-1/3 right-[70px]'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home