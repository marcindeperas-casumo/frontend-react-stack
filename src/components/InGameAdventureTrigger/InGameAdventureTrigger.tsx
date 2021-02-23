// @flow
import React, { useEffect, useRef } from "react";
import { useAdventurerContext } from "Components/GamePage/Contexts/AdventurerContext";
import { useSumoIcon } from "Components/SumoIcon/useSumoIconHook";
import BonusValuableIcon from "Components/InGameAdventureWidget/bonusValuable.svg";

const ValuableReceivedIcon = () => {
  return (
    <div className="u-height--3xlg u-width--3xlg u-overflow--hidden t-border-r--circle t-background-grey-90 t-opacity-background--100 o-flex--horizontal o-flex-align--center o-flex-justify--center">
      <BonusValuableIcon />
    </div>
  );
};

export const InGameAdventureTrigger = () => {
  const { recentValuable } = useAdventurerContext();
  const { addIcon } = useSumoIcon();
  const isShowing = useRef(false);

  useEffect(() => {
    if (Boolean(recentValuable) && !isShowing.current) {
      // eslint-disable-next-line fp/no-mutation
      isShowing.current = true;
      addIcon(ValuableReceivedIcon);
    }
  }, [addIcon, recentValuable]);

  return null;
};
