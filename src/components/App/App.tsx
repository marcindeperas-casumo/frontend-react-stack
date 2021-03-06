import React, { useEffect, useState } from "react";
import bridge from "Src/DurandalReactBridge";
import {
  REACT_APP_EVENT_ON_LOGIN,
  REACT_APP_EVENT_PAYMENT_METHOD_SELECTED,
} from "Src/constants";
import logger from "Services/logger";
import { useGetPaymentsPermissionsQuery } from "Models/payments";
import { AppLiS } from "./AppLiS";
import { AppLoS } from "./AppLoS";

type Props = {
  onAppStarted: () => void;
  subscribeToUpdates: Function;
  unsubscribeToUpdates: Function;
  playerId: string;
  sessionId: string;
  isAuthenticatedHandshake: boolean;
  isAppHandshakeLoaded: Boolean;
};

export const App = (props: Props) => {
  const { onAppStarted, playerId, sessionId, isAuthenticatedHandshake } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(
    isAuthenticatedHandshake
  );
  useGetPaymentsPermissionsQuery();

  // IM-274: ephemeral fix rm localforage indexeddb
  useEffect(() => {
    try {
      (window.indexedDB as any).databases().then(dbs => {
        const lfdb = dbs.find(db => db.name === "localforage");
        if (lfdb) {
          window.indexedDB.deleteDatabase("localforage");
        }
      });
    } catch (e) {
      logger.error(e);
    }
  }, []);
  useEffect(() => {
    setIsAuthenticated(isAuthenticatedHandshake);
    if (!isAuthenticatedHandshake) {
      onAppStarted();
      bridge.on(REACT_APP_EVENT_ON_LOGIN, () => {
        if (!isAuthenticated) {
          setIsAuthenticated(true);
          onAppStarted(); // fetch new handshake with session
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticatedHandshake]);
  useEffect(() => {
    if (playerId && sessionId) {
      props.subscribeToUpdates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerId, sessionId]);
  useEffect(() => {
    bridge.on(REACT_APP_EVENT_PAYMENT_METHOD_SELECTED, minDepositAmount =>
      window.sessionStorage.setItem("paymentMinDepositAmount", minDepositAmount)
    );
  }, []);
  if (!props.isAppHandshakeLoaded) {
    return null;
  }
  return isAuthenticated ? (
    <AppLiS playerId={playerId} sessionId={sessionId} />
  ) : (
    <AppLoS />
  );
};
