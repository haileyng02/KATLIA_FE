import React from 'react'

const ProductThumbnail3 = ({item}) => {
  return (
    <div className='flex flex-none'>
        <img src={item.image} alt='Item' className='aspect-[5/6] max-h-[150px] object-cover object-center'/>
        <div className='ml-[14px] flex flex-col justify-between items-start w-full'>
            <h3 className='text-[#262626]'>{item.name}</h3>
            <div className='flex justify-between w-full'>
                <p>{'x'+item.quantity}</p>
                <p className='text-[#262626]'>{'$'+item.unit}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductThumbnail3