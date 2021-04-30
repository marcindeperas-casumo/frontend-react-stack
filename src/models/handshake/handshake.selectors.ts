import { createSelector } from "reselect";
import * as R from "ramda";
import { DateTime } from "luxon";
import * as storage from "Lib/storage";
import {
  INTL_LOCALES,
  LANGUAGES,
  VERTICALS,
  DEFAULT_LANGUAGE,
  TCurrencyCode,
} from "Src/constants";
import type { TLanguage } from "Src/constants";
import { convertMillisTimestampToLuxonDate } from "Utils/utils";
import { APP_HANDSHAKE_KEY } from "./handshake.constants";
import type { Handshake } from "./handshake.types";

export const handshakeSelector: (state: Object) => Handshake = state =>
  (state as any).handshake;
export const applicationHandshakeSelector = createSelector(
  handshakeSelector,
  R.prop(APP_HANDSHAKE_KEY)
);
export const isApplicationHandshakeLoaded = createSelector(
  applicationHandshakeSelector,
  R.complement(R.anyPass([R.isNil, R.isEmpty]))
);
export const session = createSelector(
  applicationHandshakeSelector,
  R.prop("common/composition/session")
);

type __playersSelector = ReturnType<
  typeof applicationHandshakeSelector
>["common/composition/players"]["players"];
export const playersSelector = createSelector(
  applicationHandshakeSelector,
  R.path<__playersSelector>(["common/composition/players", "players"])
);
export const isAuthenticated = createSelector(
  session,
  R.complement(R.anyPass([R.isNil, R.isEmpty]))
);
export const playerIdSelector = createSelector(session, R.prop("id"));
export const playerSelector = createSelector(
  playersSelector,
  playerIdSelector,
  (players, playerId) => R.prop(playerId)(players)
);
type _PlayerSelectorRT = ReturnType<typeof playerSelector>;
export const playerCasumoNameSelector = createSelector(
  playerSelector,
  R.prop("casumoName")
);
export const playerReferrerInfoSelector = createSelector(
  playerSelector,
  R.prop("referrerInfo")
);
export const sessionIdSelector = createSelector(session, R.prop("sessionId"));
export const adventureLevelsSelector = createSelector(
  applicationHandshakeSelector,
  R.prop("common/composition/Adventure")
);
export const isSuspiciousAccount = createSelector(
  playerSelector,
  R.prop("suspiciousAccount")
);
// TODO: check if we need to fallback on the country guesser. Another option
// would be to set the guesser values in the application state, so it will be
// available for everyone
export const countrySelector = createSelector(
  playerSelector,
  R.path<TLanguage>(["contactInfo", "primaryAddress", "country"])
);
export const currencySelector = createSelector(
  playerSelector,
  R.path<TCurrencyCode>(["wallet", "balance", "iso4217CurrencyCode"])
);
export const walletAmountSelector = createSelector(
  playerSelector,
  R.path<number>(["wallet", "balance", "amount"])
);
export const savedMethodsSelector = createSelector(
  playerSelector,
  R.prop("paymentMethods")
);
export const bonusAmountSelector = createSelector(
  playerSelector,
  R.pathOr(0, ["bonus", "balance", "amount"])
);
export const marketSelector = createSelector(playerSelector, R.prop("market"));
export const hasMadeFirstDepositSelector = createSelector(
  playerSelector,
  R.propSatisfies(R.complement(R.isNil), "firstDepositDate")
);
export const languageSelector = createSelector(
  marketSelector,
  market => LANGUAGES[market] || DEFAULT_LANGUAGE
);

type __rootContentHashesSelector = ReturnType<
  typeof applicationHandshakeSelector
>["common/composition/wpInterface"]["rootContentHashes"];
const rootContentHashesSelector = createSelector(
  applicationHandshakeSelector,
  R.path<__rootContentHashesSelector>([
    "common/composition/wpInterface",
    "rootContentHashes",
  ])
);

