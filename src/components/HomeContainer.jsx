import React from "react";
import { motion } from "framer-motion";
import BikeImg from "../images/delivery.png";
import HeroBgImg from "../images/heroBg.png";
import { heroData } from "../data/HeroData";
import Button from "./Button";

const HomeContainer = () => {
  const transition = { transitionType: "linear", transitionDuration: "0.5s" };
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div className=" flex-1 flex flex-col items-start justify-center gap-5">
        <motion.div className="flex items-center gap-2 bg-orange-100 px-2 py-1">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img src={BikeImg} className="w-full h-full" alt="bike" />
          </div>
        </motion.div>
        <p className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-wide text-black">
          The Fastest Delivery in{" "}
          <span className="text-orange-500">Your City</span>
        </p>
        <p className="text-base text-textColor md:w-[85%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
          consequuntur natus dolorum, magnam mollitia soluta autem laudantium
          iure veritatis! Doloribus blanditiis itaque corrupti minus fuga
          aliquid unde aliquam provident recusandae rem odio animi, quasi qui,
          libero accusamus nobis voluptatibus. Suscipit dolorem molestias, in
          praesentium debitis asperiores iste ratione ullam eaque!
        </p>
       <Button btnText="Order Now"/>
      </div>
      <div className="flex items-center h-screen relative">
        <img
          src={HeroBgImg}
          alt="herobg"
          className="ml-auto w-full h-[650px] sm:w-[70%] md:w-[50%] lg:w-[70%] md:h-510"
        />
        <div className="w-full h-auto left-0 absolute flex flex-wrap gap-3 items-center justify-center md:px-10 py-0">
          {heroData.map((item) => {
            const { id, name, desc, price, img } = item;
            return (
              <div
                key={id}
                className="md:min-w-[190px] p-4 bg-cardOverlay rounded-md backdrop-blur-md flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={img}
                  alt="food-item"
                  className="md:w-28 w-20 -mt-4 md:-mt-8"
                />
                <p className="text-base font-semibold text-textColor text-center">
                  {name}
                </p>
                <p className="text-sm text-gray-500 text-center md:my-2 my-1">
                  {desc}
                </p>
                <p className="font-semibold text-sm text-headingColor">
                  {price}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
