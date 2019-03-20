import { last, pipe, split } from "ramda";
import { put, select } from "redux-saga/effects";
import { currencySelector } from "Models/handshake";
import { updateEntity } from "Models/schema";

export function* jackpotsMustDropUpdateSaga(action) {
  const { channel, data } = action;

  const currency = yield select(currencySelector);

  const channelCurrency = pipe(
    split("/"),
    last
  )(channel);

  const isCurrentMarket = currency === channelCurrency;

  if (isCurrentMarket) {
    yield put(updateEntity({ jackpotMustDrop: data }));
  }
}
