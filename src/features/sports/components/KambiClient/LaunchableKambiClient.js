// @flow
import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import { propOr, head } from "ramda";
import { useSelector } from "react-redux";
import { DEFAULT_KAMBI_MARKET } from "Features/sports/constants";
import { getKambiSupportedLanguage } from "Features/sports/kambi";
import { useLocale, useMarket } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import * as A from "Types/apollo";
import { ErrorMessage } from "Components/ErrorMessage";
import { SESSION_TOUCH, LAUNCH_KAMBI_MUTATION } from "Models/apollo/mutations";
import KambiClientSkeleton from "./KambiClientSkeleton";
import KambiClient from "./KambiClient";

export const LAUNCHABLE_KAMBI_CLIENT_QUERY = gql`
  query LaunchableKambiClientQuery {
    userHomepage
    kambiClientVisible @client
    isBetslipVisible @client
  }
`;

export function LaunchableKambiClient() {
  const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
  const market = useMarket();
  const locale = useLocale();
  const currency = useSelector(currencySelector);
  const kambiMarket =
    head(market.split("_")).toUpperCase() || DEFAULT_KAMBI_MARKET;
  const kambiLocale = getKambiSupportedLanguage(locale.replace("-", "_"));

  const [mutateLaunchKambi, { loading, error, data }] = useMutation(
    LAUNCH_KAMBI_MUTATION
  );

  useEffect(() => {
    mutateLaunchKambi();
  }, [mutateLaunchKambi]);

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

  if (loading || !data || !data.launchKambi || !currency || !kambiLocale) {
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
                  locale={kambiLocale}
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
