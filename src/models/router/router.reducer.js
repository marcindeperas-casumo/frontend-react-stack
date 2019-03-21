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

const routerReducer = (state = DEFAULT_STATE, action) => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

export default routerReducer;
