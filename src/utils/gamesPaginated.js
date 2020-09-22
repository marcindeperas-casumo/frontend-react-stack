// @flow

import * as R from "ramda";
import type { ObservableQueryFields } from "@apollo/react-hooks";

type GamesPaginatedQuery = {
  getGamesPaginated: {
    gamesCount: number,
    offset: number,
    games: Array<*>,
  },
};
type GamesPaginatedQueryVariables = {
  query: string,
  offset: number,
  limit: number,
};

const gamesLense = R.lensPath(["getGamesPaginated", "games"]);
export function insertIntoArray(newData: Array<any>, offset: number) {
  return R.pipe(
    R.remove(offset, newData.length),
    R.insertAll(offset, newData)
  );
}
export function loadMoreConstructor(
  fetchMore: $PropertyType<
    ObservableQueryFields<GamesPaginatedQuery, GamesPaginatedQueryVariables>,
    "fetchMore"
  >,
  gamesCount: number
) {
  return ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number,
    stopIndex: number,
  }) => {
    const tmpLimit = stopIndex - startIndex;
    const limit = tmpLimit > 99 ? 100 : tmpLimit || 1; // it blows up above 100
    const offset = limit === 100 ? stopIndex - startIndex : startIndex;

    return fetchMore<GamesPaginatedQueryVariables>({
      variables: { offset, limit },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        const insertNewGames = insertIntoArray(
          fetchMoreResult.getGamesPaginated.games,
          fetchMoreResult.getGamesPaginated.offset
        );

        return R.over(
          gamesLense,
          prevGames => {
            if (prevGames.length !== gamesCount) {
              return R.pipe(
                insertIntoArray(prevGames, 0),
                insertNewGames
              )(new Array(gamesCount));
            }

            return insertNewGames(prevGames);
          },
          prev
        );
      },
    });
  };
}
