// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import cx from "classnames";
import { LaurelIcon } from "@casumo/cmp-icons";
import { getLaurelColor } from "Models/reelRaces/reelRaces.utils";

type Props = {
  position: number,
  className?: string,
};

const MAX_BIG_SIZE_POSITION = 99;

export const PositionView = ({ position, className }: Props) => {
  const laurelColor = getLaurelColor(position);
  const textColor = position > 3 ? "white" : laurelColor;
  return (
    <div
      className={cx(
        "c-reel-races-drawer-widget-position-view u-line-height--1 u-position-relative u-text-align-center t-background-grey-90 t-border-r--circle t-opacity-background--100",
        className
      )}
    >
      <LaurelIcon
        className={`c-reel-races-drawer-widget__laurel u-position-absolute t-color-${laurelColor}`}
      />
      <Text
        className={cx(
          "u-font-weight-bold c-reel-races-drawer-widget__laurel-position u-width--4xlg u-position-relative",
          `t-color-${textColor}`
        )}
        tag="div"
        size={position > MAX_BIG_SIZE_POSITION ? "sm" : "md"}
      >
        {position}
      </Text>
    </div>
  );
};
