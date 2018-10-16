import { put, select } from "redux-saga/effects";
import { compose, prop, map, defaultTo } from "ramda";
import { currency as currencySelector } from "Reducers/handshake/selectors";
import { actions as schemaActions } from "Reducers/schema";
import { jackpotEntitySelector } from "./jackpots.selectors";
import { transformRawJackpotObject } from "./jackpots.utils";

// TODO: @leventebalogh Update the schema-reducer to support updating a single entity as well
export default function* jackpotsUpdatesSaga(action) {
  const { data } = action;
  const currency = yield select(currencySelector);
  const jackpotsById = yield select(jackpotEntitySelector);
  const updatedJackpotsArray = getJackpotsFromMessageData(data, currency);
  const updatedJackpotsById = normalizeJackpotsArray(updatedJackpotsArray);
  const updatedJackpotsEntity = {
    ...jackpotsById,
    ...updatedJackpotsById,
  };

  yield put(schemaActions.updateEntity({ jackpot: updatedJackpotsEntity }));
}

function getJackpotsFromMessageData(data, currency) {
  return compose(
    map(transformRawJackpotObject),
    defaultTo([]),
    prop(currency)
  )(data);
}

function normalizeJackpotsArray(jackpotsArray) {
  return jackpotsArray.reduce(
    (acc, current) => ({ ...acc, [current.gameId]: current }),
    {}
  );
}
