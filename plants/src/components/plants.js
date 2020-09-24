import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import { connect, useSelector } from "react-redux";
import { getPlants } from "../actions/plantActions";
import Plant from "./plantsPage";
import axiosWithAuth from "../utils/axiosWithAuth";

const Plants = (props) => {
  const [plants, setPlants] = useState();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    axiosWithAuth()
      .get(`/plants/${user.id}/plantsList`)
      .then((r) => {
        setPlants(r);
        console.log(props.r.data);
      });
  }, []);

  useEffect(() => {
    axiosWithAuth()
      .get(
        "https://water-my-plants-back-end1.herokuapp.com/plants/:id/plantsList"
      )
      .then((r) => {
        setPlants(r);
        console.log(r.data);
      });
  }, []);

  useEffect(() => {
    props.getPlants();
  }, []);

  return (
    <div className="plants">
      {plants.map((plant) => (
        <Plant
          key={plant.id}
          nickname={plant.nickname}
          species={plant.species}
          h2ofrequency={plant.h2o_frequency}
        />
      ))}
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
