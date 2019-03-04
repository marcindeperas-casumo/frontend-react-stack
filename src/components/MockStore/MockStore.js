// @flow
import React, { PureComponent, type ElementProps } from "react";
import { mergeDeepRight } from "ramda";
import { Provider } from "react-redux";
import { getStore } from "Services/reduxStore";
import defaultState from "Models/__mocks__/state.mock";

type Props = {
  state?: Object,
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
export default class MockStore extends PureComponent<Props> {
  render() {
    const { children, state = {} } = this.props;
    const store = getStore(mergeDeepRight(defaultState, state));

    return <Provider store={store}>{children}</Provider>;
  }
}
