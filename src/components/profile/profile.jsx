import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/userContext";
import styles from "./profile.module.css";
import { getdata } from "../../utils/routes";
import axios from "axios";

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
  return (
    <div className="container">
      <div className="col-lg-10 mx-auto">
        <div className={`card p-5 ${styles.cardBg}`}>
          <div className="row ">
            <div className="col-lg-8">
              <p style={{ fontSize: "30px", fontWeight: "700" }}>
                <span style={{ color: "#F4B400" }}>Hi,</span> <br />
                <span style={{ color: "#707070" }}>DSC VIT Pune</span>
              </p>
            </div>
            <div className="col-lg-4 pt-4 text-right">
              <img
                className="img-fluid"
                src="./assets/images/dsc.png"
                alt=""
                width="100"
              />
            </div>
          </div>
          {profile ? (
            profile.data.isPublished === true ? (
              <>
                <div className="text-center mt-4">
                  <p style={{ fontSize: "23px" }}>Community Details</p>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-4 text-center">
                    <img
                      className="img-fluid"
                      src="./assets/images/team.png"
                      alt=""
                      width="60"
                    />
                    <p className="mt-4" style={{ fontSize: "20px" }}>
                      56
                    </p>
                  </div>
                  <div className="col-lg-4 text-center">
                    <img
                      className="img-fluid mt-1"
                      src="./assets/images/domain.png"
                      alt=""
                      width="60"
                    />
                    <p
                      className=""
                      style={{ fontSize: "20px", marginTop: "28px" }}
                    >
                      Web, ML, Android, Cloud
                    </p>
                  </div>
                  <div className="col-lg-4 text-center">
                    <img
                      className="img-fluid mt-1"
                      src="./assets/images/location.png"
                      alt=""
                      width="60"
                    />
                    <p
                      className=""
                      style={{ fontSize: "20px", marginTop: "19px" }}
                    >
                      Pune, India
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <h1>Your profile is submitted for reveiw</h1>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
