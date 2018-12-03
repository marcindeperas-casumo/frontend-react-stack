import { put, select } from "redux-saga/effects";
import { currency as currencySelector } from "Models/handshake";
import { updateEntity } from "Models/schema";

export function* jackpotsMustDropUpdateSaga(action) {
  const { channel, data } = action;
  const channelCurrency = channel.split("/").pop();
  const currency = yield select(currencySelector);
  const isCurrentMarket = currency === channelCurrency;

  if (isCurrentMarket) {
    yield put(updateEntity({ jackpotMustDrop: data }));
  }
}
