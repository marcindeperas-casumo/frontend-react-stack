// @flow
import * as React from "react";

type TProps = {
  children: React.Node,
};

export const GamePageLayout = ({ children }: TProps) => {
  return <div>{children}</div>;
};
