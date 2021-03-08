import * as R from "ramda";
import * as A from "Types/apollo";

/**
 * Each entry in `allFilters` array has array `values` inside.
 * Each entry in `values` has field `query`. Without bug/missing translation
 * there will always be one query that is equal to given `currentQuery`.
 *
 * Number of all queries to match is relatively low (under 100) so we're not
 * concerned about performance of this function.
 */
export function findQueryTranslation(
  currentQuery: string,
  allFilters: A.GetGameSetsQuery["gameSetsList"][number]["additionalFilterGroups"]
): string {
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
  return R.pipe(
    R.pluck("values"),
    R.flatten,
    R.find(R.propEq("query", currentQuery)),
    R.propOr(currentQuery, "title")
  )(allFilters);
}

export const getAppliedFilters = (filters: Object = {}) =>
  Object.entries(filters)
    .filter(([key, val]) => val)
    .map(([key]) => key);
