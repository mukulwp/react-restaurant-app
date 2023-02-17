import React from 'react'

const Alert = ({alertStatus, msg }) => {
  return (
    <>
        <p
          className={`md:w-fit w-full py-3 px-4 rounded-lg text-center shadow-2xl ${
            alertStatus === "error"
              ? "bg-red-300 text-red-800"
              : "bg-emerald-400 text-emerald-800"
          }`}
        >
          {msg}
        </p>
    </>
  );
}

export default Alert