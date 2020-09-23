import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_START,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  DELETE_PLANT_FAILURE,
  DELETE_PLANT_START,
  DELETE_PLANT_SUCCESS,
  USER_PLANTS_START,
  USER_PLANTS_SUCCESS,
  USER_PLANTS_FAILURE,
} from "../actions";

export const initialState = {
  error: "",
  message: "",
  isDeleting: false,

  user: {
    id: "",
    username: "",
    password: "",
    phoneNumber: "",
  },

  isLoggingIn: false,
  isLoggingOut: false,
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

    case LOGOUT_USER_START:
      return { ...state, isLoggingOut: true, error: "", message: "" };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        user: { id: "", username: "", password: "", phoneNumber: "" },
        message: action.payload,
      };
    case LOGOUT_USER_FAILURE:
      return { ...state, isLoggingOut: false, error: action.payload };

    case USER_PLANTS_START:
      return { ...state, isLoading: true, error: "", message: "" };
    case USER_PLANTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersPlants: action.payload,
      };
    case USER_PLANTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case DELETE_PLANT_START:
      return { ...state, isDeleting: true, error: "", message: "" };
    case DELETE_PLANT_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        usersConcerns: state.usersConcerns.filter(
          (concern) => concern.id !== action.payload
        ),
      };
    case DELETE_PLANT_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: "Something went wrong. Please try again.",
      };

    default:
      return state;
  }
};
