// @flow
import { fork, takeEvery, takeLatest } from "redux-saga/effects";
import {
  periodicReminderNotificationSaga,
  limitAlmostConsumedNotificationSaga,
  timeRemainingNotificationSaga,
  statsUpdateNotificationSaga,
  sessionEndedSaga,
} from "Models/slotControlSystem";
import {
  types as appTypes,
  appSaga,
  appManualLogoutSaga,
  appAutomaticLogoutSaga,
} from "Models/app";
import { types as fetchTypes, fetchSaga } from "Models/fetch";
import { fetchCuratedGameSaga, takeFetchedCuratedPages } from "Models/curated";
import {
  liveCasinoTypes,
  fetchAllLiveCasinoGamesSaga,
  liveCasinoUpdatesSaga,
} from "Models/liveCasino";
import { jackpotsUpdatesSaga } from "Models/jackpots";
import { types as cmsTypes, fetchPageBySlugSaga } from "Models/cms";
import {
  TYPES as jackpotsMustDropTypes,
  fetchJackpotsMustDropSaga,
  jackpotsMustDropUpdateSaga,
} from "Models/jackpotsMustDrop";
import {
  CHANNELS as cometdChannels,
  TYPES as cometdTypes,
  MESSAGES as cometdMessages,
  cometdSubscribeSaga,
  cometdUnsubscribeSaga,
  takeChannel,
  takeMessageFromChannel,
} from "Models/cometd";
import {
  types as playerGamesTypes,
  fetchPlayerGamesSaga,
  fetchPlayerGamesCountSaga,
} from "Models/playerGames";
import { updatePlayerFirstDepositDateSaga } from "Models/handshake";
import {
  actionTypes as adventureActionTypes,
  fetchAdventurerSaga,
  adventureUpdatesSaga,
} from "Models/adventure";
import {
  types as transactionsBetsHistoryTypes,
  fetchAnnualOverviewSaga,
} from "Models/transactionsBetsHistory";
import { danishOverlaySaga } from "Models/compliance/denmark";

export default function* rootSaga(dispatch: any): * {
  // __FIX__ (REMOVE) Fetches the common handshake
  yield fork(takeEvery, appTypes.APP_STARTED, appSaga);

  // __FIX__ Fetch anything.
  yield fork(takeEvery, fetchTypes.FETCH, fetchSaga);

  // __FIX__ Fetches a page by slug
  yield fork(takeEvery, cmsTypes.FETCH_PAGE_BY_SLUG, fetchPageBySlugSaga);

  // __FIX__ CometD
  yield fork(takeEvery, cometdTypes.COMETD_UNSUBSCRIBE, cometdUnsubscribeSaga);
  yield fork(takeEvery, cometdTypes.COMETD_SUBSCRIBE, cometdSubscribeSaga);

  // __FIX__ Jackpots
  yield fork(takeEvery, jackpotsMustDropTypes.FETCH, fetchJackpotsMustDropSaga);
  yield fork(
    takeEvery,
    takeChannel(cometdChannels.JACKPOTS),
    jackpotsUpdatesSaga
  );
  yield fork(
    takeEvery,
    takeChannel(cometdChannels.MUST_DROP_JACKPOTS),
    jackpotsMustDropUpdateSaga
  );

  yield fork(
    takeEvery,
    takeChannel(cometdChannels.LIVE_CASINO_TABLE),
    liveCasinoUpdatesSaga
  );
  yield fork(
    takeEvery,
    takeMessageFromChannel(
      cometdChannels.PLAYER,
      cometdMessages.DEPOSIT_CONFIRMED
    ),
    updatePlayerFirstDepositDateSaga
  );
  yield fork(
    takeEvery,
    takeMessageFromChannel(
      cometdChannels.PLAYER,
      cometdMessages.SLOT_CONTROL_SYSTEM_SESSION_ENDED
    ),
    sessionEndedSaga
  );
  yield fork(
    takeEvery,
    takeMessageFromChannel(
      cometdChannels.PLAYER,
      cometdMessages.PERIODIC_REMINDER_NOTIFICATION
    ),
    periodicReminderNotificationSaga
  );
  yield fork(
    takeEvery,
    takeMessageFromChannel(
      cometdChannels.PLAYER,
      cometdMessages.LIMIT_ALMOST_CONSUMED_NOTIFICATION
    ),
    limitAlmostConsumedNotificationSaga
  );
  yield fork(
    takeEvery,
    takeMessageFromChannel(
      cometdChannels.PLAYER,
      cometdMessages.TIME_REMAINING_NOTIFICATION
    ),
    timeRemainingNotificationSaga
  );
  yield fork(
    takeEvery,
    takeMessageFromChannel(
      cometdChannels.PLAYER,
      cometdMessages.STATS_UPDATED_NOTIFICATION
    ),
    statsUpdateNotificationSaga
  );
  yield fork(takeEvery, takeFetchedCuratedPages, fetchCuratedGameSaga);
  yield fork(
    takeEvery,
    liveCasinoTypes.FETCH_ALL_LIVE_GAMES_INIT,
    fetchAllLiveCasinoGamesSaga
  );
  yield fork(
    takeEvery,
    playerGamesTypes.PLAYER_GAMES_FETCH,
    fetchPlayerGamesSaga
  );
  yield fork(
    takeEvery,
    playerGamesTypes.PLAYER_GAMES_FETCH_COUNT,
    fetchPlayerGamesCountSaga
  );
  yield fork(
    takeEvery,
    adventureActionTypes.ADVENTURER_INIT,
    fetchAdventurerSaga
  );
  yield fork(
    takeEvery,
    takeChannel(cometdChannels.ADVENTURE),
    adventureUpdatesSaga
  );
  yield fork(
    takeEvery,
    transactionsBetsHistoryTypes.ANNUAL_OVERVIEW_FETCH_INIT,
    fetchAnnualOverviewSaga
  );
  yield fork(takeEvery, appTypes.APP_STARTED, danishOverlaySaga);
  yield fork(takeLatest, appTypes.APP_MANUAL_LOGOUT_INIT, appManualLogoutSaga);
  yield fork(
    takeLatest,
    takeChannel(cometdChannels.SESSION_ENDED),
    appAutomaticLogoutSaga
  );
}
