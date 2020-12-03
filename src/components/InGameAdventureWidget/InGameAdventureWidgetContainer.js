// @flow
import * as React from "react";
import { useAdventurerContext } from "Components/GamePage/Contexts/AdventurerContext";
import { InGameAdventureWidget } from "./InGameAdventureWidget";

export const InGameAdventureWidgetContainer = () => {
  const {
    level,
    points,
    pointsRequiredForNextLevel,
    progressPercentage,
    inBonusMode,
    belt,
  } = useAdventurerContext();

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
