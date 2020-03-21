import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { getdata } from "../../utils/routes";
import styles from "./homepage.module.css";
import Search from "./../search/search";
import { toast } from "react-toastify";

export default function Homepage() {
  const [state, setState] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(getdata);
        setState(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  const getFilterData = async data => {
    let location, domain;
    if (data.location) location = data.location;
    if (data.domain) domain = data.domain;
    try {
      if (location && domain) {
        setLoading(true);
        const response = await axios.get(
          `${getdata}?location=${location}&domain=${domain}`
        );
        let len = Object.keys(response.data.data).length;
        if (len > 0) {
          setState(response.data.data);
          setLoading(false);
        } else {
          toast.error("Invalid Search");
          setLoading(false);
        }
      } else if (location) {
        setLoading(true);
        const response = await axios.get(`${getdata}?location=${location}`);
        let len = Object.keys(response.data.data).length;
        if (len > 0) {
          setState(response.data.data);
          setLoading(false);
        } else {
          toast.error("Invalid Search");
          setLoading(false);
        }
      } else if (domain) {
        setLoading(true);
        const response = await axios.get(`${getdata}?domain=${domain}`);
        let len = Object.keys(response.data.data).length;
        if (len > 0) {
          setState(response.data.data);
          setLoading(false);
        } else {
          toast.error("Invalid Search");
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchData = async data => {
    try {
      setLoading(true);
      const response = await axios.get(`${getdata}?name=${data}`);
      let len = Object.keys(response.data.data).length;
      if (len > 0) {
        setState(response.data.data);
        setLoading(false);
      } else {
        toast.error("Invalid Search");
        setLoading(false);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="fluid-container mx-auto">
        <div className="container ">
          <div className="row">
            <Search
              getFilterData={getFilterData}
              getSearchData={getSearchData}
            />
            <div className="col-lg-9 col-md-8 col-sm-8 mt-4">
              <div className="list">
                <h3>
                  <strong>Developer Student Clubs Listing</strong>
                </h3>
                <p className={styles.head}>
                  Connect with communities, the people and help each to make the
                  sustainable and better world
                </p>
                {isLoading ? (
                  <div className={`col-12 text-center ${styles.load}`}>
                    <img
                      className="img-fluid"
                      src="./assets/images/load.gif"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="row">
                    {state.length > 0 ? (
                      state.map((dsc, i) =>
                        dsc.isPublished ? (
                          <div className="col-lg-4" key={i}>
                            <div
                              className={`card p-3 mb-4 ${styles.crdHead}`}
                              style={{ height: "100%" }}
                            >
                              <div className="row">
                                <div className="col-12">
                                  <img
                                    className="img-fluid mr-2"
                                    src="./assets/images/dsc.png"
                                    alt=""
                                    width="40"
                                  />
                                  {dsc.name}
                                </div>
                              </div>
                              <a
                                href={dsc.webLink}
                                className="mt-1"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {dsc.webLink}
                              </a>
                              <p className="mt-3 mb-0">
                                Location:{" "}
                                <strong>
                                  {dsc.city} {dsc.state}, {dsc.country}
                                </strong>
                              </p>
                              <p>
                                Team Size: <strong>{dsc.size}</strong>
                              </p>
                              <div>
                                {dsc.domains ? (
                                  <span className={`badge mr-2 ${styles.bW}`}>
                                    {dsc.domains[0]}
                                  </span>
                                ) : null}
                                {dsc.domains ? (
                                  <span className={`badge mr-2 ${styles.bM}`}>
                                    {dsc.domains[1]}
                                  </span>
                                ) : null}
                                {dsc.domains ? (
                                  <span className={`badge mr-2 ${styles.bC}`}>
                                    {dsc.domains[2]}
                                  </span>
                                ) : null}
                                {dsc.domains ? (
                                  <span className={`badge mr-2 ${styles.bF}`}>
                                    {dsc.domains[3]}
                                  </span>
                                ) : null}
                              </div>
                              <div
                                className="align-text-bottom mt-3"
                                style={{ verticalAlign: "bottom" }}
                              >
                                <h6>Social Profiles</h6>
                                <a
                                  href={dsc.fbLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    className="img-fluid rounded-circle mr-1"
                                    src="./assets/images/facebook.svg"
                                    alt=""
                                    width="12%"
                                  />
                                </a>
                                <a
                                  href={dsc.instaLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    className="img-fluid rounded-circle mr-1"
                                    src="./assets/images/instagram.svg"
                                    alt=""
                                    width="12%"
                                  />
                                </a>
                                <a
                                  href={dsc.twitterLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    className="img-fluid rounded-circle mr-1"
                                    src="./assets/images/twitter.png"
                                    alt=""
                                    width="12%"
                                  />
                                </a>
                                <a
                                  href={dsc.youtubeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    className="img-fluid rounded-circle mr-1"
                                    src="./assets/images/youtube.png"
                                    alt=""
                                    width="12%"
                                  />
                                </a>
                                <a
                                  href={dsc.linkedinLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    className="img-fluid rounded-circle mr-1"
                                    src="./assets/images/linkedin.png"
                                    alt=""
                                    width="12%"
                                  />
                                </a>
                                <a
                                  href={dsc.mediumLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    className="img-fluid rounded-circle mr-1"
                                    src="./assets/images/medium.png"
                                    alt=""
                                    width="12%"
                                  />
                                </a>
                                <a
                                  href={dsc.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    className="img-fluid rounded-circle mr-1"
                                    src="./assets/images/github.png"
                                    alt=""
                                    width="12%"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        ) : null
                      )
                    ) : (
                      <h1>No DSC</h1>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
