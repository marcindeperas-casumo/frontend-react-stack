import * as R from "ramda";

export const getPage = (path: string) => R.path(["gameBrowser", path]);
export const getGamePage = (path: string) =>
  R.path(["gameBrowser", path, "page"]);
export const getData = (path: string) =>
  R.pipe(
    R.path(["gameBrowser", path, "data"]),
    R.when(R.isEmpty, R.always({ sort: null, filters: {} }))
  );
export const getGamePageScrollPosition = (path: string) =>
  R.pathOr(0, ["gameBrowser", path, "scroll"]);
