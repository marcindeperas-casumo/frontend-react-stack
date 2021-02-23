// @flow
import * as R from "ramda";
import {
  useQuery,
  useApolloClient,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
  type QueryHookOptions,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
  type QueryResult,
} from "@apollo/client";
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
  // @ts-expect-error ts-migrate(2693) FIXME: 'number' only refers to a type, but is being used ... Remove this comment to see the full error message
  TVariables: { offset: number, limit: number }
>(
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'query'.
  query: any,
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'options'. Did you mean 'Option'?
  options?: QueryHookOptions<TData, TVariables>,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'listPath'.
  listPath: Array<string>
// @ts-expect-error ts-migrate(2693) FIXME: 'QueryResult' only refers to a type, but is being ... Remove this comment to see the full error message
): QueryResult<TData, TVariables> {
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'cache'. Did you mean 'Cache'?
  const { cache } = useApolloClient();
  // @ts-expect-error ts-migrate(1117) FIXME: An object literal cannot have multiple properties ... Remove this comment to see the full error message
  const previousCache = usePrevious(
    (() => {
      try {
        // $FlowIgnore: this type is broken in definition
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'cache'.
        return cache.readQuery({
          // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
          query,
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'options'.
          ...options,
        });
      } catch (err) {
        return null;
      }
    })()
  );
  // @ts-expect-error ts-migrate(1117) FIXME: An object literal cannot have multiple properties ... Remove this comment to see the full error message
  const queryResults = useQuery<TData, TVariables>(query, options);

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'previousCache'.
  if (!queryResults.loading && previousCache) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'listPath'.
    const getPagedPath = R.pathOr([], listPath);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'previousCache'.
    const cachedPagedData = getPagedPath(previousCache);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'listPath'.
    const newData = R.over(R.lensPath(listPath), data => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'length' does not exist on type 'never'.
      if (data.length < cachedPagedData.length) {
        return insertIntoArray(data, 0)(cachedPagedData);
      }

      return data;
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'queryResults'.
    })(queryResults.data);

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'queryResults'.
    queryResults.updateQuery(() => newData);

    return {
      ...queryResults,
      data: newData,
    };
  }

  return queryResults;
}
