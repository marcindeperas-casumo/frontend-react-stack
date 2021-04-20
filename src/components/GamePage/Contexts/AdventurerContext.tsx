import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerIdSelector, sessionIdSelector } from "Models/handshake";
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
  recentValuable: null,
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
    recentValuable,
  } = useSelector(adventurerSelector);

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
