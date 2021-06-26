import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ConvoContextProvider } from "./context/convosContext";

import store from "./store/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ConvoContextProvider>
        <App />
      </ConvoContextProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);
