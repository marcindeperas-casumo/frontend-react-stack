import * as React from "react";
import { useAdventurerContext } from "Components/GamePage/Contexts/AdventurerContext";
import { useJurisdiction } from "Utils/hooks";
import { ProfileIcon } from "./ProfileIcon";

export function ProfileIconContainer() {
  const { level, belt, inBonusMode, rawProgressPercentage } =
    useAdventurerContext();
  const { isSGA } = useJurisdiction();

  return (
    <ProfileIcon
      level={level}
      belt={belt}
      inBonusMode={inBonusMode}
      progressPercentage={rawProgressPercentage}
      shouldHideProgressCircle={isSGA}
    />
  );
}
