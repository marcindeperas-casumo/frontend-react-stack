import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import React from "react";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { usePlayerValuableList } from "Components/PlayerValuableList/usePlayerValuableList";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { ValuableRowShell } from "Components/ValuableRow/ValuableRowShell";
import { launchModal } from "Services/LaunchModalService";
import { MODALS } from "Src/constants";

import "./PlayerDepositValuables.scss";

const showBonusTerms = () => {
  launchModal({ modal: MODALS.DEPOSIT.SHOW_BONUS_TERMS });
};

type TProps = {
  onSelectDepositBonus: (badgeId: string) => void;
  onRefreshDepositValuables?: () => void;
};

export const PlayerDepositValuables = ({
  onSelectDepositBonus,
  onRefreshDepositValuables,
}: TProps) => {
  const { loading, valuables, translations } = usePlayerValuableList({
    className: "DepositBonusUsableUsedEvent",
  });

  if (loading) {
    return (
      <div className="u-padding-y--md u-padding-x--md">
        <GameRowSkeleton />
      </div>
    );
  }

  return (
    <>
      <Flex
        direction="vertical"
        className="c-player-deposit-valuables u-padding-bottom--lg u-overflow--hidden"
        spacing="none"
      >
        <Flex.Item className="u-overflow-y--auto">
          {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'onConsumeValuable' is missing in type '{... Remove this comment to see the full error message */}
          <ValuablesVerticalList
            valuables={valuables}
            translations={translations}
            onItemClick={onSelectDepositBonus}
            isItemSelectable={true}
          />
        </Flex.Item>
        <Flex.Item>
          <ValuableRowShell
            onClick={onRefreshDepositValuables}
            text={translations.dontUseValuableLabel}
          />
        </Flex.Item>
      </Flex>
      <div className="o-position--sticky o-inset-bottom--none u-padding-bottom--md">
        <Text
          data-test-id="bonus-terms-link"
          onClick={showBonusTerms}
          tag="h3"
          className="text-blue-60 u-text-align-center"
        >
          {translations.bonusTermsLabel}
        </Text>
      </div>
    </>
  );
};
