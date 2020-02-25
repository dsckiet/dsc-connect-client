import React, { useState, useContext } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { AuthContext, DispatchContext } from "../../contexts/userContext";
import styles from "./navbar.module.css";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import { login } from "./../../utils/routes";
import Input from "./../common/input";
import { register } from "../../utils/routes";
import { toast } from "react-toastify";

function NavBar(props) {
  const Data = useContext(AuthContext);
  const Dispatch = useContext(DispatchContext);
  const [fname, handlefNameChange] = useInputState("");
  const [lname, handlelNameChange] = useInputState("");
  const [email, handleEmailChange] = useInputState("");
  const [password, handlePasswordChange] = useInputState("");
  const [UpIn, setUpIn] = useState();
  const dispatch = useContext(DispatchContext);

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
      toast.success("Log In successfully");
      // props.history.push("/");
    } catch (error) {
      toast.error("Invalid user");
    }
  };

  const handleRegisterSubmit = async e => {
    e.preventDefault();
    let body = {
      name: `${fname} ${lname}`,
      email: email,
      password: password,
      isAdmin: true
    };
    try {
      const response = await axios.post(register, body);
      dispatch({
        type: "IN",
        user: response.data.data.name,
        token: response.headers["x-auth-token"]
      });
      // props.history.push("/");
      window.location = "/";
      toast.success("Sign Up successfully");
    } catch (error) {
      console.log(error.response);
      // if (error.response.status === 400)
      toast.error(`${error.response.data.message}`);
    }
  };

  const handleLogout = () => {
    Dispatch({ type: "OUT" });
    toast.success("Log out successfully");
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
                      className="nav-link"
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
                  <li className={`nav-item dropdown navLg ${styles.navLg}`}>
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
                        className="img-fluid rounded"
                        src="./assets/images/avatar.svg"
                        width="32"
                        alt=""
                      />
                    </p>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <NavLink className="nav-link" to="/profile">
                        Profile
                      </NavLink>
                      <NavLink
                        className="nav-link"
                        to="/"
                        onClick={handleLogout}
                      >
                        Log Out
                      </NavLink>
                    </div>
                  </li>
                  <div className={`navSm ${styles.navSM}`}>
                    <li className="nav-item ">
                      <NavLink className="nav-link" to="/profile">
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/"
                        onClick={handleLogout}
                      >
                        Log Out
                      </NavLink>
                    </li>
                  </div>
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
            <div className="p-2">
              {UpIn === "login" ? (
                <>
                  <div className="card-head pt-3 pl-4">
                    <p
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#707070"
                      }}
                    >
                      <span style={{ color: "#DB4437" }}>Welcome,</span> <br />{" "}
                      <span>Log In</span> to continue
                    </p>
                  </div>
                  <div className="px-4">
                    <form onSubmit={handleLoginSubmit}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
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
                      <div className="mb-4">
                        <button type="submit" className="btn btn-primary">
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div className="card-head pt-3 pl-4">
                    <p
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#707070"
                      }}
                    >
                      <span style={{ color: "#DB4437" }}>Welcome,</span> <br />{" "}
                      <span>Sign Up</span> to continue
                    </p>
                  </div>
                  <div className="px-4">
                    <form onSubmit={handleRegisterSubmit}>
                      <div className="form-row">
                        <div className="col-md-6">
                          <label htmlFor="Enter first name">First Name</label>
                          <Input
                            name="Enter first name"
                            value={fname}
                            onChange={handlefNameChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="Enter second name">Last Name</label>
                          <Input
                            name="Enter second name"
                            value={lname}
                            onChange={handlelNameChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="Enter email">Email address</label>
                        <Input
                          name="Enter email"
                          value={email}
                          onChange={handleEmailChange}
                          type="email"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Enter password">Password</label>
                        <Input
                          name="Enter password"
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="mb-4">
                        <button type="submit" className="btn btn-primary">
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(NavBar);
