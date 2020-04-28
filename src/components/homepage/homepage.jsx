import React, { useEffect, useState } from "react";
import axios from "axios";
import { getdata } from "../../utils/routes";
import styles from "./homepage.module.css";
import Search from "./../search/search";
import { toast } from "react-toastify";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaLinkedin,
  FaYoutubeSquare,
  FaGithubSquare,
  FaMedium,
} from "react-icons/fa";

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

  const getFilterData = async (data) => {
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

  const getSearchData = async (data) => {
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
          {/* <div className="row"> */}
          <Search getFilterData={getFilterData} getSearchData={getSearchData} />

          <div className="list mt-4">
            <h3 className="title">Developer Student Clubs Listing</h3>
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
                      <div className="col-lg-4 col-md-4 mb-4" key={i}>
                        <div
                          className={`card p-4 mb-4 ${styles.crdHead} ${styles.crdStyle}`}
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
                          {dsc.webLink !== "" ? (
                            <a
                              href={dsc.webLink}
                              className="mt-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {dsc.webLink}
                            </a>
                          ) : null}

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
                            {dsc.domains
                              ? dsc.domains.map((domain) => (
                                  <span
                                    className={`badge mr-2 mb-1 ${styles.bW}`}
                                  >
                                    {domain}
                                  </span>
                                ))
                              : null}
                          </div>
                          <div
                            className="align-text-bottom mt-3"
                            style={{
                              verticalAlign: "bottom",
                            }}
                          >
                            {dsc.fbLink !== "" &&
                            dsc.instaLink !== "" &&
                            dsc.twitterLink !== "" &&
                            dsc.youtubeLink !== "" &&
                            dsc.linkedinLink !== "" &&
                            dsc.mediumLink !== "" &&
                            dsc.githubLink !== "" ? (
                              <h6>Social Profiles</h6>
                            ) : (
                              <h6>No Social Profile</h6>
                            )}
                            {dsc.fbLink !== "" ? (
                              <a
                                href={dsc.fbLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaFacebookSquare
                                  className="social-icon"
                                  style={{
                                    fontSize: 28,
                                    marginRight: 6,
                                  }}
                                />
                              </a>
                            ) : null}
                            {dsc.instaLink !== "" ? (
                              <a
                                href={dsc.instaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaInstagram
                                  className="social-icon"
                                  style={{
                                    fontSize: 28,
                                    marginRight: 6,
                                  }}
                                />
                              </a>
                            ) : null}
                            {dsc.twitterLink !== "" ? (
                              <a
                                href={dsc.twitterLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaTwitterSquare
                                  className="social-icon"
                                  style={{
                                    fontSize: 28,
                                    marginRight: 6,
                                  }}
                                />
                              </a>
                            ) : null}
                            {dsc.youtubeLink !== "" ? (
                              <a
                                href={dsc.youtubeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaYoutubeSquare
                                  className="social-icon"
                                  style={{
                                    fontSize: 28,
                                    marginRight: 6,
                                  }}
                                />
                              </a>
                            ) : null}
                            {dsc.linkedinLink !== "" ? (
                              <a
                                href={dsc.linkedinLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaLinkedin
                                  className="social-icon"
                                  style={{
                                    fontSize: 28,
                                    marginRight: 6,
                                  }}
                                />
                              </a>
                            ) : null}
                            {dsc.mediumLink !== "" ? (
                              <a
                                href={dsc.mediumLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaMedium
                                  className="social-icon"
                                  style={{
                                    fontSize: 28,
                                    marginRight: 6,
                                  }}
                                />
                              </a>
                            ) : null}
                            {dsc.githubLink !== "" ? (
                              <a
                                href={dsc.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaGithubSquare
                                  className="social-icon"
                                  style={{
                                    fontSize: 28,
                                    marginRight: 6,
                                  }}
                                />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : null
                  )
                ) : (
                  <div className="text-center mx-auto p-3">
                    <img
                      className="img-fluid"
                      src="./assets/images/notFound.png"
                      alt="not found"
                      width="60%"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
