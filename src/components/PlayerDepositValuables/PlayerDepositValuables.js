// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { usePlayerValuableList } from "Components/PlayerValuableList/usePlayerValuableList";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { VALUABLE_TYPES } from "Models/valuables";
import { ValuableRowShell } from "Components/ValuableRow/ValuableRowShell";
import { launchModal } from "Services/LaunchModalService";
import { depositBonusSelected } from "Services/DepositBonusSelectedService";
import { MODALS } from "Src/constants";

const showBonusTerms = () => {
  launchModal({ modal: MODALS.DEPOSIT.SHOW_BONUS_TERMS });
};

const selectBonus = badgeId => {
  depositBonusSelected({ badgeId });
};

export const PlayerDepositValuables = () => {
  const { loading, valuables, translations } = usePlayerValuableList(
    VALUABLE_TYPES.DEPOSIT
  );

  if (loading || !translations) {
    return <GameRowSkeleton />;
  }

  return (
    <>
      <Flex
        direction="vertical"
        className="u-padding-bottom--lg u-overflow-hidden u-height--screen"
        spacing="none"
      >
        <Flex.Item className="u-overflow-y--auto">
          <ValuablesVerticalList
            valuables={valuables}
            translations={translations}
            loading={loading}
            onItemClick={selectBonus}
            isItemSelectable={true}
          />
        </Flex.Item>
        <Flex.Item>
          <ValuableRowShell text={translations.dontUseValuableLabel} />
        </Flex.Item>
      </Flex>
      <div className="u-position-sticky--bottom u-padding-bottom--md">
        <Text
          data-test-id="bonus-terms-link"
          onClick={showBonusTerms}
          tag="h3"
          className="t-color-text-link u-text-align-center"
        >
          Bonus Terms and Conditions
        </Text>
      </div>
    </>
  );
};
