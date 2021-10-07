import { HANDLE_ERRORS } from "../actions/actionTypes";

export const handleErrors = (errorMessage) => {
  return {
    type: HANDLE_ERRORS,
    payload: errorMessage,
  };
};
