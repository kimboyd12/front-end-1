import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
export default function Profile() {

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
  return (
    <Container>
      <h1>Profile Page</h1>
      <StyledDiv>
        <img
          src="https://raw.githubusercontent.com/Build-Week-PT-Water-My-Plants/marketing-page/layout-2nd-page-greg-roberts/images/team/Gabriellia%20Venegas-Johnson.png"
          alt="Gabriellia Venegas-Johnson"
        />
        <p id="info">Username: Gabby Venegas</p>
        <p id="info">Phone Number: 555-555-5555</p>
        <p>Favorite Plants: Cactus</p>
        <Link to="/plantlist">
          <button>View Your Plants</button>
        </Link>
        <Link to="/plants">
          <button>Add Plants</button>
        </Link>
        <Link to="/updateaccount">
          <button>Update Your Profile</button>
        </Link>
      </StyledDiv>
    </Container>
  );
}