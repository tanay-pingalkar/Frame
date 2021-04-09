import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import AppM from "./pages/app";

const App = () => {
  return (
    <Router>
      <Route path="/register">
        <Register></Register>
      </Route>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/app">
        <AppM></AppM>
      </Route>
      <Route exact path="/">
        <Redirect to="/app/home"></Redirect>
      </Route>
    </Router>
  );
};

export default App;
