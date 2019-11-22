// @flow
import React from "react";
import { usePlayerValuableList } from "Components/PlayerValuableList/usePlayerValuableList";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { VALUABLE_TYPES } from "Models/valuables";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";

export const PlayerDepositValuables = () => {
  const { loading, valuables, translations } = usePlayerValuableList(
    VALUABLE_TYPES.DEPOSIT
  );

  if (loading || !translations) {
    return <GameRowSkeleton />;
  }

  return (
    <ValuablesVerticalList
      className="u-padding-x--md"
      valuables={valuables}
      translations={translations}
      loading={loading}
    />
  );
};
