// @flow
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { LAUNCH_KAMBI_LOS_MUTATION } from "Models/apollo/mutations";
import KambiClient from "Features/sports/components/KambiClient/KambiClient";
import SportsHashWatcher from "Components/HashWatcher";
import { SportsNav } from "Features/sports/components/SportsNav";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";
import { useLanguage } from "Utils/hooks";

export const SportsLoSContainer = () => {
  const [bootstrapUrl, setBootstrapUrl] = useState(null);
  const [launchKambi, { data }] = useMutation<
    A.LaunchKambiLoS,
    A.LaunchKambiLoSVariables
  >(LAUNCH_KAMBI_LOS_MUTATION);

  const language = useLanguage();

  useEffect(() => {
    if (!bootstrapUrl) {
      launchKambi({ variables: { playForFun: true } });
      if (data && data.launchKambi) {
        setBootstrapUrl(data.launchKambi.clientBootstrapUrl);
      }
    }
  }, [bootstrapUrl, data, launchKambi]);

  if (!language || !bootstrapUrl) {
    return <SportsShellSkeleton />;
  }

  return (
    <div className="t-background-chrome-light-2">
      <SportsHashWatcher>
        {({ currentHash }) => <SportsNav currentHash={currentHash} />}
      </SportsHashWatcher>
      <KambiClient
        currency={"GBP"}
        market={"GB"}
        locale={`${language}_GB`}
        bootstrapUrl={bootstrapUrl}
        homeRoute={"#filter/football"}
      />
    </div>
  );
};
