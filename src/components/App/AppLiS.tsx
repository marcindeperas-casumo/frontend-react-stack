import React, { useEffect, useState, useRef } from "react";
import LazyPortal from "Components/LazyPortal";
import { Router } from "Components/Router";
import { LazyPlayerPlayOkaySettings } from "Components/Router/routes/LazyPlayerPlayOkaySettings";
import { LazyCasinoGamesRTPLight } from "Components/CasinoGames";
import { LazyFooterTermsAndConditionsForBonuses } from "Components/Router/routes/LazyFooterTermsAndConditionsForBonuses";
import {
  subscribeToPusherEvent,
  unsubscribeFromPusherChannel,
} from "Services/PusherPubSubService";
import { usePusher } from "Utils/hooks";
import { PusherModal, PusherNotification } from "Components/Pusher";
import { PUSHER_CONSTANTS } from "Src/constants";

export const AppLiS = ({ sessionId }) => {
  const { pusher, fastTrackPlayerId } = usePusher(sessionId);
  const [pusherModalVisible, setPusherModalVisible] = useState(false);
  const [pusherData, setPusherData] = useState(null);
  const [isPageReady, setIsPageReady] = useState(false);
  const mounted = useRef<boolean>();

  const onPusherEvent = data => {
    setPusherData(data);
    setPusherModalVisible(true);
  };

  const hidePusherModal = () => {
    setPusherModalVisible(false);
  };

  useEffect(() => {
    if (!mounted.current && fastTrackPlayerId && pusher) {
      // TODO: replace with API endpoint once TRET-1231 is merged
      fetch("https://reqres.in/api/products/3").then(() => {
        setIsPageReady(true);
      });
      // eslint-disable-next-line fp/no-mutation
      mounted.current = true;
    }
  });

  useEffect(() => {
    const channelName = `${PUSHER_CONSTANTS.pusherChannelnamePrefix}${fastTrackPlayerId}`;
    if (fastTrackPlayerId && isPageReady) {
      subscribeToPusherEvent(
        pusher,
        channelName,
        PUSHER_CONSTANTS.pusherEvents,
        onPusherEvent
      );
    }
    return () => {
      unsubscribeFromPusherChannel(pusher, channelName);
    };
  }, [pusher, fastTrackPlayerId, isPageReady]);

  return (
    <React.StrictMode>
      <Router></Router>
      <LazyPortal
        hostElementId="react-host-deposit-limits"
        loader={() =>
          import("Components/Compliance/DepositLimits/DepositLimitsView")
        }
        namedExport="DepositLimitsViewContainer"
      />
      {pusherModalVisible && pusherData && (
        <PusherModal isOpen={pusherModalVisible} hideModal={hidePusherModal}>
          <PusherNotification pusherData={pusherData} />
        </PusherModal>
      )}
      <LazyPlayerPlayOkaySettings />
      <LazyCasinoGamesRTPLight />
      <LazyFooterTermsAndConditionsForBonuses />
    </React.StrictMode>
  );
};
