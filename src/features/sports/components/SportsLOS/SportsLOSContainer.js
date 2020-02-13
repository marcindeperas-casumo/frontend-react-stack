// @flow
import React from "react";
import KambiClient from "Features/sports/components/KambiClient/KambiClient";
import SportsHashWatcher from "Components/HashWatcher";
import { SportsNav } from "Features/sports/components/SportsNav";
// import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";

export const SportsLOSContainer = () => {
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
        locale={"gb_GB"}
        bootstrapUrl={
          "https://cts-static.kambi.com/client/cauk/kambi-bootstrap.js"
        }
        ticket={""}
        // $FlowFixMe
        sessionKeepAlive={() => {}}
      />
    </>
  );
};
