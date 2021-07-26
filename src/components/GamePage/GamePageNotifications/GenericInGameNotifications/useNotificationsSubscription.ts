import * as React from "react";
import { useSelector } from "react-redux";
import cometd from "Models/cometd/cometd.service";
import { CHANNELS } from "Models/cometd/cometd.constants";
import { playerIdSelector } from "Models/handshake";

const handledNotifications = [
  "jackpot_contribution_cancelled",
  "jackpot_contribution_insufficient_funds",
];
export function useNotificationsSubscription() {
  const playerId = useSelector(playerIdSelector);
  const channel = `${CHANNELS.PLAYER}/${playerId}`;
  const [notification, notificationSet] = React.useState<string | undefined>();

  const subscriptionHandler = React.useCallback(
    (event: {
      data: {
        notificationAdded?: { type: string };
      };
    }) => {
      const notificationData = event.data.notificationAdded;

      if (handledNotifications.find(x => x === notificationData.type)) {
        notificationSet(notificationData.type);
      }
    },
    [notificationSet]
  );

  React.useEffect(() => {
    cometd.subscribe(channel, subscriptionHandler);
    return function cleanup() {
      cometd.unsubscribe(channel, subscriptionHandler);
    };
  }, [channel, subscriptionHandler]);

  return notification;
}
