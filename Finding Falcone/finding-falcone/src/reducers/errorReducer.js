import { HANDLE_ERRORS } from "../actions/actionTypes";

const initialState = {
  isError: false,
  errorMessage: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_ERRORS:
      return {
        ...state,
        isError: action.payload ? true : false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
