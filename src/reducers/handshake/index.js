import { types } from "Reducers/handshake/actions";

const initialState = {};

export const handshake = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_HANDSHAKE:
      return {
        ...action.response,
      };
    default:
      return state;
  }
};

export default handshake;
