import React from "react";
import Login from "./components/login";

import { Route, Switch, Link, useHistory } from "react-router-dom";
import "./App.css";
import Register from "./components/register";
import PrivateRoute from "./utils/PrivateRoute";
import Plants from "./components/plantsPage";
import Profile from "./components/Profile";
// import PlantPage from "./components/plantsPage";
// import UpdatePlants from "./components/updateForms/updatePlants";
import UpdatePlants from "./components/updateForms/updatePlants";

import UpdateInformation from "./components/updateForms/updateInformation";


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
              <Link className="link" to="/profile">
                Profile
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

      <Route exact path="/login" component={Login} />
      <Route path="/signup" component={Register} />

      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/plants" component={Plants} />

      <PrivateRoute exact path="/plantsPage" component={Plants} />

      <PrivateRoute exact path="/plants/:id" component={UpdatePlants} />

      <PrivateRoute exact path="/updateaccount" component={UpdateInformation} />
    </div>
  );
}

export default App;
