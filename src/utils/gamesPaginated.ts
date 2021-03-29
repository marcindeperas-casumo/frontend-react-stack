import type { ObservableQueryFields } from "@apollo/client";
import * as R from "ramda";
import type { FieldMergeFunction } from "@apollo/client/cache";

type GamesPaginatedQuery = {
  getGamesPaginated: {
    gamesCount: number;
    offset: number;
    games: Array<any>;
  };
};
type GamesPaginatedQueryVariables = {
  query: string;
  offset: number;
  limit: number;
};

export const gamesLense = R.lensPath(["games"]);
export function insertIntoArray(newData: Array<any>, offset: number) {
  return R.pipe(R.remove(offset, newData.length), R.insertAll(offset, newData));
}
export function loadMoreConstructor(
  fetchMore: ObservableQueryFields<
    GamesPaginatedQuery,
    GamesPaginatedQueryVariables
  >["fetchMore"]
) {
  return ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number;
    stopIndex: number;
  }) => {
    const tmpLimit = stopIndex - startIndex;
    const limit = tmpLimit > 99 ? 100 : tmpLimit || 1; // it blows up above 100
    const offset = limit === 100 ? stopIndex - startIndex : startIndex;

    return fetchMore({
      variables: { offset, limit },
    });
  };
}

export const mergeGetGamesPaginated: FieldMergeFunction<
  GamesPaginatedQuery["getGamesPaginated"]
> = (existing, incoming) => {
  const insertNewGames = insertIntoArray(incoming.games, incoming.offset);

  if (!existing) {
    // To make merging incoming data easier we are crating array that can fit
    // all results and insert incoming data at the returned offset.
    // This gives us better synergy with virtualised lists where chunk of data
    // doesn't have to be adjecent to previous chunks.
    //
    // Apollo client skipps holes when returning data, because of that
    // we have to fill them null.
    return {
      ...incoming,
      games: insertNewGames(new Array(incoming.gamesCount).fill(null)),
    };
  }

  return {
    ...existing,
    ...incoming,
    games: insertNewGames(existing.games),
  };
};
