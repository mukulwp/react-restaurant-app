import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import CartItem from "./CartItem";
import Button from "./Button";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";
import EmptyCart from "./EmptyCart";
import { handleLogin } from "./Header";

const CartContainer = () => {
  const [flag, setFlag] = useState(1);
  const [total, setTotal] = useState(0);
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

  const handleHideCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };
   useEffect(() => {
     let totalPrice = cartItems.reduce(function (accumulator, item) {
       return accumulator + item.qty * item.price;
     }, 0);
     setTotal(totalPrice);
   }, [total, flag, cartItems]);

   const clearCart = () => {
     dispatch({
       type: actionType.SET_CART_ITEMS,
       cartItems: [],
     });

     localStorage.setItem("cartItems", JSON.stringify([]));
   };
  return (
    <div
      className={`fixed top-0 rounded-t-[2rem] w-full sm:w-375 z-[100] h-screen bg-slate-900 drop-shadow-md flex flex-col transition-all duration-300 ease-linear ${
        cartShow ? "right-0" : "-right-[30rem]"
      }`}
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={handleHideCart}>
          <MdOutlineKeyboardBackspace
            title="Close"
            className="text-white text-3xl"
          />
        </motion.div>
        <p className="text-white text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 py-1 px-2 my-2 bg-gray-100 rounded-md cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {/* Cart Bottom */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full relative h-full bg-black flex flex-col">
          <div className="w-full h-[420px] px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {cartItems &&
              cartItems.map((cartItem, index) => {
                return (
                  <CartItem
                    key={index}
                    title={cartItem.title}
                    price={cartItem.price}
                    photoURL={cartItem.imageURL}
                    item={cartItem}
                    flag={flag}
                    setFlag={setFlag}
                  />
                );
              })}
          </div>
          <div className="w-full bg-slate-900 rounded-t--[2rem] absolute bottom-0 flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {total}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery Charge</p>
              <p className="text-gray-400 text-lg">$ 5.5</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between mb-2">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">$ {total + 5.5}</p>
            </div>
            {user ? (
              <motion.div whileTap={{ scale: 0.8 }}>
                <Button btnText={"Check Out"} />
              </motion.div>
            ) : (
              <motion.div whileTap={{ scale: 0.8 }} onClick={handleLogin}>
                <Button btnText={"Login to check out"} />
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default CartContainer;
