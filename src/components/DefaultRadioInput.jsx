import React from "react";

const DefaultRadioInput = ({label}) => {
  return (
    <div className="flex items-center">
      <input type="radio" name="name" className="w-[30px] h-[30px] radio-input" />
      <label className="ml-[11px]">{label}</label>
    </div>
  );
};

export default DefaultRadioInput;
