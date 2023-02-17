import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { RiShoppingBasketLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import LogoImg from "../images/c1.png";
import UserImg from "../images/avatar.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";
export let handleLogin;

const Header = ({ onHideDropdown }) => {
  
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  onHideDropdown(setToggleDropdown);
  

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  //Show Cart Box
  const handleCartShow = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const hideCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };

   handleLogin = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(auth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setToggleDropdown(!toggleDropdown);
    }
  };


  const handleLogout = () => {
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <header className="sticky z-40 top-0 w-full py-4 px-4 md:px-10 bg-black">
      {/* Desktop */}
      <div className="hidden md:flex w-full h-full">
        <div className="flex items-center justify-between w-full gap-8">
          {/* Logo */}
          <motion.div whileTap={{ scale: 0.7 }} onClick={hideCart}>
            <Link
              to="/"
              className="flex items-center gap-2.5 text-white text-xl font-bold"
            >
              <img className="w-10" src={LogoImg} alt="logo" />
              Halal Food
            </Link>
          </motion.div>
          {/* Menu Items */}
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="ml-auto"
            onClick={hideCart}
          >
            <li className="flex gap-8">
              <NavLink
                to="/"
                className="text-base text-primary hover:text-orange-500 duration-200 transition-all ease-in-out flex items-center gap-2"
              >
                <FaHome />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/menu"
                className="text-base text-primary hover:text-orange-500 duration-200 transition-all ease-in-out flex items-center gap-2"
              >
                <BiFoodMenu />
                <span>Menu</span>
              </NavLink>
              <NavLink
                to="about"
                className="text-base text-primary hover:text-orange-500 duration-200 transition-all ease-in-out flex items-center gap-2"
              >
                <FaUsers />
                <span>About Us</span>
              </NavLink>
              <NavLink
                to="contact"
                className="text-base text-primary hover:text-orange-500 duration-200 transition-all ease-in-out flex items-center gap-2"
              >
                <BsEnvelope />
                <span>Contact Us</span>
              </NavLink>
            </li>
          </motion.ul>
          {/* Cart */}
          <div className="relative cursor-pointer " onClick={handleCartShow}>
            <RiShoppingBasketLine className="text-primary text-2xl hover:text-orange-500" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-4 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-sm text-white">{cartItems.length}</p>
              </div>
            )}
          </div>
          {/* User */}
          <div className="relative" onClick={handleLogin}>
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="cursor-pointer flex items-center gap-2"
            >
              <img
                className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full drop-shadow-lg"
                src={user ? user.photoURL : UserImg}
                alt="avatar"
              />
              <span className="text-primary hover:text-orange-500">
                {user ? user.displayName : "Login"}
              </span>
            </motion.div>
            {/* Dropdown menu */}
            <div
              className={`w-full bg-black shadow-xl flex flex-col gap-2 transition-all duration-500 absolute px-5 py-3 top-14 border-t-4 border-orange-500 ${
                toggleDropdown ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              onClick={() => {
                setToggleDropdown(!toggleDropdown);
              }}
            >
              {user && (
                <Link
                  className="text-primary flex items-center gap-2 font-medium hover:text-orange-500"
                  to="/add-food"
                >
                  <span>Add New Food</span> <FiPlus />
                </Link>
              )}
              <p
                className="text-primary cursor-pointer flex items-center gap-2 font-medium hover:text-orange-500"
                onClick={handleLogout}
              >
                <span>Logout</span> <FiLogOut />
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="flex md:hidden relative">
        <div className="flex w-full h-full">
          <div className="flex items-center justify-between w-full gap-4">
            {/* Logo */}
            <motion.div whileTap={{ scale: 0.7 }}>
              <Link
                to="/"
                className="flex items-center gap-2.5 text-white text-base font-bold"
              >
                <img className="w-10" src={LogoImg} alt="logo" />
                Food
              </Link>
            </motion.div>
            {/* Menu Items */}
            <ul
              className={`absolute bg-black h-90vh top-14 border-t-4 border-orange-500 py-8 px-8 min-w-80% -left-4 z-50 ${
                toggleMobileMenu ? "flex translate-x-0" : "hidden"
              }`}
              onClick={() => {
                setToggleMobileMenu(false);
              }}
            >
              <li className="flex flex-col gap-8">
                <NavLink
                  to="/"
                  className="text-base text-primary hover:text-orange-500 duration-200 transition-all ease-in-out flex items-center gap-2"
                >
                  <FaHome />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  to="/menu"
                  className="text-base text-primary hover:text-orange-500 duration-200 transition-all ease-in-out flex items-center gap-2"
                >
                  <BiFoodMenu />
                  <span>Menu</span>
                </NavLink>
                <NavLink
                  to="about"
                  className="text-base text-primary hover:text-orange-500 duration-200 transition-all ease-in-out flex items-center gap-2"
                >
                  <FaUsers />
                  <span>About Us</span>
                </NavLink>
                <NavLink
                  to="contact"
                  className="text-base text-primary hover:text-orange-500 duration-200 transition-all ease-in-out flex items-center gap-2"
                >
                  <BsEnvelope />
                  <span>Contact Us</span>
                </NavLink>
                {user && (
                  <NavLink
                    to="add-food"
                    className="text-base text-primary hover:text-orange-500 duration-200 transition-all ease-in-out flex items-center gap-2"
                  >
                    <FiPlus />
                    <span>Add New Food</span>
                  </NavLink>
                )}
                {user && (
                  <div
                    className="text-base text-primary cursor-pointer hover:text-orange-500 duration-200 transition-all ease-in-out flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <FiLogOut />
                    <span>Log Out</span>
                  </div>
                )}
              </li>
            </ul>
            {/* Cart */}
            <div
              className="relative cursor-pointer ml-auto"
              onClick={handleCartShow}
            >
              <RiShoppingBasketLine className="text-primary text-xl hover:text-orange-500" />
              <div className="absolute -top-4 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-sm text-white">
                  {cartItems && cartItems.length}
                </p>
              </div>
            </div>
            {/* User */}
            <div className="relative" onClick={handleLogin}>
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="cursor-pointer flex items-center gap-2"
              >
                <img
                  className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full drop-shadow-lg"
                  src={user ? user.photoURL : UserImg}
                  alt="avatar"
                />
                <span className="text-primary text-sm hover:text-orange-500">
                  {user ? user.displayName : "Login"}
                </span>
              </motion.div>
            </div>
            {/* Mobile Menu Collapse Icon */}
            <div
              className="text-primary cursor-pointer"
              onClick={() => {
                setToggleMobileMenu(!toggleMobileMenu);
              }}
            >
              {toggleMobileMenu ? <AiOutlineClose /> : <FiMenu />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
