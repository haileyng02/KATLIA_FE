import React from 'react'
import { Link } from 'react-router-dom'

const ProductThumbnail = ({item,imageCustom,custom}) => {
  return (
    <Link to={`/product/${item.id}`} state={item.id} className={custom}>
      <div>
          <img src={item.image} alt='Item' className={`aspect-[2/3] object-cover object-center ${imageCustom}`}/>
          <div className={`mt-[23px] leading-6 ${imageCustom}`}>
              {item.colorNumber===1||<p>{'+'+(item.colorNumber-1)+' COLOURS'}</p>}
              <h2 className='product-name'>{item.name}</h2>
              <p>{item.price+' $'}</p>
          </div>
      </div>
    </Link>
  )
}

export default ProductThumbnail