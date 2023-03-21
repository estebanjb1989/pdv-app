import { SessionTypes } from "../types";

export const initialState = {
  credentials: null,
  table: null,
};

export const reducer = (state = initialState, action = {}) => {
  let nextState = null;

  switch (action.type) {
    case SessionTypes.SET_USER: {
      nextState = {
        ...state,
        credentials: action.payload,
      };
      break;
    }
    case SessionTypes.SET_CURRENT_TABLE: {
      nextState = {
        ...state,
        table: action.payload,
      };
      break;
    }
    default: {
      nextState = state;
      break;
    }
  }

  return nextState;
};

const setCurrentTable = (payload) => (dispatch) =>
  dispatch({
    type: SessionTypes.SET_CURRENT_TABLE,
    payload,
  });

export default {
  setCurrentTable,
};
