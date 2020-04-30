import React, { useContext, useState } from "react";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import { login } from "../../utils/routes";
import { DispatchContext } from "../../contexts/userContext";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";

const customStyles = {
  modal: {
    borderRadius: "6px",
  },
};

export default function Login({ modalIsOpen, toggleModal }) {
  const [email, handleEmailChange, e, resetEmail] = useInputState("");
  const [password, handlePasswordChange, p, resetPassword] = useInputState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useContext(DispatchContext);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let body = {
      email: email,
      password: password,
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
          email: response.data.data.email,
        },
        token: response.headers["x-auth-token"],
      });
      toast.success("Log In successfully");
      setIsLoading(false);
      toggleModal(false);
      resetEmail();
      resetPassword();
    } catch (error) {
      toast.error("Invalid user");
      setIsLoading(false);
      resetEmail();
      resetPassword();
    }
  };

  return (
    <Modal
      open={modalIsOpen}
      onClose={() => toggleModal(false)}
      center
      styles={customStyles}
    >
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
          <button
            type="submit"
            className="loginbutton btn btn-primary ld-ext-right running"
          >
            {isLoading ? "Loading..." : "Log In"}

            {isLoading ? <div className="ld ld-ring ld-spin" /> : null}
          </button>
        </form>
      </div>
    </Modal>
  );
}
