import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import React from "react";
import cx from "classnames";
import { timeRemainingBeforeStart } from "Utils";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import { RACE_STATE } from "Models/reelRaces";

const THIRTY_MINUTES = 30 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;

type Props = {
  t: TReelRacesContentPage | null;
  startTime: number;
  status: string;
};

export function ReelRacesPageTabScheduleTitle({ t, startTime, status }: Props) {
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

  if (status === RACE_STATE.STARTED) {
    return renderTitle(t?.right_now, "bg-green-30");
  } else {
    if (timeRemainingBeforeStart(startTime) <= THIRTY_MINUTES) {
      return renderTitle(t?.up_next, "bg-yellow-30");
    } else if (timeRemainingBeforeStart(startTime) <= ONE_HOUR) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return renderTitle(t?.later_today);
    }
  }

  return null;
}
