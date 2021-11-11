import React, { useEffect, useState } from "react";
import LazyPortal from "Components/LazyPortal";
import { Router } from "Components/Router";
import { LazyPlayerPlayOkaySettings } from "Components/Router/routes/LazyPlayerPlayOkaySettings";
import { LazyCasinoGamesRTPLight } from "Components/CasinoGames";
import { LazyFooterTermsAndConditionsForBonuses } from "Components/Router/routes/LazyFooterTermsAndConditionsForBonuses";
import {
  setPageLoaded,
  subscribeToPusherEvent,
  unsubscribeFromPusherChannel,
} from "Services/PusherPubSubService";
import { usePusher } from "Utils/hooks";
import { PusherModal, PusherNotification } from "Components/Pusher";
import { PUSHER_CONSTANTS } from "Src/constants";
import logger from "Services/logger";

export const AppLiS = ({ sessionId, playerId }) => {
  const { pusher, fastTrackPlayerId } = usePusher(sessionId);
  const [pusherModalVisible, setPusherModalVisible] = useState(false);
  const [pusherData, setPusherData] = useState(null);
  const [isPageReady, setIsPageReady] = useState(false);

  const onPusherEvent = data => {
    if (data.subscribed) {
      setIsPageReady(true);
      return;
    }
    setPusherData(data);
    setPusherModalVisible(true);
  };

  const hidePusherModal = () => {
    setPusherModalVisible(false);
  };

  useEffect(() => {
    if (isPageReady) {
      setPageLoaded(sessionId, playerId).then(() => {
        logger.info("app ready for pusher events");
      });
    }
  }, [isPageReady, sessionId, playerId]);

  useEffect(() => {
    const channelName = `${PUSHER_CONSTANTS.pusherChannelnamePrefix}${fastTrackPlayerId}`;
    if (fastTrackPlayerId && pusher) {
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
  }, [pusher, fastTrackPlayerId]);

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
