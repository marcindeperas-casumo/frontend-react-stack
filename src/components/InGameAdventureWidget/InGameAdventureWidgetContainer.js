// @flow
import React, { useState, useEffect } from "react";
import { useAdventurerContext } from "Components/GamePage/Contexts/AdventurerContext";
import { InGameAdventureWidget } from "./InGameAdventureWidget";
import { InGameRecentValuableWidget } from "./InGameRecentValuableWidget";

export const InGameAdventureWidgetContainer = () => {
  const {
    level,
    points,
    pointsRequiredForNextLevel,
    progressPercentage,
    inBonusMode,
    belt,
    recentValuable,
  } = useAdventurerContext();
  const [showRecentValuable, setShowRecentValuable] = useState(true);

  const onValuableConsumed = () => {
    setShowRecentValuable(false);
  };

  useEffect(() => {
    setShowRecentValuable(Boolean(recentValuable));

    return () => {
      setShowRecentValuable(false);
    };
  }, [recentValuable]);

  return (
    <div className="t-background-grey-80 t-border-r">
      <InGameAdventureWidget
        belt={belt}
        level={level}
        points={points}
        inBonusMode={inBonusMode}
        pointsRequiredForNextLevel={pointsRequiredForNextLevel}
        progressPercentage={progressPercentage}
      />
      {showRecentValuable && (
        <InGameRecentValuableWidget
          onValuableConsumed={onValuableConsumed}
          recentValuable={recentValuable}
        />
      )}
    </div>
  );
};
