import { types } from "./router.constants";

const initialState = {
  activeComponents: [],
  routeParams: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ACTIVATE_COMPONENT:
      return {
        ...state,
        activeComponents: [action.componentId],
        routeParams: action.routeParams || [],
      };
    default:
      return state;
  }
};

export default reducer;
