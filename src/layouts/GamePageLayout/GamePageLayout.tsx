// @flow
import * as React from "react";

type TProps = {
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
};

export const GamePageLayout = ({ children }: TProps) => {
  return <div>{children}</div>;
};
