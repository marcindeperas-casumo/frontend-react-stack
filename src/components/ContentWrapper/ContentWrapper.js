// @flow
import * as React from "react";
import cx from "classnames";

import "./ContentWrapper.scss";

type Props = {
  children: React.Node,
  className?: string,
};

export const ContentWrapper = ({ children, className }: Props) => {
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
