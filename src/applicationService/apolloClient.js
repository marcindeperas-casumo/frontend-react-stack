import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import {
  market as getMarket,
  currency as getCurrency,
  sessionId as getSessionId,
} from "Models/handshake";
import reduxStore from "Services/reduxStore";

const GRAPHQL_API_URL = "/graphql/casumo/";
const LINK_FUNCTIONS = [getContextLink, getHttpLink];

export default getApolloClient(reduxStore);

export function getApolloClient(store) {
  return new ApolloClient({
    link: getLinks(store),
    cache: new InMemoryCache(),
  });
}

function getContextLink(store) {
  return setContext(() => {
    const state = store.getState();
    const market = getMarket(state);
    const currency = getCurrency(state);
    const sessionId = getSessionId(state);

    return {
      headers: {
        "X-Token": sessionId,
        "X-Market": market,
        "X-Currency": currency,
      },
    };
  });
}

function getHttpLink() {
  return new HttpLink({
    uri: GRAPHQL_API_URL,
  });
}

function getLinks(store) {
  return ApolloLink.from(LINK_FUNCTIONS.map(fn => fn(store)));
}
