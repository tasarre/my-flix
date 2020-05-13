import React from "react";

const capitalizeFirstLetter = string => {
  return string && string.charAt(0).toUpperCase() + string.slice(1);
};
export const Input = ({children, value, label, type, action, classNames }) => (
  <div className="form-group">
    <label for="exampleInputEmail1">{capitalizeFirstLetter(label)}</label>
    {children}
    <input
      type={type}
      className={classNames && classNames}
      id={label}
      name={label}
      value={value}
      onChange={action && action}
    />
  </div>
);
