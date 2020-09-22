import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import Plants from './plants'

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
  box-shadow: 0 4rem 8rem 0 rgba(0, 0, 0, 0.2), 0 6rem 20rem 0 rgba(0, 0, 0, 0.19);

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
    font-size: rem;

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

    margin: 2% 0% 0% 0%;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1.2rem;
    font-family: "Quicksand", sans-serif;
  }
`;

const PlantsPage = () => {

    const [p, setP] = useState();
    const [plantState, setPlantState] = useState({
        id: '',
        nickname: '',
        species: '',
        h2oFrequency: ''
    });



    const change = (e) => {
        e.persist();
        const newPlantState = { ...plantState, [e.target.name]: e.target.value }
        setPlantState(newPlantState);
    }
    useEffect(() => {
        axios.get('https://water-my-plants-back-end1.herokuapp.com/plants/')
            .then((response) => {
                console.log(response.data);
            });
    }, []);
    const submit = (e) => {
        e.preventDefault();
        axios.post("https://water-my-plants-back-end1.herokuapp.com/plants/", plantState)
            .then((res) => {
                setP([p, res.data]);
                setPlantState({
                    id: '',
                    nickname: '',
                    species: '',
                    h2oFrequency: ''
                })
            })
            .catch((err) => {
                console.log(err.response)
            });
    }
    return (
        <FormContainer>
            <StyledForm>
                <form onSubmit={submit}>
                    <StyledFormInput>
                        <label htmlFor="id"><h2> ID</h2>
                            <input id="id" type="text" id="id"
                                value={plantState.name} onChange={change} />
                        </label>
                        <label htmlFor="nickname"> <h2>Nickname</h2>
                            <input id="nickname" type="text" name="nickname"
                                value={plantState.nickname} onChange={change} />
                        </label>
                        <label htmlFor="species"> <h2>Species</h2>
                            <input id="species" type="text" name="species"
                                value={plantState.species} onChange={change} />
                        </label>
                        <label htmlFor="h2oFrequency"> <h2> Watering Amt</h2>
                            <input id="h2oFrequency" type="text" name="h2oFrequency"
                                value={plantState.h2oFrequency} onChange={change} />
                        </label>
                        <button type="submit"><h2>Submit</h2></button>
                        <pre>{JSON.stringify(p, null, 2)}</pre>
                    </StyledFormInput>
                </form>
            </StyledForm>
        </FormContainer>
    );
}

export default PlantsPage