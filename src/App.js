import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Homepage from "./components/homepage";
import Login from "./components/login";
import AddForm from "./components/add";
import Register from "./components/register";
import Footer from "./components/footer";
import "./App.css";
import { AuthContext } from "./contexts/userContext";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <PrivateRoute exact path="/login" component={Login} />
        <Route exact path="/add" component={AddForm} />
        <PrivateRoute exact path="/register" component={Register} />
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
