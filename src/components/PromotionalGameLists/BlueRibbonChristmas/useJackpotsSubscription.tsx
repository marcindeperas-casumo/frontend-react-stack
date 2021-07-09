import * as React from "react";
import { useSelector } from "react-redux";
import type { PauseResumeProps } from "Components/Compliance/PlayOkayBar/PlayOkayBarContainer";
import cometd from "Models/cometd/cometd.service";
import { CHANNELS } from "Models/cometd/cometd.constants";
import { playerIdSelector } from "Models/handshake";
import { useLocale } from "Utils/hooks";
import { useGameJackpotContext } from "Components/GamePage/Contexts";
import { TCurrencyCode } from "Src/constants";

export type NotificationType =
  | "jackpot_win_mini"
  | "jackpot_win_major"
  | "jackpot_win_mega"
  | "community_jackpot_win";

type CometdEvent = {
  data: {
    notificationAdded?: {
      category: "win";
      type: NotificationType;
      parameters: {
        amount: string; // ie. "100.01"
        currency: TCurrencyCode;
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
  const [jackpotAmountRaw] = React.useState(null);
  const [type, setType] = React.useState<NotificationType | null>(null);
  const [isFullScreen] = React.useState(false);
  const playerId = useSelector(playerIdSelector);
  const channel = `${CHANNELS.PLAYER}/${playerId}`;
  const { setBlueRibbonNotificationNeedsAccepting } = useGameJackpotContext();

  const subscriptionHandler = React.useCallback(
    // eslint-disable-next-line require-await
    async (event: CometdEvent) => {
      // eslint-disable-next-line no-constant-condition
      if (true) {
        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
