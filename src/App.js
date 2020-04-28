import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "./contexts/userContext";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar/navbar";
import Homepage from "./components/homepage/homepage";
import Add from "./components/add/add";
import Footer from "./components/footer/footer";
import Update from "./components/update/update";
import verifyEmail from "./components/verify/verifyEmail";
import Profile from "./components/profile/profile";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NotFound from "./components/404/404";
import "../src/assets/stylesheets/loading.css";
import "../src/assets/stylesheets/loading-btn.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <NavBar />
      <Switch>
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/verify/:id" component={verifyEmail} />
        <PrivateRoute exact path="/add" component={Add} />
        <PrivateRoute exact path="/update" component={Update} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}
const PrivateRoute = ({ component: Component, ...rest }) => {
  const Data = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        Data.token !== "" ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default App;
