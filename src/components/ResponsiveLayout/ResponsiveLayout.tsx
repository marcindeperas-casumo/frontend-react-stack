// @flow
import * as React from "react";
import useMedia from "react-use/lib/useMedia";
import {
  mobileBreakpoint,
  tabletBreakpoint,
  tabletAndDesktopBreakpoint,
  desktopBreakpoint,
  mobileAndTabletBreakpoint,
  getMediaQuery,
} from "./ResponsiveLayout.utils";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"./ResponsiveLayout.types"' has no exporte... Remove this comment to see the full error message
import { type ORIENTATION_TYPE } from "./ResponsiveLayout.types";

type Props = {
  /** The media queries object to fullfill to render the children */
  breakpoint: Object,
  /** The children to render if viewport fullfills the provided breakpoint */
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
};

const RenderIfMatchBreakpoint = ({ breakpoint, children }: Props) => {
  const isBreakpointActive = useMedia(getMediaQuery(breakpoint));

  return isBreakpointActive ? children : null;
};

// @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
export const Desktop = ({ children }: { children: React.Node }) => {
  return (
    <RenderIfMatchBreakpoint breakpoint={desktopBreakpoint}>
      {children}
    </RenderIfMatchBreakpoint>
  );
};

export const TabletAndDesktop = ({
  children,
  orientation,
}: {
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
  orientation?: ORIENTATION_TYPE,
}) => {
  return (
    <RenderIfMatchBreakpoint
      breakpoint={
        orientation
          ? { ...tabletAndDesktopBreakpoint, orientation }
          : tabletAndDesktopBreakpoint
      }
    >
      {children}
    </RenderIfMatchBreakpoint>
  );
};

export const Tablet = ({
  children,
  orientation,
}: {
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
  orientation?: ORIENTATION_TYPE,
}) => {
  return (
    <RenderIfMatchBreakpoint
      breakpoint={
        orientation ? { ...tabletBreakpoint, orientation } : tabletBreakpoint
      }
    >
      {children}
    </RenderIfMatchBreakpoint>
  );
};

export const MobileAndTablet = ({
  children,
  orientation,
}: {
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
  orientation?: ORIENTATION_TYPE,
}) => {
  return (
    <RenderIfMatchBreakpoint
      breakpoint={
        orientation
          ? { ...mobileAndTabletBreakpoint, orientation }
          : mobileAndTabletBreakpoint
      }
    >
      {children}
    </RenderIfMatchBreakpoint>
  );
};

export const Mobile = ({
  children,
  orientation,
}: {
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
  orientation?: ORIENTATION_TYPE,
}) => {
  return (
    <RenderIfMatchBreakpoint
      breakpoint={
        orientation ? { ...mobileBreakpoint, orientation } : mobileBreakpoint
      }
    >
      {children}
    </RenderIfMatchBreakpoint>
  );
};

export const isMobile = (): boolean =>
  window.matchMedia(getMediaQuery(mobileBreakpoint)).matches;
export const isDesktop = (): boolean =>
  window.matchMedia(getMediaQuery(desktopBreakpoint)).matches;
export const isTablet = (): boolean =>
  window.matchMedia(getMediaQuery(tabletBreakpoint)).matches;
