import React from 'react'
import { Outlet } from 'react-router-dom'
import { actionType } from '../context/Reducer'
import { useStateValue } from '../context/StateProvider'
import CartContainer from './CartContainer'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  const [{ cartShow }, dispatch] = useStateValue();
  let mySetToggleDrowdown;
  
  const handleHideDropdown = (setToggleDropdown) => {
    mySetToggleDrowdown = setToggleDropdown;
  };
  const handleHideCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };
  
  return (
    <>
      <Header onHideDropdown={handleHideDropdown} />
      <main
        className="py-8 px-4 md:py-10 md:px-8 w-full bg-primary"
        onClick={() => {
          mySetToggleDrowdown(false);
          handleHideCart();
        }}
      >
        <Outlet />
      </main>
      <CartContainer/>
      <Footer />
    </>
  );
}

export default Layout