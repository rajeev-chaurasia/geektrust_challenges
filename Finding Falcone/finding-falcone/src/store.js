import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import main from "./reducers/main";
import errorReducer from "./reducers/errorReducer";
import timeReducer from "./reducers/timeReducer";

const rootReducers = combineReducers({
  authReducer,
  main,
  timeReducer,
  errorReducer,
});

const middleware = applyMiddleware(thunk);

const initialState = {};

const store = createStore(rootReducers, initialState, middleware);

export default store;
