import { get } from "object-path";
import { isUndefined } from "util";
import { currentTimestamp } from "../../clock";
import {
  compose,
  composePromises,
  throwIf,
  tryCatch,
  defaultValue,
  trace
} from "../../utils";
import { queryHandshake } from "./api";

const EMPTY_SESSION = {};

export const toSession = ({ id, sessionId, lastChecked }) => ({
  playerId: id,
  sessionId,
  lastChecked
});

export const checkResponse = compose(
  throwIf(isUndefined, Error("Session value is invalid"))
);

const addLastChecked = x => ({ ...x, lastChecked: currentTimestamp() });

const currentSession = tryCatch(
  composePromises(
    toSession,
    addLastChecked,
    x => defaultValue(x, EMPTY_SESSION),
    x => get(x, "common/composition/session"),
    checkResponse,
    queryHandshake
  ),
  Error("Failed to get session")
);

const toPlayer = original => {
  const { playerId, casumoName, market } = original;
  const country = get(original, "contactInfo.primaryAddress.country");
  return { playerId, casumoName, market, country, __original: original };
};
const pullPlayer = ([session, players]) => players.players[session.id];
const pullSession = x => get(x, "common/composition/session");
const pullPlayers = x => get(x, "common/composition/players");

const currentPlayer = composePromises(
  toPlayer,
  pullPlayer,
  x => [pullSession(x), pullPlayers(x)],
  queryHandshake
);

export default () => {
  return { currentSession, currentPlayer };
};
