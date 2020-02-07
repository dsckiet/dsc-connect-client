import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { getdata } from "../utils/routes";
import { AuthContext } from "./../contexts/userContext";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [state, setState] = useState("");

  const data = useContext(AuthContext);

  useEffect(() => {
    let token = data.token;
    const fetchData = async () => {
      try {
        const response = await axios.get(getdata, {
          headers: {
            "x-auth-token": token
          }
        });
        setState(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = () => {};

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <div
            className="card p-4"
            style={{
              fontSize: "20px",
              borderRadius: "8px"
            }}
          >
            <div>
              <p style={{ fontWeight: "600" }}>Filter</p>
              <form>
                <div className="form-group">
                  <label htmlFor="county">Country</label>
                  <select className="form-control" id="country">
                    <option>India</option>
                    <option>Sri Lanka</option>
                    <option>Australia</option>
                    <option>Japan</option>
                    <option>Russia</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="work">Works on</label>
                  <select className="form-control" id="work">
                    <option>Blockchain</option>
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>Machine Learning</option>
                    <option>Cloud</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="search">Search</label>
                  <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Type here"
                  />
                </div>
                <div className="float-right">
                  <button
                    type="button"
                    className="px-3 btn btn-warning reset-btn"
                  >
                    Reset
                  </button>
                </div>
              </form>
              <br />
              <div className="text-center" style={{ bottom: 16 }}>
                <img
                  className="img-fluid"
                  src="./assets/images/learn.svg"
                  alt=""
                />
              </div>
              <div
                className=""
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  alignItems: "center"
                }}
              >
                <p>developed by community; for communities</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="list">
            <h3>
              <strong>Developer Student Clubs Listing</strong>
            </h3>
            <p style={{ color: "#707070", fontWeight: 600 }}>
              Connect with communities, the people and help each to make the
              sustainable and better world
            </p>
            <div className="row">
              {state
                ? state.map((item, i) => (
                    <div className="col-lg-4" key={i}>
                      <div
                        className="card p-3 mb-4"
                        style={{ borderRadius: "12px" }}
                      >
                        <div className="row">
                          <div className="col-12">
                            <img
                              className="img-fluid"
                              src="./assets/images/dsc.png"
                              alt=""
                              width="40"
                              style={{ marginRight: 8 }}
                            />
                            DSC VIT Pune
                          </div>
                        </div>
                        <Link to="#" className="mt-1">
                          www.dscvitpune.tech
                        </Link>
                        <p className="mt-3 mb-0">
                          Location: <strong>Pune, India</strong>
                        </p>
                        <p>
                          Team Size: <strong>{item.type}</strong>
                        </p>
                        <p>
                          X: <strong>{item.latitude}</strong>
                        </p>
                        <p>
                          Y : <strong>{item.longitude}</strong>
                        </p>
                        <div>
                          <span className="badge b-w mr-2">Web</span>
                          <span className="badge b-m mr-2">ML</span>
                          <span className="badge b-c mr-2">Cloud</span>
                          <span className="badge b-f mr-2">Flutter</span>
                        </div>
                        <div className="mt-3">
                          <h6>Social Profiles</h6>
                          <img
                            className="img-fluid mr-1"
                            src="./assets/images/circle.svg"
                            alt=""
                            height="10%"
                            width="10%"
                          />
                          <img
                            className="img-fluid mr-1"
                            src="./assets/images/circle.svg"
                            alt=""
                            height="10%"
                            width="10%"
                          />
                          <img
                            className="img-fluid mr-1"
                            src="./assets/images/circle.svg"
                            alt=""
                            height="10%"
                            width="10%"
                          />
                          <img
                            className="img-fluid mr-1"
                            src="./assets/images/circle.svg"
                            alt=""
                            height="10%"
                            width="10%"
                          />

                          <img
                            className="img-fluid"
                            src="./assets/images/circle.svg"
                            alt=""
                            height="10%"
                            width="10%"
                          />
                        </div>
                        {item.latitude === 52.5 ? (
                          <>
                            <div className="col-lg-3">
                              <div className="edit-btn">
                                <Link to={`/update/${item._id}`}>
                                  <img
                                    className="img-fluid mx-auto"
                                    src="./assets/images/pencil.svg"
                                    alt=""
                                    width="50%"
                                  />
                                </Link>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
