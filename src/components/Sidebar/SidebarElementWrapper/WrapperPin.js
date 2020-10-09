// @flow
import * as React from "react";
import cx from "classnames";
import Pin from "./images/pin.svg";

import "./WrapperPin.scss";

type Props = {
  className?: string,
  onClick?: () => void,
};

const baseClassName = "c-wrapper-pin";

export const WrapperPin = ({ className, onClick = () => {} }: Props) => (
  <div
    className={cx(
      className,
      `${baseClassName} t-opacity-background--75 t-background-grey-70 t-border-r--circle o-flex-align--center o-flex-justify--center u-cursor--pointer`
    )}
    onClick={onClick}
  >
    <Pin className={`${baseClassName}__icon u-display--block`} />
  </div>
);
