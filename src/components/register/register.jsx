import React, { useContext, useEffect } from "react";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import { register } from "../../utils/routes";
import { AuthContext, DispatchContext } from "../../contexts/userContext";

export default function Register(props) {
  const [name, handleNameChange] = useInputState("");
  const [email, handelEmailChange] = useInputState("");
  const [password, handlePasswordChange] = useInputState("");
  const dispatch = useContext(DispatchContext);
  const data = useContext(AuthContext);

  useEffect(() => {
    data.token !== ""
      ? props.history.push("/")
      : props.history.push("/register");
  }, []);
  console.log(data);
  const handleSubmit = async e => {
    e.preventDefault();
    let body = { name: name, email: email, password: password, isAdmin: true };
    try {
      const response = await axios.post(register, body);
      dispatch({
        type: "IN",
        user: response.data.data.name,
        token: response.headers["x-auth-token"]
      });
      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputText">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputText"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
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
  );
}
