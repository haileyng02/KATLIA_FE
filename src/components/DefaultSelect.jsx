import React from "react";
import { Select,Form } from "antd";

const {Option} = Select

const DefaultSelect = ({ custom, label, items, handleChange, name, value,rules }) => {
  return (
    <div className={`${custom}`}>
      <h3 className="input-label">{label}</h3>
      <Form.Item name={name} rules={rules}>
        <Select
          onChange={handleChange}
          value={value || 'default'}
          className="mt-[10px] w-full default-input"
        >
          <Option value="default" disabled>
            Please select
          </Option>
          {items.map((d, i) => (
            <Option key={i} value={d.code + "_" + d.name}>
              {d.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default DefaultSelect;
