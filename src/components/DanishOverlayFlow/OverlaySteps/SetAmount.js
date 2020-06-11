//@flow
import React, { useCallback } from "react";
import { ButtonPrimary } from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import { TextInput } from "Components/Compliance/TextInput";
import { formatCurrency, getSymbolForCurrency } from "Utils";
import { limitPeriod, minFirstDepositLimit } from "Models/playOkay";
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

  const limitInRange = (value: number): boolean => {
    return amount >= minFirstDepositLimit && value <= depositLimit;
  };

  const isLimitMaxed = (value: number): boolean => value >= depositLimit;

  const currencySign: string = getSymbolForCurrency({ locale, currency });

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
          <div
            data-test-id="warning-message"
            className="t-color-red-light-1-unknown-cudl-class"
          >
            {minFirstDepositLimit} -{" "}
            {formatCurrency({
              locale,
              currency,
              value: depositLimit,
            })}
          </div>
        )}
        <div className="u-padding-top--2xlg">
          <ButtonPrimary
            className="u-width--full"
            isDisabled={!limitInRange(amount) || loading}
            size="md"
            isLoading={loading}
            onClick={confirmLimit}
          >
            {t.save_limit_button}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};
