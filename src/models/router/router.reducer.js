import { types } from "./router.constants";

const initialState = {
  activeComponents: [],
  routeParams: [],
};

const reducers = {
  [types.ACTIVATE_COMPONENT]: (state, action) => ({
    ...state,
    activeComponents: [action.componentId],
    routeParams: action.routeParams || [],
  }),
};

const routerReducer = (state = initialState, action) => {
  return reducers[action.type] ? reducers[action.type](state, action) : state;
};

export default routerReducer;
