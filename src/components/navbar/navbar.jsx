import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext, DispatchContext } from "../../contexts/userContext";
import styles from "./navbar.module.css";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import { login } from "./../../utils/routes";

export default function NavBar(props) {
  const Data = useContext(AuthContext);
  const Dispatch = useContext(DispatchContext);

  const handleLogout = () => {
    Dispatch({ type: "OUT" });
  };

  const [email, handleEmailChange] = useInputState("");
  const [password, handlePasswordChange] = useInputState("");
  const [UpIn, setUpIn] = useState();
  const dispatch = useContext(DispatchContext);
  const data = useContext(AuthContext);

  // useEffect(() => {
  //   data.token !== "" ? props.history.push("/") : props.history.push("/login");
  // }, []);

  const handleLoginSubmit = async e => {
    e.preventDefault();
    let body = {
      email: email,
      password: password
    };
    try {
      const response = await axios.post(login, body);
      dispatch({
        type: "IN",
        user: {
          name: response.data.data.name,
          x: response.data.data.latitude,
          y: response.data.data.longitude
        },
        token: response.headers["x-auth-token"]
      });
      window.location = "/";
      //props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const loginBtn = () => {
    setUpIn("login");
  };

  const registerBtn = () => {
    setUpIn("register");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container mx-auto">
          <NavLink className="navbar-brand" to="/">
            <img
              className="img-fluid"
              src="/assets/images/logo.svg"
              alt="logo"
              width="200px"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: 0 }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className={`navbar-nav mr-auto justify-content-end ${styles.ulEdit}`}
            >
              {Data.token === "" ? (
                <>
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link"
                      onClick={registerBtn}
                      to="/"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className=" btn btn-primarynav-link"
                      onClick={loginBtn}
                      to="/"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      type="button"
                    >
                      Sign In
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/add">
                      <button
                        type="button"
                        className={`btn btn-success mt-2 mr-2 ${styles.addBtn}`}
                      >
                        Add your community
                      </button>
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <p
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        className="img-fluid"
                        src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
                        width="40"
                        height="40"
                        className="rounded-circle"
                        alt=""
                      />
                    </p>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <NavLink className="dropdown-item" to="#">
                        Profile
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        to="/"
                        onClick={handleLogout}
                      >
                        Log Out
                      </NavLink>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Log In
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {UpIn === "login" ? (
                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter email"
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
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Log In
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Name</label>
                    <input
                      type="Name"
                      className="form-control"
                      id="exampleInputName1"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter email"
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
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Log In
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
