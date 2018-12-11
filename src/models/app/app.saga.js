import {
  fetchAppHandshake,
  applicationHandshakeSelector,
  country as countrySelector,
  isAuthenticated,
} from "Models/handshake";
import { call, put, select } from "redux-saga/effects";
import { fetchGameListSaga } from "Models/games";
import CommonService from "Services/CommonService";
import GameBrowserService from "Services/GameBrowserService";
import { waitForSelector } from "Utils";

function* obsolete__updateLocalServicesConfigs() {
  const handshake = yield select(applicationHandshakeSelector);

  yield call(() => {
    CommonService.obsolete__updateHandshake(handshake);
  });

  const country = yield select(countrySelector);
  yield call(() => {
    GameBrowserService.config.set({ country, platform: "mobile" });
  });
}

export function* appSaga() {
  // Once the app starts, we start off by dispatching an action to fetch the
  // application handshake
  yield put(fetchAppHandshake());

  // Then we will wait until the isAuthenticated returns true (this ensures that
  // the application handshake is loaded and a logged in session is active).
  // This is under the assumption that the react-stack will only run in logged
  // in mode
  yield call(waitForSelector, isAuthenticated);

  // [NOTE]
  //
  // This is needed until we refactor all the inner state of the services to be
  // moved into the store. Right now we are depending on some service that have
  // some internal configuration to be set when the application starts. This
  // method will make sure we update these configs. Once these services
  // (GameBrowser, CMS, Common, Session, etc...) are refactored to have their
  // state on the store, we can safely remove this services and this call.
  yield call(obsolete__updateLocalServicesConfigs);

  // Once we the application is logged in and have have the handshake in place,
  // we can dispatch an action to kick of another saga that will fetch all the
  // games top lists
  yield call(fetchGameListSaga);
}

export default appSaga;
