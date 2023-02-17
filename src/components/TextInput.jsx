import React from "react";

const TextInput = ({ icon, ...rest }) => {
  return (
      <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          {icon}
      <input className="w-full border-0 outline-0 bg-transparent" {...rest} />
    </div>
  );
};

export default TextInput;
