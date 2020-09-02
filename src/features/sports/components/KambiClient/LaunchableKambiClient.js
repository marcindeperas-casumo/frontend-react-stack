// @flow
import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { propOr } from "ramda";
import { useSelector } from "react-redux";
import { DEFAULT_KAMBI_MARKET } from "Features/sports/constants";
import { getKambiSupportedLanguage } from "Features/sports/kambi";
import { useLocale } from "Utils/hooks";
import { currencySelector, countrySelector } from "Models/handshake";
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
  const locale = useLocale();
  const currency = useSelector(currencySelector);
  const kambiMarket = useSelector(countrySelector) || DEFAULT_KAMBI_MARKET;
  const kambiLocale = getKambiSupportedLanguage(locale.replace("-", "_"));

  const [mutateLaunchKambi, { loading, error, data }] = useMutation(
    LAUNCH_KAMBI_MUTATION
  );
  const { data: kambiData } = useQuery(LAUNCHABLE_KAMBI_CLIENT_QUERY);
  const [mutateSessionTouch, { data: sessionTouchData }] = useMutation(
    SESSION_TOUCH
  );

  useEffect(() => {
    mutateLaunchKambi();
  }, [mutateLaunchKambi]);

  useEffect(() => {
    if (data) {
      mutateSessionTouch();
    }
  }, [data, mutateSessionTouch]);

  const onNavigate = () =>
    // eslint-disable-next-line fp/no-mutation
    document.querySelectorAll(".scroll-y").forEach(el => (el.scrollTop = 0));
  const onLoginCompleted = () => setFirstLoadCompleted(true);
  const isKambiClientVisible = (
    kambiLaunchData: A.LaunchableKambiClientQuery
  ) => kambiLaunchData.kambiClientVisible && firstLoadCompleted;

  if (error) {
    return <ErrorMessage />;
  }

  if (
    loading ||
    !data ||
    !data.launchKambi ||
    !currency ||
    !kambiLocale ||
    !kambiMarket ||
    !kambiData ||
    !sessionTouchData
  ) {
    return <KambiClientSkeleton />;
  }

  const { clientBootstrapUrl, providerPlayerId, ticket } = data.launchKambi;

  return (
    <>
      <KambiClient
        isBetslipVisible={kambiData.isBetslipVisible}
        currency={currency}
        market={kambiMarket.toUpperCase()}
        locale={kambiLocale}
        bootstrapUrl={clientBootstrapUrl}
        playerId={providerPlayerId}
        ticket={ticket}
        homeRoute={propOr("", "userHomepage", kambiData)}
        onNavigate={onNavigate}
        isHidden={!isKambiClientVisible(kambiData)}
        sessionKeepAlive={sessionTouchData.sessionTouch}
        onLoginCompleted={onLoginCompleted}
      />
      {!firstLoadCompleted && <KambiClientSkeleton />}
    </>
  );
}
