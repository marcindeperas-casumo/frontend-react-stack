// @flow
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import {
  marketSelector,
  currencySelector,
  sessionIdSelector,
  languageSelector,
} from "Models/handshake";
import reduxStore from "Services/reduxStore";
import { clientResolvers } from "./clientResolvers";
import { typeDefs } from "./typedefs";
import { defaultState } from "./apollo.client.defaultState";

export type ApolloClientType = ApolloClient<InMemoryCache>;

const GRAPHQL_API_URL = "/graphql/casumo/";
const LINK_FUNCTIONS = [getContextLink, getHttpLink];

export const apolloClient = getApolloClient(reduxStore);

export function getApolloClient(store: any): ApolloClientType {
  return new ApolloClient({
    link: getLinks(store),
    cache: getCache(),
    typeDefs,
    resolvers: clientResolvers,
  });
}

function getCache() {
  const cache = new InMemoryCache();

  cache.writeData({
    data: defaultState,
  });

  return cache;
}

function getContextLink(store) {
  return setContext(() => {
    const state = store.getState();
    const market = marketSelector(state);
    const currency = currencySelector(state);
    const sessionId = sessionIdSelector(state);
    const supportForPersistedQueries = {
      includeExtensions: true,
      includeQuery: false,
    };

    return {
      http: supportForPersistedQueries,
      headers: {
        "X-Token": sessionId,
        "X-Market": market,
        "X-Currency": currency,
      },
    };
  });
}

function getHttpLink(store) {
  const state = store.getState();
  const market = marketSelector(state);
  const locale = languageSelector(state);

  return new HttpLink({
    uri: GRAPHQL_API_URL,
    credentials: "same-origin",
    useGETForQueries: true,
    fetch: getFetchExtendedWithMarketAndLocale(market, locale),
  });
}

function getLinks(store) {
  return ApolloLink.from(LINK_FUNCTIONS.map(fn => fn(store)));
}

// Adding these variables to the URL and using GET requests can help with edge caching
// in CDN, e.g. in CloudFlare.
function getFetchExtendedWithMarketAndLocale(market, locale) {
  return (uri, options) => {
    const url = new URL(uri, window.location.origin);

    url.searchParams.append("market", market);
    url.searchParams.append("locale", locale);

    return fetch(url, options);
  };
}
