// @flow
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import { isMobile } from "@casumo/is-mobile";
import { DEVICES } from "Src/constants";
import {
  marketSelector,
  currencySelector,
  sessionIdSelector,
  languageSelector,
} from "Models/handshake";
import config from "Src/config";
import reduxStore from "Services/reduxStore";
import { getDeveloperOptions } from "Utils/developerOptions";
import { isIosNative, getAppVersion } from "Utils";
import introspectionQueryResultData from "./introspections.json";
import { clientResolvers } from "./clientResolvers";
import { typeDefs } from "./typedefs";
import { defaultState } from "./apollo.client.defaultState";

export type ApolloClientType = ApolloClient<InMemoryCache>;

export const apolloClient = getApolloClient();

const { showDisabledGames } = getDeveloperOptions();
const device = !isMobile(window) ? DEVICES.DESKTOP : DEVICES.MOBILE;

export function getApolloClient(): ApolloClientType {
  return new ApolloClient({
    link: getLinks(),
    cache: getCache(),
    typeDefs,
    resolvers: clientResolvers,
  });
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export function getCache() {
  const cache = new InMemoryCache({ fragmentMatcher });

  cache.writeData({
    data: defaultState,
  });

  return cache;
}

function getContextLink() {
  return setContext(() => {
    const state = reduxStore.getState();
    const market = marketSelector(state);
    const currency = currencySelector(state);
    const sessionId = sessionIdSelector(state);
    const supportForPersistedQueries = {
      includeExtensions: true,
      includeQuery: true,
    };

    return {
      http: supportForPersistedQueries,
      headers: {
        "X-Token": sessionId,
        "X-Market": market,
        "X-Currency": currency,
        "X-Request-Features": showDisabledGames ? "HIDDEN_GAMES" : null,
        "X-Request-Device": device,
        ...(isIosNative() && {
          "X-Request-Client-Details": getAppVersion(),
        }),
      },
    };
  });
}

function getHttpLink() {
  return new HttpLink({
    uri: config.graphqlUrl,
    credentials: "same-origin",
    useGETForQueries: true,
    fetch: getFetchExtendedWithMarketAndLocale(),
  });
}

function getLinks() {
  const LINKS = [getContextLink(), getHttpLink()];

  return ApolloLink.from(LINKS);
}

// Adding these variables to the URL and using GET requests can help with edge caching
// in CDN, for example in CloudFlare.
function getFetchExtendedWithMarketAndLocale() {
  return (uri, options) => {
    const state = reduxStore.getState();
    const market = marketSelector(state);
    const locale = languageSelector(state);
    const url = new URL(uri, window.location.origin);

    url.searchParams.append("market", market);
    url.searchParams.append("locale", locale);

    return fetch(url, options);
  };
}
