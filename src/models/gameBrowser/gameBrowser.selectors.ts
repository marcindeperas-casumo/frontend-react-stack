// @flow
import * as R from "ramda";

export const getGamePage = R.path(["gameBrowser", "page"]);
export const getData = R.pipe(
  R.path(["gameBrowser", "data"]),
  R.when(R.isEmpty, R.always({ sort: null, filters: {} }))
);
export const getGamePageScrollPosition = R.pathOr(0, ["gameBrowser", "scroll"]);
