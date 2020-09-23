import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import Plants from "./plants";

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
  width: 100%;
  padding: 2%;
  border-radius: 2rem;
  box-shadow: 0 4rem 8rem 0 rgba(0, 0, 0, 0.2),
    0 6rem 20rem 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 1000px) {
    width: 45%;
  }
  form {
    width: 100%;
  }
`;

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 62.5%;
  width: 100%;
  h2 {
    text-align: center;
    font-size: 1.7rem;
    font-family: "Quicksand", sans-serif;
  }
  label {
    width: 95%;
    text-align: center;
    margin: 0% 2% 0% 2%;
    font-size: 1.2rem;
    font-family: "Quicksand", sans-serif;
  }
  input {
    width: 100%;
    padding: 1rem 1rem;
    margin: 0% 2% 0% 2%;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    box-sizing: border-box;
  }
  button {
    width: 95%;
    background-color: #2b85a2;
    color: white;
    margin: 3.2% 0% 0% 2%;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1.2rem;
    font-family: "Quicksand", sans-serif;
  }
`;

const PlantsPage = () => {
  const [bDisabled, setbDisabled] = useState();
  const [p, setP] = useState();
  const [errors, setErrors] = useState({
    id: "",
    nickname: "",
    species: "",
    h2oFrequency: "",
  });
  const [plantState, setPlantState] = useState({
    id: "",
    nickname: "",
    species: "",
    h2oFrequency: "",
  });
  const d = yup.object().shape({
    id: yup.string().required(),
    nickname: yup.string().required(),
    species: yup.string().required(),
    h2oFrequency: yup.string().required(),
  });
  const vChange = (e) => {
    yup
      .reach(d, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };
  useEffect(() => {
    d.isValid(plantState).then((isValid) => {
      setbDisabled(!isValid);
    });
  }, [plantState]);

  const change = (e) => {
    e.persist();
    const newPlantState = { ...plantState, [e.target.name]: e.target.value };
    vChange(e);
    setPlantState(newPlantState);
  };
  useEffect(() => {
    axios
      .get("https://water-my-plants-back-end1.herokuapp.com/plants/")
      .then((response) => {
        console.log(response.data);
      });
  }, []);
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", plantState)
      .then((r) => {
        setP([p, r.data]);
        setPlantState({
          id: "",
          nickname: "",
          species: "",
          h2oFrequency: "",
        });
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  return (
    <FormContainer>
      <StyledForm>
        <form onSubmit={submit}>
          <StyledFormInput>
            <label htmlFor="id">
              <h2> ID</h2>
              <input
                id="id"
                type="text"
                id="id"
                value={plantState.name}
                onChange={change}
              />
              {errors.id.length > 0 ? <p>{errors.id}</p> : null}
            </label>
            <label htmlFor="nickname">
              {" "}
              <h2>Nickname</h2>
              <input
                id="nickname"
                type="text"
                name="nickname"
                value={plantState.nickname}
                onChange={change}
              />
              {errors.nickname.length > 0 ? <p>{errors.nickname}</p> : null}
            </label>
            <label htmlFor="species">
              {" "}
              <h2>Species</h2>
              <input
                id="species"
                type="text"
                name="species"
                value={plantState.species}
                onChange={change}
              />
              {errors.species.length > 0 ? <p>{errors.species}</p> : null}{" "}
            </label>
            <label htmlFor="h2oFrequency">
              {" "}
              <h2> Watering Amt</h2>
              <input
                id="h2oFrequency"
                type="text"
                name="h2oFrequency"
                value={plantState.h2oFrequency}
                onChange={change}
              />
              {errors.h2oFrequency.length > 0 ? (
                <p>{errors.h2oFrequency}</p>
              ) : null}
            </label>
            <button disabled={bDisabled} type="submit">
              <h2>Submit</h2>
            </button>
            <pre>{JSON.stringify(p, null, 2)}</pre>

            <button >Edit Plant</button>
          </StyledFormInput>
        </form>
      </StyledForm>
    </FormContainer>
  );
};

export default PlantsPage;
