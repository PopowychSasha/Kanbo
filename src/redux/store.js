import { combineReducers, createStore } from "redux";
import { authDataReducer } from "./reducers/authDataReducer";

const rootReducer = combineReducers({
    authDataReducer,
})

export const store = createStore(rootReducer);

