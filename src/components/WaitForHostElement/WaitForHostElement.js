// @flow
import * as React from "react";

type Props = {
  /** The id of the DOM element to render into */
  hostElementId: string,
  /** The children to render */
  children: React.Node,
};

// We need this component so we can wait for the host element to be available.
// This could happen when the route is active, but the view is not bound yet.
export const WaitForHostElement = ({ hostElementId, children }: Props) => {
  const [hasElement, setHasElement] = React.useState(false);

  React.useEffect(() => {
    if (document.getElementById(hostElementId)) {
      setHasElement(true);
    }

    if (!document.body) {
      return;
    }

    const observer = new MutationObserver(() => {
      const hasDesiredElement = Boolean(document.getElementById(hostElementId));
      setHasElement(hasDesiredElement);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return function cleanup() {
      observer.disconnect();
    };
  }, [hostElementId]);

  if (hasElement) {
    return children;
  }

  return null;
};
