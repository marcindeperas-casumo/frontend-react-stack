// @flow
import React from "react";
import { connect } from "react-redux";
import LazyPortal from "Components/LazyPortal/LazyPortal";
import type { Node } from "react";

type Props = {
  /** A function which receives the state as a parameter and returns a boolean. */
  showFallback?: (state?: Object) => boolean,
  /** A react node that will be rendered as a fallback if "showFallback" returns true. */
  fallback?: Node,
  /** A loader definition to lazy-import the component. E.g. () => import("Components/Foo") */
  loader: Function,
  /** The id of the HTML element that we should load the portal to. */
  hostElementId: string,
};

const LazyPortalConnected = connect(
  (state, { showFallback = (state?: Object) => false }) => ({
    showFallback: showFallback(state),
  })
)(LazyPortal);

const LazyPortalContainer = (props: Props) => {
  return <LazyPortalConnected {...props} />;
};

export default LazyPortalContainer;
