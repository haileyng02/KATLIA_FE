import React from 'react'
import { Link } from 'react-router-dom'

const ProductThumbnail = ({item}) => {
  return (
    <Link to={`/product/${item.id}`} state={item}>
      <div>
          <img src={item.image} alt='Item' className='aspect-[2/3] object-cover object-center'/>
          <div className='mt-[23px] leading-6'>
              {item.colors===1||<p>{'+'+(item.colors-1)+' COLOURS'}</p>}
              <h2>{item.name}</h2>
              <p>{item.price+' $'}</p>
          </div>
      </div>
    </Link>
  )
}

export default ProductThumbnail