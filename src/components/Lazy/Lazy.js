// @flow
import * as React from "react";
import type { Node } from "react";

const DefaultFallback = () => null;

type Props = {
  /** A loader function that imports the component, e.g. () => import("Components/Foo") */
  loader: () => Promise<Object>,
  /** A fallback component to show until the bundle is loaded */
  fallback?: Node,
  /** The props to pass down to the lazy-loaded component. */
  props?: Object,
  /** Named export of the component */
  namedExport: string,
};

export default function Lazy({
  fallback = <DefaultFallback />,
  loader,
  props,
  namedExport,
}: Props) {
  const LazyComponent = React.lazy(() =>
    loader().then(module => ({
      default: module[namedExport] || module.default,
    }))
  );

  return (
    <React.Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
}
