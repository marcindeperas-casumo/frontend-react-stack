import useMedia from "react-use/lib/useMedia";
import * as React from "react";
import {
  mobileBreakpoint,
  tabletBreakpoint,
  tabletAndDesktopBreakpoint,
  desktopBreakpoint,
  mobileAndTabletBreakpoint,
  orientationLandscapeQuery,
  orientationPortraitQuery,
  getMediaQuery,
} from "./ResponsiveLayout.utils";
import type { ORIENTATION_TYPE } from "./ResponsiveLayout.types";

type Props = {
  /** The media queries object to fullfill to render the children */
  breakpoint: Object;
  /** The children to render if viewport fullfills the provided breakpoint */
  children: React.ReactNode;
};

const RenderIfMatchBreakpoint = ({ breakpoint, children }: Props) => {
  const isBreakpointActive = useMedia(getMediaQuery(breakpoint));

  return isBreakpointActive ? children : null;
};

export const Desktop = ({ children }: { children: React.ReactNode }) => {
  return (
    // @ts-expect-error ts-migrate(2786) FIXME: 'RenderIfMatchBreakpoint' cannot be used as a JSX ... Remove this comment to see the full error message
    <RenderIfMatchBreakpoint breakpoint={desktopBreakpoint}>
      {children}
    </RenderIfMatchBreakpoint>
  );
};

export const TabletAndDesktop = ({
  children,
  orientation,
}: {
  children: React.ReactNode;
  orientation?: ORIENTATION_TYPE;
}) => {
  return (
    // @ts-expect-error ts-migrate(2786) FIXME: 'RenderIfMatchBreakpoint' cannot be used as a JSX ... Remove this comment to see the full error message
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
  children: React.ReactNode;
  orientation?: ORIENTATION_TYPE;
}) => {
  return (
    // @ts-expect-error ts-migrate(2786) FIXME: 'RenderIfMatchBreakpoint' cannot be used as a JSX ... Remove this comment to see the full error message
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
  children: React.ReactNode;
  orientation?: ORIENTATION_TYPE;
}) => {
  return (
    // @ts-expect-error ts-migrate(2786) FIXME: 'RenderIfMatchBreakpoint' cannot be used as a JSX ... Remove this comment to see the full error message
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
  children: React.ReactNode;
  orientation?: ORIENTATION_TYPE;
}) => {
  return (
    // @ts-expect-error ts-migrate(2786) FIXME: 'RenderIfMatchBreakpoint' cannot be used as a JSX ... Remove this comment to see the full error message
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
export const isLandscapeMode = (): boolean =>
  window.matchMedia(orientationLandscapeQuery).matches;
export const isPortraitMode = (): boolean =>
  window.matchMedia(orientationPortraitQuery).matches;
