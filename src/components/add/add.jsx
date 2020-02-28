import React, { useState, useContext, useEffect } from "react";
import useInputState from "../../hooks/useInputState";
import { AuthContext } from "../../contexts/userContext";
import axios from "axios";
import { add } from "../../utils/routes";
import styles from "./add.module.css";
import CreatableSelect from "react-select/creatable";
import Input from "./../common/input";

const fields = [
  "Website",
  "Facebook",
  "Instagram",
  "Twitter",
  "LinkedIn",
  "Medium",
  "YouTube",
  "Dribble",
  "Pinterest"
];

export default function AddForm(props) {
  let data = useContext(AuthContext);
  const [name, handleName] = useInputState("");
  const [city, handleCity] = useInputState("");
  const [state, handleState] = useInputState("");
  const [country, handleCountry] = useInputState("");
  const [size, handleSize] = useInputState("");
  const [web, handleWeb] = useInputState("");
  const [fb, handleFB] = useInputState("");
  const [insta, handleInsta] = useInputState("");
  const [twitter, handleTwitter] = useInputState("");
  const [medium, handleMedium] = useInputState("");
  const [git, handleGit] = useInputState("");
  const [yt, handleYT] = useInputState("");
  const [In, handleIN] = useInputState("");

  const [option, setOption] = useState({ selectedOption: [] });

  const defaultOptions = [
    { value: "Web", label: "Web" },
    { value: "Mobile", label: "Mobile" },
    { value: "ML", label: "ML" },
    { value: "Cloud", label: "Cloud" },
    { value: "Ar/Vr", label: "Ar/Vr" }
  ];

  const handleChange = option => {
    setOption({ selectedOption: option });
  };

  const handleClick = e => {
    e.preventDefault();
    let domain = [];
    let all = option.selectedOption;
    all.map(item => {
      return domain.push(item.value);
    });
    console.log(domain);
  };

  // useEffect(() => {
  //   console.log("chl");
  // }, [x, y, type]);

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   let body = { latitude: x, longitude: y, type: type };
  //   try {
  //     const token = data.token;
  //     await axios.post(add, body, {
  //       headers: {
  //         "x-auth-token": token
  //       }
  //     });
  //     props.history.push("/");
  //     console.log("API REQUEST");
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.response);
  //   }
  // };

  return (
    <div className="fluid-conatiner">
      <div className="container">
        <div className="col-lg-8 mx-auto">
          <div className="card mt-5">
            <div className={`card-header p-3 ${styles.head}`}>
              Community Details
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <Input
                    name="Name"
                    value={name}
                    onChange={handleName}
                    placeholder="Name"
                  />
                </div>
                <div className="form-row">
                  <div className="col-md-6">
                    <Input
                      name="City"
                      value={city}
                      onChange={handleCity}
                      placeholder="City"
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      name="State"
                      value={state}
                      onChange={handleState}
                      placeholder="State"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6">
                    <Input
                      name="Location"
                      value={country}
                      onChange={handleCountry}
                      placeholder="Country"
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      name="Size"
                      value={size}
                      onChange={handleSize}
                      type="number"
                      placeholder="Size"
                    />
                  </div>
                </div>
                <div className="col-10 mx-auto mb-3" styles={styles.domain}>
                  <CreatableSelect
                    value={option.selectedOption}
                    isMulti
                    onChange={handleChange}
                    options={defaultOptions}
                    closeMenuOnSelect={false}
                    placeholder="Domain"
                  />
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-md-6">
                      <Input
                        name="Website"
                        value={web}
                        onChange={handleWeb}
                        placeholder="Website "
                      />
                    </div>
                    <div className="col-md-6">
                      <Input name="Facebook" value={fb} onChange={handleFB} />
                    </div>
                    <div className="col-md-6">
                      <Input
                        name="Instagram"
                        value={insta}
                        onChange={handleInsta}
                        placeholder="Instagram"
                      />
                    </div>
                    <div className="col-md-6">
                      <Input
                        name="Twitter"
                        value={twitter}
                        onChange={handleTwitter}
                      />
                    </div>
                    <div className="col-md-6">
                      <Input name="Linked In" value={In} onChange={handleIN} />
                    </div>
                    <div className="col-md-6">
                      <Input
                        name="Medium"
                        value={medium}
                        onChange={handleMedium}
                      />
                    </div>
                    <div className="col-md-6">
                      <Input name="Github" value={git} onChange={handleGit} />
                    </div>
                    <div className="col-md-6">
                      <Input name="YouTube" value={yt} onChange={handleYT} />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className={`col-lg-6 col-sm-6 col-md-6 btn btn-primary mx_auto ${styles.add}`}
                    onClick={handleClick}
                  >
                    Add Community
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
