// @flow
import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { last } from "ramda";
import { useSelector } from "react-redux";
import { getKambiSupportedLanguage } from "Features/sports/kambi";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import * as A from "Types/apollo";
import { ErrorMessage } from "Components/ErrorMessage";
import { SESSION_TOUCH, LAUNCH_KAMBI_MUTATION } from "Models/apollo/mutations";
import { SPORTS_HOME_PAGE_PATH } from "Features/sports/components/SportsNav/sportsNavUtils";
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
  const [kambiMarket, setKambiMarket] = useState("GB");
  const [kambiLocale, setKambiLocale] = useState("en_GB");

  const locale = useLocale();
  const currency = useSelector(currencySelector);

  const [mutateLaunchKambi, { loading, error, data }] = useMutation(
    LAUNCH_KAMBI_MUTATION
  );
  const { data: kambiData } = useQuery(LAUNCHABLE_KAMBI_CLIENT_QUERY);
  const [mutateSessionTouch] = useMutation(SESSION_TOUCH);

  useEffect(() => {
    mutateLaunchKambi();
  }, [mutateLaunchKambi]);

  useEffect(() => {
    if (locale) {
      setKambiMarket(last(locale.split("-")));
      setKambiLocale(getKambiSupportedLanguage(locale.replace("-", "_")));
    }
  }, [locale]);

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
    !kambiData
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
        homeRoute={SPORTS_HOME_PAGE_PATH}
        onNavigate={onNavigate}
        isHidden={!isKambiClientVisible(kambiData)}
        sessionKeepAlive={mutateSessionTouch}
        onLoginCompleted={onLoginCompleted}
      />
      {!firstLoadCompleted && <KambiClientSkeleton />}
    </>
  );
}
