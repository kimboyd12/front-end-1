import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";

const initialPlants = {
  // id:"",
  nickname: "",
  species: "",
  h2oFrequency: "",
};

const UpdatePlants = (props) => {
  // const { id } = props.match.params;

  const [plantUpdate, setPlantUpdate] = useState(initialPlants);

  const { push } = useHistory();

  const { id } = useParams();

  const handleChanges = (e) => {
    setPlantUpdate({
      ...plantUpdate,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`https://water-my-plants-back-end1.herokuapp.com/plants/${id}`)
      .then((res) => {
        setPlantUpdate(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(
        `https://water-my-plants-back-end1.herokuapp.com/plants/${id}`,
        plantUpdate
      )
      .then((response) => {
        console.log(response);
        setPlantUpdate(response.data);
        push(`plants/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Update your Plants</h3>
      <form onSubmit={handleUpdate}>
        <label htmlFor="nickname">
          {" "}
          nickname:
          <input
            id="nickname"
            type="text"
            name="nickname"
            value={plantUpdate.nickname}
            onChange={handleChanges}
          />
        </label>
        <label htmlFor="species">
          {" "}
          species:
          <input
            id="species"
            type="text"
            name="species"
            value={plantUpdate.species}
            onChange={handleChanges}
          />
        </label>
        <label htmlFor="h2oFrequency">
          {" "}
          h2oFrequency of Service:
          <input
            id="h2oFrequency"
            type="text"
            name="h2oFrequency"
            value={plantUpdate.h2oFrequency}
            onChange={handleChanges}
          />
        </label>
        <button type="update">Update</button>
      </form>
    </div>
  );
};

export default UpdatePlants;
