import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdFastfood } from "react-icons/md";
import { categories } from "../data/CategoriesData";
import { useStateValue } from "../context/StateProvider";
import MenuItem from "./MenuItem";
import NotFoundImg from "../images/NotFound.svg";

const HotDishes = () => {
  const [filter, setFilter] = useState("chicken");
  const [{ foodItems }] = useStateValue();
  const data = foodItems?.filter((item) => item.category === filter);
  return (
    <section className="w-full pb-5 pt-8">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-xl sm:text-2xl font-semibold capitalize relative before:absolute before:content before:bg-gradient-to-r before:from-orange-300 before:to-orange-500 before:w-24 before:h-1 before:top-8 mr-auto">
          Our hot dishes
        </p>
        <div className="w-full flex flex-wrap items-center justify-center gap-2 md:gap-8 py-6">
          {categories.map((category) => {
            return (
              <motion.div
                whileTap={{ scale: 0.7 }}
                key={category.id}
                className={`group w-[5.5rem] md:w-24 md:min-w-[96px] md:h-28 h-24 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-orange-600 duration-200 transition-all ease-in-out ${
                  filter === category.urlParamName ? "bg-orange-600" : "bg-card"
                }`}
                onClick={() => {
                  setFilter(category.urlParamName);
                }}
              >
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${
                    filter === category.urlParamName
                      ? "bg-card"
                      : "bg-orange-600"
                  } group-hover:bg-card flex items-center justify-center`}
                >
                  <MdFastfood
                    className={`${
                      filter === category.urlParamName
                        ? "text-orange-600"
                        : "text-card"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            );
          })}
        </div>
        {!data ? (
          <p>Lodaing...</p>
        ) : data?.length > 0 ? (
          <div className="w-full grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <AnimatePresence>
              {data?.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ transform: "scale(0)" }}
                  animate={{ transform: "scale(1)" }}
                  exit={{ transform: "scale(0)" }}
                >
                  <MenuItem
                    title={item.title}
                    photoURL={item.imageURL}
                    calories={item.calories}
                    price={item.price}
                    item={item}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="w-full flex-col md:flex-row flex items-center gap-5 justify-center">
            <img src={NotFoundImg} alt="notfound" className="w-40 md:w-60" />
            <p className="text-red-500">
              Any items not available in this category!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotDishes;
