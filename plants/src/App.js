import React from "react";
import Login from "./components/login";

import { Route, Switch, Link, useHistory } from "react-router-dom";
import "./App.css";
import Register from "./components/register";

function App() {
  return (
    <div className="App">
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup" >
        <Register />
      </Route>

    </div>
  );
}

export default App;
