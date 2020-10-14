// @flow
import * as R from "ramda";
import * as React from "react";
import { useSelector } from "react-redux";
import cometd from "Models/cometd/cometd.service";
import { CHANNELS } from "Models/cometd/cometd.constants";
import { playerIdSelector } from "Models/handshake";
import { formatCurrency } from "Utils";
import { useLocale } from "Utils/hooks";

export type NotificationType =
  | "jackpot_win_mini"
  | "jackpot_win_major"
  | "jackpot_win_mega"
  | "community_jackpot_win";

const jackpotWinNotificationTypes: Array<NotificationType> = [
  "jackpot_win_mini",
  "jackpot_win_major",
  "jackpot_win_mega",
  "community_jackpot_win",
];
type CometdEvent = {
  data: {
    notificationAdded?: {
      category: "win",
      type: NotificationType,
      parameters: {
        amount: string, // ie. "100.01"
        currency: string,
        jackpotId: string,
      },
    },
  },
};
export function useJackpotsSubscription() {
  const locale = useLocale();
  // TODO: replace with actual functions after #1194 is merged
  const pauseGame = () => Promise.resolve();
  const resumeGame = () => Promise.resolve();
  const [jackpotAmount, setJackpotAmount] = React.useState(null);
  const [type, setType] = React.useState<?NotificationType>(null);
  const playerId = useSelector(playerIdSelector);
  const channel = `${CHANNELS.PLAYER}/${playerId}`;

  const subscriptionHandler = React.useCallback(
    async (event: CometdEvent) => {
      if (!event.data.notificationAdded) {
        return;
      }

      const notificationData = event.data.notificationAdded;
      if (R.any(R.equals(notificationData.type), jackpotWinNotificationTypes)) {
        return;
      }

      const { amount, currency } = notificationData.parameters;
      await pauseGame();

      setJackpotAmount(
        formatCurrency({
          currency,
          locale,
          value: parseFloat(amount),
        })
      );
      setType(notificationData.type);
    },
    [locale]
  );

  React.useEffect(() => {
    cometd.subscribe(channel, subscriptionHandler);

    return function cleanup() {
      cometd.unsubscribe(channel, subscriptionHandler);
    };
  }, [channel, subscriptionHandler]);

  const acknowledge = () => {
    setJackpotAmount(null);
    setType(null);
    resumeGame();
  };

  return {
    jackpotAmount,
    acknowledge,
    type,
  };
}
