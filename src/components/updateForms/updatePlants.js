import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
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
      .get(`https://watermy-plants.herokuapp.com/plants/${id}`)
      .then((res) => {
        setPlantUpdate(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(
        `https://watermy-plants.herokuapp.com/plants/${id}`,
        plantUpdate
      )
      .then((response) => {
        console.log(response);
        setPlantUpdate(response.data);

        push("/plantslist");
        // push(`plants/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <StyledTitle>
        <h1>
          Update your Plants <i className="leaf icon"></i>
        </h1>
      </StyledTitle>
      <div className="ui horizontal divider" style={{ margin: "2%" }}>
        Enter New Plant Information
      </div>
      <StyledPage>
        <FormContainer>
          <StyledForm>
            <form onSubmit={handleUpdate}>
              <StyledFormInput>
                {" "}
                <input
                  id="nickname"
                  placeholder="Nickname"
                  type="text"
                  name="nickname"
                  value={plantUpdate.nickname}
                  onChange={handleChanges}
                />{" "}
                <input
                  id="species"
                  placeholder="Species"
                  type="text"
                  name="species"
                  value={plantUpdate.species}
                  onChange={handleChanges}
                />{" "}
                <input
                  id="h2oFrequency"
                  placeholder="Watering Schedule"
                  type="text"
                  name="h2oFrequency"
                  value={plantUpdate.h2oFrequency}
                  onChange={handleChanges}
                />
              </StyledFormInput>
              <button type="update">Update</button>
            </form>
          </StyledForm>
        </FormContainer>
      </StyledPage>
    </div>
  );
};

export default UpdatePlants;
