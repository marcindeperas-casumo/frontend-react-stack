import * as React from "react";

type TProps = {
  children: React.ReactNode;
};

export const GamePageLayout = ({ children }: TProps) => {
  return <div>{children}</div>;
};
