import React, { useState, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { AuthContext, DispatchContext } from "../../contexts/userContext";
import styles from "./navbar.module.css";
import { toast } from "react-toastify";
import Login from "./../login/login";
import Register from "./../register/register";

function NavBar(props) {
  const Data = useContext(AuthContext);
  const Dispatch = useContext(DispatchContext);
  const [loginModalIsOpen, setLoginIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterIsOpen] = useState(false);

  const handleLogout = () => {
    Dispatch({ type: "OUT" });
    toast.success("Log out successfully");
  };

  const toggleLoginModal = (value) => {
    setLoginIsOpen(value);
  };
  const toggleRegisterModal = (value) => {
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
                  <li className="nav-item">
                    <NavLink
                      className={`nav-link ${styles.navLink}`}
                      onClick={() => toggleRegisterModal(true)}
                      to="/"
                      type="button"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={`nav-link ${styles.navLink}`}
                      onClick={() => toggleLoginModal(true)}
                      to="/"
                      type="button"
                    >
                      Log In
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
      <Login toggleModal={toggleLoginModal} modalIsOpen={loginModalIsOpen} />
      <Register
        toggleModal={toggleRegisterModal}
        modalIsOpen={registerModalIsOpen}
      />
    </>
  );
}

export default withRouter(NavBar);
