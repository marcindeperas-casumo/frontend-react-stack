import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";
import {
  periodicReminderNotificationSaga,
  statsUpdateNotificationSaga,
} from "Models/slotControlSystem";
import { types as appTypes, appSaga } from "Models/app";
import { types as fetchTypes, fetchSaga } from "Models/fetch";
import { fetchCuratedGameSaga, takeFetchedCuratedPages } from "Models/curated";
import {
  liveCasinoTypes,
  fetchAllLiveCasinoGamesSaga,
  liveCasinoUpdatesSaga,
} from "Models/liveCasino";
import { jackpotsUpdatesSaga } from "Models/jackpots";
import {
  types as gameProviderTypes,
  fetchGameProvidersSaga,
} from "Models/gameProviders";
import {
  types as gameTypes,
  launchGameSaga,
  fetchGamesBySlugsSaga,
  fetchGameListSaga,
  fetchGamesByProviderSaga,
  updateMyListSaga,
} from "Models/games";
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
  types as gameSearchTypes,
  gameSearchCountSaga,
  clearSearchResultsSaga,
  fetchGameSearchPageSaga,
  fetchLatestPlayedSaga,
  resetGameSearchScrollPositionSaga,
} from "Models/gameSearch";
import {
  types as playerGamesTypes,
  fetchPlayerGamesSaga,
  fetchPlayerGamesCountSaga,
} from "Models/playerGames";
import { updatePlayerFirstDepositDateSaga } from "Models/handshake";
import {
  types as reelRacesTypes,
  fetchReelRacesSaga,
  reelRacesUpdatesSaga,
} from "Models/reelRaces";
import {
  actionTypes as adventureActionTypes,
  fetchAdventurerSaga,
  adventureUpdatesSaga,
} from "Models/adventure";
import {
  types as transactionsBetsHistoryTypes,
  fetchAnnualOverviewSaga,
  fetchAnnualOverviewPdfUrlSaga,
} from "Models/transactionsBetsHistory";
import { danishOverlaySaga } from "Models/compliance/denmark";

export default function* rootSaga(dispatch) {
  yield fork(takeEvery, appTypes.APP_STARTED, appSaga);
  yield fork(takeEvery, gameTypes.INIT_FETCH_GAME_LISTS, fetchGameListSaga);
  yield fork(takeEvery, fetchTypes.FETCH, fetchSaga);
  yield fork(takeEvery, gameTypes.LAUNCH_GAME, launchGameSaga);
  yield fork(takeEvery, cmsTypes.FETCH_PAGE_BY_SLUG, fetchPageBySlugSaga);
  yield fork(takeEvery, cometdTypes.COMETD_UNSUBSCRIBE, cometdUnsubscribeSaga);
  yield fork(takeEvery, cometdTypes.COMETD_SUBSCRIBE, cometdSubscribeSaga);
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
    takeChannel(cometdChannels.REEL_RACES),
    reelRacesUpdatesSaga
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
      cometdMessages.PERIODIC_REMINDER_NOTIFICATION
    ),
    periodicReminderNotificationSaga
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
    gameTypes.FETCH_GAMES_BY_SLUGS_START,
    fetchGamesBySlugsSaga
  );
  yield fork(
    takeEvery,
    gameTypes.FETCH_GAMES_BY_PROVIDER_START,
    fetchGamesByProviderSaga
  );
  yield fork(
    takeEvery,
    gameProviderTypes.FETCH_GAME_PROVIDERS_START,
    fetchGameProvidersSaga
  );
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
  yield all([
    fork(
      takeLatest,
      gameSearchTypes.GAME_SEARCH_FETCH_COUNT,
      gameSearchCountSaga
    ),
    fork(
      takeEvery,
      gameSearchTypes.GAME_SEARCH_FETCH_PAGE,
      fetchGameSearchPageSaga
    ),
    fork(
      takeLatest,
      gameSearchTypes.GAME_SEARCH_FETCH_COUNT,
      resetGameSearchScrollPositionSaga
    ),
    fork(takeLatest, gameSearchTypes.GAME_SEARCH_CLEAR, clearSearchResultsSaga),
  ]);
  yield fork(
    takeLatest,
    gameSearchTypes.GAME_SEARCH_FETCH_LATEST_PLAYED,
    fetchLatestPlayedSaga
  );
  yield fork(takeEvery, reelRacesTypes.REEL_RACES_INIT, fetchReelRacesSaga);
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
  yield fork(
    takeEvery,
    transactionsBetsHistoryTypes.ANNUAL_OVERVIEW_FETCH_PDF_URL_INIT,
    fetchAnnualOverviewPdfUrlSaga
  );
  yield fork(takeEvery, gameTypes.UPDATE_MY_LIST, updateMyListSaga);
  yield fork(takeEvery, appTypes.APP_STARTED, danishOverlaySaga);
}
