import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";
const Profile = (props) => {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-decoration: none;
    p {
      color: black;
      margin: 0.3rem;
      font-size: 1rem;
      font-family: "Quicksand", sans-serif;
    }
  `;
  const StyledDiv = styled.div`
    background-color: #e5ebed;
    width: 50%;
    padding: 2%;
    border-radius: 2rem;
    box-shadow: 0 4rem 8rem 0 rgba(0, 0, 0, 0.2),
      0 6rem 20rem 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
    flex-shrink: 3;
    margin: 0rem 0rem 0rem 0rem;
    button {
      color: black;
      margin: 0.5rem;
    }
  `;

  document.onload = console.log("Profile Lodaded");
  return (
    <Container>
      <StyledDiv>
        <h1>Welcome back.</h1>
        <p>What would you like to do today?</p>
        <p id="info">Username: {props.user.username}</p>
        <p id="info">Phone Number: {props.user.phoneNumber}</p>

        <Link to="/plantslist">
          <button>View Your Plants</button>
        </Link>
        <Link to="/addplant">
          <button>Add Plants</button>
        </Link>
        <Link to="/updateaccount">
          <button>Update Your Profile</button>
        </Link>
      </StyledDiv>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
    usersPlants: state.loginReducer.usersPlants,
    isLoading: state.loginReducer.isLoading,
  };
};

export default connect(mapStateToProps)(Profile);
