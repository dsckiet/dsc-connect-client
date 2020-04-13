import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import styles from "./search.module.css";
import Input from "./../common/input";
import useInputState from "../../hooks/useInputState";

const options = [
  { value: "Mobile", label: "Mobile" },
  { value: "web", label: "Web" },
  { value: "ml", label: "ML" },
  { value: "cloud", label: "Cloud" },
];

export default function Search({ getFilterData, getSearchData }) {
  const [pos, setPos] = useState(true);
  const [location, handleLocation] = useInputState("");
  const [search, handleSearch] = useInputState("");
  const [domain, handleDomain] = useState();

  const handleArrow = () => {
    setPos(!pos);
  };

  const handleChange = (domain) => {
    if (domain) handleDomain({ domain: domain.value });
    if (!domain) handleDomain({ domain: null });
  };

  const query = () => {
    let data = {};
    if (location) data = { location: location, domain: null, name: null };
    if (domain)
      data = { location: location, domain: domain.domain, name: null };
    getFilterData(data);
  };

  return (
    <>
      <div className={`mt-4 ${styles.filter}`}>
        <div className={`card p-4 ${styles.cardEdit}  ${styles.crdStyle}`}>
          <div>
            {/* <p className={styles.sideHead}>Filter</p> */}
            <form>
              <div className="row">
                <div className="col-lg-4 form-group">
                  <label htmlFor="county" className={styles.crdTxt}>
                    Location
                  </label>
                  <Input
                    name="Location"
                    value={location}
                    onChange={handleLocation}
                  />
                </div>
                <div className="col-lg-4 form-group">
                  <label htmlFor="work" className={styles.crdTxt}>
                    Domains
                  </label>
                  <CreatableSelect
                    isClearable
                    onChange={handleChange}
                    options={options}
                    closeMenuOnSelect={true}
                    placeholder="Domain"
                  />
                </div>

                <div className="col-lg-4 form-group">
                  <label htmlFor="work" className={styles.crdTxt}>
                    .
                  </label>
                  <br />
                  <button
                    type="button"
                    className={`px-3 btn btn-warning ${styles.resetBtn}`}
                    onClick={() => {
                      query();
                    }}
                  >
                    Filter
                  </button>
                </div>
              </div>

              <div className="form-group">
                <div>
                  <label className={styles.sideHead}>Search</label>
                </div>
                <Input name="Search" value={search} onChange={handleSearch} />
                <button
                  type="button"
                  className={`px-3 btn btn-warning ${styles.resetBtn}`}
                  onClick={() => {
                    getSearchData(search);
                  }}
                >
                  Search
                </button>
              </div>
            </form>
            {/* <br />
            <div className={`text-center ${styles.sideFooter}`}>
              <img
                className="img-fluid"
                src="./assets/images/learn.svg"
                alt=""
              />
              <div className={styles.sideFoot}>
                <center>
                  <p>developed by community; for communities</p>
                </center>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className={`col-lg-3 col-md-4 col-sm-3 ${styles.filterSM}`}>
        <div className="accordion" id="accordionExample">
          <div className={`card ${styles.cardEdit} ${styles.crdStyle}`}>
            <div
              className="card-header"
              id="headingOne"
              style={{ backgroundColor: "white" }}
            >
              <p
                className={`pt-1 ${styles.sideHead}`}
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                onClick={handleArrow}
              >
                Filter
                <span className="float-right" onClick={handleArrow}>
                  {pos ? (
                    <i className="fas fa-chevron-down ml-2  "></i>
                  ) : (
                    <i className="fas fa-chevron-up ml-2"></i>
                  )}
                </span>
              </p>
            </div>
            <div
              id="collapseOne"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="county" className={styles.crdTxt}>
                      Location
                    </label>
                    <Input
                      name="Location"
                      value={location}
                      onChange={handleLocation}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work" className={styles.crdTxt}>
                      Domains
                    </label>
                    <CreatableSelect
                      isClearable
                      onChange={handleChange}
                      options={options}
                      closeMenuOnSelect={false}
                      placeholder="Domain"
                    />
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      className={`px-3 btn btn-warning ${styles.resetBtn}`}
                    >
                      Filter
                    </button>
                  </div>
                  <div className="form-group">
                    <div>
                      <label className={styles.sideHead}>Search</label>
                    </div>
                    <Input
                      name="Search"
                      value={search}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      className={`px-3 btn btn-warning ${styles.resetBtn}`}
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
