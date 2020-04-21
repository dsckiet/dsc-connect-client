import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { verify } from "../../utils/routes";

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
    <div>
      <h4>Email Verified</h4>
      <h4>
        Go to <NavLink to="/">homepage</NavLink>
      </h4>
    </div>
  );
}
