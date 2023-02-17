import React, { useRef } from "react";
import Slider from "react-slick";
import MenuItem from "./MenuItem";

const MenuItems = ({ data, onCustomSlider }) => {
  const customSlider = useRef();
  onCustomSlider(customSlider)
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={`w-full mt-10`}>
      <Slider {...settings} ref={customSlider}>
        {data &&
          data.map((item) => (
            <MenuItem
              key={item.id}
              title={item.title}
              calories={item.calories}
              price={item.price}
              photoURL={item.imageURL}
              item={item}
            />
          ))}
      </Slider>
    </div>
  );
};

export default MenuItems;
