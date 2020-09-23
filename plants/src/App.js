import React from "react";
import Login from "./components/login";

import { Route, Switch, Link, useHistory } from "react-router-dom";
import "./App.css";
import Register from "./components/register";
import Plants from "./components/plantsFolder/plantsPage"

import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const { push } = useHistory();
  const handleSignOut = () => {
    push("/home");
    localStorage.removeItem("token");
  };
  return (
    <div className="App">


      <Switch>
        <PrivateRoute path="/plants">
          <h1>Plants Go here</h1>
          <Plants />
        </PrivateRoute>
        <Route path="/home">
          <h1>Insert Marketing Page Here</h1>
        </Route>

        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
