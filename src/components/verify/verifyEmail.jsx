import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { verify } from "../../utils/routes";
import { GoVerified } from "react-icons/go";

export default function VerifyEmail(props) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = props.match.params.id;
        let verifyData = await axios.get(`${verify}/${id}`);
        console.log(verifyData);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="col-lg-12 text-center">
        <GoVerified
          className="my-4"
          style={{ fontSize: 120, color: "#3fb078" }}
        />
        <h4>Email Verified</h4>
        <h4>
          Go to <NavLink to="/">homepage</NavLink>
        </h4>
      </div>
    </div>
  );
}
