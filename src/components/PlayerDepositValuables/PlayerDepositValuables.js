// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { usePlayerValuableList } from "Components/PlayerValuableList/usePlayerValuableList";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { VALUABLE_TYPES } from "Models/valuables";
import { ValuableRowShell } from "Components/ValuableRow/ValuableRowShell";
import { launchBonusTermsDialog } from "Services/LaunchBonusTermsDialog";
import "./PlayerDepositValuables.scss";

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
        <Flex.Item className="u-overflow-y--auto u-margin-x--md">
          <ValuablesVerticalList
            valuables={valuables}
            translations={translations}
            loading={loading}
          />
        </Flex.Item>
        <Flex.Item className="u-margin-x--md">
          <ValuableRowShell text={translations.dontUseValuableLabel} />
        </Flex.Item>
      </Flex>
      <div className="c-player-deposit-valuables__footer">
        <Text
          data-test-id="bonus-terms-link"
          onClick={launchBonusTermsDialog}
          tag="h3"
          className="t-color-text-link u-text-align-center"
        >
          Bonus Terms and Conditions
        </Text>
      </div>
    </>
  );
};
