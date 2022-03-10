import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { last } from "ramda";
import { useSelector } from "react-redux";
import { getKambiSupportedLanguage } from "Features/sports/kambi";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import { ErrorMessage } from "Components/ErrorMessage";
import { SESSION_TOUCH } from "Models/apollo/mutations";
import { LAUNCHABLE_KAMBI_CLIENT_QUERY } from "Models/apollo/queries";
import { SPORTS_HOME_PAGE_PATH } from "Features/sports/components/SportsNav/sportsNavUtils";
import { isMobile } from "Components/ResponsiveLayout";
import KambiClientSkeleton from "./KambiClientSkeleton";
import KambiClient from "./KambiClient";
import KambiClientService from "./KambiClient.service";
import { LaunchableKambiClientData } from "./types";
import {
  KAMBI_CLIENT_DESKTOP,
  KAMBI_CLIENT_MOBILE,
} from "./KambiClient.constants";

export function LaunchableKambiClient() {
  const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
  const [kambiMarket, setKambiMarket] = useState("GB");
  const [kambiLocale, setKambiLocale] = useState("en_GB");

  const locale = useLocale();
  const currency = useSelector(currencySelector);

  const { data: kambiData } = useQuery(LAUNCHABLE_KAMBI_CLIENT_QUERY);
  const [mutateSessionTouch] = useMutation(SESSION_TOUCH);

  const [data, setKambiLaunchData] = useState<LaunchableKambiClientData>(null);

  useEffect(() => {
    const fetchKambiLaunchClient = async () => {
      const kambiLaunchClientData = await KambiClientService.getKambiClientLaunchSports(
        isMobile() ? KAMBI_CLIENT_MOBILE : KAMBI_CLIENT_DESKTOP
      );

      if (kambiLaunchClientData?.data) {
        setKambiLaunchData(kambiLaunchClientData.data);
      } else {
        return <ErrorMessage />;
      }
    };
    fetchKambiLaunchClient();
  }, []);

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
  const isKambiClientVisible = () =>
    kambiData.kambiClientVisible && firstLoadCompleted;

  if (!data || !currency || !kambiLocale || !kambiMarket || !kambiData) {
    return <KambiClientSkeleton />;
  }

  const { bootstrapUrl, providerPlayerId, ticket } = data;

  return (
    <>
      <KambiClient
        isBetslipVisible={kambiData.isBetslipVisible}
        currency={currency}
        market={kambiMarket.toUpperCase()}
        locale={kambiLocale}
        bootstrapUrl={bootstrapUrl}
        playerId={providerPlayerId}
        ticket={ticket}
        homeRoute={SPORTS_HOME_PAGE_PATH}
        onNavigate={onNavigate}
        isHidden={!isKambiClientVisible()}
        sessionKeepAlive={mutateSessionTouch}
        onLoginCompleted={onLoginCompleted}
        onOddsFormatChangeAction={undefined}
        showSelfExcludedModal={undefined}
      />
      {!firstLoadCompleted && <KambiClientSkeleton />}
    </>
  );
}
