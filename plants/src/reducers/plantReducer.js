import {
    FETCH_PLANT_START,
    FETCH_PLANT_SUCCESS,
    FETCH_PLANT_FAILED,
    ADD_PLANT_SUCCESS,
    ADD_PLANT_FAILED
} from "../actions/plantActions"


const initialState = {
  plants: [],
  isFetching: false,
  error: "",
};

export const plantReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLANT_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PLANT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        plants: action.payload,
        error: " ",
      };
    case FETCH_PLANT_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
      case ADD_PLANT_SUCCESS:
            return {
                ...state,
                plants: [...state.plants, {
                    nickname: action.payload.nickname,
                    species: action.payload.species,
                    h2oFrequency: action.payload.h2oFrequency
                }]
            };
        case ADD_PLANT_FAILED:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
    default:
      return state;
  }
};
