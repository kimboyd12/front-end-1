import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-decoration: none;

  p {
    color: #c6d7dd;
    margin-top: 2%;
    font-size: 1rem;
    font-family: "Quicksand", sans-serif;
  }

  .link {
    text-decoration: none;
    color: blue;

    &:hover {
      color: black;
    }
  }

  .errors {
    font-size: 1.5rem;
    font-family: "Quicksand", sans-serif;
  }
`;
const StyledForm = styled.div`
  background-color: #e5ebed;
  width: 25%;
  height: auto;
  padding: 2%;
  margin-top: 10%;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  display: flex;
  flex-direction: column;

  align-items: center;

  @media (max-width: 1000px) {
    width: 45%;
  }

  form {
    width: 95%;
  }
`;

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  h2 {
    text-align: left;
    font-size: 2rem;
    margin-bottom: 8%;
    margin-top: 10%;
    font-family: "Quicksand", sans-serif;
  }

  label {
    width: 95%;
    text-align: left;
    margin: 2%;
    font-size: 1.2rem;
    font-family: "Quicksand", sans-serif;
  }

  input {
    width: 95%;
    padding: 20px 20px;
    margin: 2%;
    margin-bottom: 8%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    width: 95%;
    background-color: #2b85a2;
    color: white;
    padding: 20px 20px;
    margin: 2%;
    margin-top: 10%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
    font-family: "Quicksand", sans-serif;
  }
`;

class Register extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
      phoneNumber: "",
    },
  };

  handleChanges = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
    .post("https://water-my-plants-back-end1.herokuapp.com/users/register", this.state.credentials)
    .then((response) => {
      localStorage.setItem("token", response.data.payload);
      this.props.history.push("/plants")
    })
    .catch((error) => console.log(error))
  };

  render() {
    return (
      <FormContainer>
        <StyledForm>
          <form>
            <StyledFormInput>
              <h2>Create Your Account</h2>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                name="username"
                type="username"
                onChange={this.handleChanges}
                value={this.state.credentials.username}
              />

              <label htmlFor="password">Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={this.handleChanges}
                value={this.state.credentials.password}
              />

              <label htmlFor="password">Phone Number:</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="phoneNumebr"
                onChange={this.handleChanges}
                value={this.state.credentials.phoneNumber}
              />

              <button data-cy="submit-button" onClick={this.handleSubmit}>
                Register
              </button>
            </StyledFormInput>
          </form>
        </StyledForm>
      </FormContainer>
    );
  }
}

export default Register;
