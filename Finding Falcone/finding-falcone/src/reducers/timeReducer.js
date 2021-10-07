import { UPDATE_TOTALSEARCH_TIME } from "../actions/actionTypes";

const initialState = {
  totalSearchTime: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOTALSEARCH_TIME:
      return {
        totalSearchTime: action.payload,
      };
    default:
      return state;
  }
};
