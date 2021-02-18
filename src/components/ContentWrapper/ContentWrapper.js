// @flow
import * as React from "react";
import cx from "classnames";

import "./ContentWrapper.scss";

type TProps = {
  children: React.Node,
  className?: string,
};

export const ContentWrapper = ({ children, className }: TProps) => {
  return (
    <div
      className={cx(
        "c-content-wrapper u-margin--auto u-width--full u-padding-x u-padding-x--5xlg@desktop",
        className
      )}
    >
      {children}
    </div>
  );
};
