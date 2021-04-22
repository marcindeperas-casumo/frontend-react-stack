import Text from "@casumo/cmp-text";
import { LaurelIcon } from "@casumo/cmp-icons";
import React from "react";
import cx from "classnames";
import { getLaurelClassName } from "Models/reelRaces/reelRaces.utils";

type Props = {
  position: number;
  className?: string;
};

const MAX_BIG_SIZE_POSITION = 99;

export const PositionView = ({ position, className }: Props) => {
  const laurelClassName = getLaurelClassName(position);
  const textClassName = position > 3 ? "text-white" : laurelClassName;
  return (
    <div
      className={cx(
        "c-reel-races-drawer-widget-position-view u-line-height--1 o-position--relative u-text-align-center bg-grey-90 t-border-r--circle bg-opacity-100",
        className
      )}
    >
      <LaurelIcon
        className={`c-reel-races-drawer-widget__laurel o-position--absolute ${laurelClassName}`}
      />
      <Text
        className={cx(
          "u-font-weight-bold c-reel-races-drawer-widget__laurel-position u-width--4xlg o-position--relative",
          textClassName
        )}
        tag="div"
        size={position > MAX_BIG_SIZE_POSITION ? "sm" : "md"}
      >
        {position}
      </Text>
    </div>
  );
};
