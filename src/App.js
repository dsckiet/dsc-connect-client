import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Homepage from "./components/homepage";
import Login from "./components/login";
import AddForm from "./components/add";
import Register from "./components/register";
import Footer from "./components/footer";
import axios from "axios";
import "./App.css";

// const [state, setState] = useState({ isLogged: false, user: "" });

// useEffect(() => {}, []);

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/add" component={AddForm} />
        <Route exact path="/register" component={Register} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
