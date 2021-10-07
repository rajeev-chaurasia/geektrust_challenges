import axios from "axios";
import { PLANET_API, VEHICLE_API, FIND_FALCONE_API } from "../config/urls";
import { FETCH_PLANETS, FETCH_VEHICLES, FIND_FALCONE } from "./actionTypes";
import { handleErrors } from "./handleError";

export const fetchPlanets = () => (dispatch) => {
  axios
    .get(PLANET_API)
    .then((res) => {
      dispatch({
        type: FETCH_PLANETS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(handleErrors(err.message));
    });
};

export const fetchVehicles = () => (dispatch) => {
  axios
    .get(VEHICLE_API)
    .then((res) => {
      dispatch({
        type: FETCH_VEHICLES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(handleErrors(err.message));
    });
};

export const findFalcone = (requestPayload, history) => (dispatch) => {
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios
    .post(FIND_FALCONE_API, requestPayload)
    .then((res) => {
      dispatch({
        type: FIND_FALCONE,
        payload: res.data,
      });
      history.push("/report");
    })
    .catch((err) => {
      dispatch(handleErrors(err.message));
    });
};
