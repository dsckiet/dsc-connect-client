import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { getdata } from "../../utils/routes";
import { AuthContext } from "../../contexts/userContext";
import { Link } from "react-router-dom";
import styles from "./homepage.module.css";
import Search from "./../search/search";
import { toast } from "react-toastify";

export default function Homepage() {
  const [state, setState] = useState("");
  const [isLoading, setLoading] = useState(false);

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
        console.log(error.response.status);
      }
    };
    fetchData();
  }, []);

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
              <Search />
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
