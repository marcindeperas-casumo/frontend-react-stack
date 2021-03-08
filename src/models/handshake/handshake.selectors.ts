import { createSelector } from "reselect";
import {
  compose,
  prop,
  path,
  pathOr,
  pipe,
  includes,
  isNil,
  isEmpty,
  complement,
  anyPass,
  propSatisfies,
} from "ramda";
import * as storage from "Lib/storage";
import {
  INTL_LOCALES,
  LANGUAGES,
  VERTICALS,
  DEFAULT_LANGUAGE,
} from "Src/constants";
import { APP_HANDSHAKE_KEY } from "./handshake.constants";
export const handshakeSelector = (state: Object) => (state as any).handshake;
export const applicationHandshakeSelector = createSelector(
  handshakeSelector,
  prop(APP_HANDSHAKE_KEY)
);
export const isApplicationHandshakeLoaded = createSelector(
  applicationHandshakeSelector,
  complement(anyPass([isNil, isEmpty]))
);
export const session = createSelector(
  applicationHandshakeSelector,
  prop("common/composition/session")
);
export const playersSelector = createSelector(
  applicationHandshakeSelector,
  compose(prop("players"), prop("common/composition/players"))
);
export const isAuthenticated = createSelector(
  session,
  complement(anyPass([isNil, isEmpty]))
);
export const playerIdSelector = createSelector(session, prop("id"));
export const playerSelector = createSelector(
  playersSelector,
  playerIdSelector,
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  (players, playerId) => prop(playerId)(players)
);
export const playerCasumoNameSelector = createSelector(
  playerSelector,
  prop("casumoName")
);
export const playerReferrerInfoSelector = createSelector(
  playerSelector,
  prop("referrerInfo")
);
export const sessionIdSelector = createSelector(session, prop("sessionId"));
export const adventureLevelsSelector = createSelector(
  applicationHandshakeSelector,
  prop("common/composition/Adventure")
);
export const isSuspiciousAccount = createSelector(
  playerSelector,
  prop("suspiciousAccount")
);
// TODO: check if we need to fallback on the country guesser. Another option
// would be to set the guesser values in the application state, so it will be
// available for everyone
export const countrySelector = createSelector(
  playerSelector,
  compose(prop("country"), prop("primaryAddress"), prop("contactInfo"))
);
export const currencySelector = createSelector(
  playerSelector,
  compose(prop("iso4217CurrencyCode"), prop("balance"), prop("wallet"))
);
export const walletAmountSelector = createSelector(
  playerSelector,
  path(["wallet", "balance", "amount"])
);
export const savedMethodsSelector = createSelector(
  playerSelector,
  path(["paymentMethods"])
);
export const bonusAmountSelector = createSelector(
  playerSelector,
  pathOr(0, ["bonus", "balance", "amount"])
);
export const marketSelector = createSelector(playerSelector, prop("market"));
export const hasMadeFirstDepositSelector = createSelector(
  playerSelector,
  propSatisfies(complement(isNil), "firstDepositDate")
);
export const languageSelector = createSelector(
  marketSelector,
  // @ts-expect-error ts-migrate(2538) FIXME: Type 'unknown' cannot be used as an index type.
  market => LANGUAGES[market] || DEFAULT_LANGUAGE
);
export const getCmsHash = createSelector(
  languageSelector,
  compose(
    prop("rootContentHashes"),
    prop("common/composition/wpInterface"),
    prop("app"),
    handshakeSelector
  ),
  (lang, rootContentHashes) => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    return prop(lang)(rootContentHashes);
  }
);
/**
 * Inside player object in handshake we have info about reel races that player
 * opted for. We have to use that to check if ongoing race should be shown and
 * how much spins player have left (on the card).
 */
export const optedInReelRacesSelector = createSelector(
  playerSelector,
  pathOr({}, ["playerTournamentCampaign", "tournaments"])
);
export const localeSelector = createSelector(
  marketSelector,
  // @ts-expect-error ts-migrate(2538) FIXME: Type 'unknown' cannot be used as an index type.
  market => INTL_LOCALES[market]
);
export const tournamentChannelsSelector = createSelector(
  playerSelector,
  pathOr([], ["tournamentCampaign", "tournamentChannels"])
);
export const walletIdSelector = createSelector(
  playerSelector,
  path(["wallet", "id"])
);
type PlayerNameSelector = {
  firstName: string;
  lastName: string;
};
// @ts-expect-error ts-migrate(2739) FIXME: Type 'OutputSelector<Object, unknown, (res: any) =... Remove this comment to see the full error message
export const playerNameSelector: PlayerNameSelector = createSelector(
  playerSelector,
  path(["contactInfo", "name"])
);
// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<Object, unknown, (res: any) =... Remove this comment to see the full error message
export const emailSelector: string = createSelector(
  playerSelector,
  path(["contactInfo", "email"])
);
export const socialSecurityNumberSelector = createSelector(
  playerSelector,
  path(["contactInfo", "socialSecurityNumber"])
);
export const welcomeOfferIdSelector = createSelector(
  playerSelector,
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  prop(["welcomeOfferId"])
);
export const verticalSelector = createSelector(
  welcomeOfferIdSelector,
  welcomeOfferId => {
    const isSportsWelcomeOffer =
      typeof welcomeOfferId === "string" &&
      welcomeOfferId.startsWith("wo-sports");
    return isSportsWelcomeOffer ? VERTICALS.SPORTS : VERTICALS.CASINO;
  }
);
/**
 * It looks for feature flags in 2 places: in the handshake and in the localStorage.
 * The localStorage values are set by casumo-frontend codebase when adding "?features=feature-1,feature-2" to the URL.
 * (for more info check casumo-frontend/common-frontend/src/js/featureFlags.es6)
 *
 * Note! You have to whitelist your feature-flags here to be able to use them:
 * https://github.com/Casumo/casumo-frontend/blob/a9ff0a7f4fcbf6141b9f803238be6eece822f708/web/common-frontend/src/js/config/params.js#L107
 */
export const featureFlagSelector = (featureFlag: string) =>
  createSelector(playerSelector, player => {
    const backendFeatureFlags = pathOr([], ["featureFlags"], player);
    const localContainer = storage.get("featureFlags", {});
    const localFeatureFlags = pathOr([], ["features"], localContainer);
    const hasFeatureFlag = x =>
      [...backendFeatureFlags, ...localFeatureFlags].includes(x);
    if (hasFeatureFlag(featureFlag)) {
      return true;
    }
    return false;
  });
export const jurisdictionSelector = createSelector(
  playerSelector,
  prop("jurisdiction")
);
export const complianceStatePropertySelector = (complianceProperty: string) =>
  createSelector(playerSelector, path(["complianceState", complianceProperty]));
export const registrationDateSelector = createSelector(
  playerSelector,
  prop("registrationDate")
);
export const isProductionBackendSelector = createSelector(
  applicationHandshakeSelector,
  pipe(path(["common/composition/context", "siteUrl"]), includes("casumo.com"))
);
export const commonContextSelector = createSelector(
  applicationHandshakeSelector,
  prop("common/composition/context")
);
export const piqConfigSelector = createSelector(
  applicationHandshakeSelector,
  prop("common/composition/piqConfig")
);
