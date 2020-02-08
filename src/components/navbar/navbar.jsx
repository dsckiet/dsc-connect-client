import React, { useContext, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
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
  const dispatch = useContext(DispatchContext);
  const data = useContext(AuthContext);

  // useEffect(() => {
  //   data.token !== "" ? props.history.push("/") : props.history.push("/login");
  // }, []);

  const handleSubmit = async e => {
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
      //props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
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
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    {/* <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink> */}
                    <NavLink className="nav-link" to="/">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      >
                        Log IN
                      </button>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/add">
                      <button
                        type="button"
                        className={`btn btn-success ${styles.addBtn}`}
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
      {/* <!-- Button trigger modal --> */}
      {/* <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Launch demo modal
      </button> */}
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Log In
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
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
                <div class="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
