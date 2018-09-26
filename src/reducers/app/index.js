export const types = {
  APP_STARTED: "APP/APP_STARTED",
};

const initialState = {
  appStarted: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.APP_STARTED:
      return {
        ...state,
        appStarted: true,
      };
    default:
      return state;
  }
};

export const appStarted = () => ({
  type: types.APP_STARTED,
});

export const actions = {
  appStarted,
};

export default reducer;
