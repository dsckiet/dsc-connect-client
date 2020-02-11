import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import AddForm from "./components/add/add";
import Register from "./components/register/register";
import Footer from "./components/footer/footer";
import Update from "./components/update/update";
import { AuthContext } from "./contexts/userContext";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Profile from "./components/profile/profile";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <PrivateRoute exact path="/add" component={AddForm} />
        <PrivateRoute exact path="/update/:id" component={Update} />
        <PrivateRoute exact path="/profile" component={Profile} />
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
      render={props =>
        Data.token !== "" ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default App;
