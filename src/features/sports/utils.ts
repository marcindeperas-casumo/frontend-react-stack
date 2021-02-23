// @flow
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import type { NavigateClient } from "Types/apollo";
import { NAVIGATE_CLIENT_MUTATION } from "Models/apollo/mutations";
import { navigateById } from "Services/NavigationService";

export type NavigateToSportsHashType = {
  client: ApolloClient<InMemoryCache>,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  path: ?string,
  trackingLocation: string,
};

export type NavigateByIdType = {
  routeId: string,
  params?: Object,
  queryParams?: Object,
};

export const navigateToDeposit = () => {
  const redirectUrl = window.location.href.substr(
    window.location.origin.length + 1
  );

  navigateById({
    routeId: "deposit",
    queryParams: {
      redirectionUrl: redirectUrl,
    },
  });
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
