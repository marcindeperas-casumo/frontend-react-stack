import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { InMemoryCache } from "@apollo/client/cache";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";
import { isMobile } from "@casumo/is-mobile";
import { DEVICES } from "Src/constants";
import {
  marketSelector,
  currencySelector,
  sessionIdSelector,
  languageSelector,
  emailSelector,
} from "Models/handshake";
import config from "Src/config";
import reduxStore from "Services/reduxStore";
import { getDeveloperOptions } from "Utils/developerOptions";
import { getAppVersion, isEmbeddedOn, mergeGetGamesPaginated } from "Utils";
import * as queries from "Models/apollo/queries.sports";
import introspectionsData from "Types/introspections.json";
import { clientResolvers } from "./clientResolvers";
import { typeDefs } from "./typedefs";

export type ApolloClientType = ApolloClient<InMemoryCache>;

export const apolloClientPromise = getApolloClient();

const { showDisabledGames } = getDeveloperOptions();
const device = !isMobile(window) ? DEVICES.DESKTOP : DEVICES.MOBILE;

export async function getApolloClient(): Promise<ApolloClientType> {
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'ApolloClient<NormalizedCacheObject>' is not ... Remove this comment to see the full error message
  return new ApolloClient({
    link: getLinks(),
    cache: await getCache(),
    typeDefs,
    resolvers: clientResolvers,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
      query: {
        fetchPolicy: "cache-first",
      },
    },
    connectToDevTools: __DEV__,
  });
}

export async function getCache() {
  const cache = new InMemoryCache({
    ...introspectionsData,
    typePolicies: {
      Query: {
        fields: {
          getGamesPaginated: {
            // In case of this query variable "query" contains filters and
            // order. We have to create new cache entry for each "query",
            // to ensure that different requests won't be joined together.
            //
            // "keyArgs" takes function that returns string, it is called for
            // every response and it creates cache entity for each uniq value.
            keyArgs: (_, { variables }) => variables.query,
            // This function is called only with the content belonging to
            // the same cache entity. You shouldn't need any additional checks.
            merge: mergeGetGamesPaginated,
          },
        },
      },
    },
  });

  // https://www.apollographql.com/docs/react/api/cache/InMemoryCache
  // write default state in cache, is the right place?
  await cache.writeQuery({
    query: queries.SportsShellQuery,
    data: {
      isSearchVisible: false,
      hasSelectedFavourites: false,
    },
  });
  await cache.writeQuery({
    query: queries.LAUNCHABLE_KAMBI_CLIENT_QUERY,
    data: {
      userHomepage: "home",
      isBetslipVisible: true,
      kambiClientVisible: true,
    },
  });
  await cache.writeQuery({
    query: queries.ACTIVE_MODALS_QUERY,
    data: {
      activeModals: [],
    },
  });

  return cache;
}

function getContextLink() {
  return setContext(() => {
    const state = reduxStore.getState();
    const market = marketSelector(state);
    const currency = currencySelector(state);
    const sessionId = sessionIdSelector(state);

    return {
      headers: {
        "X-Token": sessionId,
        "X-Market": market,
        "X-Currency": currency,
        "X-Request-Features": showDisabledGames ? "HIDDEN_GAMES" : null,
        "X-Request-Device": device,
        ...(isEmbeddedOn(emailSelector(state))
          ? {
              "X-Request-Client-Details": getAppVersion(),
            }
          : {}),
      },
    };
  });
}

function getHttpLink() {
  return new HttpLink({
    uri: config.graphqlUrl,
    credentials: "same-origin",
    useGETForQueries: false,
    fetch: getFetchExtendedWithMarketAndLocale(),
  });
}

function getLinks() {
  const LINKS = [
    createPersistedQueryLink({ useGETForHashedQueries: true, sha256 }),
    getContextLink(),
    getHttpLink(),
  ];

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

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'URL' is not assignable to parame... Remove this comment to see the full error message
    return fetch(url, options);
  };
}
