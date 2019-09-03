import React, { Fragment } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layouts/Landing";
import Navbar from "./components/layouts/Navbar";
import "./App.css";

const App = () => (
  <Fragment>
    <Navbar />
    <Landing />
  </Fragment>
);

export default App;
