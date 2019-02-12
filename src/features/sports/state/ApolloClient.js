/* @flow */
import * as React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { withClientState } from "apollo-link-state";

import { clientState } from "./clientState";

type Props = {
  children: React.Node,
  market: string,
  locale: string,
  sessionId?: string,
};

export type ApolloClientType = ApolloClient<InMemoryCache>;

// $FlowIgnore - ignore not having default data, only occurs when Consumer is not a child of Provider and saves null checking the context each time its used in classes
export const ClientContext = React.createContext<{
  client: ApolloClientType,
}>();

export class SportsStateProvider extends React.Component<Props> {
  sportsStateClient: ApolloClientType;

  constructor(props: Props) {
    super(props);

    const cache = new InMemoryCache();

    const httpLink = new HttpLink({
      // TODO: (adampilks) - make uri configurable
      uri: "/api/sports-gateway/",
      credentials: "same-origin",
    });

    const clientStateLink = withClientState({
      ...clientState,
      cache,
    });

    // Pass default locale and market so we do not have to pass these in each query.
    // These are available in the context of the apollo server for all resolvers to use
    const contextLink = setContext(() => ({
      headers: {
        kambiMarket: props.market,
        kambiLocale: props.locale,
        "X-Token": props.sessionId,
      },
    }));

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      // TODO:(adampilks) - use proper logging
      if (graphQLErrors) {
        console.log("GraphQL error", graphQLErrors);
      }
      if (networkError) {
        console.log("Network error", networkError);
      }
    });

    // eslint-disable-next-line fp/no-mutation
    this.sportsStateClient = new ApolloClient<InMemoryCache>({
      link: ApolloLink.from([
        errorLink,
        contextLink,
        clientStateLink,
        httpLink,
      ]),
      cache,
    });
  }

  render() {
    return (
      <ApolloProvider client={this.sportsStateClient}>
        <ClientContext.Provider value={{ client: this.sportsStateClient }}>
          {this.props.children}
        </ClientContext.Provider>
      </ApolloProvider>
    );
  }
}
