import * as R from "ramda";
import { all, call, put, spawn } from "redux-saga/effects";
import { getFirstTACApproval, getLastTACApproval } from "Api/api.tac";
import { updateEntity } from "Models/schema";
import { fetchPageBySlug } from "Models/cms";
import { cmsSlugs } from "./tac.constants";

export function* fetchTACListSaga() {
  const acknowledgements = yield all({
    first: call(getFirstTACApproval),
    last: call(getLastTACApproval),
  });
  yield spawn(
    fetchVersionsFromRange,
    acknowledgements.first.version,
    acknowledgements.last.version
  );
  yield put(updateEntity({ acknowledgements }));
}

function* fetchVersionsFromRange(firstVersion, lastVersion) {
  const neededVersions = R.times(
    i => i + firstVersion,
    lastVersion - firstVersion + 1
  );

  yield all(
    neededVersions.map(version =>
      put(fetchPageBySlug(cmsSlugs.version.replace("{v}", version)))
    )
  );
}
