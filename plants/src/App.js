import React from "react";
import Login from "./components/login";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import "./App.css";
import PlantsPage from "./components/plantsFolder/plantsPage";

function App() {
  return (
    <div className="App">
      <Route path="/login">
        <Login />
      </Route>
    </div>
  );
}

export default App;
