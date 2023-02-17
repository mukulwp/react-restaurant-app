import React from "react";

const Button = ({ btnText, ...rest }) => {
  return (
    <button
      className="bg-gradient-to-br from-orange-200 to-orange-500 w-full md:w-fit py-2 px-8 rounded-xl cursor-pointer hover:shadow-lg transition-none ease-in-out duration-500"
      {...rest}
    >
      {btnText}
    </button>
  );
};

export default Button;
