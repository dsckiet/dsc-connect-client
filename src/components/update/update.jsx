import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { getdata, edit } from "../../utils/routes";
import { AuthContext } from "../../contexts/userContext";
import useInputState from "../../hooks/useInputState";
import Input from "./../common/input";
import styles from "./update.module.css";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";

export default function Update(props) {
  const Data = useContext(AuthContext);
  const [name, handleName, setName] = useInputState("");
  const [city, handleCity, setCity] = useInputState("");
  const [state, handleState, setState] = useInputState("");
  const [country, handleCountry, setCountry] = useInputState("");
  const [size, handleSize, setSize] = useInputState("");
  const [webLink, handleWeb, setWeb] = useInputState("");
  const [fbLink, handleFB, setFB] = useInputState("");
  const [instaLink, handleInsta, setInsta] = useInputState("");
  const [twitterLink, handleTwitter, setTwitter] = useInputState("");
  const [mediumLink, handleMedium, setMedium] = useInputState("");
  const [githubLink, handleGit, setGit] = useInputState("");
  const [youtubeLink, handleYT, setYT] = useInputState("");
  const [linkedinLink, handleIN, setIN] = useInputState("");
  const [option, setOption] = useState({ selectedOption: [] });
  const [isLoading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const defaultOptions = [
    { value: "Web", label: "Web" },
    { value: "Mobile", label: "Mobile" },
    { value: "ML", label: "ML" },
    { value: "Cloud", label: "Cloud" },
    { value: "Ar/Vr", label: "Ar/Vr" },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let response = await axios.get(`${getdata}?id=${Data.user.id}`);
        setName(response.data.data.name);
        setCity(response.data.data.city);
        setState(response.data.data.state);
        setCountry(response.data.data.country);
        setSize(response.data.data.size);
        setWeb(response.data.data.webLink);
        setFB(response.data.data.fbLink);
        setInsta(response.data.data.instaLink);
        setTwitter(response.data.data.twitterLink);
        setIN(response.data.data.linkedinLink);
        setMedium(response.data.data.mediumLink);
        setGit(response.data.data.githubLink);
        setYT(response.data.data.youtubeLink);
        let opt = [];
        response.data.data.domains.forEach((option) => {
          opt.push({ value: option, label: option });
        });
        setOption({ selectedOption: opt });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleChangeDomain = (option) => {
    setOption({ selectedOption: option });
  };

  const handleSubmit = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    let domains = [];
    let all = option.selectedOption;
    if (all) {
      all.map((item) => {
        return domains.push(item.value);
      });
    }
    let body = {
      name,
      city,
      state,
      country,
      domains,
      size,
      webLink,
      fbLink,
      instaLink,
      twitterLink,
      linkedinLink,
      mediumLink,
      githubLink,
      youtubeLink,
    };
    try {
      await axios.put(`${edit}/${Data.user.id}`, body, {
        headers: {
          "x-auth-token": Data.token,
        },
      });
      toast.info("DSC updated");
      setBtnLoading(false);
      props.history.push("/profile");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="fluid-conatiner">
      {isLoading ? (
        <div className={`col-12 text-center ${styles.load}`}>
          <img className="img-fluid" src="./assets/images/load.gif" alt="" />
        </div>
      ) : (
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
                      disabled
                    />
                  </div>
                  <div className="form-row">
                    <div className="col-md-6">
                      <Input
                        name="City"
                        value={city}
                        onChange={handleCity}
                        placeholder="City"
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <Input
                        name="State"
                        value={state}
                        onChange={handleState}
                        placeholder="State"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6">
                      <Input
                        name="Country"
                        value={country}
                        onChange={handleCountry}
                        placeholder="Country"
                        disabled
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
                      onChange={handleChangeDomain}
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
                          value={webLink}
                          onChange={handleWeb}
                          placeholder="Website "
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          name="Facebook"
                          value={fbLink}
                          onChange={handleFB}
                          placeholder="Facebook"
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          name="Instagram"
                          value={instaLink}
                          onChange={handleInsta}
                          placeholder="Instagram"
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          name="Twitter"
                          value={twitterLink}
                          onChange={handleTwitter}
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          name="Linked In"
                          value={linkedinLink}
                          onChange={handleIN}
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          name="Medium"
                          value={mediumLink}
                          onChange={handleMedium}
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          name="Github"
                          value={githubLink}
                          onChange={handleGit}
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          name="YouTube"
                          value={youtubeLink}
                          onChange={handleYT}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6 mx-auto text-center">
                    <button
                      type="submit"
                      className={`loginbutton btn btn-primary ld-ext-right running btn-block ${styles.add}`}
                      onClick={handleSubmit}
                    >
                      {btnLoading ? "loading..." : "Update Community"}
                      {btnLoading ? (
                        <div className="ld ld-ring ld-spin" />
                      ) : null}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