export const getCmsHash = createSelector(
  languageSelector,
  rootContentHashesSelector,
  (lang, rootContentHashes) => R.prop(lang, rootContentHashes)
);
/**
 * Inside player object in handshake we have info about reel races that player
 * opted for. We have to use that to check if ongoing race should be shown and
 * how much spins player have left (on the card).
 */
export const optedInReelRacesSelector = createSelector(
  playerSelector,
  R.pathOr({}, ["playerTournamentCampaign", "tournaments"])
);

export const localeSelector = createSelector(
  marketSelector,
  market => INTL_LOCALES[market]
);

type __tournamentChannelsSelector = _PlayerSelectorRT["tournamentCampaign"]["tournamentChannels"];
export const tournamentChannelsSelector = createSelector(
  playerSelector,
  R.pathOr<__tournamentChannelsSelector>(
    [],
    ["tournamentCampaign", "tournamentChannels"]
  )
);

type __walletIdSelector = _PlayerSelectorRT["wallet"]["id"];
export const walletIdSelector = createSelector(
  playerSelector,
  R.path<__walletIdSelector>(["wallet", "id"])
);

type __playerNameSelector = _PlayerSelectorRT["contactInfo"]["name"];
export const playerNameSelector = createSelector(
  playerSelector,
  R.path<__playerNameSelector>(["contactInfo", "name"])
);

type __emailSelector = _PlayerSelectorRT["contactInfo"]["email"];
export const emailSelector = createSelector(
  playerSelector,
  R.path<__emailSelector>(["contactInfo", "email"])
);

type __socialSecurityNumberSelector = _PlayerSelectorRT["contactInfo"]["socialSecurityNumber"];
export const socialSecurityNumberSelector = createSelector(
  playerSelector,
  R.path<__socialSecurityNumberSelector>([
    "contactInfo",
    "socialSecurityNumber",
  ])
);
export const welcomeOfferIdSelector = createSelector(
  playerSelector,
  R.prop("welcomeOfferId")
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
    const backendFeatureFlags = R.pathOr([], ["featureFlags"], player);
    const localContainer = storage.get("featureFlags", {});
    const localFeatureFlags = R.pathOr([], ["features"], localContainer);
    const hasFeatureFlag = x =>
      [...backendFeatureFlags, ...localFeatureFlags].includes(x);
    if (hasFeatureFlag(featureFlag)) {
      return true;
    }
    return false;
  });
export const jurisdictionSelector = createSelector(
  playerSelector,
  R.prop("jurisdiction")
);
export const complianceStatePropertySelector = (complianceProperty: string) =>
  createSelector(
    playerSelector,
    R.path(["complianceState", complianceProperty])
  );

export const registrationDateSelector = createSelector(
  playerSelector,
  R.prop("registrationDate")
);
export const isProductionBackendSelector = createSelector(
  applicationHandshakeSelector,
  R.pipe(
    R.path(["common/composition/context", "siteUrl"]),
    R.includes("casumo.com")
  )
);
export const commonContextSelector = createSelector(
  applicationHandshakeSelector,
  R.prop("common/composition/context")
);
export const piqConfigSelector = createSelector(
  applicationHandshakeSelector,
  R.prop("common/composition/piqConfig")
);
// Temporary mocked selector for DGOJ - warm up phase
export const isWarmUpPhaseSelector = createSelector(
  registrationDateSelector,
  registrationMillis => {
    const firstOfMay = convertMillisTimestampToLuxonDate(1619820000000);
    const registrationDate = convertMillisTimestampToLuxonDate(
      registrationMillis
    );
    const afterFirstOfMay = DateTime.utc() > firstOfMay;
    const timeToElapse = registrationDate.plus({ days: 30 }).toSeconds();
    return afterFirstOfMay && timeToElapse > DateTime.utc().toSeconds();
  }
);
