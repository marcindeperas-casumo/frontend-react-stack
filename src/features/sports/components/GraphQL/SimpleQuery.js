/* @flow */
import * as React from "react";
import { Query } from "react-apollo";
import type { FetchPolicy } from "apollo-client";
import { isEmpty } from "ramda";

export type SimpleQueryProps<D, V> = {
  query: any,
  variables?: V,
  children: (data: D) => React.Node,
  fetchPolicy?: FetchPolicy,
};

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
