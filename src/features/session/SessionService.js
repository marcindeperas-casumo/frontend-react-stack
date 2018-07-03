import { get } from "object-path";
import { pair, isNil } from "ramda";
import { Maybe } from "ramda-fantasy";
import { currentTimestamp } from "../../clock";
import {
  compose,
  composePromises,
  defaultValue,
  throwIf,
  trace,
  tryCatch
} from "../../utils";
import { queryHandshake as qH } from "./api";

const queryHandshake = tryCatch(qH, new Error("hQ fail"));
const EMPTY_SESSION = {};

export const toSession = ({ id, sessionId, lastChecked }) => ({
  playerId: id,
  sessionId,
  lastChecked
});

export const checkResponse = compose(
  throwIf(isNil, Error("Session value is invalid"))
);

const pullSession = x => get(x, "common/composition/session");
const pullPlayers = x => get(x, "common/composition/players");
const addLastChecked = x => ({ ...x, lastChecked: currentTimestamp() });

const currentSession = composePromises(
  toSession,
  addLastChecked,
  x => defaultValue(x, EMPTY_SESSION),
  pullSession,
  checkResponse
);

const currentSessionAPI = tryCatch(
  composePromises(currentSession, queryHandshake),
  Error("Failed to get session")
);

const toPlayer = original => {
  const { playerId, casumoName, market } = original;
  const country = get(original, "contactInfo.primaryAddress.country");
  return { playerId, casumoName, market, country, __original: original };
};
const pullPlayer = ([session, players]) => players.players[session.id];

const validSession = compose(
  toPlayer,
  pullPlayer,
  x => [pullSession(x), pullPlayers(x)],
  trace
);
const isNotValidSession = () => EMPTY_SESSION;
const isValidSession = ({ playerId }) => !isNil(playerId);

const currentPlayer = composePromises(
  trace,
  compose(([_, session]) => {
    if (isValidSession(session)) {
      return validSession(_);
    }

    return isNotValidSession();
  }),
  async handshake => [handshake, await currentSession(handshake)],
  queryHandshake
);

const maybeSessionHandshakePair = handshake => {
  const session = pullSession(handshake);
  return pair(Maybe.toMaybe(session), handshake);
};

const playerFromHandshakeImpl = composePromises(
  maybePlayer => maybePlayer.getOrElse(null),
  // maybe<player>
  ([maybeSession, justHandshake]) => {
    return maybeSession.map(session => {
      const players = pullPlayers(justHandshake);
      return pullPlayer([session, players]);
    });
  },
  // [maybe<session>, handshake]
  maybeSessionHandshakePair
);

const playerFromHandshake = tryCatch(
  composePromises(playerFromHandshakeImpl, queryHandshake),
  Error("Failed to get session")
);

export default () => {
  return {
    currentSession: currentSessionAPI,
    currentPlayer,
    currentPlayerFP: playerFromHandshake
  };
};
