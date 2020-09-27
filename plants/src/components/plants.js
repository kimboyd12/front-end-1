import React, { useEffect } from "react";

import styled from "styled-components";
import { connect, useDispatch } from "react-redux";

import { userPlants } from "../actions";
import { deletePlant } from "../actions";

import { useHistory } from "react-router-dom";

const StyledTitle = styled.div`
  h1 {
    font-family: "Raleway", sans-serif;
    font-size: 2.5rem;
    margin: 3%;
    color: #a0d6b4;
  }
`;

const StyledPage = styled.div`
  background: radial-gradient(
    circle,
    rgba(160, 214, 180, 1) 9%,
    rgba(255, 255, 255, 1) 100%
  );

  height: 100vh;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0.3rem;
  flex-wrap: wrap;
`;
const Plants = (props) => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPlants(props.user.id));
    localStorage.setItem("length", props.usersPlants.length);
  }, [props.usersPlants]);

  console.log(props.usersPlants);

  const updatePlant = (plant) => {
    console.log(plant);
    push(`updateplant/plant/${plant.plantID}`);
  };

  const handleDelete = (plant) => {
    console.log(plant.plantID);
    dispatch(deletePlant(props.user.id, plant.plantID));
    push("/plantslist");
  };

  const username = localStorage.getItem("username");

  return (
    <div className="list">
      <StyledTitle>
        <h1>{username}'s Plants</h1>
      </StyledTitle>
      <div className="ui horizontal divider" style={{ margin: "2%" }}>
        plants to be watered
      </div>
      <StyledPage>
        {props.usersPlants.length === 0 && !props.isLoading && (
          <h2>You have no plants. Add one.</h2>
        )}

        {/* {props.isLoading && <h1>Loading...</h1>} */}
        <div className="ui one column centered grid">
          <div className="column" style={{ width: "50%" }}>
            <StyledDiv>
              {props.usersPlants.map((plant) => {
                return (
                  <StyledDiv>
                    <div className="ui cards">
                      <div className="green card">
                        <div className="content">
                          <img
                            className="right floated mini ui image"
                            src="https://source.unsplash.com/featured/?flowers,plants"
                          ></img>
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
        </div>
      </StyledPage>
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
