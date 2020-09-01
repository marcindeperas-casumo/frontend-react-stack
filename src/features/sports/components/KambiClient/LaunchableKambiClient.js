// @flow
import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import { propOr } from "ramda";
import * as A from "Types/apollo";
import { ErrorMessage } from "Components/ErrorMessage";
import { SESSION_TOUCH, LAUNCH_KAMBI_MUTATION } from "Models/apollo/mutations";
import { useUrlPrefix } from "Utils/hooks";
import { useKambiMarketFromUrlPrefix } from "Features/sports/hooks/useKambiMarketFromUrlPrefix";
import KambiClientSkeleton from "./KambiClientSkeleton";
import KambiClient from "./KambiClient";

export const LAUNCHABLE_KAMBI_CLIENT_QUERY = gql`
  query LaunchableKambiClientQuery {
    userHomepage
    kambiClientVisible @client
    isBetslipVisible @client
  }
`;

export default function LaunchableKambiClient() {
  const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
  const [mutateLaunchKambi, { loading, error, data }] = useMutation(
    LAUNCH_KAMBI_MUTATION
  );
  const urlPrefix = useUrlPrefix();

  useEffect(() => {
    mutateLaunchKambi();
  }, [mutateLaunchKambi]);

  const { kambiMarket, locale, currency } = useKambiMarketFromUrlPrefix(
    urlPrefix
  );

  const onNavigate = () =>
    // eslint-disable-next-line fp/no-mutation
    document.querySelectorAll(".scroll-y").forEach(el => (el.scrollTop = 0));

  const onLoginCompleted = () => setFirstLoadCompleted(true);

  const isKambiClientVisible = (
    kambiLaunchData: A.LaunchableKambiClientQuery
  ) => {
    return kambiLaunchData.kambiClientVisible && firstLoadCompleted;
  };

  if (error) {
    return <ErrorMessage />;
  }

  if (loading || !data || !data.launchKambi) {
    return <KambiClientSkeleton />;
  }

  const { clientBootstrapUrl, providerPlayerId, ticket } = data.launchKambi;

  return (
    <Query query={LAUNCHABLE_KAMBI_CLIENT_QUERY}>
      {/* eslint-disable-next-line no-shadow */}
      {({ data }: { data: ?A.LaunchableKambiClientQuery }) => {
        if (!data) {
          return null;
        }
        return (
          <Mutation mutation={SESSION_TOUCH}>
            {sessionTouch => (
              <>
                <KambiClient
                  isBetslipVisible={data.isBetslipVisible}
                  currency={currency}
                  market={kambiMarket}
                  locale={locale}
                  bootstrapUrl={clientBootstrapUrl}
                  playerId={providerPlayerId}
                  ticket={ticket}
                  homeRoute={propOr("", "userHomepage", data)}
                  onNavigate={onNavigate}
                  isHidden={!isKambiClientVisible(data)}
                  sessionKeepAlive={sessionTouch}
                  onLoginCompleted={onLoginCompleted}
                />
                {!firstLoadCompleted && <KambiClientSkeleton />}
              </>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
}
