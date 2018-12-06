import { put, call } from "redux-saga/effects";

import { fetchService } from "Services/FetchService";
import * as actions from "./fetch.actions";

export function* fetchSaga(action) {
  const {
    name,
    method,
    url,
    data,
    postFetch,
    asyncCall,
    asyncCallData,
  } = action;

  try {
    yield put(actions.clearError(name));
    yield put(actions.sendRequest(name));

    const response = asyncCall
      ? yield call(asyncCall, asyncCallData)
      : yield call(fetchService, { method, url, data });

    if (action.postFetch) {
      yield put(actions.postFetch(postFetch, response));
    }
  } catch (error) {
    const { message } = error;
    yield put(actions.requestError(name, message));
  } finally {
    yield put(actions.requestComplete(name));
  }
}
