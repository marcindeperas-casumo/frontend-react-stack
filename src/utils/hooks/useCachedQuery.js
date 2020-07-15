// @flow
import * as R from "ramda";
import {
  useQuery,
  useApolloClient,
  type QueryHookOptions,
  type QueryResult,
} from "@apollo/react-hooks";
import { insertIntoArray } from "Utils/gamesPaginated";
import { usePrevious } from "./usePrevious";

/**
 * When useQuery returns data it is removing old cache and replacing it.
 * There are scenarios in which you would like to keep old items in the cache
 * and replace only those items that were requested. From here it's basically
 * useQuery hook with built in start/stop index loadMore function.
 *
 * Implementation is rather simple but apollo client is doing pretty good job
 * with making it seem complex. Before data gets fetched, it reads what we have
 * in cache and saves reference to this value. After useQuery gets resolved we
 * are joining new data with previous cache.
 */
export function useCachedQuery< /* eslint-disable-line */
  TData,
  TVariables: { offset: number, limit: number }
>(
  query: any,
  options?: QueryHookOptions<TData, TVariables>,
  paths: {
    list: Array<string>,
    count: Array<string>,
    offset: Array<string>,
  }
): {
  ...QueryResult<TData, TVariables>,
  loadMore: *,
} {
  const { cache } = useApolloClient();
  const previousCache = usePrevious(
    (() => {
      try {
        // $FlowIgnore: this type is broken in definition
        return cache.readQuery({
          query,
          ...options,
        });
      } catch (err) {
        return null;
      }
    })()
  );
  const queryResults = useQuery<TData, TVariables>(query, options);

  if (!queryResults.loading && previousCache) {
    const getPagedPath = R.pathOr([], paths.list);
    const cachedPagedData = getPagedPath(previousCache);

    queryResults.updateQuery(
      R.over(R.lensPath(paths.list), data => {
        if (data.length < cachedPagedData.length) {
          return insertIntoArray(data, 0)(cachedPagedData);
        }

        return data;
      })
    );
  }

  return {
    ...queryResults,
    loadMore: ({
      startIndex,
      stopIndex,
    }: {
      startIndex: number,
      stopIndex: number,
    }) => {
      const limit = Math.min(100, stopIndex - startIndex);
      const offset = limit === 100 ? stopIndex - startIndex : startIndex;
      const totalCount = R.path(paths.count, queryResults.data);

      return queryResults.fetchMore<TVariables>({
        variables: { offset, limit },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          const insertNewData = insertIntoArray(
            R.path(paths.list, fetchMoreResult),
            R.path(paths.offset, fetchMoreResult)
          );

          return R.over(
            R.lensPath(paths.list),
            prevData => {
              if (prevData.length !== totalCount) {
                return R.pipe(
                  insertIntoArray(prevData, 0),
                  insertNewData
                )(new Array(totalCount));
              }

              return insertNewData(prevData);
            },
            prev
          );
        },
      });
    },
  };
}
