import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import type { NavigateClientMutation } from "Types/apollo";
import { NAVIGATE_CLIENT_MUTATION } from "Models/apollo/mutations";

export type NavigateToSportsHashType = {
  client: ApolloClient<InMemoryCache>;
  path: string | undefined;
  trackingLocation: string;
};

export type NavigateByIdType = {
  routeId: string;
  params?: Object;
  queryParams?: Object;
};

export const navigateToSportsHash = ({
  client,
  path,
  trackingLocation,
}: NavigateToSportsHashType) => {
  client.mutate<NavigateClientMutation>({
    mutation: NAVIGATE_CLIENT_MUTATION,
    variables: {
      path,
      trackingLocation: "CuratedCard",
    },
  });
};
