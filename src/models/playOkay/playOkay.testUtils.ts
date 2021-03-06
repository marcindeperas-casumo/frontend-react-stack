import { Duration } from "luxon";
import { is } from "ramda";
import type { TLoginTimeLimit } from "Models/playOkay/limits";
import dailyLimitMock from "./limits/__mocks__/dailyLimit";
import weeklyLimitMock from "./limits/__mocks__/weeklyLimit";
import monthlyLimitMock from "./limits/__mocks__/monthlyLimit";
import comingLimitMock from "./limits/__mocks__/comingLimit";
import comingRevocationMock from "./limits/__mocks__/comingRevocation";

type LoginTimeLimitsToInclude = {
  daily?: boolean | number;
  weekly?: boolean | number;
  monthly?: boolean | number;
};

export function adjustLimitMock(
  limitMock: TLoginTimeLimit,
  hours?: number | boolean,
  hasComingLimit?: boolean,
  hasComingRevocation?: boolean
): TLoginTimeLimit {
  return {
    ...limitMock,
    comingLimit: hasComingLimit ? comingLimitMock : null,
    comingRevocation: hasComingRevocation ? comingRevocationMock : null,
    limit: is(Number)(hours)
      ? Duration.fromObject({ hours }).toString()
      : limitMock.limit,
  };
}

export function prepareLoginTimeLimitsStateMock({
  daily = false,
  weekly = false,
  monthly = false,
}: LoginTimeLimitsToInclude): Array<TLoginTimeLimit> {
  const state = [];

  if (daily) {
    // eslint-disable-next-line fp/no-mutating-methods
    state.push(adjustLimitMock(dailyLimitMock, daily));
  }
  if (weekly) {
    // eslint-disable-next-line fp/no-mutating-methods
    state.push(adjustLimitMock(weeklyLimitMock, weekly));
  }
  if (monthly) {
    // eslint-disable-next-line fp/no-mutating-methods
    state.push(adjustLimitMock(monthlyLimitMock, monthly));
  }

  return state;
}
