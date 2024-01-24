import React from "react";
import cl from "./Select.module.css"

const Select = ({ options, value, onChange }) => {
  return (
    <select className={cl.select} value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
