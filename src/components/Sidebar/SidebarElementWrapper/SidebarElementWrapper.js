// @flow
import * as React from "react";
import cx from "classnames";
import { WrapperPin } from "./WrapperPin";

import "./SidebarElementWrapper.scss";

type Props = {
  className?: string,
  pinnable?: boolean,
  onPinClick?: () => void,
  children?: React.Node,
};

const baseClassName = "c-sidebar-element-wrapper";

export const SidebarElementWrapper = ({
  className,
  pinnable = false,
  onPinClick = () => {},
  children,
}: Props) => {
  const onClickFunc = () => {
    onPinClick();
  };
  return (
    <div
      className={cx(
        className,
        `${baseClassName} t-border-r u-position-relative u-overflow-hidden`,
        { "t-background-black": !children }
      )}
    >
      {pinnable && (
        <WrapperPin
          className={`${baseClassName}__pin u-position-absolute`}
          onClick={onClickFunc}
        />
      )}
      {children}
    </div>
  );
};
