import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import { connect, useSelector, useDispatch } from "react-redux";
import { getPlants } from "../actions/plantActions";
import Plant from "./plantsPage";
import axiosWithAuth from "../utils/axiosWithAuth";
import { userPlants } from "../actions";
import { Link } from "react-router-dom";

const Plants = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPlants(props.user.id));
  }, []);

  console.log(props.usersPlants);

  return (
    <div classNameName="list">
      <h1>this is plants component</h1>

      {props.usersPlants.length === 0 && !props.isLoading && (
        <h2>You have no plants. Add one.</h2>
      )}
      {props.isLoading && <h1>Loading...</h1>}
      {props.usersPlants.map((plant) => {
        return (
          <div className="ui cards">
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
                  <div className="ui basic red button">Delete</div>
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
