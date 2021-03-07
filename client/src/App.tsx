import { BrowserRouter as Router, Route } from "react-router-dom";
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
      <Route path="/" exact={true}>
        <AppM></AppM>
      </Route>
    </Router>
  );
};

export default App;
