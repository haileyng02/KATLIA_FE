import React from 'react'
import SearchIcon from '../images/SearchIcon.svg'

const Search = () => {
  return (
    <div className='relative w-[277px] h-[37px]'>
        <input className='w-full h-full rounded-[30px] pl-[57px] pr-4 text-[20px] placeholder:text-placeholder' placeholder='Search' type="text"></input>
        <img src={SearchIcon} alt='Search Icon' className=' w-4 absolute top-[9px] ml-4'/>
    </div>
  )
}

export default Search