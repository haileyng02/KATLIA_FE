import React from 'react'
import divider from '../images/Divider.svg'

const OrderItem = ({item}) => {
  return (
    <div className='flex flex-col gap-y-[12px] border-1 border-black p-4 rounded-[5px]'>
        <h2 className='text-[#223263] font-bold'>{item.id}</h2>
        <p className='order-detail-title'>{'Order at E-comm: '+item.date}</p>
        <img src={divider} alt='Divider'/>
        <div className='flex justify-between'>
            <h3 className='order-detail-title'>Order Status</h3>
            <p className='order-detail-value'>Shipping</p>
        </div>
        <div className='flex justify-between'>
            <h3 className='order-detail-title'>Items</h3>
            <p className='order-detail-value'>{item.totalQty+' Items purchased'}</p>
        </div>
        <div className='flex justify-between'>
            <h3 className='order-detail-title'>Price</h3>
            <p className='text-[#F9AF5E]'>{'$'+item.price}</p>
        </div>
    </div>
  )
}

export default OrderItem