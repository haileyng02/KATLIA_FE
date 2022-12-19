import React from 'react';

const ProductThumbnail2 = ({item}) => {
  return (
    <div className='flex light-blue-border flex-none'>
        <img src={item.image} alt='Product' className='aspect-square object-cover rounded-[8.5px] w-[124px]'/>
        <div className='flex flex-col justify-between ml-5 w-full'>
            <h3 className='text-[18px] text-kaliablue'>{item.name}</h3>
            <div className='row justify-between'>
              <p className='font-poppins text-kaliayellow font-bold'>{'$'+item.price}</p>
              <p className='text-[18px] text-kaliablue'>{'x'+item.quantity}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductThumbnail2