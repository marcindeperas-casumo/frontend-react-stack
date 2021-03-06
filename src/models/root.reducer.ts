import { combineReducers } from "redux";
import { reducer as router } from "Models/router";
import { reducer as fetch } from "Models/fetch";
import { reducer as handshake } from "Models/handshake";
import { reducer as player } from "Models/player";
import { reducer as promotions } from "Models/promotions";
import { reducer as schema } from "Models/schema";
import { reducer as playing } from "Models/playing";
import { reducer as sidebar } from "Models/sidebar";
import { modalReducer as modal } from "Models/modal";
import { blueribbonJackpotReducer as blueribbonJackpot } from "Models/blueribbonJackpots/jackpots.reducer";
import { slotControlSystemReducer as slotControlSystem } from "Models/slotControlSystem";
import { fiveMinuteBreakReducer as fiveMinuteBreak } from "Models/gglFiveMinuteBreak";
import { methodConfigReducer as paymentMethodConfigs } from "./payments/methodConfig.reducer";
import { paymentsReducer as playerPayments } from "./payments/payments.reducer";
import { playOkayReducer as playOkay } from "./playOkay/playOkay.rootReducer";
import { gameBrowserReducer as gameBrowser } from "./gameBrowser";
import { reelRacesReducer as reelRaces } from "./reelRaces";
import { sportsEventsReducer as sportsEvents } from "./sportsEvents/sportsEvents.reducer";
import { mandatoryMessagesApi } from "./mandatoryMessages";
import { playOkayApi, gameTypeExclusionsApi } from "./playOkay";
import { kycApi, kycCommonApi } from "./kyc";
import { loginSessionApi } from "./loginSession";
import { cmsApi } from "./cms";
import { avgBetApi } from "./avgBet";
import { paymentsApi } from "./payments";
import { gamificationFeaturesApi } from "./gamificationFeatures";

const rootReducer = combineReducers({
  router,
  fetch,
  handshake,
  player,
  promotions,
  schema,
  modal,
  playOkay,
  playing,
  slotControlSystem,
  sidebar,
  gameBrowser,
  paymentMethodConfigs,
  playerPayments,
  fiveMinuteBreak,
  reelRaces,
  blueribbonJackpot,
  sportsEvents,
  [mandatoryMessagesApi.reducerPath]: mandatoryMessagesApi.reducer,
  [playOkayApi.reducerPath]: playOkayApi.reducer,
  [cmsApi.reducerPath]: cmsApi.reducer,
  [kycApi.reducerPath]: kycApi.reducer,
  [kycCommonApi.reducerPath]: kycCommonApi.reducer,
  [gameTypeExclusionsApi.reducerPath]: gameTypeExclusionsApi.reducer,
  [loginSessionApi.reducerPath]: loginSessionApi.reducer,
  [avgBetApi.reducerPath]: avgBetApi.reducer,
  [gamificationFeaturesApi.reducerPath]: gamificationFeaturesApi.reducer,
  [paymentsApi.reducerPath]: paymentsApi.reducer,
});

export default rootReducer;
