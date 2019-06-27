// @flow
import * as React from "react";
import useMedia from "react-use/lib/useMedia";
import {
  mobileBreakpoint,
  desktopBreakpoint,
  getMediaQuery,
} from "./ResponsiveLayout.utils";
import { type ORIENTATION_TYPE } from "./ResponsiveLayout.types";

type Props = {
  /** The media queries object to fullfill to render the children */
  breakpoint: Object,
  /** The children to render if viewport fullfills the provided breakpoint */
  children: React.Node,
};

const RenderIfMatchBreakpoint = ({ breakpoint, children }: Props) => {
  const isBreakpointActive = useMedia(getMediaQuery(breakpoint));

  return isBreakpointActive ? children : null;
};

export const Desktop = ({ children }: { children: React.Node }) => {
  return (
    <RenderIfMatchBreakpoint breakpoint={desktopBreakpoint}>
      {children}
    </RenderIfMatchBreakpoint>
  );
};

export const Mobile = ({
  children,
  orientation,
}: {
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
