import React from 'react'
import NotFoundImg from "../images/NotFound.svg";

const Error = () => {
  return (
    <div className="w-full flex-col md:flex-row flex items-center gap-5 justify-center">
      <img src={NotFoundImg} alt="notfound" className="w-40 md:w-60" />
      <p className="text-red-500 text-3xl">404 <br/> Page Not Found!</p>
    </div>
  );
}

export default Error