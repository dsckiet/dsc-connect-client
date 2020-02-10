import React from "react";

const Input = ({ name, onChange, value, ...rest }) => {
  return (
    <div className="form-group">
      {/* <label htmlFor={name}>{name}</label> */}
      <input
        {...rest}
        name={name}
        className="form-control"
        id={name}
        value={value}
        onChange={onChange}
        placeholder={name}
      />
      {/* {errors && <div className="alert alert-danger mt-2">{errors}</div>} */}
    </div>
  );
};

export default Input;
