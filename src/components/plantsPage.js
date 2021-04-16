import React, { useState, useEffect } from "react";
import * as yup from "yup";

import styled from "styled-components";

import { connect, useDispatch } from "react-redux";

import { addPlant } from "../actions";
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
  width: 30%;
  padding: 2%;
  border-radius: 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  form {
    width: 100%;
  }
  button {
    color: white;
    padding: 10px 10px;
    border-radius: 4px;
    border: 2px solid white;
    background: transparent;

    font-family: "Quicksand", sans-serif;
    cursor: pointer;
    margin-top: 2%;
  }

  p {
    color: white;
  }
`;

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;
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
    margin: 3%;
    background: transparent;
    border-radius: 0.5rem;
    box-sizing: border-box;

    outline: 0;
    border: none;
    border-bottom: 2px solid white;
  }

  input:focus {
    border-color: #49796b;
    background: transparent;
  }
`;

const PlantsPage = (props) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [bDisabled, setbDisabled] = useState();

  const [errors, setErrors] = useState({
    nickname: "",
    species: "",
    h2oFrequency: "",
  });
  const [plantState, setPlantState] = useState({
    nickname: "",
    species: "",
    h2oFrequency: "",
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

    dispatch(addPlant(props.user.id, plantState));
    push("/plantslist");
  };
  //   console.log(p);
  //   console.log(output);
  // console.log(Plants.nickname)
  return (
    <div>
      <StyledTitle>
        <h1>
          Add a New Plant <i className="leaf icon"></i>
        </h1>
      </StyledTitle>
      <div className="ui horizontal divider" style={{ margin: "2%" }}>
        Enter Plant Information
      </div>
      <StyledPage>
        <FormContainer>
          <StyledForm>
            <form onSubmit={submit}>
              <StyledFormInput>
                <div>
                  <input
                    id="nickname"
                    placeholder="Nickname"
                    type="text"
                    name="nickname"
                    value={plantState.nickname}
                    onChange={change}
                  />
                </div>
                {errors.nickname.length > 0 ? <p>{errors.nickname}</p> : null}
                <div>
                  <input
                    id="species"
                    placeholder="Species"
                    type="text"
                    name="species"
                    value={plantState.species}
                    onChange={change}
                  />
                </div>
                {errors.species.length > 0 ? <p>{errors.species}</p> : null}{" "}
                <div>
                  <input
                    id="h2oFrequency"
                    placeholder="Watering Schedule"
                    type="text"
                    name="h2oFrequency"
                    value={plantState.h2oFrequency}
                    onChange={change}
                  />
                </div>
                {errors.h2oFrequency.length > 0 ? (
                  <p>{errors.h2oFrequency}</p>
                ) : null}
              </StyledFormInput>
              <button disabled={bDisabled} type="submit">
                <p> {bDisabled ? "Enter More Data" : "Submit"}</p>
              </button>
            </form>
          </StyledForm>
        </FormContainer>
      </StyledPage>
    </div>
    // need to change the JSON stringify to a list of plants
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(PlantsPage);
