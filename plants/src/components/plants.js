import React, { useEffect } from "react";

import styled from "styled-components";
import { connect, useDispatch } from "react-redux";

import { userPlants } from "../actions";
import { deletePlant } from "../actions";

import { useHistory } from "react-router-dom";
const Plants = (props) => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPlants(props.user.id));
  }, [props.usersPlants]);

  console.log(props.usersPlants);

  const handleDelete = (plant) => {
    console.log(plant.plantID);
    dispatch(deletePlant(props.user.id, plant.plantID));
    push("/plants");
  };

  return (
    <div className="list">
      <h1>this is plants component</h1>

      {props.usersPlants.length === 0 && !props.isLoading && (
        <h2>You have no plants. Add one.</h2>
      )}
      {/* {props.isLoading && <h1>Loading...</h1>} */}
      {props.usersPlants.map((plant) => {
        return (
          <div key={plant.plantID} className="ui cards">
            <div className="card">
              <div className="content">
                <div className="header">{plant.Nickname}</div>
                <div className="meta">{plant.Species}</div>
                <div className="description">
                  Watering Frequency: {plant.h2oFrequency}
                </div>
              </div>
              <div className="extra content">
                <div className="ui two buttons">
                  <div className="ui basic green button">Edit</div>
                  <button
                    onClick={() => handleDelete(plant)}
                    className="ui basic red button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
    usersPlants: state.loginReducer.usersPlants,
    isLoading: state.loginReducer.isLoading,
  };
};

export default connect(mapStateToProps)(Plants);
