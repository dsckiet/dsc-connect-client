import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import axios from "axios";
import { login } from "./../utils/routes";

export default function Login() {
  const [email, handleEmailChange] = useInputState("");
  const [password, handlePasswordChange] = useInputState("");

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    if (token) {
      setIsLogged(true);
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    let body = {
      email: email,
      password: password
    };
    try {
      const response = await axios.post(login, body);
      let token = response.headers["x-auth-token"];
      window.localStorage.setItem("token", JSON.stringify(token));
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {!isLogged ? (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </form>
        </div>
      ) : (
        <Redirect exact to="/" />
      )}
    </div>
  );
}
