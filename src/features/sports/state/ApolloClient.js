/* @flow */
import * as React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { withClientState } from "apollo-link-state";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
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

    const persistedQueryLink = createPersistedQueryLink();

    const httpLink = persistedQueryLink.concat(
      new HttpLink({
        uri: "/api/sports-gateway/",
        credentials: "same-origin",
        useGETForQueries: true,
        fetch: (uri, options) => {
          const url = new URL(uri, window.location.origin);

          // Apply language and market to query params to help with edge caching
          url.searchParams.append("market", this.props.market);
          url.searchParams.append("locale", this.props.locale);

          return fetch(url, options);
        },
      })
    );

    const clientStateLink = withClientState({
      ...clientState,
      cache,
    });

    // Pass default locale and market so we do not have to pass these in each query.
    // These are available in the context of the apollo server for all resolvers to use
    const contextLink = setContext(() => {
      return {
        headers: {
          kambiMarket: props.market,
          kambiLocale: props.locale,
          "X-Token": props.sessionId,
        },
        http: {
          includeExtensions: true,
          includeQuery: false,
        },
      };
    });

    this.sportsStateClient = new ApolloClient<InMemoryCache>({
      link: ApolloLink.from([
        persistedQueryLink,
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
