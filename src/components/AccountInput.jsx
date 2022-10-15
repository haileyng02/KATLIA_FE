import React from "react";

const AccountInput = ({ label, custom, value }) => {
  return (
    <div className={custom}>
      <label className="input-label">
        {label}
        <input className="default-input" value={value}/>
      </label>
    </div>
  );
};

export default AccountInput;
