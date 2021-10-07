import axios from "axios";
import { AUTH_TOKEN_URL } from "../config/urls";
import { GET_API_TOKEN } from "./actionTypes";
import { handleErrors } from "./handleError";

export const fetchAuthToken = () => (dispatch) => {
  axios.defaults.headers.common["Accept"] = "application/json";
  axios
    .post(AUTH_TOKEN_URL)
    .then((res) => {
      dispatch({ type: GET_API_TOKEN, payload: res.data.token });
    })
    .catch((err) => dispatch(handleErrors(err.message)));
};
