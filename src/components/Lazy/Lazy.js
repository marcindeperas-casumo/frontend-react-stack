// @flow
import React from "react";
import Loadable from "react-loadable";
import type { Node } from "react";

const DefaultFallback = () => null;

type Props = {
  /** A loader function that imports the component, e.g. () => import("Components/Foo") */
  loader: Function,
  /** A fallback component to show until the bundle is loaded */
  fallback?: Node,
  /** The props to pass down to the lazy-loaded component. */
  props?: Object,
  /** Named export of the component */
  namedExport: string,
};

export default class Lazy extends React.PureComponent<Props> {
  render() {
    const {
      fallback = <DefaultFallback />,
      loader,
      props,
      namedExport,
    } = this.props;
    const LoadableComponent = Loadable({
      loader,
      loading: () => fallback,
      render: (loaded, componentProps) => {
        const Component = loaded[namedExport] || loaded.default;
        return <Component {...componentProps} />;
      },
    });

    return <LoadableComponent {...props} />;
  }
}
