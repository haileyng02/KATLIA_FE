import React from 'react'

const ProductThumbnail = ({item}) => {
  return (
    <div>
        <img src={item.image} alt='Item' className='aspect-[75/113]'/>  
        <div className='mt-[23px] leading-6'>
            {item.colors===1||<p>{'+'+(item.colors-1)+' COLOURS'}</p>}
            <h2>{item.name}</h2>
            <p>{item.price+' $'}</p>
        </div>
    </div>
  )
}

export default ProductThumbnail