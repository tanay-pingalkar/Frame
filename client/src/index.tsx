import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { createStore } from "redux";
import allReducer from "./redux/combine";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(allReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
