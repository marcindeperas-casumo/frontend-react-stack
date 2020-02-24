// @flow
import React, { useEffect } from "react";
import LazyPortal from "Components/LazyPortal";
import { Router } from "Components/Router";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";
// import SportsLOS from "Features/sports/components/SportsLOS";
// import { useCrossCodebaseNavigation } from "Utils/hooks";
// import { ROUTE_IDS } from "Src/constants";
type Props = {
  onAppStarted: () => void,
  subscribeToUpdates: Function,
  unsubscribeToUpdates: Function,
  playerId: string,
  sessionId: string,
  isAuthenticated: boolean,
  isAppHandshakeLoaded: Boolean,
  activeComponents: Array<string>,
};

export const App = (props: Props) => {
  const { onAppStarted, playerId, sessionId } = props;

  useEffect(() => {
    onAppStarted();
  }, [onAppStarted]);

  useEffect(() => {
    if (playerId && sessionId) {
      props.subscribeToUpdates();

      return props.unsubscribeToUpdates;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerId, sessionId]);

  if (!props.isAppHandshakeLoaded) {
    return null;
  }

  if (!props.isAuthenticated) {
    return (
      <LazyPortal
        hostElementId="sports-los-portal"
        loader={() => import("Features/sports/components/SportsLOS")}
        fallback={<SportsShellSkeleton />}
        namedExport="SportsLOSContainer"
        props={props}
      />
    );
  }

  return (
    <>
      <Router></Router>
      <LazyPortal
        hostElementId="react-host-deposit-limits"
        loader={() =>
          import("Components/Compliance/DepositLimits/DepositLimitsView")
        }
        namedExport="DepositLimitsViewContainer"
      />
    </>
  );
};
