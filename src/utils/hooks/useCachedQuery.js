// @flow
import * as R from "ramda";
import {
  useQuery,
  useApolloClient,
  type QueryHookOptions,
  type QueryResult,
} from "@apollo/react-hooks";
import { usePrevious } from "react-use";
import { insertIntoArray } from "Utils/gamesPaginated";

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
export function useCachedQuery<
  TData,
  TVariables: { offset: number, limit: number }
>(
  query: any,
  options?: QueryHookOptions<TData, TVariables>,
  listPath: Array<string>
): QueryResult<TData, TVariables> {
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
    const getPagedPath = R.pathOr([], listPath);
    const cachedPagedData = getPagedPath(previousCache);
    const newData = R.over(R.lensPath(listPath), data => {
      if (data.length < cachedPagedData.length) {
        return insertIntoArray(data, 0)(cachedPagedData);
      }

      return data;
    })(queryResults.data);

    queryResults.updateQuery(() => newData);

    return {
      ...queryResults,
      data: newData,
    };
  }

  return queryResults;
}
