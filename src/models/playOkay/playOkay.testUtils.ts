// @flow
import { Duration } from "luxon";
import { is } from "ramda";
import { type PlayOkayReduxStore, type LoginTimeLimit } from "Models/playOkay";
import dailyLimitMock from "./timeLimits/__mocks__/dailyLimit";
import weeklyLimitMock from "./timeLimits/__mocks__/weeklyLimit";
import monthlyLimitMock from "./timeLimits/__mocks__/monthlyLimit";

type LoginTimeLimitsToInclude = {
  daily?: boolean | number,
  weekly?: boolean | number,
  monthly?: boolean | number,
};

export function adjustLimitMock(
  limitMock: LoginTimeLimit,
  hours?: number | boolean
) {
  return {
    ...limitMock,
    limit: is(Number)(hours)
      ? Duration.fromObject({ hours }).toString()
      : limitMock.limit,
  };
}

export function prepareLoginTimeLimitsStateMock({
  daily = false,
  weekly = false,
  monthly = false,
}: LoginTimeLimitsToInclude): Array<LoginTimeLimit> {
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

export function prepareStateMock({
  loginTimeLimits,
}: {
  loginTimeLimits: LoginTimeLimitsToInclude,
}) {
  const playOkay: PlayOkayReduxStore = {
    isDepositLimitProperlySet: false,
    loginTimeLimits: prepareLoginTimeLimitsStateMock(loginTimeLimits),
  };

  return {
    playOkay: {
      playOkay,
    },
  };
}
