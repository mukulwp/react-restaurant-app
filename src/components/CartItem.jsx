import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";
let items = [];

const CartItem = ({flag, setFlag, item, title, price, photoURL}) => {
  const [qty, setQty] = useState(item.qty);
  const [{ cartItems }, dispatch] = useStateValue();

   const cartDispatch = () => {
     localStorage.setItem("cartItems", JSON.stringify(items));
     dispatch({
       type: actionType.SET_CART_ITEMS,
       cartItems: items,
     });
   };

   const updateQty = (action, id) => {
     if (action === "add") {
       setQty(qty + 1);
       cartItems.map((item) => {
         if (item.id === id) {
           item.qty += 1;
           setFlag(flag + 1);
         }
       });
       cartDispatch();
     } else {
       // initial state value is one so you need to check if 1 then remove it
       if (qty === 1) {
         items = cartItems.filter((item) => item.id !== id);
         setFlag(flag + 1);
         cartDispatch();
       } else {
         setQty(qty - 1);
         cartItems.map((item) => {
           if (item.id === id) {
             item.qty -= 1;
             setFlag(flag + 1);
           }
         });
         cartDispatch();
       }
     }
   };

   useEffect(() => {
     items = cartItems;
   }, [qty, item, cartItems]);
  
  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={photoURL}
        alt={title}
        className="w-20 h-20 max-w-[60px] object-contain"
      />
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{title}</p>
        <p className="text-sm font-semibold text-gray-50">
          ${price % 1 !== 0 ? price * qty : price * qty + ".00"}
        </p>
      </div>
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.button
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
          className="w-5 h-5 rounded-full bg-orange-700 flex items-center justify-center disabled:cursor-not-allowed"
        >
          <BiMinus className="text-gray-50" />
        </motion.button>
        <p className="text-gray-50">{qty}</p>
        <motion.button
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
          className="w-5 h-5 rounded-full bg-orange-700 flex items-center justify-center"
        >
          <BiPlus className="text-gray-50" />
        </motion.button>
      </div>
    </div>
  );
};

export default CartItem;
