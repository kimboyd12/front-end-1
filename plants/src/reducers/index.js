import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { plantReducer } from "./plantReducer";

export const rootReducer = combineReducers({
  loginReducer,
  plantReducer
});
