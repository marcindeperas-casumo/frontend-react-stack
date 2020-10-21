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
import { types as cmsTypes, fetchPageBySlugSaga } from "Models/cms";
import {
  CHANNELS as cometdChannels,
  TYPES as cometdTypes,
  MESSAGES as cometdMessages,
  cometdSubscribeSaga,
  cometdUnsubscribeSaga,
  takeChannel,
  takeMessageFromChannel,
} from "Models/cometd";
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
import { danishOverlaySaga } from "Models/playOkay";
import { periodicNotificationSaga as realityCheckPeriodicNotificationSaga } from "Models/playOkay/realityCheck";
import { appStartedSaga as sgaTimeLimitsAppStartedSaga } from "Models/playOkay/timeLimits/timeLimits.appStarted.saga";
import {
  methodConfigSaga as paymentMethodConfigSaga,
  usePaymentMethodSaga,
} from "Models/payments";
import { actionTypes as methodConfigActionTypes } from "Models/payments/methodConfig.constants";
import { actionTypes as paymentActionTypes } from "Models/payments/payments.constants";

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
  yield fork(
    takeEvery,
    takeMessageFromChannel(
      cometdChannels.PLAYER,
      cometdMessages.REALITY_CHECK_PERIODIC_NOTIFICATION
    ),
    realityCheckPeriodicNotificationSaga
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
  yield fork(takeLatest, appTypes.APP_STARTED, sgaTimeLimitsAppStartedSaga);
  yield fork(
    takeEvery,
    methodConfigActionTypes.PREPARE_METHOD_CONFIG,
    paymentMethodConfigSaga
  );
  yield fork(
    takeEvery,
    paymentActionTypes.START_QUICK_DEPOSIT,
    usePaymentMethodSaga
  );
}
