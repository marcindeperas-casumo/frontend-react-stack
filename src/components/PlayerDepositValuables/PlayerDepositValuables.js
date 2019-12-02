// @flow
import React from "react";
import Text from "@casumo/cmp-text";
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
    <div className="t-background-red u-padding-bottom--lg u-height--screen c-player-deposit-valuables">
      <Text className="u-height--5xlg u-padding-top--lg u-padding-left--md u-font-weight-bold">
        Choose a bonus card
      </Text>
      <div>
        <div className="u-overflow-hidden">
          <ValuablesVerticalList
            valuables={valuables}
            translations={translations}
            loading={loading}
          />
        </div>
        <ValuableRowShell text={translations.dontUseValuableLabel} />
      </div>
      <div className="c-player-deposit-valuables__footer">
        <Text
          onClick={launchBonusTermsDialog}
          tag="h3"
          className="t-color-text-link u-text-align-center t-background-purple"
        >
          Bonus Terms and Conditions
        </Text>
      </div>
    </div>
  );
};

// <Flex direction="vertical" className="u-overflow-hidden" spacing="none">
//   <Flex.Item>
//     <Text className="u-height--5xlg u-padding-top--lg u-padding-left--md u-font-weight-bold">
//       Choose a bonus card
//     </Text>
//   </Flex.Item>
//   <Flex.Item className="u-overflow-y--auto">
//     <ValuablesVerticalList
//       valuables={valuables}
//       translations={translations}
//       loading={loading}
//     />
//   </Flex.Item>
//   <Flex.Item>
//     <ValuableRowShell text={translations.dontUseValuableLabel} />
//   </Flex.Item>
// </Flex>
