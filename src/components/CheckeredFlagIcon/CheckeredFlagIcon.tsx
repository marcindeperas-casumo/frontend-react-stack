// @flow
import React from "react";
import cx from "classnames";
import CheckeredFlag from "./images/flag.svg";
import CheckeredInactiveFlag from "./images/flagInactive.svg";

import "./CheckeredFlagIcon.scss";

type Props = {
  className?: string,
  inactive?: boolean,
};

export const CheckeredFlagIcon = ({ className, inactive }: Props) => (
  <div className={cx("c-checkered-flag", className)}>
    {inactive ? <CheckeredInactiveFlag /> : <CheckeredFlag />}
  </div>
);
