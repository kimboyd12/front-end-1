import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
// import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

import styled from "styled-components";
import logo from "./Logo.png";

const Error = styled.div`
  color: red;
  font-size: .85rem;
  font-family: "Quicksand", sans-serif;
`

const PageContainer = styled.div`
  text-align: center;

  p {
    font-family: "Raleway", sans-serif;
    font-size: 2rem;
    margin: 5%;
  }
  img {
    margin-top: 25%;
  }
  .middle .aligned .row {
    height: 100%;
  }
`;

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
    color: #49796b;

    &:hover {
      color: #a0d6b4;
    }
  }

`;
const StyledForm = styled.div`
  background-color: #e5ebed;
  width: 40%;
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
  }
`;

// import { Link } from 'react-router-dom';

const formSchema = yup.object().shape({
  username: yup.string().required("Please enter a username"),
  password: yup
    .string()
    .min(5, "Must contain at least 5 characters")
    .required("Please create a password"),
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
        "https://watermy-plants.herokuapp.com/users/register",
        register
      )
      .then((response) => {
        window.localStorage.setItem("token", response.data.token);
        props.history.push("/");
      })
      .catch((error) => console.log(error));
    setRegister({
      username: "",
      password: "",
      phoneNumber: "",
    });

  };

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
              plants again.
            </p>
          </div>
          <div className="column" style={{ width: "30%" }}>
            <FormContainer>
              <StyledForm>
                <form>
                  <StyledFormInput>
                    <h2>Create Your Account</h2>{" "}
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={register.username}
                      onChange={inputChange}
                    />
                    {error.username.length > 0 ? <Error>{error.username}</Error> : null}
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={register.password}
                      onChange={inputChange}
                    />
                    {error.password.length > 5 ? <Error>{error.password}</Error> : null}
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      onChange={inputChange}
                      value={register.phoneNumber}
                    />
                    {error.phoneNumber.length > 5 ? (
                      <Error>{error.phoneNumber}</Error>
                    ) : null}
                    <pre>{JSON.stringify(Register, null, 2)}</pre>
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
              <p>
                Already have an account?{" "}
                <Link className="link" to="/">
                  Login
                </Link>
              </p>
            </FormContainer>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Register;
