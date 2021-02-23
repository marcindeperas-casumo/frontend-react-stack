/* @flow */
import * as React from "react";
import { Query } from "@apollo/client/react/components";
import type { FetchPolicy } from "@apollo/client";
import { isEmpty } from "ramda";

export type SimpleQueryProps<D, V> = {
  query: any,
  variables?: V,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: (data: D) => React.Node,
  fetchPolicy?: FetchPolicy,
};

// @ts-expect-error ts-migrate(2368) FIXME: Type parameter name cannot be 'any'.
export class SimpleQuery<D: ?any = {}, V: ?any = {}> extends React.Component<
  SimpleQueryProps<D, V>
> {
  render() {
    const { query, variables, fetchPolicy, children } = this.props;

    return (
      <Query
        query={query}
        variables={variables}
        fetchPolicy={fetchPolicy || "cache-and-network"}
      >
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '({ loading, error, data, }: { loading: boole... Remove this comment to see the full error message */}
        {({
          loading,
          error,
          data,
        }: {
          loading: boolean,
          error: any,
          data: any,
        }) => {
          if (loading || error || !data || isEmpty(data)) {
            // TODO:(adampilks) - add logging for error case
            return null;
          }

          return children(data);
        }}
      </Query>
    );
  }
}
