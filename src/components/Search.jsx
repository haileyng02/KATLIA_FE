import React from 'react'
import SearchIcon from '../images/SearchIcon.svg'

const Search = () => {
  return (
    <div className='relative w-[302px] h-[41px]'>
        <input className='w-full h-full rounded-[30px] pl-[57px] pr-4 text-[24px] placeholder:text-placeholder' placeholder='Search' type="text"></input>
        <img src={SearchIcon} alt='Search Icon' className='absolute top-[6px] ml-4'/>
    </div>
  )
}

export default Search