// @flow
import { useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import cometd from "Models/cometd/cometd.service";
import { CHANNELS } from "Models/cometd/cometd.constants";
import { playerIdSelector } from "Models/handshake";

type AdventurerEvent = {
  channel: string,
  data: {
    setPoints?: number,
    leveledUp?: number,
  },
};

type LevelUpCallback = any => any;
const noop = () => undefined;

export function usePlayerLevelUpEvent() {
  const playerId = useSelector(playerIdSelector);
  const channel = `${CHANNELS.ADVENTURE}/${playerId}`;
  const callback = useRef<LevelUpCallback>(noop);

  const setCallback = (cb: LevelUpCallback) => (callback.current = cb); // eslint-disable-line fp/no-mutation

  const subscriptionHandler = useCallback((event: AdventurerEvent) => {
    if (!event.data.leveledUp) {
      return;
    }

    callback.current();
  }, []);

  useEffect(() => {
    cometd.subscribe(channel, subscriptionHandler);

    return function cleanup() {
      cometd.unsubscribe(channel, subscriptionHandler);
    };
  }, [channel, subscriptionHandler]);

  return {
    setLevelUpCallback: setCallback,
  };
}
