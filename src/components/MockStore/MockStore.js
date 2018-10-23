import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import configureStore from "Src/configureStore";
import defaultState from "Reducers/__mocks__/state.mock";

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
export default class MockStore extends PureComponent {
  render() {
    const { children } = this.props;

    return <Provider store={configureStore(defaultState)}>{children}</Provider>;
  }
}
