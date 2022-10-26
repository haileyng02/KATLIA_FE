import React from "react";

const DefaultSelect = ({ custom, label, items, handleChange, name, value }) => {
  return (
    <div className={`${custom}`}>
      <h3 className="input-label">{label}</h3>
      <select
        name={name}
        onChange={handleChange}
        value={value || 'default'}
        className="mt-[10px] w-full default-input"
      >
        <option value="default" disabled>
          Please select
        </option>
        {items.map((d, i) => (
          <option key={i} value={d.code + "_" + d.name}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DefaultSelect;
