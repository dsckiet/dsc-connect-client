import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { getdata } from "../../utils/routes";
import { AuthContext } from "../../contexts/userContext";
import useInputState from "../../hooks/useInputState";
import { edit } from "../../utils/routes";
import { toast } from "react-toastify";

export default function Update(props) {
  const Data = useContext(AuthContext);
  const [name, handleName] = useInputState("");
  const [city, handleCity] = useInputState("");
  const [state, handleState] = useInputState("");
  const [country, handleCountry] = useInputState("");
  const [size, handleSize] = useInputState("");
  const [webLink, handleWeb] = useInputState("");
  const [fbLink, handleFB] = useInputState("");
  const [instaLink, handleInsta] = useInputState("");
  const [twitterLink, handleTwitter] = useInputState("");
  const [mediumLink, handleMedium] = useInputState("");
  const [githubLink, handleGit] = useInputState("");
  const [youtubeLink, handleYT] = useInputState("");
  const [linkedinLink, handleIN] = useInputState("");
  const [option, setOption] = useState({ selectedOption: [] });
  useEffect(() => {
    let token = Data.token;
    const fetchData = async () => {
      try {
        let response = await axios.get(`${getdata}?id=${Data.user.id}`);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [props]);

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     let body = {
  //       latitude: x,
  //       longitude: y,
  //       type: "crime"
  //     };
  //     await axios.put(`${edit}/${props.match.params.id}`, body, {
  //       headers: {
  //         "x-auth-token": Data.token
  //       }
  //     });
  //     toast.info("Status pending");
  //     props.history.push("/");
  //   } catch (error) {
  //     toast.error("Error occured");
  //   }
  // };
  return (
    <div className="container">
      <div className="col-lg-8 mx-auto" style={{ paddingBottom: "200px" }}>
        <div className="pt-5">
          <p className="heading" style={{ fontSize: "32px" }}>
            Enter Data
          </p>
        </div>
        <div className="card p-4">
          <form>
            <label className="label">Co-Ordinates : </label>

            <div className="form-group row mt-2">
              <label className="col-sm-2 col-form-label">X-Axis :</label>
              <div className="col-sm-3">
                <input
                  type="number"
                  name="x"
                  className="form-control"
                  placeholder="X"
                  // value={x}
                  // onChange={handleChangeX}
                />
              </div>
              <label className="col-sm-2 col-form-label">Y-Axis :</label>
              <div className="col-sm-3">
                <input
                  type="number"
                  name="y"
                  className="form-control"
                  placeholder="Y"
                  // value={y}
                  // onChange={handleChangeY}
                />
              </div>
            </div>
            {/* <div className="row mt-4">
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
            </div> */}
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
