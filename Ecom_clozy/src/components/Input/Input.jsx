import React from "react";

const Input = ({
  type = "text",
  name,
  placeholder,
  extraClass = "",
  required = false,
  border = "",
  id,
  label = "",
  onChange,
  value,
  readOnly = false,
}) => {
  return (
    <input
      type={type}
      readOnly={readOnly}
      className={`${border !== "" ? border : "border-2 border-gray500"} py-2 px-4 outline-none ${extraClass}`}
      name={name}
      id={id}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      value={value}
      aria-label={label}
    />
  );
};

export default Input;
