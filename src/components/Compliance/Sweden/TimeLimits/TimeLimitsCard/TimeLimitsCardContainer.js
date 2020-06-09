// @flow
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import { showModal } from "Models/modal";
import { Mobile, TabletAndDesktop } from "Components/ResponsiveLayout";
import {
  dailyLoginTimeLimitSelector,
  weeklyLoginTimeLimitSelector,
  monthlyLoginTimeLimitSelector,
  type Period,
} from "Models/playOkay";
import { REACT_APP_MODAL } from "Src/constants";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsCardMobile } from "./TimeLimitsCardMobile";
import { TimeLimitsCardDesktop } from "./TimeLimitsCardDesktop";

type Props = {
  selectedPeriod?: Period,
};

export function TimeLimitsCardContainer({ selectedPeriod }: Props) {
  const dispatch = useDispatch();
  const dailyLimit = useSelector(dailyLoginTimeLimitSelector);
  const weeklyLimit = useSelector(weeklyLoginTimeLimitSelector);
  const monthlyLimit = useSelector(monthlyLoginTimeLimitSelector);
  const selectedLimit = R.find(R.propEq("period", selectedPeriod))([
    dailyLimit,
    weeklyLimit,
    monthlyLimit,
  ]);
  const onClick = () =>
    dispatch(showModal(REACT_APP_MODAL.ID.TIME_LIMITS_FORM));

  return (
    <>
      <Mobile>
        <TimeLimitsCardMobile
          t={cmsMock}
          dailyLimit={dailyLimit}
          weeklyLimit={weeklyLimit}
          monthlyLimit={monthlyLimit}
          onClick={onClick}
        />
      </Mobile>
      <TabletAndDesktop>
        <TimeLimitsCardDesktop
          t={cmsMock}
          limit={selectedLimit}
          onClick={onClick}
        />
      </TabletAndDesktop>
    </>
  );
}
