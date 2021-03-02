import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/register-login/login";
import Register from "./components/register-login/register";
import AppM from "./components/app/app";

const App = () => {
  return (
    <Router>
      <Route path="/register">
        <Register></Register>
      </Route>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/" exact={true}>
        <AppM></AppM>
      </Route>
    </Router>
  );
};

export default App;
