// @flow
import { put, all } from "redux-saga/effects";
import { fetchPageBySlug } from "Models/cms";
//import { waitForSelector } from "Utils";
import { METHOD_CONFIG_PATH } from "./methodConfig.constants";

export function* methodConfigSaga(action: any): * {
  const configSlugs = METHOD_CONFIG_PATH[action.methodType];

  yield all(configSlugs.map(slug => put(fetchPageBySlug(slug))));

  // const pages = yield all(
  //   configSlugs.map(slug => waitForSelector(getPage(slug)))
  // );
}
