import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";

const StyledTitle = styled.div`
  h1 {
    font-family: "Raleway", sans-serif;
    font-size: 2.5rem;
    margin: 3%;
    color: #a0d6b4;
  }
`;

const StyledPage = styled.div`
  padding-top: 2%;
  padding-bottom: 0;
  margin-bottom: 0;

  /* display: flex;

  flex-direction: column;
  align-items: center;
  width: 100%;
  text-decoration: none; */
  background: radial-gradient(
    circle,
    rgba(160, 214, 180, 1) 9%,
    rgba(255, 255, 255, 1) 100%
  );

  height: 100vh;
`;

const Profile = (props) => {
  // const Container = styled.div`
  //   display: flex;
  //   justify-content: center;
  //   flex-direction: column;
  //   align-items: center;
  //   width: 100%;
  //   text-decoration: none;
  //   p {
  //     color: black;
  //     margin: 0.3rem;
  //     font-size: 1rem;
  //     font-family: "Quicksand", sans-serif;
  //   }
  // `;
  // const StyledDiv = styled.div`
  //   background-color: #e5ebed;
  //   width: 50%;
  //   padding: 2%;
  //   border-radius: 2rem;
  //   box-shadow: 0 4rem 8rem 0 rgba(0, 0, 0, 0.2),
  //     0 6rem 20rem 0 rgba(0, 0, 0, 0.19);
  //   display: flex;
  //   flex-direction: column;
  //   flex-shrink: 3;
  //   margin: 0rem 0rem 0rem 0rem;
  //   button {
  //     color: black;
  //     margin: 0.5rem;
  //   }
  // `;

  const username = localStorage.getItem("username");
  const phoneNumber = localStorage.getItem("phoneNumber");
  const length = localStorage.getItem("length");

  document.onload = console.log("Profile Loaded");
  return (
    <div>
      <StyledTitle>
        <h1>Welcome Back.</h1>
      </StyledTitle>
      <div className="ui horizontal divider" style={{ margin: "2%" }}>
        What would you like to do today?
      </div>
      <StyledPage>
        <div className="ui centered card" style={{ width: "20%" }}>
          <div className="image">
            <img src="https://loremflickr.com/500/500/flower" />
          </div>
          <div className="content">
            <p
              classname="header"
              id="info"
              style={{
                fontSize: "1.5rem",
                fontFamily: "Raleway",
                textAlign: "left",
              }}
            >
              Username: {username}
            </p>
            <div className="left floated meta">
              <span
                className="date"
                id="info"
                style={{ fontFamily: "Raleway" }}
              >
                Phone Number: {phoneNumber}
              </span>
            </div>
            <div
              className="left floated description"
              style={{ fontFamily: "Raleway" }}
            >
              {username} has {length} plants.
            </div>
          </div>
          <div className="extra content">
            <div
              className="ui secondary vertical menu"
              style={{ width: "100%" }}
            >
              <a className="item">
                <Link to="/plantslist" style={{ color: "#49796b" }}>
                  {" "}
                  <p style={{ textAlign: "left" }}>
                    {" "}
                    <i class="eye icon"></i> View Your Plants
                  </p>
                </Link>
              </a>
              <a className="item">
                <Link to="/addplant" style={{ color: "#49796b" }}>
                  <p style={{ textAlign: "left" }}>
                    {" "}
                    <i class="plus icon"></i> Add Plants
                  </p>
                </Link>
              </a>
              <a className="item">
                <Link to="/updateaccount" style={{ color: "#49796b" }}>
                  <p style={{ textAlign: "left" }}>
                    {" "}
                    <i class="edit icon"></i> Update Your Profile
                  </p>
                </Link>
              </a>
            </div>
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

export default connect(mapStateToProps)(Profile);
