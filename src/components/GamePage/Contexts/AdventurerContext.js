// @flow
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerIdSelector, sessionIdSelector } from "Models/handshake";
import { usePlayerLevelUpEvent } from "Utils/hooks/usePlayerLevelUpEvent";
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
  inBonusMode: boolean,
  belt: BeltType,
  onLevelUp: LevelUpCallback,
};

export const AdventurerContext = React.createContext<TAdventurerContext>({
  level: 1,
  points: 0,
  pointsRequiredForNextLevel: 100,
  progressPercentage: 0,
  inBonusMode: false,
  belt: "rope",
  onLevelUp: usePlayerLevelUpEvent,
});

export const AdventurerContextProvider = ({
  children,
}: TAdventurerContextProviderProps) => {
  const dispatch = useDispatch();
  const playerId = useSelector(playerIdSelector);
  const sessionId = useSelector(sessionIdSelector);
  const {
    level,
    points,
    pointsRequiredForNextLevel,
    inBonusMode,
    belt,
  } = useSelector(adventurerSelector);

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
        onLevelUp: usePlayerLevelUpEvent,
      }}
    >
      {children}
    </AdventurerContext.Provider>
  );
};

export const useAdventurerContext = () => {
  return React.useContext(AdventurerContext);
};
