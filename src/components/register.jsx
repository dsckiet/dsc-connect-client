import React, { useEffect } from "react";
import useInputState from "../hooks/useInputState";

export default function Register() {
  const [name, handleNameChange] = useInputState("");
  const [email, handelEmailChange] = useInputState("");
  const [password, handlePasswordChange] = useInputState("");

  // useEffect(() => {

  // })

  // const handleSubmit = async(e) => {

  // }

  return (
    <div className="container">
      <form>
        <div class="form-group">
          <label for="exampleInputText">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputText"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={handelEmailChange}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
