// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import cx from "classnames";
import { timeRemainingBeforeStart } from "Utils";
import type { ReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPage";

const THIRTY_MINUTES = 30 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;

type Props = {
  t: ?ReelRacesContentPage,
  startTime: number,
};

export function ReelRacesPageTabScheduleTitle({ t, startTime }: Props) {
  const renderTitle = (title, circleClass) => (
    <Flex align="center" className="u-padding-x--md u-padding-top">
      {circleClass && (
        <div
          className={cx("u-width u-height t-border-r--circle", circleClass)}
        />
      )}
      <Text className="u-padding-left u-font-weight-bold" tag="div">
        {title}
      </Text>
    </Flex>
  );

  if (timeRemainingBeforeStart(startTime) <= THIRTY_MINUTES) {
    return renderTitle(t?.right_now, "t-background-green-30");
  }

  if (timeRemainingBeforeStart(startTime) <= ONE_HOUR) {
    return renderTitle(t?.up_next, "t-background-yellow-30");
  }

  if (timeRemainingBeforeStart(startTime) <= ONE_HOUR + THIRTY_MINUTES) {
    return renderTitle(t?.later_today);
  }

  return null;
}
