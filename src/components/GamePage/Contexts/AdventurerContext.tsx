import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerIdSelector, sessionIdSelector } from "Models/handshake";
import {
  usePlayerLevelUpEvent,
  usePlayerReceivedValuableEvent,
} from "Utils/hooks";
import type { LevelUpCallback } from "Utils/hooks/usePlayerLevelUpEvent";
import { adventurerSelector, initAdventurerSaga } from "Models/adventure";
import type { BeltType } from "Models/adventure";
import {
  subscribeToAdventureUpdates,
  unsubscribeFromAdventureUpdates,
} from "Models/cometd";

type TAdventurerContextProviderProps = {
  children: React.ReactNode;
};

type TAdventurerContext = {
  level: number;
  points: number;
  pointsRequiredForNextLevel: number;
  progressPercentage: number;
  rawProgressPercentage: number;
  inBonusMode: boolean;
  belt: BeltType;
  onLevelUp: LevelUpCallback;
  recentValuable: string | undefined;
};

export const AdventurerContext = React.createContext<TAdventurerContext>({
  level: 1,
  points: 0,
  pointsRequiredForNextLevel: 100,
  progressPercentage: 0,
  rawProgressPercentage: 0,
  inBonusMode: false,
  belt: "rope",
  // @ts-expect-error ts-migrate(2322) FIXME: Type '(callback: LevelUpCallback) => void' is not ... Remove this comment to see the full error message
  onLevelUp: usePlayerLevelUpEvent,
  recentValuable: null,
});

export const AdventurerContextProvider = ({
  children,
}: TAdventurerContextProviderProps) => {
  const dispatch = useDispatch();
  const [recentValuable, setRecentValuable] = React.useState(null);
  const playerId = useSelector(playerIdSelector);
  const sessionId = useSelector(sessionIdSelector);
  const {
    level,
    points,
    pointsRequiredForNextLevel,
    inBonusMode,
    belt,
  } = useSelector(adventurerSelector);
  const onValuableReceived = data => {
    setRecentValuable(data.itemCreated.event.badgeId);
  };

  usePlayerReceivedValuableEvent(onValuableReceived);

  const rawProgressPercentage = (points / pointsRequiredForNextLevel) * 100;

  const progressPercentage = Math.floor(
    (points / pointsRequiredForNextLevel) * 100
  );

  React.useEffect(() => {
    dispatch(initAdventurerSaga());
    dispatch(subscribeToAdventureUpdates(playerId, sessionId));

    return () => {
      dispatch(unsubscribeFromAdventureUpdates(playerId));
    };
  }, [dispatch, playerId, sessionId]);

  return (
    <AdventurerContext.Provider
      value={{
        level,
        points,
        pointsRequiredForNextLevel,
        inBonusMode,
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'BeltType'... Remove this comment to see the full error message
        belt,
        progressPercentage,
        rawProgressPercentage,
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(callback: LevelUpCallback) => void' is not ... Remove this comment to see the full error message
        onLevelUp: usePlayerLevelUpEvent,
        recentValuable,
      }}
    >
      {children}
    </AdventurerContext.Provider>
  );
};

export const useAdventurerContext = () => {
  return React.useContext(AdventurerContext);
};
