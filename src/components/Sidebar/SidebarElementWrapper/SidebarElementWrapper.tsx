import * as React from "react";
import cx from "classnames";
import { WrapperPin } from "./WrapperPin";

import "./SidebarElementWrapper.scss";

type Props = {
  className?: string;
  style?: Object;
  pinnable?: boolean;
  onPinClick?: () => void;
  children?: React.ReactNode;
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
        `${baseClassName} o-position--relative u-width--full`,
        {
          "bg-black": !children,
        }
      )}
      style={style}
    >
      {pinnable && (
        <WrapperPin
          className={`${baseClassName}__pin o-position--absolute`}
          onClick={onPinClick}
        />
      )}
      {children}
    </div>
  );
};
