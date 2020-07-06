// @flow
import * as React from "react";
import { Duration as LuxonDuration } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { type LoginTimeLimit } from "Models/playOkay";
import { interpolateWithJSX } from "Utils";
import { TimeLimitsCardDuration } from "./TimeLimitsCardDuration";
import { ComingLimitNote } from "./ComingLimitNote";

type Props = {
  t: {
    desktop_title: ?string,
    coming_limit_note: ?string,
    time_left_daily: ?string,
    time_left_weekly: ?string,
    time_left_monthly: ?string,
    period_daily: ?string,
    period_weekly: ?string,
    period_monthly: ?string,
  },
  limit: ?LoginTimeLimit,
  onClick: () => void,
};

export function TimeLimitsCardDesktop({ t, limit, onClick }: Props) {
  if (!limit) {
    return null;
  }

  const hrsLeftLabel = t[`time_left_${limit.period.toLowerCase()}`];
  const periodLabel = t[`period_${limit.period.toLowerCase()}`];
  const limitDuration = LuxonDuration.fromISO(limit.limit);
  const hrsLeftDuration = limitDuration.minus(
    LuxonDuration.fromISO(limit.consumedTime)
  );

  return (
    <Flex
      direction="vertical"
      align="center"
      spacing="md"
      onClick={onClick}
      className="t-background-grey-light-2 u-padding--md u-cursor-pointer"
    >
      <Flex.Item>
        <Text tag="strong">{t.desktop_title}</Text>
      </Flex.Item>
      <Flex.Item>
        <div className="o-ratio t-border-r--circle t-background-white u-text-align-center u-padding--3xlg">
          <div className="o-ratio__content u-padding-y--lg">
            <Text tag="strong">
              <TimeLimitsCardDuration duration={limitDuration} />
            </Text>
            <Text>{periodLabel}</Text>
          </div>
        </div>
      </Flex.Item>
      <Flex.Item>
        <Text size="sm">
          {interpolateWithJSX(
            { time: <TimeLimitsCardDuration duration={hrsLeftDuration} /> },
            hrsLeftLabel
          )}
        </Text>
      </Flex.Item>
      <ComingLimitNote t={t} limit={limit} />
    </Flex>
  );
}
