import axios from "axios";

export const FETCH_PLANT_START = "FETCH_PLANT_START";
export const FETCH_PLANT_SUCCESS = "FETCH_PLANT_SUCCESS";
export const FETCH_PLANT_FAILED = "FETCH_PLANT_FAILED";
export const ADD_PLANT_SUCCESS = "ADD_PLANT_SUCCESS";
export const ADD_PLANT_FAILED = "ADD_PLANT_FAILED";

export const getPlants = () => (dispatch) => {
  dispatch({ type: FETCH_PLANT_START });
  axios
    .get("http://localhost:3000")
    .then((response) => {
      console.log(response.data);
      dispatch({ type: FETCH_PLANT_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: FETCH_PLANT_FAILED });
    });
};


export const addingPlant = addPlant => dispatch => {
    axios
        .post("http://localhost:3000", addPlant)
        .then(response => {
            console.log(response.data);
            dispatch({ type: ADD_PLANT_SUCCESS, payload: response.data });
        })
        .catch(error => {
            console.log(error);
            dispatch({ type: ADD_PLANT_FAILED, payload: error.data })
        });
};