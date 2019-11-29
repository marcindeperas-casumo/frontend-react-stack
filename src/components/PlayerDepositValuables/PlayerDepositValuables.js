// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { usePlayerValuableList } from "Components/PlayerValuableList/usePlayerValuableList";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { VALUABLE_TYPES } from "Models/valuables";
import { ValuableRowShell } from "Components/ValuableRow/ValuableRowShell";

export const PlayerDepositValuables = () => {
  const { loading, valuables, translations } = usePlayerValuableList(
    VALUABLE_TYPES.DEPOSIT
  );

  if (loading || !translations) {
    return <GameRowSkeleton />;
  }

  return (
    <Flex direction="vertical" className="u-padding u-height--screen">
      <div className="u-padding-x--md u-overflow-y--auto">
        <ValuablesVerticalList
          valuables={valuables}
          translations={translations}
          loading={loading}
        />
      </div>
      <div className="c-valuable-row-shell u-padding-x--md">
        <ValuableRowShell text={translations.dontUseValuableLabel} />
      </div>
    </Flex>
  );
};
