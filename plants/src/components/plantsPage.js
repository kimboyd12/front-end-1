import React, { useState, useEffect } from "react";
import * as yup from "yup";

import styled from "styled-components";
import Plants from "./plants";
<<<<<<< HEAD
import { connect } from "react-redux";
import { addingPlant } from "../actions/plantActions";
=======
import { connect, useDispatch } from "react-redux";

import { addPlant } from "../actions";
>>>>>>> c87f4fe333d0a07a27a462d012b070ff5f9b863e

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

  form {
    width: 100%;
  }
`;

const StyledOutput = styled.div`
  p {
    color: black;
    margin-top: 2%;
    font-size: 1rem;
    font-family: "Quicksand", sans-serif;
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

const PlantsPage = (props) => {
  const dispatch = useDispatch();
  const [bDisabled, setbDisabled] = useState();
  const [p, setP] = useState();
  const [errors, setErrors] = useState({
    nickname: "",
    species: "",
    h2oFrequency: "",
  });
  const [plantState, setPlantState] = useState({
    nickname: "",
    species: "",
<<<<<<< HEAD
    h2oFrequency: ""
=======
    h2oFrequency: "",
>>>>>>> c87f4fe333d0a07a27a462d012b070ff5f9b863e
  });
  const d = yup.object().shape({
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
  // const output = JSON.stringify(p, null, 1);
  const [output, setOutput] = useState();
  const change = (e) => {
    e.persist();
    const newPlantState = { ...plantState, [e.target.name]: e.target.value };
    vChange(e);
    setPlantState(newPlantState);
  };
  const submit = (e) => {
    e.preventDefault();

<<<<<<< HEAD
    axios
      .post(`https://water-my-plants-back-end1.herokuapp.com/plants/addPlant/1`, plantState)
      .then((r) => {
        setP([r.data]);
        console.log(r.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
=======
    dispatch(addPlant(props.user.id, plantState));
>>>>>>> c87f4fe333d0a07a27a462d012b070ff5f9b863e
  };
  //   console.log(p);
  //   console.log(output);
  // console.log(Plants.nickname)
  return (
    <FormContainer>
      <StyledForm>
        <form onSubmit={submit}>
          <StyledFormInput>
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
              <h2>{bDisabled ? "Enter More Data" : "Submit"}</h2>
            </button>
          </StyledFormInput>
        </form>
      </StyledForm>
      <StyledOutput>
<<<<<<< HEAD
        <p></p>
=======
        <Plants />
>>>>>>> c87f4fe333d0a07a27a462d012b070ff5f9b863e
      </StyledOutput>
    </FormContainer>
    // need to change the JSON stringify to a list of plants
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(PlantsPage);
