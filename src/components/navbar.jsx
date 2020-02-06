import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext, DispatchContext } from "./../contexts/userContext";

export default function NavBar() {
  const Data = useContext(AuthContext);
  const Dispatch = useContext(DispatchContext);

  const handleLogout = () => {
    Dispatch({ type: "OUT" });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              className="img-fluid"
              src="./assets/images/logo.svg"
              alt="logo"
              width="95%"
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
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav mr-auto justify-content-end"
              style={{ width: "100%" }}
            >
              {Data.token === "" ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/add">
                      <button
                        type="button"
                        className="btn btn-success add-btn ml-2"
                      >
                        Add your community
                      </button>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/" onClick={handleLogout}>
                      Log Out
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
