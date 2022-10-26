import React from "react";

const AccountInput = ({ label, custom, value, handleChange, name }) => {
  return (
    <div className={custom}>
      <label className="input-label">
        {label}
        <input name={name} className="default-input" value={value} onChange={handleChange}/>
      </label>
    </div>
  );
};

export default AccountInput;
