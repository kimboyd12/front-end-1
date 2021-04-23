import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom"

import styled from "styled-components";
import logo from "./Logo.png";

const PageContainer = styled.div`
  text-align: center;

  p {
    font-family: "Raleway", sans-serif;
    font-size: 1.7rem;
    margin: 5%;
  }
  img {
    margin-top: 10%;
  }
  .middle .aligned .row {
    height: 50%;
  }
`;
 
const Button = styled.button`
  width: 30%;
  background-color: #a0d6b4;
  color: white;
  padding: 20px 20px;
  margin: 2%;
  margin-top: 10%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: "Quicksand", sans-serif;
`

const Homepage = () => {


  return (
    <PageContainer>
      <div
        className="ui equal width center aligned padded grid"
        style={{ height: "100vh", padding: "0", margin: "0" }}
        >
        <div
          className=" middle aligned row"
          style={{ padding: "0", margin: "0" }}
        >
          <div
            className="  middle center aligned column"
            style={{
              backgroundColor: "#a0d6b4",
              background:
                "linear-gradient(180deg, rgba(160,214,180,1) 9%, rgba(255,255,255,1) 100%)",
              height: "100%",
              padding: "0",
              margin: "0",
            }}
          >
            <img src={logo} alt="Logo" />
            <p>
              An easy-to-use application made so you never forget to water your
              plants again!
            </p>
            <p>It's simple! Create an account, add plants to your profile, keep track of your watering schedule</p>
            <Link to='/signup'>
            <Button>Get Started</Button>
            </Link>
          </div>
          </div>
          </div>
</PageContainer>
         
  )}
export default Homepage;

