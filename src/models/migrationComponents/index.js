export const types = {
  ACTIVATE_COMPONENT: "MIGRATION_COMPONENTS/ACTIVATE_COMPONENT",
};

const initialState = {
  activeComponents: [],
  routeParams: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ACTIVATE_COMPONENT:
      return {
        ...state,
        activeComponents: [action.componentId],
        routeParams: action.routeParams || {},
      };
    default:
      return state;
  }
};

export const activateComponent = ({ componentId, routeParams }) => ({
  type: types.ACTIVATE_COMPONENT,
  componentId,
  routeParams,
});

export const actions = {
  activateComponent,
};

export default reducer;
