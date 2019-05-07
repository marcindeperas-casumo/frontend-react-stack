// @flow
import * as React from "react";
import useMedia from "react-use/lib/useMedia";
// Styles/_settings.breakpoints.scss wouldn't work?! 🤔
import breakpoints from "../../styles/_settings.breakpoints.scss";

type Props = {
  /** The min CSS media query breakpoint for rendering the children */
  minBreakpoint: string,
  /** The max CSS media query breakpoint for rendering the children */
  maxBreakpoint?: string,
  /** The children to render if viewport fullfills the provided breakpoint/s */
  children: React.Node,
};

const RenderIfMatchBreakpoint = ({
  minBreakpoint,
  maxBreakpoint = "",
  children,
}: Props) => {
  const maxMediaQueryString =
    maxBreakpoint && `and (max-width: ${maxBreakpoint})`;
  const isBreakpointActive = useMedia(
    `(min-width: ${minBreakpoint}) ${maxMediaQueryString}`
  );

  return isBreakpointActive ? children : null;
};

export const Desktop = ({ children }: { children: React.Node }) => {
  return (
    <RenderIfMatchBreakpoint minBreakpoint={breakpoints.desktop}>
      {children}
    </RenderIfMatchBreakpoint>
  );
};

export const Mobile = ({ children }: { children: React.Node }) => {
  return (
    <RenderIfMatchBreakpoint
      minBreakpoint={breakpoints.mobile}
      maxBreakpoint={breakpoints.desktop}
    >
      {children}
    </RenderIfMatchBreakpoint>
  );
};
