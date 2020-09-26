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
  ADD_PLANT_START,
  ADD_PLANT_SUCCESS,
  ADD_PLANT_FAILURE,
  CHANGE_INFO_START,
  CHANGE_INFO_SUCCESS,
  CHANGE_INFO_FAILED,
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

  plant: {
    id: "",
    nickname: "",
    species: "",
    h2oFrequency: "",
  },

  isLoggingIn: false,
  isLoggingOut: false,
  isLoadinging: false,
  isUpdating: false,
  usersPlants: [],
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return { ...state, isLoggingIn: true, error: "", message: "" };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        user: action.payload,
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
        usersPlants: state.usersPlants.filter(
          (plant) => plant.id !== action.payload
        ),
      };
    case DELETE_PLANT_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: "Something went wrong. Please try again.",
      };

    case ADD_PLANT_START:
      return { ...state, isLoading: true, error: "", message: "" };
    case ADD_PLANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: "Plant successfully added!",
        usersPlants: [...state.usersPlants, action.payload],
      };
    case ADD_PLANT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CHANGE_INFO_START:
      return {
        ...state,
        isUpdating: true,
      };
    case CHANGE_INFO_SUCCESS:
      const id = localStorage.getItem("id");
      const username = localStorage.getItem("username");
      return {
        ...state,
        isUpdating: false,
        user: {
          id: id,
          username: username,
          password: action.payload.password,
          phoneNumber: action.payload.phoneNumber,
        },

        error: " ",
      };
    case CHANGE_INFO_FAILED:
      return {
        ...state,
        isUpdating: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
