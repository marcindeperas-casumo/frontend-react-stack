// @flow
import React, { useEffect, useState } from "react";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_LOGIN } from "Src/constants";
import { AppLiS } from "./AppLiS";
import { AppLoS } from "./AppLoS";
type Props = {
  onAppStarted: () => void,
  subscribeToUpdates: Function,
  unsubscribeToUpdates: Function,
  playerId: string,
  sessionId: string,
  isAuthenticatedHandshake: boolean,
  isAppHandshakeLoaded: Boolean,
};

export const App = (props: Props) => {
  const { onAppStarted, playerId, sessionId, isAuthenticatedHandshake } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isAuthenticatedHandshake);

    if (!isAuthenticatedHandshake) {
      onAppStarted();
      bridge.on(REACT_APP_EVENT_ON_LOGIN, () => {
        if (!isAuthenticated) {
          setIsAuthenticated(true);
          onAppStarted(); // refetch new handshake with session
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticatedHandshake]);

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

  return isAuthenticated ? <AppLiS /> : <AppLoS />;
};
