import { createReducer } from "Utils";
import { STORE_REHYDRATE } from "Src/constants";
import { types } from "./promotions.constants";

const DEFAULT_STATE = {};

const handlers = {
  [STORE_REHYDRATE]: (state, { state: { promotions } }) => ({
    ...state,
    ...promotions,
  }),
  [types.SET_PROMOTION_OPT_IN]: (state, { slug, checked }) => ({
    ...state,
    [slug]: {
      checked,
      timestamp: Date.now(),
    },
  }),
};

const promotionsReducer = createReducer(DEFAULT_STATE, handlers);

export default promotionsReducer;
