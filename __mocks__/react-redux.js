/**
 * Workaround for Enzyme 3.9.0 not working with React-Redux hooks-based connect()
 * see: https://github.com/airbnb/enzyme/issues/2107#issuecomment-487511699
 */
const React = require("react");
const reactRedux = jest.requireActual("react-redux");
const { ReactReduxContext } = jest.requireActual("react-redux/lib/components/Context");

function noop() {
  return {}
}
function defaultMergeProps(stateProps = {}, dispatchProps = {}, ownProps = {}) {
  return {
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  }
}

module.exports = {
  ...reactRedux,
  connect(
    mapStateToProps = noop,
    mapDispatchToProps = noop,
    mergeProps = defaultMergeProps
  ) {
    return function(WrappedComponent) {
      function FakeConnect(ownProps) {
        return (
          <ReactReduxContext.Consumer>
            {({ store }) => {
              const reduxStore = store.getState();
              const { dispatch } = store;

              const stateProps = mapStateToProps?.(reduxStore, ownProps);
              const dispatchProps = (() => {
                if (typeof mapDispatchToProps === 'function') {
                  return mapDispatchToProps(dispatch, ownProps);
                } else {
                  return Object.entries(mapDispatchToProps)
                    .map(([key, val]) => [key, (...args) => dispatch(val(...args))])
                    .reduce((acc, [key, val]) => ({ ...acc, [key]: val }))
                }
              })();
              const mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

              return <WrappedComponent {...mergedProps} />
            }}
          </ReactReduxContext.Consumer>
        )
      }
      const name = WrappedComponent.displayName
        || WrappedComponent.name
        || "Component";
      FakeConnect.displayName = `Connect(${name})`;

      return FakeConnect;
    };
  },
}