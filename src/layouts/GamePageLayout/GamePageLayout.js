// @flow
import * as React from "react";

type Props = {
  children: React.Node,
};

export const GamePageLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};
