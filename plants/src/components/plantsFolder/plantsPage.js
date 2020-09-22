import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import Plants from './plants'


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
        <form onSubmit={submit}>
            <label htmlFor="id"> ID:
        <input id="id" type="text" id="id"
                    value={plantState.name} onChange={change} />
            </label>
            <label htmlFor="nickname"> nickname:
        <input id="nickname" type="text" name="nickname"
                    value={plantState.nickname} onChange={change} />
            </label>
            <label htmlFor="species"> species:
        <input id="species" type="text" name="species"
                    value={plantState.species} onChange={change} />
            </label>
            <label htmlFor="h2oFrequency"> h2oFrequency of Service:
        <input id="h2oFrequency" type="text" name="h2oFrequency"
                    value={plantState.h2oFrequency} onChange={change} />
            </label>
            <button type="submit">Submit</button>
            <pre>{JSON.stringify(p, null, 2)}</pre>
        </form>
    );
}

export default PlantsPage