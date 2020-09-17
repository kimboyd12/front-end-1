import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "../actions";

export const initialState = {
  error: "",
  message: "",

  user: {
    id: "",
    username: "",
    password: "",
    phoneNumber: "",
  },

  isLoggingIn: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return { ...state, isLoggingIn: true, error: "", message: "" };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        user: action.payload.data,
      };
    case LOGIN_USER_FAILURE:
      return { ...state, isLoggingIn: false, error: action.payload };

    default:
      return state;
  }
};
