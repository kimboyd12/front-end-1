import React, { useState, useEffect } from "react";
import * as yup from "yup";
// import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

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

// import { Link } from 'react-router-dom';

const formSchema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .min(5, "Must have more that 5 characters")
    .required("Must enter"),
  phoneNumber: yup.string().required("Please enter your phone number"),
});

function Register(props) {
  const [register, setRegister] = useState({
    username: "",
    password: "",
    phoneNumber: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    formSchema.isValid(register).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [register]);

  const [setPost] = useState({});

  const [error, setError] = useState({
    username: "",
    password: "",
    phoneNumber: "",
  });

  //validating my schema
  const validate = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setError({
          ...error,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setError({
          ...error,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setRegister({ ...register, [e.target.name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Registering");
    axios
      .post(
        "https://water-my-plants-back-end1.herokuapp.com/users/register",
        register
      )
      .then((response) => {
        localStorage.setItem("token", response.data.message);
        props.history.push("/login");
      })
      .catch((error) => console.log(error));
    setRegister({
      username: "",
      password: "",
      phoneNumber: "",
    });
  };

  return (
    <FormContainer>
      <StyledForm>
        <form>
          <StyledFormInput>
            <h2>Create Your Account</h2>{" "}
            {/* <label htmlFor="lastName">First Name:</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={register.firstName}
              onChange={inputChange}
            />
            {error.firstName.length > 0 ? <p>{error.firstName}</p> : null}
            <label htmlFor="firstName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={register.lastName}
              onChange={inputChange}
            />
            {error.lastName.length > 0 ? <p>{error.lastName}</p> : null} */}
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={register.username}
              onChange={inputChange}
            />
            {error.username.length > 0 ? <p>{error.username}</p> : null}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={register.password}
              onChange={inputChange}
            />
            {error.password.length > 5 ? <p>{error.password}</p> : null}
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={inputChange}
              value={register.phoneNumber}
            />
            {error.phoneNumber.length > 5 ? <p>{error.phoneNumber}</p> : null}
            <pre>{JSON.stringify(Register, null, 2)}</pre>
            {/* <button disabled={buttonDisabled}>Register</button>

      
    </form> */}
            <button
              disabled={buttonDisabled}
              data-cy="submit-button"
              onClick={formSubmit}
            >
              Register
            </button>
          </StyledFormInput>
        </form>
      </StyledForm>
    </FormContainer>
  );
}

export default Register;
