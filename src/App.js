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
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/add" component={AddForm} />
        <PrivateRoute exact path="/update/:id" component={Update} />
        <Route exact path="/register" component={Register} />
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
        Data.token !== "" ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default App;
