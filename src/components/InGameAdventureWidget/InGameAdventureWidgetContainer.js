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
  const { level, points, pointsRequiredForNextLevel } = useSelector(
    adventurerSelector
  );

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
      level={level}
      points={points}
      pointsRequiredForNextLevel={pointsRequiredForNextLevel}
      progressPercentage={progressPercentage}
    />
  );
};
