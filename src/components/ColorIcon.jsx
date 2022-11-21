import React from "react";

const ColorIcon = ({color,current,colorOnClick}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg" 
      onClick={() => colorOnClick(color)}
      className= {current ? "outline outline-1 outline-offset-2 outline-primary rounded-xl cursor-pointer" : "cursor-pointer"}
    >
      <circle cx="12" cy="12" r="12" fill={color?.hex} />
    </svg>
  );
};

export default ColorIcon;
