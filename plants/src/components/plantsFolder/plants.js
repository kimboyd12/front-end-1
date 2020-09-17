import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const Plant = () => {

    const [PlantState, setPlantState] = useState({
        id: '',
        nickname: '',
        species: '',
        h2oFrequency: ''
    });
}

export default Plant