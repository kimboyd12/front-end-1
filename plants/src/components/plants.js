import React, { useEffect } from "react";

import styled from "styled-components";
import { connect, useDispatch } from "react-redux";

import { userPlants } from "../actions";
import { deletePlant } from "../actions";

import { useHistory } from "react-router-dom";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.3rem;
  flex-wrap: wrap;
`;
const Plants = (props) => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPlants(props.user.id));
  }, [props.usersPlants]);

  console.log(props.usersPlants);

  const updatePlant = (plant) => {
    console.log(plant);
    push(`updateplant/plant/${plant.plantID}`);
  };

  const handleDelete = (plant) => {
    console.log(plant.plantID);
    dispatch(deletePlant(props.user.id, plant.plantID));
    push("/plants");
  };

  return (
    <div className="list">
      {props.usersPlants.length === 0 && !props.isLoading && (
        <h2>You have no plants. Add one.</h2>
      )}

      {/* {props.isLoading && <h1>Loading...</h1>} */}
      <StyledDiv>
        {props.usersPlants.map((plant) => {
          return (
            <StyledDiv>
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
                      <div
                        className="ui basic green button"
                        onClick={() => updatePlant(plant)}
                      >
                        Edit
                      </div>
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
            </StyledDiv>
          );
        })}
      </StyledDiv>
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
