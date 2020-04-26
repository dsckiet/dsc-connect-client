import React, { useContext } from "react";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import { DispatchContext } from "../../contexts/userContext";
import { register } from "../../utils/routes";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";

const customStyles = {
  modal: {
    borderRadius: "6px",
  },
};

export default function Register({ modalIsOpen, toggleModal }) {
  const [fname, handlefNameChange] = useInputState("");
  const [lname, handlelNameChange] = useInputState("");
  const [email, handelEmailChange, e, resetEmail] = useInputState("");
  const [password, handlePasswordChange, p, resetPassword] = useInputState("");
  const dispatch = useContext(DispatchContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      name: `${fname} ${lname}`,
      email: email,
      password: password,
      isAdmin: true,
    };
    try {
      const response = await axios.post(register, body);
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
      toast.success("Sign Up successfully");
      toggleModal(false);
      resetEmail();
      resetPassword();
    } catch (error) {
      resetEmail();
      resetPassword();
      // if (error.response.status === 400)
      toast.error(error.response.data.message);
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
          <div className="form-row">
            <div className="col-md-6">
              <label htmlFor="exampleInputText">First Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputText"
                value={fname}
                onChange={handlefNameChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="exampleInputText">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputText"
                value={lname}
                onChange={handlelNameChange}
              />
            </div>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={handelEmailChange}
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
            Register
          </button>
        </form>
      </div>
    </Modal>
  );
}
