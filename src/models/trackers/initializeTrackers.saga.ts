// @flow
import { call, select } from "redux-saga/effects";
import { commonContextSelector, playerIdSelector } from "Models/handshake";
import { testSubjectIDSelector } from "Models/ABTesting";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../components/GoogleTagManager"' has n... Remove this comment to see the full error message
import { init, type TSharedEventConfig } from "Components/GoogleTagManager";
import { waitForSelector, getAppSubType } from "Utils";

export function* initializeTrackers(action: any): any {
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  yield call(waitForSelector, testSubjectIDSelector);
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  yield call(waitForSelector, playerIdSelector);
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  yield call(waitForSelector, commonContextSelector);

  const testSubjectId = yield select(testSubjectIDSelector);
  const userId = yield select(playerIdSelector);
  const { targetDevice: appType, countryCodeByIp } = yield select(
    commonContextSelector
  );

  const appSubType = yield call(getAppSubType, window);

  const eventConfig: TSharedEventConfig = {
    userId,
    testSubjectId,
    userStatus: userId ? "Logged-In" : "Logged-Out",
  };

  const dataLayerConfig = {
    appType,
    appSubType,
    countryCodeByIp,
  };

  yield call(init, eventConfig, dataLayerConfig);
}
