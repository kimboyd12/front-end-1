import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const Plants = props => {

    const [plants, setPlants] = useState();

    useEffect(() => {
        axios.get('https://water-my-plants-back-end1.herokuapp.com/plants/')
            .then((r) => {
                setPlants(r);
                console.log(r.data);
            });
    }, []);
    //return (Plants)

}


export default Plants