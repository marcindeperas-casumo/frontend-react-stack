// @flow
import { call, select } from "redux-saga/effects";
import {
  commonContextSelector,
  playerIdSelector,
  // playerReferrerInfoSelector,
} from "Models/handshake";
import { testSubjectIDSelector } from "Models/ABTesting";
import { init, type TSharedEventConfig } from "Components/GoogleTagManager";
import { waitForSelector, getAppSubType } from "Utils";

export function* initializeTrackers(action: any): any {
  // yield call(waitForSelector, playerReferrerInfoSelector);
  yield call(waitForSelector, testSubjectIDSelector);
  yield call(waitForSelector, playerIdSelector);
  yield call(waitForSelector, commonContextSelector);

  // const referrerInfo = yield select(playerReferrerInfoSelector);
  const testSubjectId = yield select(testSubjectIDSelector);
  const userId = yield select(playerIdSelector);
  const { targetDevice: appType, countryCodeByIp } = yield select(
    commonContextSelector
  );

  const appSubType = yield call(getAppSubType, window);

  const eventConfig: TSharedEventConfig = {
    userId,
    testSubjectId,
    // affiliateId: referrerInfo.metadata.affId() || "",
    // btag: referrerInfo.metadata.bannerId() || "",
    userStatus: userId ? "Logged-In" : "Logged-Out",
  };

  const dataLayerConfig = {
    appType,
    appSubType,
    countryCodeByIp,
  };

  yield call(init, eventConfig, dataLayerConfig);
}
