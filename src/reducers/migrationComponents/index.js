export const types = {
  ACTIVATE_COMPONENT: "MIGRATION_COMPONENTS/ACTIVATE_COMPONENT",
};

const initialState = {
  activeComponents: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ACTIVATE_COMPONENT:
      return {
        ...state,
        activeComponents: [action.componentId],
      };
    default:
      return state;
  }
};

export const activateComponent = componentId => ({
  type: types.ACTIVATE_COMPONENT,
  componentId,
});

export const actions = {
  activateComponent,
};

export default reducer;
