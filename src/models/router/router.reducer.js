import { createReducer } from "Utils";
import { types } from "./router.constants";

const DEFAULT_STATE = {
  activeComponents: [],
  routeParams: [],
};

const handlers = {
  [types.ACTIVATE_COMPONENT]: (state, action) => ({
    ...state,
    activeComponents: [action.componentId],
    routeParams: action.routeParams || [],
  }),
};

const routerReducer = createReducer(DEFAULT_STATE, handlers);

export default routerReducer;
