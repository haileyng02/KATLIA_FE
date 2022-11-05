import React from 'react'
import appApi from '../api/appApi'

const CategoryBar = ({ currCategory, categories, categoryClick }) => {
  const getProductByCategoryId = async () => {
    try {
      await appApi.
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } 
      else {
        console.log(err.message)
      }
    } 
  }
  return (
    <div className=''>
      {/* Menu Title */}
      <h1 className=' text-[35px] leading-[44px] font-bold'>Men</h1>

      {/* Side category bar */}
      <nav>
        <ul className={`mt-[59px] space-y-[63px]`}>
          {categories.map((c, i) => <li
            className={`cursor-pointer hover:text-black ${currCategory === c ? 'text-black' : 'text-menu-nav'}`}
            key={i}
            onClick={() => categoryClick(c)}>
            {c}
          </li>)}
        </ul>
      </nav>
    </div>
  )
}

export default CategoryBar