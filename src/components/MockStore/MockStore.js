// @flow
import React, { type ElementProps } from "react";
import { mergeDeepRight } from "ramda";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/react-testing";
import { createReduxStore } from "Services/reduxStore";
import defaultState from "Models/__mocks__/state.mock";

type Props = {
  state?: Object,
  queryMocks?: Array<Object>,
  queryAddTypename?: boolean,
} & ElementProps<any>;
// ⚠️ This is a utility component that can be used to
// write stories for connected components that depend
// on the redux state.
// Don't be afraid to update the state mock file if the
// structure changes.
//
// Usage:
//    <MockStore>
//        <YourConnectedComponent />
//    </MockStore>
const MockStore = ({
  children,
  state = {},
  queryMocks = [],
  queryAddTypename = false,
}: Props) => {
  const store = createReduxStore(mergeDeepRight(defaultState, state));

  return (
    <Provider store={store}>
      <MockedProvider mocks={queryMocks} addTypename={queryAddTypename}>
        {children}
      </MockedProvider>
    </Provider>
  );
};

export default MockStore;
