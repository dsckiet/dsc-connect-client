import React, { useState, useEffect, useContext, Profiler } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/userContext";
import styles from "./profile.module.css";
import { getdata } from "../../utils/routes";
import axios from "axios";
import { AiOutlineGlobal } from "react-icons/ai";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaLinkedin,
  FaMedium,
  FaGithubSquare,
  FaYoutube,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function Profile() {
  let Data = useContext(AuthContext);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${getdata}?id=${Data.user.id}`);
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(Data);
  console.log(profile.data);
  return (
    <div className="container">
      <div className="col-lg-10 mx-auto">
        <div className={`card p-5 ${styles.cardBg}`}>
          <div className="row ">
            <div className="col-lg-8 col-sm-8 col-md-8">
              <p style={{ fontSize: "28px", fontWeight: "700" }}>
                <span style={{ color: "#F4B400" }}>Hi,</span> <br />
                <span style={{ color: "#707070" }}>{Data.user.name}</span>
              </p>
            </div>
            <div className="col-lg-4 col-sm-4 col-md-4 pt-4 text-right">
              <img
                className="img-fluid"
                src="./assets/images/dsc.png"
                alt=""
                width="100"
              />
            </div>
          </div>
          {Data.user.isSubmitted === false ? (
            <button className="btn btn-primary">Add</button>
          ) : (
            <>
              <div>
                {profile ? (
                  <>
                    <div>
                      {profile.data.isPublished === true &&
                      profile.data.isRejected === false ? (
                        <>
                          <div className="row text-center mt-4">
                            <div className="col-lg-9 col-md-9 col-sm-9 text-left">
                              <p
                                style={{
                                  fontSize: "24px",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  {profile.data.name.toUpperCase()}
                                </span>{" "}
                                Details
                              </p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 text-right">
                              <Link to="/update" type="button">
                                <MdEdit style={{ fontSize: 24 }} />
                              </Link>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-lg-4 col-md-4 col-sm-6 text-center">
                              <img
                                className="img-fluid"
                                src="./assets/images/team.png"
                                alt=""
                                width="60"
                              />
                              <p
                                className="mt-4"
                                style={{
                                  fontSize: "20px",
                                }}
                              >
                                {profile.data.size}
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-4 text-center">
                              <img
                                className="img-fluid mt-1"
                                src="./assets/images/domain.png"
                                alt=""
                                width="60"
                              />
                              <p
                                className=""
                                style={{
                                  fontSize: "20px",
                                  marginTop: "28px",
                                }}
                              >
                                {profile.data.domains.map((domain, i) => {
                                  if (profile.data.domains.length - 1 === i)
                                    return domain;
                                  else return domain + ", ";
                                })}
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 text-center">
                              <img
                                className="img-fluid mt-1"
                                src="./assets/images/location.png"
                                alt=""
                                width="60"
                              />
                              <p
                                className=""
                                style={{
                                  fontSize: "20px",
                                  marginTop: "19px",
                                }}
                              >
                                {profile.data.city +
                                  "," +
                                  profile.data.state +
                                  "," +
                                  profile.data.country}
                              </p>
                            </div>
                          </div>
                          {profile.data.webLink !== "" ? (
                            <div className="row mt-2">
                              <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                                <AiOutlineGlobal
                                  style={{
                                    fontSize: 50,
                                    marginRight: 6,
                                  }}
                                />
                              </div>
                              <div
                                className="col-lg-8 col-md-8 col-sm-8 text-left pt-2"
                                style={{ fontSize: 23 }}
                              >
                                <a
                                  href={profile.data.webLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {profile.data.webLink}
                                </a>
                              </div>
                            </div>
                          ) : null}
                          {profile.data.fbLink !== "" ? (
                            <div className="row mt-4">
                              <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                                <FaFacebookSquare
                                  style={{
                                    fontSize: 50,
                                    marginRight: 6,
                                  }}
                                />
                              </div>
                              <div
                                className="col-lg-8 col-md-8 col-sm-8 text-left pt-2"
                                style={{ fontSize: 23 }}
                              >
                                <a
                                  href={profile.data.fbLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {profile.data.fbLink}
                                </a>
                              </div>
                            </div>
                          ) : null}
                          {profile.data.instaLink !== "" ? (
                            <div className="row mt-4">
                              <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                                <FaInstagram
                                  style={{
                                    fontSize: 50,
                                    marginRight: 6,
                                  }}
                                />
                              </div>
                              <div
                                className="col-lg-8 col-md-8 col-sm-8 text-left pt-2"
                                style={{ fontSize: 23 }}
                              >
                                <a
                                  href={profile.data.instaLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {profile.data.instaLink}
                                </a>
                              </div>
                            </div>
                          ) : null}
                          {profile.data.twitterLink !== "" ? (
                            <div className="row mt-4">
                              <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                                <FaTwitterSquare
                                  style={{
                                    fontSize: 50,
                                    marginRight: 6,
                                  }}
                                />
                              </div>
                              <div
                                className="col-lg-8 col-md-8 col-sm-8 text-left pt-2"
                                style={{ fontSize: 23 }}
                              >
                                <a
                                  href={profile.data.twitterLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {profile.data.twitterLink}
                                </a>
                              </div>
                            </div>
                          ) : null}
                          {profile.data.linkedinLink !== "" ? (
                            <div className="row mt-4">
                              <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                                <FaLinkedin
                                  style={{
                                    fontSize: 50,
                                    marginRight: 6,
                                  }}
                                />
                              </div>
                              <div
                                className="col-lg-8 col-md-8 col-sm-8 text-left pt-2"
                                style={{ fontSize: 23 }}
                              >
                                <a
                                  href={profile.data.linkedinLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {profile.data.linkedinLink}
                                </a>
                              </div>
                            </div>
                          ) : null}

                          {profile.data.mediumLink !== "" ? (
                            <div className="row mt-4">
                              <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                                <FaMedium
                                  style={{
                                    fontSize: 50,
                                    marginRight: 6,
                                  }}
                                />
                              </div>
                              <div
                                className="col-lg-8 col-md-8 col-sm-8 text-left pt-2"
                                style={{ fontSize: 23 }}
                              >
                                <a
                                  href={profile.data.mediumLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {profile.data.mediumLink}
                                </a>
                              </div>
                            </div>
                          ) : null}
                          {profile.data.githubLink !== "" ? (
                            <div className="row mt-4">
                              <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                                <FaGithubSquare
                                  style={{
                                    fontSize: 50,
                                    marginRight: 6,
                                  }}
                                />
                              </div>
                              <div
                                className="col-lg-8 col-md-8 col-sm-8 text-left pt-2"
                                style={{ fontSize: 23 }}
                              >
                                <a
                                  href={profile.data.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {profile.data.githubLink}
                                </a>
                              </div>
                            </div>
                          ) : null}

                          {profile.data.youtubeLink !== "" ? (
                            <div className="row mt-4">
                              <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                                <FaYoutube
                                  style={{
                                    fontSize: 50,
                                    marginRight: 6,
                                  }}
                                />
                              </div>
                              <div
                                className="col-lg-8 col-md-8 col-sm-8 text-left pt-2"
                                style={{ fontSize: 23 }}
                              >
                                <a
                                  href={profile.data.youtubeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {profile.data.youtubeLink}
                                </a>
                              </div>
                            </div>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                    <div>
                      {profile.data.isPublished === false &&
                      profile.data.isRejected === false ? (
                        <div className="text-center mx-auto p-2">
                          <img
                            className="img-fluid mb-4"
                            src="./assets/images/review.png"
                            alt=""
                          />
                          <h4>Your community will be reviewed in less than 24 hours.</h1>
                        </div>
                      ) : null}
                    </div>
                    <div>
                      {profile.data.isPublished === false &&
                      profile.data.isRejected === true ? (
                        <div className="text-center mx-auto p-2">
                          <img
                            className="img-fluid mb-4"
                            src="./assets/images/wrongData.png"
                            alt=""
                          />
                          <h4>
                            Your data is wrong. Re-submit with correct data.
                          </h4>
                        </div>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
