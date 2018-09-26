import { put, call } from "redux-saga/effects";
import { actions } from "Reducers/fetch";
import { fetchService } from "Services/FetchService";
import { sleep } from "../../lib/utils";

export function* fetchSaga(action) {
  const { name, method, url, data, postFetch } = action;

  try {
    yield put(actions.clearError(name));
    yield put(actions.sendRequest(name));

    const response = yield call(fetchService, { method, url, data });

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

export default fetchSaga;
