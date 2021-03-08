import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import cometd from "Models/cometd/cometd.service";
import { CHANNELS } from "Models/cometd/cometd.constants";
import { playerIdSelector } from "Models/handshake";

type AdventurerEvent = {
  channel: string;
  data: {
    setPoints?: number;
    leveledUp?: number;
  };
};

export type LevelUpCallback = () => any;

export function usePlayerLevelUpEvent(callback: LevelUpCallback) {
  const playerId = useSelector(playerIdSelector);
  const channel = `${CHANNELS.ADVENTURE}/${playerId}`;

  const subscriptionHandler = useCallback(
    (event: AdventurerEvent) => {
      if (!event.data.leveledUp) {
        return;
      }

      callback();
    },
    [callback]
  );

  useEffect(() => {
    cometd.subscribe(channel, subscriptionHandler);

    return function cleanup() {
      cometd.unsubscribe(channel, subscriptionHandler);
    };
  }, [channel, subscriptionHandler]);
}
