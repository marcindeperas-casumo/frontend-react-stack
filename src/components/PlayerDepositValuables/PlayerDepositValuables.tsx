import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import React from "react";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { usePlayerValuableList } from "Components/PlayerValuableList/usePlayerValuableList";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { ValuableRowShell } from "Components/ValuableRow/ValuableRowShell";
import type { TPaymentMethod } from "Components/PaymentMethodDetails";
import { launchModal } from "Services/LaunchModalService";
import { MODALS } from "Src/constants";

const showBonusTerms = () => {
  launchModal({ modal: MODALS.DEPOSIT.SHOW_BONUS_TERMS });
};

type TProps = {
  selectedPaymentMethod?: Partial<TPaymentMethod>;
  onSelectDepositBonus: (badgeId: string) => void;
  onRefreshDepositValuables?: () => void;
};

export const PlayerDepositValuables = ({
  selectedPaymentMethod,
  onSelectDepositBonus,
  onRefreshDepositValuables,
}: TProps) => {
  const minDepositAmount = selectedPaymentMethod?.minDepositAmount;
  const { loading, valuables, translations } = usePlayerValuableList({
    className: "DepositBonusUsableUsedEvent",
    minDepositAmount,
  });

  if (loading || !translations) {
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
        className="u-padding-bottom--lg u-overflow--hidden h-screen lg:h-auto"
        spacing="none"
      >
        <Flex.Item className="u-overflow-y--auto">
          {/* @ts-expect-error ts-migrate(741) FIXME: Property 'onConsumeValuable' is missing in type '{... Remove this comment to see the full error message */}
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
