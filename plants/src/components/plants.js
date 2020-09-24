import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import { connect, useSelector, useDispatch } from "react-redux";
import { getPlants } from "../actions/plantActions";
import Plant from "./plantsPage";
import axiosWithAuth from "../utils/axiosWithAuth";
import { userPlants } from "../actions";
import { deletePlant } from "../actions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Plants = (props) => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPlants(props.user.id));
  }, [props.usersPlants]);

  console.log(props.usersPlants);

  const handleDelete = (e) => {
    e.preventDefault();
    const id = e.target.key;
    console.log(id);
    dispatch(deletePlant(props.user.id, id));
    console.log(e);
  };

  return (
    <div classNameName="list">
      <h1>this is plants component</h1>

      {props.usersPlants.length === 0 && !props.isLoading && (
        <h2>You have no plants. Add one.</h2>
      )}
      {props.isLoading && <h1>Loading...</h1>}
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
                    onClick={handleDelete}
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
