// @flow
import * as React from "react";
import cx from "classnames";
import { WrapperPin } from "./WrapperPin";

import "./SidebarElementWrapper.scss";

type Props = {
  className?: string,
  style?: Object,
  pinnable?: boolean,
  onPinClick?: () => void,
  children?: React.Node,
};

const baseClassName = "c-sidebar-element-wrapper";

export const SidebarElementWrapper = ({
  className,
  style,
  pinnable = false,
  onPinClick = () => {},
  children,
}: Props) => {
  return (
    <div
      className={cx(
        className,
        `${baseClassName} u-position-relative u-width--full`,
        {
          "t-background-black": !children,
        }
      )}
      style={style}
    >
      {pinnable && (
        <WrapperPin
          className={`${baseClassName}__pin u-position-absolute`}
          onClick={onPinClick}
        />
      )}
      {children}
    </div>
  );
};
