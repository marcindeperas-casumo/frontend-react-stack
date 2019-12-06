// @flow
import React, { useEffect } from "react";
import LazyPortal from "Components/LazyPortal";
import { Router, ROUTE_IDS, redirectToTranslatedUrl } from "Components/Router";

type Props = {
  onAppStarted: () => void,
  subscribeToUpdates: Function,
  unsubscribeToUpdates: Function,
  playerId: string,
  sessionId: string,
  language: string,
  market: string,
  isAuthenticated: boolean,
  isAppHandshakeLoaded: Boolean,
  activeComponents: Array<string>,
  routeParams: Array<Object>,
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

  if (props.isAppHandshakeLoaded && !props.isAuthenticated) {
    redirectToTranslatedUrl(props.language, ROUTE_IDS.LOGIN);
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
