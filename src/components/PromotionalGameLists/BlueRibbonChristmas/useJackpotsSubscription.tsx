import * as React from "react";
import { useSelector } from "react-redux";
import type { PauseResumeProps } from "Components/Compliance/PlayOkayBar/PlayOkayBarContainer";
import cometd from "Models/cometd/cometd.service";
import { CHANNELS } from "Models/cometd/cometd.constants";
import { playerIdSelector } from "Models/handshake";
import { useLocale } from "Utils/hooks";
import { useGameJackpotContext } from "Components/GamePage/Contexts";
import { TCurrencyCode } from "Src/constants";
import { WALLET_BONUS_UNBLOCK_AFTER } from "Models/playing/playing.constants";

type JackpotWinParameters = {
  amount: string; // ie. "100.01"
  currency: TCurrencyCode;
  jackpotId: string;
  is_main_winner: boolean;
  jackpot_id: string;
  jackpot_slug: string;
  pot_key: string;
};

type CometdEvent = {
  data: {
    notificationAdded?: {
      category: "win";
      type: string;
      parameters: JackpotWinParameters;
    };
  };
};

const acceptedNotificationType = "jackpot_win";

export function useJackpotsSubscription({
  pauseGame,
  resumeGame,
}: PauseResumeProps) {
  const locale = useLocale();
  // TODO: replace with actual functions after #1194 is merged
  const [
    jackpotWinParams,
    setJackpotWinParams,
  ] = React.useState<JackpotWinParameters>(null);
  const playerId = useSelector(playerIdSelector);
  const channel = `${CHANNELS.PLAYER}/${playerId}`;
  const { setBlueRibbonNotificationNeedsAccepting } = useGameJackpotContext();
  const subscriptionHandler = React.useCallback(
    async (event: CometdEvent) => {
      const notificationData = event.data.notificationAdded;

      if (
        !(
          event.data.notificationAdded &&
          notificationData.type === acceptedNotificationType
        )
      ) {
        return null;
      }

      setJackpotWinParams(notificationData.parameters);

      setTimeout(() => {
        setBlueRibbonNotificationNeedsAccepting(false);
      }, WALLET_BONUS_UNBLOCK_AFTER);

      await pauseGame();
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
    setJackpotWinParams(null);

    resumeGame();
  };

  return {
    params: jackpotWinParams,
    acknowledge,
  };
}
