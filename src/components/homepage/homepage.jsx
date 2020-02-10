import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { getdata } from "../../utils/routes";
import { AuthContext } from "../../contexts/userContext";
import { Link } from "react-router-dom";
import styles from "./homepage.module.css";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

export default function Homepage() {
  const [state, setState] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [pos, setPos] = useState(true);

  const data = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    let token = data.token;
    const fetchData = async () => {
      try {
        const response = await axios.get(getdata, {
          headers: {
            "x-auth-token": token
          }
        });
        setState(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleArrow = () => {
    setPos(!pos);
  };
  return (
    <>
      {isLoading ? (
        <div className={`col-12 text-center ${styles.load}`}>
          <img className="img-fluid" src="./assets/images/load.gif" alt="" />
        </div>
      ) : (
        <div className="fluid-container mx-auto">
          <div className="container ">
            <div className="row">
              <div
                className={`col-lg-3 col-md-4 col-sm-4 mt-4 ${styles.filter}`}
              >
                <div className={`card p-4 ${styles.cardEdit}`}>
                  <div>
                    <p className={styles.sideHead}>Filter</p>
                    <form>
                      <div className="form-group">
                        <label htmlFor="county" className={styles.crdTxt}>
                          Country
                        </label>
                        <Select options={options} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="work" className={styles.crdTxt}>
                          Works on
                        </label>
                        <Select options={options} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="search" className={styles.crdTxt}>
                          Search
                        </label>
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
                          className={`px-3 btn btn-warning ${styles.resetBtn}`}
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                    <br />
                    <div className={`text-center ${styles.sideFooter}`}>
                      <img
                        className="img-fluid"
                        src="./assets/images/learn.svg"
                        alt=""
                      />
                      <div className={styles.sideFoot}>
                        <center>
                          <p>developed by community; for communities</p>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-lg-3 col-md-4 col-sm-3 ${styles.filterSM}`}>
                <div className="accordion" id="accordionExample">
                  <div className={`card ${styles.cardEdit}`}>
                    <div
                      className="card-header"
                      id="headingOne"
                      style={{ backgroundColor: "white" }}
                    >
                      <p
                        className={`pt-1 ${styles.sideHead}`}
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Filter
                        <span className="float-right" onClick={handleArrow}>
                          {pos ? (
                            <i className="fas fa-chevron-down ml-2  "></i>
                          ) : (
                            <i className="fas fa-chevron-up ml-2"></i>
                          )}
                        </span>
                      </p>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <form>
                          <div className="form-group">
                            <label htmlFor="county">Country</label>
                            <Select options={options} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="work">Works on</label>
                            <Select options={options} />
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
                          <div className="float-right mb-4">
                            <button
                              type="button"
                              className={`px-3 btn btn-warning ${styles.resetBtn}`}
                            >
                              Reset
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8 mt-4">
                <div className="list">
                  <h3>
                    <strong>Developer Student Clubs Listing</strong>
                  </h3>
                  <p className={styles.head}>
                    Connect with communities, the people and help each to make
                    the sustainable and better world
                  </p>
                  <div className="row">
                    {state
                      ? state.map((item, i) => (
                          <div className="col-lg-4" key={i}>
                            <div className={`card p-3 mb-4 ${styles.crdHead}`}>
                              <div className="row">
                                <div className="col-12">
                                  <img
                                    className="img-fluid mr-2"
                                    src="./assets/images/dsc.png"
                                    alt=""
                                    width="40"
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
                                <span className={`badge mr-2 ${styles.bW}`}>
                                  Web
                                </span>
                                <span className={`badge mr-2 ${styles.bM}`}>
                                  ML
                                </span>
                                <span className={`badge mr-2 ${styles.bC}`}>
                                  Cloud
                                </span>
                                <span className={`badge mr-2 ${styles.bF}`}>
                                  Flutter
                                </span>
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
                              {item.latitude === 52.5 && data.token !== "" ? (
                                <>
                                  <div className="col-lg-3">
                                    <div className={styles.editBtn}>
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
        </div>
      )}
    </>
  );
}
