import React, { useCallback } from "react";
import Button from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import { TextInput } from "Components/Compliance/TextInput";
import { limitPeriod, minFirstDepositLimit } from "Models/compliance/denmark";

export const SetAmount = ({
  t,
  currencySymbol = "€",
  confirmLimit,
  setAmount,
  amount,
  limitType,
  loading,
  DGAComplianceState,
}) => {
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

  return (
    <div className="u-padding-x--lg u-padding-bottom--xlg u-overflow-y--auto">
      <Text className="u-padding-x u-padding-y--lg">
        {limitType ? periodLabels[limitType] : ""} {t.limit}
      </Text>
      <div className="u-padding-x">
        <TextInput
          currencySign={currencySymbol + " "}
          value={amount}
          onChange={onChangeAmount}
        />
        {!limitInRange(amount) || isLimitMaxed(amount) ? (
          <div className="t-color-red-light-1">
            {currencySymbol} {minFirstDepositLimit} - {depositLimit}
          </div>
        ) : (
          ""
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
