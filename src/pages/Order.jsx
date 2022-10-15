import React from 'react'
import OrderItem from '../components/OrderItem'

const Order = () => {
  const orderData = [
    {
      id: 'LQNSU346JK',
      date: 'September 27, 2022',
      orderStatus: 'Shipping',
      totalQty : 2,
      price: 101.84
    },
    {
      id: 'SDG1345KJD',
      date: 'September 28, 2022',
      orderStatus: 'Shipping',
      totalQty : 1,
      price: 41.50  
    }
  ]
  return (
    <div>
      <h1 className='account-title'>Order</h1>
      <div className="mt-[23px] flex flex-col gap-y-[12px]">
        {orderData.map((o,i) => 
          <OrderItem key={i} item={o}/>
        )}
      </div>
    </div>
  )
}

export default Order