// @flow
import React, { useEffect } from "react";
import { Settings } from "luxon";
import LazyPortal from "Components/LazyPortal";
import { Router } from "Components/Router";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";

type Props = {
  onAppStarted: () => void,
  subscribeToUpdates: Function,
  unsubscribeToUpdates: Function,
  playerId: string,
  sessionId: string,
  locale: string,
  isAuthenticated: boolean,
  isAppHandshakeLoaded: Boolean,
  activeComponents: Array<string>,
};

export const App = (props: Props) => {
  const { onAppStarted, playerId, sessionId, locale } = props;
  const { navigateToKO } = useCrossCodebaseNavigation();

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

  useEffect(() => {
    if (locale) {
      // eslint-disable-next-line fp/no-mutation
      Settings.defaultLocale = locale;
    }
  });

  if (!props.isAppHandshakeLoaded) {
    return null;
  }

  if (!props.isAuthenticated) {
    navigateToKO(ROUTE_IDS.LOGIN);
    return null;
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
