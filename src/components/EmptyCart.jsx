import React from 'react';
import EmptyCartImg from "../images/emptyCart.svg";

const EmptyCart = () => {
  return (
      <div className='w-full bg-white h-full flex flex-col items-center justify-center gap-6'>
          <img src={EmptyCartImg} className="w-300" alt="empty-cart" />
          <p className='text-xl text-textColor font-semibold'>Add some items to your cart</p>
    </div>
  )
}

export default EmptyCart