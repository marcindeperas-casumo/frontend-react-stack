// @flow
import { call, select } from "redux-saga/effects";
import { commonContextSelector } from "Models/handshake";
import { GoogleTagManagerService } from "Components/GoogleTagManager";
import { waitForSelector, getAppSubType } from "Utils";

export function* initializeTrackers(action: any): any {
  yield call(waitForSelector, commonContextSelector);

  const { targetDevice: appType, countryCodeByIp } = yield select(
    commonContextSelector
  );

  const gtm = yield call(GoogleTagManagerService);
  const appSubType = yield call(getAppSubType, window);

  const dataLayerConfig = {
    appType,
    appSubType,
    countryCodeByIp,
  };

  yield call(gtm.init, dataLayerConfig);
}
