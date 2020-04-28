import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <div className="text-center p-4">
        <img
          className="img-fluid"
          src="./assets/images/404.svg"
          alt="404 not found"
          width="70%"
        />
      </div>
    </div>
  );
}
