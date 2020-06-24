// @flow
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "Models/modal";
import {
  dailyLoginTimeLimitSelector,
  weeklyLoginTimeLimitSelector,
  monthlyLoginTimeLimitSelector,
} from "Models/playOkay";
import { REACT_APP_MODAL } from "Src/constants";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsCard } from "./TimeLimitsCard";

export function TimeLimitsCardContainer() {
  const dispatch = useDispatch();
  const dailyLimit = useSelector(dailyLoginTimeLimitSelector);
  const weeklyLimit = useSelector(weeklyLoginTimeLimitSelector);
  const monthlyLimit = useSelector(monthlyLoginTimeLimitSelector);

  return (
    <TimeLimitsCard
      t={cmsMock}
      dailyLimit={dailyLimit}
      weeklyLimit={weeklyLimit}
      monthlyLimit={monthlyLimit}
      onClick={() => dispatch(showModal(REACT_APP_MODAL.ID.TIME_LIMITS_FORM))}
    />
  );
}
