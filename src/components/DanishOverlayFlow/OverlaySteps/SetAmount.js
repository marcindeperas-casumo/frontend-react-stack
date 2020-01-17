//@flow
import React, { useCallback } from "react";
import Button from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import { TextInput } from "Components/Compliance/TextInput";
import { formatCurrency, getSymbolForCurrency } from "Utils";
import { limitPeriod, minFirstDepositLimit } from "Models/compliance/denmark";
import type { CmsContent } from "../DanishEntryOverlay";

type Props = {
  t: CmsContent,
  locale: string,
  currency: string,
  confirmLimit: () => void,
  setAmount: (value: number) => void,
  amount: number,
  limitType: string,
  loading: boolean,
  DGAComplianceState: {
    depositLimit: number,
  },
};

export const SetAmount = (props: Props) => {
  const {
    t,
    locale,
    currency,
    confirmLimit,
    setAmount,
    amount,
    limitType,
    loading,
    DGAComplianceState,
  } = props;

  const depositLimit = DGAComplianceState ? DGAComplianceState.depositLimit : 0;

  const periodLabels = {
    [limitPeriod.DAILY]: t.limit_type_daily,
    [limitPeriod.WEEKLY]: t.limit_type_weekly,
    [limitPeriod.MONTHLY]: t.limit_type_monthly,
  };

  const onChangeAmount = useCallback(
    e => {
      const value = e.currentTarget.value;
      if (!isNaN(value)) {
        setAmount(value < depositLimit ? value : depositLimit);
      }
    },
    [depositLimit, setAmount]
  );

  const limitInRange = value => {
    return amount >= minFirstDepositLimit && value <= depositLimit;
  };

  const isLimitMaxed = value => value >= depositLimit;

  const currencySign = getSymbolForCurrency({
    locale: locale,
    currency: currency,
  });

  return (
    <div className="u-padding-x--lg u-padding-bottom--xlg u-overflow-y--auto">
      <Text className="u-padding-x u-padding-y--lg">
        {limitType ? periodLabels[limitType] : ""} {t.limit}
      </Text>
      <div className="u-padding-x">
        <TextInput
          currencySign={currencySign}
          value={amount}
          onChange={onChangeAmount}
          inputClassName="u-padding-left--md"
        />
        {limitInRange(amount) && isLimitMaxed(amount) && (
          <div data-test-id="warning-message" className="t-color-red-light-1">
            {minFirstDepositLimit} -{" "}
            {formatCurrency({
              locale: locale,
              currency: currency,
              value: depositLimit,
            })}
          </div>
        )}
        <div className="u-padding-top--2xlg">
          <Button
            className="u-width--full"
            disabled={!limitInRange(amount) || loading}
            variant="primary"
            size="md"
            loading={loading}
            onClick={confirmLimit}
          >
            {t.save_limit_button}
          </Button>
        </div>
      </div>
    </div>
  );
};
