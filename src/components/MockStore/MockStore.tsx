import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { mergeDeepRight } from "ramda";
import { Provider } from "react-redux";
import { LocationProvider } from "@reach/router";
import { createReduxStore } from "Services/reduxStore";
import defaultState from "Models/__mocks__/state.mock";

type Props = {
  state?: Object;
  queryMocks?: Array<Object>;
  queryAddTypename?: boolean;
  children: React.ReactElement;
};
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
    <LocationProvider>
      <Provider store={store}>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'Object[]' is not assignable to type 'readonl... Remove this comment to see the full error message */}
        <MockedProvider mocks={queryMocks} addTypename={queryAddTypename}>
          {children}
        </MockedProvider>
      </Provider>
    </LocationProvider>
  );
};

export default MockStore;
