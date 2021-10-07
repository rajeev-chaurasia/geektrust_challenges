import {
  INCREASE_VEHICLE_COUNT,
  DECREASE_VEHICLE_COUNT,
  UPDATE_TOTALSEARCH_TIME,
} from "./actionTypes";

export const increaseVehicle = (vehicle) => {
  return {
    type: INCREASE_VEHICLE_COUNT,
    payload: vehicle,
  };
};

export const decreaseVehicle = (vehicle) => {
  return {
    type: DECREASE_VEHICLE_COUNT,
    payload: vehicle,
  };
};

export const updateSearchTime = (time) => {
  return {
    type: UPDATE_TOTALSEARCH_TIME,
    payload: time,
  };
};
