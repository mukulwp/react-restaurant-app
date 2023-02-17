import React from "react";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import MenuItems from "./MenuItems";
import { useStateValue } from "../context/StateProvider";

const FastFoodItmes = () => {
  const [{ foodItems }] = useStateValue();
  let myCustomSlider;

  const handleCustomSlider = (customSlider) => {
    myCustomSlider = customSlider;
  };
  const goToNext = () => {
    myCustomSlider.current.slickNext();
  };
  const goToPrev = () => {
    myCustomSlider.current.slickPrev();
  };

  return (
    <section className="w-full pb-5 pt-8">
      <div className="w-full flex sm:flex-row flex-col gap-5 sm:gap-0 items-center justify-between">
        <p className="text-xl sm:text-2xl font-semibold capitalize relative before:absolute before:content before:bg-gradient-to-r before:from-orange-300 before:to-orange-500 before:w-32 before:h-1 before:top-8">
          Our delicious fast foods
        </p>
        <div className=" flex gap-3 items-center">
          <motion.div
            whileTap={{ scale: 0.7 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-500 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={() => goToPrev()}
          >
            <MdChevronLeft className="text-2xl text-white" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.7 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-500 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={() => goToNext()}
          >
            <MdChevronRight className="text-2xl text-white" />
          </motion.div>
        </div>
      </div>
      {foodItems === null ? (
        <p className="mt-4">Lodaing...</p>
      ) : (
        <>
          <MenuItems
            data={foodItems?.filter(
              (item) =>
                item.category === "chicken" ||
                item.category === "curry" ||
                item.category === "fish" ||
                item.category === "rice"
            )}
            onCustomSlider={handleCustomSlider}
          />
        </>
      )}
    </section>
  );
};

export default FastFoodItmes;
