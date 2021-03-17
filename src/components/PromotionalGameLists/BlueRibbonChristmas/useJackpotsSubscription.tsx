import * as R from "ramda";
import * as React from "react";
import { useSelector } from "react-redux";
import type { PauseResumeProps } from "Components/Compliance/PlayOkayBar/PlayOkayBarContainer";
import cometd from "Models/cometd/cometd.service";
import { CHANNELS } from "Models/cometd/cometd.constants";
import { playerIdSelector } from "Models/handshake";
import { formatCurrency } from "Utils";
import { useLocale } from "Utils/hooks";
import { useGameJackpotStatusContext } from "Components/GamePage/Contexts";
import { WALLET_BONUS_UNBLOCK_AFTER } from "../../../models/playing/playing.constants";

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
      category: "win";
      type: NotificationType;
      parameters: {
        amount: string; // ie. "100.01"
        currency: string;
        jackpotId: string;
      };
    };
  };
};

export function useJackpotsSubscription({
  pauseGame,
  resumeGame,
}: PauseResumeProps) {
  const locale = useLocale();
  // TODO: replace with actual functions after #1194 is merged
  const [jackpotAmount, setJackpotAmount] = React.useState(null);
  const [jackpotAmountRaw, setJackpotAmountRaw] = React.useState(null);
  const [type, setType] = React.useState<NotificationType | null>(null);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const playerId = useSelector(playerIdSelector);
  const channel = `${CHANNELS.PLAYER}/${playerId}`;
  const {
    setBlueRibbonNotificationNeedsAccepting,
  } = useGameJackpotStatusContext();

  const subscriptionHandler = React.useCallback(
    async (event: CometdEvent) => {
      if (!event.data.notificationAdded) {
        return;
      }

      const notificationData = event.data.notificationAdded;
      if (
        R.none(R.equals(notificationData.type), jackpotWinNotificationTypes)
      ) {
        return;
      }
      // Set setBlueRibbonNotificationNeedsAccepting to true until user clicks CTA on br full screen notification
      // this avoids balance from updating before notification shows
      setBlueRibbonNotificationNeedsAccepting(true);

      // Wallet Balance Update fallback - set setBlueRibbonNotificationNeedsAccepting to false, in case br modal never shows aka user never clicks CTA
      setTimeout(() => {
        setBlueRibbonNotificationNeedsAccepting(false);
      }, WALLET_BONUS_UNBLOCK_AFTER);
      const { amount, currency } = notificationData.parameters;
      await pauseGame();

      setIsFullScreen(
        R.any(R.equals(notificationData.type), [
          "jackpot_win_mini",
          "jackpot_win_major",
          "jackpot_win_mega",
        ])
      );
      setJackpotAmount(
        formatCurrency({
          currency,
          locale,
          value: parseFloat(amount),
        })
      );
      setJackpotAmountRaw(amount);
      setType(notificationData.type);
    },
    [locale, pauseGame, setBlueRibbonNotificationNeedsAccepting]
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
    jackpotAmountRaw,
    acknowledge,
    type,
    isFullScreen,
  };
}
