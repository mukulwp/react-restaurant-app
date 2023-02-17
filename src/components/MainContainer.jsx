import React from 'react';
import CartContainer from './CartContainer';
import FastFoodItmes from './FastFoodItems';
import FruitItems from "./FruitItems";
import HomeContainer from './HomeContainer';
import HotDishes from './HotDishes';

const MainContainer = () => {
  return (
      <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <FruitItems />
      <FastFoodItmes />
      <HotDishes />
    </div>
  );
}

export default MainContainer