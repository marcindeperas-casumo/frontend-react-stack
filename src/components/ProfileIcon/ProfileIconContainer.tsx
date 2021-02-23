// @flow
import * as React from "react";
import { useAdventurerContext } from "Components/GamePage/Contexts/AdventurerContext";
import { ProfileIcon } from "./ProfileIcon";

export function ProfileIconContainer() {
  const {
    level,
    belt,
    inBonusMode,
    rawProgressPercentage,
  } = useAdventurerContext();

  return (
    <ProfileIcon
      level={level}
      belt={belt}
      inBonusMode={inBonusMode}
      progressPercentage={rawProgressPercentage}
    />
  );
}
