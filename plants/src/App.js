import React from "react";
import Login from "./components/login";

import { Route, Switch, Link, useHistory } from "react-router-dom";
import "./App.css";
import Register from "./components/register";
import PrivateRoute from "./utils/PrivateRoute";
import Plants from "./components/plantsPage";
// import PlantPage from "./components/plantsPage";
// import UpdatePlants from "./components/updateForms/updatePlants";

function App() {
  const { push } = useHistory();
  const handleSignOut = () => {
    push("/");
    localStorage.removeItem("token");
  };
  return (
    <div className="App">
      <div className="ui  menu">
        <a className="item link">
          <Link className="link" to="/home">
            Home
          </Link>
        </a>
        <a className="link item">
          <Link className="link" to="/plants">
            Plants
          </Link>
        </a>

        <div className="right menu">
          <div class="item">
            <div class="ui primary button">
              {" "}
              <Link className="link" to="/login">
                Login
              </Link>
            </div>
          </div>
          <div class="item">
            <div class="ui button">
              <Link className="link" to="/" onClick={handleSignOut}>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Switch>

        <PrivateRoute path="/plants" component={Plants} />


        <Route path="/home">
          <h1>Insert Marketing Page Here</h1>
        </Route>




        <Route exact path="/signup" component={Register}/>
      

        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
