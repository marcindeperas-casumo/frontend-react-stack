import React from "react";
import { Provider } from "react-redux";
import defaultState from "Models/__mocks__/state.mock";
import { createReduxStore } from "Services/reduxStore";

const store = createReduxStore(defaultState);

export const MockTestProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
