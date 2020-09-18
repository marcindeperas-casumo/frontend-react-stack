// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import cx from "classnames";
import { type CurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";

import "../ReelRaceIcon.scss";

export const PointsView = ({
  points,
  className,
}: CurrentReelRaceInfo & { className?: string }) => (
  <Text
    className={cx("t-color-white u-font-weight-bold", className)}
    tag="div"
    size="md"
  >
    {points}
  </Text>
);

// eslint-disable-next-line fp/no-mutation
PointsView.displayName = "PointsView";
