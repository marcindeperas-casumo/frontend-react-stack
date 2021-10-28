import React, { useEffect, useState } from "react";
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
import { PusherModal, PusherNotif } from "Components/Pusher";

export const AppLiS = ({ sessionId }) => {
  const { pusher, fastTrackPlayerId } = usePusher(sessionId);
  const [pusherModalVisible, setPusherModalVisible] = useState(false);
  const [pusherData, setPusherData] = useState(null);

  const onPusherEvent = data => {
    setPusherData(data);
    setPusherModalVisible(true);
  };

  const hidePusherModal = () => {
    setPusherModalVisible(false);
  };
  useEffect(() => {
    const channelName = `private-prisma-16-${fastTrackPlayerId}`;
    const pusherEvents = [
      "crm_campaign",
      "system_alerts",
      "player_message",
      "fraud_kyc",
    ];
    if (fastTrackPlayerId) {
      subscribeToPusherEvent(pusher, channelName, pusherEvents, onPusherEvent);
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
          <PusherNotif pusherData={pusherData} />
        </PusherModal>
      )}
      <LazyPlayerPlayOkaySettings />
      <LazyCasinoGamesRTPLight />
      <LazyFooterTermsAndConditionsForBonuses />
    </React.StrictMode>
  );
};
