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
  const [x, handleX] = useInputState("");
  const [y, handleY] = useInputState("");
  const [type, handleType] = useInputState("");
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

  // handleClick = () => {
  //   let domain = []
  //   let all = this.state;
  //   all.value.map((item) => {domain.push(item.value)})
  //   console.log(domain);
  // }

  useEffect(() => {
    console.log("chl");
  }, [x, y, type]);
  const handleSubmit = async e => {
    e.preventDefault();
    let body = { latitude: x, longitude: y, type: type };
    try {
      const token = data.token;
      await axios.post(add, body, {
        headers: {
          "x-auth-token": token
        }
      });
      props.history.push("/");
      console.log("API REQUEST");
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  console.log(option);
  return (
    // <div className="container">
    //   <div className={`col-lg-8 mx-auto ${styles.crdEdit}`}>
    //     <div className="pt-5">
    //       <p className={`heading ${styles.head}`}>Enter Data</p>
    //     </div>
    //     <div className="card p-4">
    //       <form onSubmit={handleSubmit}>
    //         <label className="label">Co-Ordinates : </label>

    //         <div className="form-group row mt-2">
    //           <label className="col-sm-2 col-form-label">X-Axis :</label>
    //           <div className="col-sm-3">
    //             <input
    //               type="number"
    //               name="x"
    //               className="form-control"
    //               placeholder="X"
    //               value={x}
    //               onChange={handleX}
    //             />
    //           </div>
    //           <label className="col-sm-2 col-form-label">Y-Axis :</label>
    //           <div className="col-sm-3">
    //             <input
    //               type="number"
    //               name="y"
    //               className="form-control"
    //               placeholder="Y"
    //               value={y}
    //               onChange={handleY}
    //             />
    //           </div>
    //         </div>
    //         <div className="row mt-4">
    //           <label className="col-sm-2 label">Type : </label>
    //           <div className="col-sm-6 form-group ">
    //             <select
    //               name="type"
    //               className="form-control"
    //               id="exampleFormControlSelect1"
    //               value={type}
    //               onChange={handleType}
    //             >
    //               <option defaultChecked>Select</option>
    //               <option value="crime">Crime</option>
    //               <option value="accident">Accident</option>
    //             </select>
    //           </div>
    //         </div>
    //         <div className="text-right">
    //           <button type="submit" className="btn btn-primary">
    //             Submit
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="fluid-conatiner">
      <div className="container">
        <div className="col-lg-8 mx-auto">
          <div class="card mt-5">
            <div class={`card-header p-3 ${styles.head}`}>
              Community Details
            </div>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Name..."
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="location">Location</label>
                    <input
                      type="text"
                      class="form-control"
                      id="location"
                      placeholder="Location..."
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="size">Team Size</label>
                    <input
                      type="number"
                      class="form-control"
                      id="size"
                      placeholder="Team Size..."
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="domain" class="col-sm-2 col-form-label">
                    Domains
                  </label>
                  <div class="col-sm-10">
                    <CreatableSelect
                      value={option.selectedOption}
                      isMulti
                      onChange={handleChange}
                      options={defaultOptions}
                      closeMenuOnSelect={false}
                    />
                  </div>
                </div>
                <div class="form-row">
                  {fields.map(item => {
                    return (
                      // <div class="form-group col-md-6">
                      //   <label for="location">{item}</label>
                      //   <input
                      //     type="text"
                      //     class="form-control"
                      //     id="location"
                      //     placeholder={`Enter ${item} link`}
                      //   />
                      // </div>
                      <div className="col-md-6">
                        <Input name={item} />
                      </div>
                    );
                  })}
                </div>
                <button type="submit" class="btn btn-primary">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
