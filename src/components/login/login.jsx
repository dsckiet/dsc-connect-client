import React, { useContext, useEffect } from "react";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import { login } from "../../utils/routes";
import { AuthContext, DispatchContext } from "../../contexts/userContext";
import { toast } from "react-toastify";
import Modal from "react-modal";

export default function Login({ modalIsOpen, closeModal }) {
  const [email, handleEmailChange, e, resetEmail] = useInputState("");
  const [password, handlePasswordChange, p, resetPassword] = useInputState("");
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
          id: response.data.data._id,
          isAdmin: response.data.data.isAdmin,
          isSubmitted: response.data.data.isSubmitted,
          name: response.data.data.name,
          email: response.data.data.email
        },
        token: response.headers["x-auth-token"]
      });
      console.log(response);
      toast.success("Log In successfully");
      window.location = "/";
      resetEmail();
      resetPassword();
      // props.history.push("/");
    } catch (error) {
      toast.error("Invalid user");
      resetEmail();
      resetPassword();
    }
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={() => closeModal(false)}>
      <h1>Hello</h1>
    </Modal>
    // <div className="container">
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="exampleInputEmail1">Email address</label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="exampleInputEmail1"
    //         value={email}
    //         onChange={handleEmailChange}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="exampleInputPassword1">Password</label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="exampleInputPassword1"
    //         value={password}
    //         onChange={handlePasswordChange}
    //       />
    //     </div>
    //     <button type="submit" className="btn btn-primary">
    //       Log In
    //     </button>
    //   </form>
    // </div>
  );
}
