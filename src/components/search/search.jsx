import React, { useState } from "react";
import Select from "react-select";
import styles from "./search.module.css";
import Input from "./../common/input";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

export default function Search() {
  const [pos, setPos] = useState(true);

  const handleArrow = () => {
    setPos(!pos);
  };

  return (
    <>
      <div className={`col-lg-3 col-md-4 col-sm-4 mt-4 ${styles.filter}`}>
        <div className={`card p-4 ${styles.cardEdit}`}>
          <div>
            <p className={styles.sideHead}>Filter</p>
            <form>
              <div className="form-group">
                <label htmlFor="county" className={styles.crdTxt}>
                  Country
                </label>
                <Select options={options} />
              </div>
              <div className="form-group">
                <label htmlFor="work" className={styles.crdTxt}>
                  Works on
                </label>
                <Select options={options} />
              </div>
              <div className="form-group">
                <label htmlFor="search" className={styles.crdTxt}>
                  Search
                </label>
                <Input name="Search" />
              </div>
              <div className="float-right">
                <button
                  type="button"
                  className={`px-3 btn btn-warning ${styles.resetBtn}`}
                >
                  Search
                </button>
              </div>
            </form>
            <br />
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
            </div>
          </div>
        </div>
      </div>
      <div className={`col-lg-3 col-md-4 col-sm-3 ${styles.filterSM}`}>
        <div className="accordion" id="accordionExample">
          <div className={`card ${styles.cardEdit}`}>
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
                    <label htmlFor="county">Country</label>
                    <Select options={options} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work">Works on</label>
                    <Select options={options} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="search">Search</label>
                    <input
                      type="text"
                      className="form-control"
                      id="search"
                      placeholder="Type here"
                    />
                  </div>
                  <div className="float-right mb-4">
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
