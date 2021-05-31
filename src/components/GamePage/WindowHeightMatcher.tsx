import React from "react";
import { useInterval } from "react-use";

export const WindowHeightMatcher = ({ children }) => {
  const [height, setHeight] = React.useState(Math.round(window.innerHeight));

  const resizeToMatchAvailableScreenHeight = () => {
    setHeight(Math.round(window.innerHeight));
  };

  useInterval(resizeToMatchAvailableScreenHeight, 100);

  return <div style={{ height: height }}>{children}</div>;
};
