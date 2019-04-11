// @flow
import * as R from "ramda";
import { call, put, select, take } from "redux-saga/effects";
import http from "Lib/http";
import {
  playerIdSelector,
  localeSelector,
  optedInReelRacesSelector,
  currencySelector,
} from "Models/handshake";
import { fetchGamesBySlugs } from "Models/games";
import { updateEntity } from "Models/schema";
import { formatCurrency } from "Utils";
import { fetchReelRaces } from "./reelRaces.actions";
import { types } from "./reelRaces.constants";
import type { TournamentRaw, TournamentPrizeRaw } from "./reelRaces.types";

// TODO: remove after https://github.com/Casumo/Home/issues/28202
function getSlugs(slugs: Array<string>) {
  const getSlugForGameName = (gameName: string): Promise<{ slug: string }> =>
    http.get(
      `/api/cmsquery/v2/root/en/findChildSlug/games/provider_game_name/${gameName}`
    );

  return Promise.all(slugs.map(getSlugForGameName)).then(R.pluck("slug"));
}

function extractPrize(prizes: Array<TournamentPrizeRaw>, locale: string) {
  const prize = JSON.parse(prizes[0].templateParameterValues.amountGiven);

  return formatCurrency({
    locale,
    currency: prize.iso4217CurrencyCode,
    value: prize.amount,
  });
}

const extractProviderGameName = R.pipe(
  R.pathOr({}, ["gameConfiguration", "gameNames"]),
  R.last
);

function extractMinBet(
  locale: string,
  currency: string,
  minBetByCurrency: { [string]: number }
) {
  if (!R.has(currency, minBetByCurrency)) {
    return null;
  }

  return formatCurrency({
    locale,
    currency,
    value: minBetByCurrency[currency],
  });
}

function extractSpins(
  spinLimit,
  opted: boolean,
  tournamentId: string,
  playerReelRaces: Object
) {
  if (!opted) {
    return spinLimit;
  }

  // $FlowIgnore, Object.values returns mixed here
  return Object.values(playerReelRaces[tournamentId].leaderboard)[0]
    .remainingSpins;
}

export function* fetchReelRacesSaga(): * {
  const playerId = yield select(playerIdSelector);
  yield put(fetchReelRaces({ playerId }));

  const {
    response: { tournaments },
  } = yield take(types.FETCH_COMPLETED);

  const providerGameNames: Array<string> = R.pipe(
    R.values,
    R.map(x => R.last(R.pathOr({}, ["gameConfiguration", "gameNames"], x))),
    R.uniq
  )(tournaments);

  const slugs = yield call(getSlugs, providerGameNames);
  yield put(fetchGamesBySlugs(slugs));

  const providerGameNameToSlug = providerGameNames.reduce(
    (acc, curr, i) => ({
      ...acc,
      [curr]: slugs[i],
    }),
    {}
  );

  const locale = yield select(localeSelector);
  const currency = yield select(currencySelector);
  const playerReelRaces = yield select(optedInReelRacesSelector);
  const optedReelRaces = new Set(Object.keys(playerReelRaces));

  const tournamentsWithGames = R.map((reelRace: TournamentRaw) => {
    const opted = optedReelRaces.has(reelRace.tournamentId);

    return {
      ...R.pick(["endTime", "promoted", "startTime", "tournamentId"], reelRace),
      opted,
      prize: extractPrize(reelRace.prizes, locale),
      gameSlug: providerGameNameToSlug[extractProviderGameName(reelRace)],
      spins: extractSpins(
        reelRace.spinLimit,
        opted,
        reelRace.tournamentId,
        playerReelRaces
      ),
      minBet: extractMinBet(locale, currency, reelRace.minBetByCurrency),
      color: "yellow-light-1", // Will come from color picker at some point https://github.com/Casumo/Home/issues/28123
    };
  }, tournaments);

  yield put(updateEntity({ reelRaces: tournamentsWithGames }));
}
