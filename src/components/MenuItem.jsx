import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { MdShoppingBasket } from "react-icons/md";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';

const MenuItem = ({item, title, calories, price, photoURL }) => {
 const [{ cartItems }, dispatch] = useStateValue();

 const handleAddToCart = () => {
   dispatch({
     type: actionType.SET_CART_ITEMS,
     cartItems: [...cartItems, item],
   });

   localStorage.setItem("cartItems", JSON.stringify([...cartItems, item]));
 };

 return (
   <div className="bg-card w-[310px] mx-auto shadow-lg backdrop-blur-lg px-5 py-4 min-h-[215px] flex items-center justify-between rounded-lg">
     <motion.img
       whileHover={{ scale: 1.05 }}
       className="w-32 h-32"
       src={photoURL}
       alt={title}
     />
     <div className="w-full flex flex-col items-center gap-2">
       <p className="text-textColor font-semibold text-base md:text-lg text-center">
         {title}
       </p>
       <p className="text-base text-gray-500">{calories} Calories</p>
       <p className="text-base font-semibold">
         $ {price % 1 !== 0 ? price : price + ".00"}
       </p>
       <motion.div
         title="Add to Cart"
         whileTap={{ scale: 0.7 }}
         className="w-10 h-10 rounded-full mx-auto bg-red-400 flex justify-center items-center cursor-pointer hover:shadow-lg"
         onClick={handleAddToCart}
       >
         <MdShoppingBasket className="text-white" />
       </motion.div>
     </div>
   </div>
 );

}

export default MenuItem