import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { BrowserRouter as Router } from "react-router-dom";

import { rootReducer } from "./reducers";
// import { plantReducer } from "./reducers/plantReducer"

import App from "./App";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootElement
);
