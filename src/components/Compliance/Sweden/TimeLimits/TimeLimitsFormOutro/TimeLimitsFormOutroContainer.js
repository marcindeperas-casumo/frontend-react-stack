// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import {
  dailyLoginTimeLimitSelector,
  weeklyLoginTimeLimitSelector,
  monthlyLoginTimeLimitSelector,
} from "Models/playOkay";
import { TimeLimitsFormOutro } from "./TimeLimitsFormOutro";
import cmsMock from "./__mocks__/cms";

type Props = {
  initial: boolean,
  onClickCta: () => void,
};

export function TimeLimitsFormOutroContainer({ initial, onClickCta }: Props) {
  const dailyLimit = useSelector(dailyLoginTimeLimitSelector);
  const weeklyLimit = useSelector(weeklyLoginTimeLimitSelector);
  const monthlyLimit = useSelector(monthlyLoginTimeLimitSelector);

  return (
    <TimeLimitsFormOutro
      t={cmsMock}
      initial={initial}
      onClickCta={onClickCta}
      dailyLimit={dailyLimit}
      weeklyLimit={weeklyLimit}
      monthlyLimit={monthlyLimit}
    />
  );
}
