// @flow
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { LAUNCH_KAMBI_LOS_MUTATION } from "Models/apollo/mutations";
import KambiClient from "Features/sports/components/KambiClient/KambiClient";
import SportsHashWatcher from "Components/HashWatcher";
import { SportsNav } from "Features/sports/components/SportsNav";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";
import { useKambiMarketFromUrlPrefix } from "Features/sports/hooks/useKambiMarketFromUrlPrefix";

export const SportsLoSContainer = ({ urlPrefix }: { urlPrefix: string }) => {
  const [bootstrapUrl, setBootstrapUrl] = useState("");
  const [currency, setCurrency] = useState("");
  const [launchKambi, { data }] = useMutation<
    A.LaunchKambiLoS,
    A.LaunchKambiLoSVariables
  >(LAUNCH_KAMBI_LOS_MUTATION);

  const { market, kambiMarket, locale } = useKambiMarketFromUrlPrefix(
    urlPrefix
  );

  useEffect(() => {
    if (market && launchKambi) {
      launchKambi({ variables: { playForFun: true, market } });
    }
  }, [launchKambi, market]);

  useEffect(() => {
    if (data && data.launchKambi && !bootstrapUrl) {
      const { clientBootstrapUrl, currency: marketCurrency } = data.launchKambi;
      setBootstrapUrl(clientBootstrapUrl);
      marketCurrency && setCurrency(marketCurrency);
    }
  }, [bootstrapUrl, data]);

  if (!bootstrapUrl || !currency) {
    return <SportsShellSkeleton />;
  }

  return (
    <div className="t-background-chrome-light-2">
      <SportsHashWatcher>
        {({ currentHash }) => <SportsNav currentHash={currentHash} />}
      </SportsHashWatcher>
      <KambiClient
        currency={currency}
        market={kambiMarket}
        locale={locale}
        bootstrapUrl={bootstrapUrl}
        homeRoute={"#filter/football"}
      />
    </div>
  );
};
