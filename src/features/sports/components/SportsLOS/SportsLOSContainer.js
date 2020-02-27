// @flow
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import type { ExecutionResult } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { LAUNCH_KAMBI_LOS_MUTATION } from "Models/apollo/mutations";
import KambiClient from "Features/sports/components/KambiClient/KambiClient";
import SportsHashWatcher from "Components/HashWatcher";
import { SportsNav } from "Features/sports/components/SportsNav";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";
import { useLanguage } from "Utils/hooks";

export type LaunchKambiType = ExecutionResult<A.LaunchKambiLoS>;

export const SportsLOSContainer = () => {
  const [bootstrapUrl, setBootstrapUrl] = useState(null);
  const [launchKambi] = useMutation<A.LaunchKambiLoS, { playForFun: boolean }>(
    LAUNCH_KAMBI_LOS_MUTATION
  );
  const language = useLanguage();

  React.useEffect(() => {
    launchKambi({ variables: { playForFun: true } }).then(({ data }) => {
      if (
        !bootstrapUrl &&
        data &&
        data.launchKambi &&
        data.launchKambi.clientBootstrapUrl
      ) {
        setBootstrapUrl(data.launchKambi.clientBootstrapUrl);
      }
    });
  }, [bootstrapUrl, launchKambi]);

  if (!language || !bootstrapUrl) {
    return <SportsShellSkeleton />;
  }

  return (
    <>
      <SportsHashWatcher>
        {({ currentHash }) => (
          <div className="t-background-chrome-light-2">
            <SportsNav currentHash={currentHash} />
          </div>
        )}
      </SportsHashWatcher>
      <KambiClient
        currency={"GBP"}
        market={"GB"}
        locale={`${language}_GB`}
        bootstrapUrl={bootstrapUrl}
        ticket={""}
        // $FlowFixMe
        sessionKeepAlive={() => {}}
      />
    </>
  );
};
