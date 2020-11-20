// @flow
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerIdSelector, sessionIdSelector } from "Models/handshake";
import { adventurerSelector, initAdventurerSaga } from "Models/adventure";
import {
  subscribeToAdventureUpdates,
  unsubscribeFromAdventureUpdates,
} from "Models/cometd";
import { InGameAdventureWidget } from "./InGameAdventureWidget";

export const InGameAdventureWidgetContainer = () => {
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

  useEffect(() => {
    dispatch(initAdventurerSaga());
    dispatch(subscribeToAdventureUpdates(playerId, sessionId));

    return () => {
      dispatch(unsubscribeFromAdventureUpdates(playerId));
    };
  }, [dispatch, playerId, sessionId]);

  return (
    <InGameAdventureWidget
      belt={belt}
      level={level}
      points={points}
      inBonusMode={inBonusMode}
      pointsRequiredForNextLevel={pointsRequiredForNextLevel}
      progressPercentage={progressPercentage}
    />
  );
};
