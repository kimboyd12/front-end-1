import React from "react";
import Login from "./components/login";

import { Route, Switch, Link, useHistory } from "react-router-dom";
import "./App.css";
import Register from "./components/register";
import PrivateRoute from "./utils/PrivateRoute";
import PlantsPage from "./components/plantsPage";
import Profile from "./components/Profile";
import Plants from "./components/plants";

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
          <Link
            className="link"
            to={"//watermyplantsmarketingpage.netlify.app/about.html"}
            target="_blank"
          >
            Home
          </Link>
        </a>
        {/* <a className="link item">
          <Link className="link" to="/plants">
            Plants
          </Link>
        </a> */}
        <a className="link item">
          <Link className="link" to="/profile">
            Profile
          </Link>
        </a>

        <div className="right menu">
          <div class="item">
            <div class="ui primary button">
              {" "}
              <Link className="link" to="/">
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

      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Register} />

      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/plantlist" component={PlantsPage} />

      <PrivateRoute exact path="/plants" component={Plants} />

      <PrivateRoute
        exact
        path="/updateplant/plant/:id"
        component={UpdatePlants}
      />

      <PrivateRoute exact path="/updateaccount" component={UpdateInformation} />
    </div>
  );
}

export default App;
