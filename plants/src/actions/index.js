import { axiosWithAuth } from "../utils/axiosWithAuth";

//Login user...
export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

//Logout user...
export const LOGOUT_USER_START = "LOGOUT_USER_START";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";

//Delete concermn...
export const DELETE_PLANT_START = "DELETE_PLANT_START";
export const DELETE_PLANT_SUCCESS = "DELETE_PLANT_SUCCESS";
export const DELETE_PLANT_FAILURE = "DELETE_PLANT_FAILURE";

//User specific plantss...
export const USER_PLANTS_START = "USER_PLANTS_START";
export const USER_PLANTS_SUCCESS = "USER_PLANTS_SUCCESS";
export const USER_PLANTS_FAILURE = "USER_PLANTS_FAILURE";

//Add plant...
export const ADD_PLANT_START = "ADD_PLANT_START";
export const ADD_PLANT_SUCCESS = "ADD_PLANT_SUCCESS";
export const ADD_PLANT_FAILURE = "ADD_PLANT_FAILURE";


//Change Profile..
export const CHANGE_INFO_START = "CHANGE_INFO_START"
export const CHANGE_INFO_SUCCESS = "CHANGE_INFO_SUCCESS"
export const CHANGE_INFO_FAILED = "CHANGE_INFO_FAILED"

export const loginUser = (credentials, props) => (dispatch) => {
  dispatch({ type: LOGIN_USER_START });
  console.log("User", credentials);
  axiosWithAuth()
    .post("/users/login", credentials)
    .then((res) => {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data.user });
      console.log("Login", res.data);
      window.localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user.id);
      localStorage.setItem("username", res.data.user.username);

      props.history.push("/plants");
    })
    .catch((err) => {
      dispatch({ type: LOGIN_USER_FAILURE });
    });
};

export const logoutUser = (dispatch) => {
  dispatch({ type: LOGOUT_USER_START }).then().catch();
  dispatch({ type: LOGOUT_USER_SUCCESS, payload: "Successfully logged out" });
  dispatch({
    type: LOGOUT_USER_FAILURE,
    payload: "Something went wrong. Please try again.",
  });
};

export const deletePlant = (userId, id) => (dispatch) => {
  dispatch({ type: DELETE_PLANT_START });
  axiosWithAuth()
    .delete(`/plants/${id}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: DELETE_PLANT_SUCCESS, payload: id });
    })
    .catch((err) => {
      dispatch({ type: DELETE_PLANT_FAILURE });
    })
    .finally(() => {
      userPlants(userId);
    });
};

export const userPlants = (userId) => (dispatch) => {
  const id = localStorage.getItem("id");
  dispatch({ type: USER_PLANTS_START });

  axiosWithAuth()
    .get(`/plants/${id}/plantsList/`)
    .then((res) => {
      dispatch({ type: USER_PLANTS_SUCCESS, payload: res.data });
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({ type: USER_PLANTS_FAILURE });
      console.log(err);
    });
};

export const addPlant = (userId, plant) => (dispatch) => {
  const id = localStorage.getItem("id");
  dispatch({ type: ADD_PLANT_START });
  axiosWithAuth()
    .post(`/plants/addPlant/${id}`, plant)
    .then((res) => {
      dispatch({
        type: ADD_PLANT_SUCCESS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: ADD_PLANT_FAILURE });
    });
};


export const updateProfile = (changeInfo) => (dispatch) => {
  dispatch({ type: CHANGE_INFO_START });
  axiosWithAuth()
    .put(`users/${changeInfo.id}`, changeInfo)
    .then((response) => {
      console.log(response.data);
      dispatch({ type: CHANGE_INFO_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: CHANGE_INFO_FAILED });
    });
};
