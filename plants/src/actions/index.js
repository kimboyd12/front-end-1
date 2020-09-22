import { axiosWithAuth } from "../utils/axiosWithAuth";

export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const loginUser = (credentials, props) => (dispatch) => {
  dispatch({ type: LOGIN_USER_START });
  console.log(credentials);
  axiosWithAuth()
    .post("/users/login", credentials)
    .then((res) => {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
      console.log("Login", res.data);
      localStorage.setItem("token", res.data.token);

      props.history.push("/home");
    })
    .catch((err) => {
      dispatch({ type: LOGIN_USER_FAILURE });
    });
};
