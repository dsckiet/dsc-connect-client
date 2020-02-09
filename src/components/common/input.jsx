import React from "react";

const Input = ({ name, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <input
        {...rest}
        name={name}
        className="form-control"
        id={name}
        value={name}
      />
      {/* {errors && <div className="alert alert-danger mt-2">{errors}</div>} */}
    </div>
  );
};

export default Input;
