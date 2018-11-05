// @flow
import React from "react";
import Lazy from "Components/Lazy";
import Portal from "Components/Portal";
import WaitForHostElement from "Components/WaitForHostElement";
import type { Node } from "react";

const DefaultFallback = () => null;

type Props = {
  /** A loader definition to lazy-import the component. E.g. () => import("Components/Foo") */
  loader: Function,
  /** The id of the HTML element that we should load the portal to. */
  hostElementId: string,
  /** If true the fallback will be rendered instead of the lazy-loaded component. */
  showFallback?: boolean,
  /** A react node that will be rendered as a fallback if "showFallback" returns true. */
  fallback?: Node,
  /** The props to pass down to the lazy-loaded component. */
  props?: Object,
};

export default class LazyPortal extends React.PureComponent<Props> {
  render() {
    const {
      showFallback = false,
      fallback = <DefaultFallback />,
      loader,
      hostElementId,
      props,
    } = this.props;

    return (
      // Wait until the host element is ready
      <WaitForHostElement hostElementId={hostElementId}>
        {/* Show a fallback until the content is ready. (I don't think this is needed tbh) */}
        <Portal
          hostElementId={hostElementId}
          showFallback={showFallback}
          fallback={fallback}
        >
          {/* Show a fallback until the bundle is loaded, then load the bundle. */}
          <Lazy loader={loader} fallback={fallback} props={props} />
        </Portal>
      </WaitForHostElement>
    );
  }
}
