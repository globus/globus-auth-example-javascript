/*Router.js*/
import React, { Component } from "react";
// import "./Router.css";
//Import all needed Component for this tutorial
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";

class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<App/>} />
        </Routes>
      </Router>
    );
  }
}

export default AppRoutes;