import React, { useContext, useEffect } from "react";
import useInputState from "../hooks/useInputState";
import { AuthContext } from "./../contexts/userContext";
import axios from "axios";
import { add } from "./../utils/routes";

export default function AddForm(props) {
  let data = useContext(AuthContext);
  const [x, handleX] = useInputState("");
  const [y, handleY] = useInputState("");
  const [type, handleType] = useInputState("");
  useEffect(() => {
    console.log("chl");
  }, [x, y, type]);
  const handleSubmit = async e => {
    e.preventDefault();
    let body = { latitude: x, longitude: y, type: type };
    try {
      const token = data.token;
      console.log(token);
      const response = await axios.post(add, body, {
        headers: {
          "x-auth-token": token
        }
      });
      props.history.push("/");
      console.log("API REQUEST");
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  return (
    <div className="container">
      <div className="col-lg-8 mx-auto" style={{ paddingBottom: "200px" }}>
        <div className="pt-5">
          <p className="heading" style={{ fontSize: "32px" }}>
            Enter Data
          </p>
        </div>
        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <label className="label">Co-Ordinates : </label>

            <div className="form-group row mt-2">
              <label className="col-sm-2 col-form-label">X-Axis :</label>
              <div className="col-sm-3">
                <input
                  type="number"
                  name="x"
                  className="form-control"
                  placeholder="X"
                  value={x}
                  onChange={handleX}
                />
              </div>
              <label className="col-sm-2 col-form-label">Y-Axis :</label>
              <div className="col-sm-3">
                <input
                  type="number"
                  name="y"
                  className="form-control"
                  placeholder="Y"
                  value={y}
                  onChange={handleY}
                />
              </div>
            </div>
            <div className="row mt-4">
              <label className="col-sm-2 label">Type : </label>
              <div className="col-sm-6 form-group ">
                <select
                  name="type"
                  className="form-control"
                  id="exampleFormControlSelect1"
                  value={type}
                  onChange={handleType}
                >
                  <option defaultChecked>Select</option>
                  <option value="crime">Crime</option>
                  <option value="accident">Accident</option>
                </select>
              </div>
            </div>
            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
