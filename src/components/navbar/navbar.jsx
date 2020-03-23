import React, { useState, useContext, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { AuthContext, DispatchContext } from "../../contexts/userContext";
import styles from "./navbar.module.css";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import Input from "./../common/input";
import { login, register, profile } from "../../utils/routes";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Login from "./../login/login";
import Register from "./../register/register";

function NavBar(props) {
  const Data = useContext(AuthContext);
  const Dispatch = useContext(DispatchContext);
  const [fname, handlefNameChange] = useInputState("");
  const [lname, handlelNameChange] = useInputState("");
  const [email, handleEmailChange, noUse, resetEmail] = useInputState("");
  const [password, handlePasswordChange, noUSEE, resetPassword] = useInputState(
    ""
  );
  const [UpIn, setUpIn] = useState();
  const [loginModalIsOpen, setLoginIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterIsOpen] = useState(false);
  const dispatch = useContext(DispatchContext);

  // let userRef;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

  //       userRef = user;
  //       console.log(userRef);
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const handleLoginSubmit = async e => {
  //   e.preventDefault();
  //   let body = {
  //     email: email,
  //     password: password
  //   };

  //   try {
  //     const response = await axios.post(login, body);
  //     dispatch({
  //       type: "IN",
  //       user: {
  //         id: response.data.data._id,
  //         isAdmin: response.data.data.isAdmin,
  //         isSubmitted: response.data.data.isSubmitted,
  //         name: response.data.data.name,
  //         email: response.data.data.email
  //       },
  //       token: response.headers["x-auth-token"]
  //     });
  //     console.log(response);
  //     toast.success("Log In successfully");
  //     window.location = "/";
  //     resetEmail();
  //     resetPassword();
  //     // props.history.push("/");
  //   } catch (error) {
  //     toast.error("Invalid user");
  //     resetEmail();
  //     resetPassword();
  //   }
  // };

  // const handleRegisterSubmit = async e => {
  //   e.preventDefault();
  //   let body = {
  //     name: `${fname} ${lname}`,
  //     email: email,
  //     password: password,
  //     isAdmin: true
  //   };
  //   try {
  //     const response = await axios.post(register, body);
  //     dispatch({
  //       type: "IN",
  //       user: {
  //         id: response.data.data._id,
  //         isAdmin: response.data.data.isAdmin,
  //         isSubmitted: response.data.data.isSubmitted,
  //         name: response.data.data.name,
  //         email: response.data.data.email
  //       },
  //       token: response.headers["x-auth-token"]
  //     });
  //     // props.history.push("/");
  //     toast.success("Sign Up successfully");
  //     window.location = "/";
  //     resetEmail();
  //     resetPassword();
  //   } catch (error) {
  //     resetEmail();
  //     resetPassword();
  //     // if (error.response.status === 400)
  //     toast.error(`${error.response.data.message}`);
  //   }
  // };

  const handleLogout = () => {
    Dispatch({ type: "OUT" });
    toast.success("Log out successfully");
  };

  const handleAdd = async () => {
    const token = Data.token;
    let user = await axios.get(profile, {
      headers: {
        "x-auth-token": token
      }
    });
    console.log(user.data.data.isVerified);
    if (user.data.data.isVerified) {
      window.location = "/add";
    } else {
      toast.error("Email not verified");
    }
  };

  const closeLoginModal = value => {
    setLoginIsOpen(value);
  };
  const closeRegisterModal = value => {
    setRegisterIsOpen(value);
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
                      onClick={() => closeRegisterModal(true)}
                      to="/"
                      type="button"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      onClick={() => closeLoginModal(true)}
                      to="/"
                      type="button"
                    >
                      Sign In
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {!Data.user.isSubmitted ? (
                    <li>
                      <NavLink to="#" onClick={handleAdd}>
                        <button
                          type="button"
                          className={`btn btn-success mt-2 mr-2 ${styles.addBtn}`}
                        >
                          Add your community
                        </button>
                      </NavLink>
                    </li>
                  ) : null}

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
      <Login closeModal={closeLoginModal} modalIsOpen={loginModalIsOpen} />
      <Register
        closeModal={closeRegisterModal}
        modalIsOpen={registerModalIsOpen}
      />
    </>
  );
}

export default withRouter(NavBar);
