import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import AppM from "./pages/app";

const App = () => {
  return (
    <Router>
      <Redirect to="/app/home"></Redirect>
      <Route path="/register">
        <Register></Register>
      </Route>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/app">
        <AppM></AppM>
      </Route>
    </Router>
  );
};

export default App;
