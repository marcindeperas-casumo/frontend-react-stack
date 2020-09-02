// @flow
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import type { NavigateClient } from "Types/apollo";
import { NAVIGATE_CLIENT_MUTATION } from "Models/apollo/mutations";

export type NavigateToSportsHashType = {
  client: ApolloClient<InMemoryCache>,
  path: ?string,
  trackingLocation: string,
};

export type NavigateByIdType = {
  routeId: string,
  params?: Object,
};

export const navigateToSportsHash = ({
  client,
  path,
  trackingLocation,
}: NavigateToSportsHashType) => {
  client.mutate<NavigateClient>({
    mutation: NAVIGATE_CLIENT_MUTATION,
    variables: {
      path,
      trackingLocation: "CuratedCard",
    },
  });
};
