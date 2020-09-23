import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";
import { getPlants } from "../actions/plantActions"

const Plants = props => {

    const [plants, setPlants] = useState();

    useEffect(() => {
        axios.get('https://water-my-plants-back-end1.herokuapp.com/plants/')
            .then((r) => {
                setPlants(r);
                console.log(props.r.data);
            });
    }, []);

    useEffect(() => {
        props.getPlants();
    }, []);

    return (
        <div>
            <div className="plants">
                {props.plants.map((plant) => (
                    <div className="plant" key={plant.id}>
                        <p>Name : {plant.nickname}</p>
                        <p>Species:{plant.species}</p>
                        <p>Water Schedule:{plant.h2o_frequency}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        plants: state.plants,
        error: state.error,
    };
};

export default connect(mapStateToProps, { getPlants })(Plants);
