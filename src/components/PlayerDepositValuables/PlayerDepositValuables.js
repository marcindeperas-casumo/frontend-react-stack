// @flow
import React from "react";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { usePlayerValuableList } from "Components/PlayerValuableList/usePlayerValuableList";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { VALUABLE_TYPES } from "Models/valuables";
import { ValuableRowShell } from "Components/ValuableRow/ValuableRowShell";
import "./PlayerDepositValuables.scss";

export const PlayerDepositValuables = () => {
  const { loading, valuables, translations } = usePlayerValuableList(
    VALUABLE_TYPES.DEPOSIT
  );

  if (loading || !translations) {
    return <GameRowSkeleton />;
  }

  return (
    <div className="list-wrap">
      <div className="u-overflow-y--auto c-tst">
        <div className="u-padding-x--md">
          <ValuablesVerticalList
            valuables={valuables}
            translations={translations}
            loading={loading}
          />
        </div>
      </div>
      <div className="u-padding-x--md">
        <ValuableRowShell text="Don't use bonus" />
      </div>
    </div>
  );
};
