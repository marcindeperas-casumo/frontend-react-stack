// @flow
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerIdSelector, sessionIdSelector } from "Models/handshake";
import {
  usePlayerLevelUpEvent,
  usePlayerReceivedValuableEvent,
} from "Utils/hooks";
import type { LevelUpCallback } from "Utils/hooks/usePlayerLevelUpEvent";
import {
  type BeltType,
  adventurerSelector,
  initAdventurerSaga,
} from "Models/adventure";
import {
  subscribeToAdventureUpdates,
  unsubscribeFromAdventureUpdates,
} from "Models/cometd";

type TAdventurerContextProviderProps = {
  children: React.Node,
};

type TAdventurerContext = {
  level: number,
  points: number,
  pointsRequiredForNextLevel: number,
  progressPercentage: number,
  rawProgressPercentage: number,
  inBonusMode: boolean,
  belt: BeltType,
  onLevelUp: LevelUpCallback,
  recentValuable: ?string,
};

export const AdventurerContext = React.createContext<TAdventurerContext>({
  level: 1,
  points: 0,
  pointsRequiredForNextLevel: 100,
  progressPercentage: 0,
  rawProgressPercentage: 0,
  inBonusMode: false,
  belt: "rope",
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
        belt,
        progressPercentage,
        rawProgressPercentage,
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
