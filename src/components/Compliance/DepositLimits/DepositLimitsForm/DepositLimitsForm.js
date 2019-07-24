// @flow
import * as React from "react";
import * as R from "ramda";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ArrowRightIcon } from "@casumo/cmp-icons";
import type {
  AllLimits,
  AllLimitsOnlyValues,
  LimitLock,
  DepositKinds,
} from "Models/playOkay/depositLimits";
import { formatCurrency, interpolate, getSymbolForCurrency } from "Utils";
import { Pill } from "Components/Pill";
import { TextInput } from "Components/Compliance/TextInput";
import { useDepositLimitInputs } from "./DepositLimitsForm.hooks";
import { limitTypes } from "..";
import "./styles.scss";

type Props = {
  locale: string,
  t: {
    daily_short: string,
    daily: string,
    weekly_short: string,
    weekly: string,
    monthly_short: string,
    monthly: string,
    remove_selected: string,

    input_validation_lock: string,
    input_validation_lowest_limit: string,
    input_validation_highest_limit: string,
    input_validation_cant_be_higher: string,
    input_validation_cant_be_lower: string,
    input_validation_has_to_be_lower_while_locked: string,
  },
  limits: AllLimits,
  limitChanges: AllLimitsOnlyValues,
  initiallyVisible: DepositKinds,
  applyLimitsChanges: AllLimitsOnlyValues => void,
  lock: ?LimitLock,
};

// eslint-disable-next-line fp/no-mutation
DepositLimitsForm.defaultProps = {
  initiallyVisible: "daily",
  lock: undefined,
  limitChanges: {},
};
export function DepositLimitsForm(props: Props) {
  const { t } = props;
  const [visible, setVisible] = React.useState<DepositKinds>(
    props.initiallyVisible
  );
  const limitInputs = useDepositLimitInputs({
    ...props.limits,
    ...props.limitChanges, // if we are going back from summary screen this will contain some values
  });
  const inputError = validate(visible);

  const handleNextButton = React.useCallback(() => {
    const i = limitTypes.indexOf(visible);
    if (i < 2) {
      setVisible(limitTypes[i + 1]);
    } else {
      // if any limit is invalid it should be fixed before we can proceed
      const invalid = limitTypes.find(limit => validate(limit));
      if (invalid) {
        setVisible(invalid);
      } else {
        props.applyLimitsChanges(R.pluck("value", limitInputs));
      }
    }
  }, [visible]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex direction="vertical" className="u-padding--md u-height--1/1">
      <Flex align="center" justify="space-between">
        <Text className="u-font-weight-bold" style={{ color: "#181c1c" }}>
          {t[visible]}
        </Text>
      </Flex>
      <TextInput
        currencySign={getSymbolForCurrency({
          locale: props.locale,
          currency: props.limits.currency,
        })}
        {...limitInputs[visible]}
      />
      <Text
        data-test-id="inputValidation"
        size="sm"
        style={{ color: "#FC484C" }}
      >
        {inputError}
      </Text>
      <Flex
        align="stretch"
        justify="space-between"
        spacing="none"
        className="u-padding-y--md"
      >
        {limitTypes.map(limitName => (
          <Pill
            key={limitName}
            onClick={() => setVisible(limitName)}
            isActive={visible === limitName}
            inactiveClassNames="o-flex--1 t-background-grey-light-2 c-deposit-limits-form-pill__container"
            activeClassNames="o-flex--1 c-deposit-limits-form-pill__container c-deposit-limits-form-pill--active"
          >
            <Flex
              align="center"
              direction="vertical"
              className="u-font-weight-black u-text-transform-uppercase"
            >
              <Text tag="span" size="xs">
                {t[`${limitName}_short`]}
              </Text>
              <Text tag="span" size="sm">
                {limitInputs[limitName].value
                  ? formatCurrency({
                      locale: props.locale,
                      currency: props.limits.currency,
                      value: parseInt(limitInputs[limitName].value),
                    })
                  : "+"}
              </Text>
            </Flex>
          </Pill>
        ))}
      </Flex>
      <Flex style={{ flexGrow: 2 }} />
      <Button
        variant="variant-2"
        className="u-padding-y--md"
        disabled={Boolean(inputError)}
        onClick={handleNextButton}
      >
        <ArrowRightIcon className="t-color-white" />
      </Button>
    </Flex>
  );

  function validate(currentLimit: DepositKinds): ?string {
    const currentLimitNotEqual: DepositKinds => Boolean = R.complement(
      R.equals(currentLimit)
    );
    const currentLimitValue = limitInputs[currentLimit].value;
    if (currentLimitNotEqual("daily")) {
      const i = limitTypes.indexOf(currentLimit) - 1;
      const previousLimitValue = limitInputs[limitTypes[i]].value;
      if (R.gt(previousLimitValue, currentLimitValue)) {
        return interpolate(t.input_validation_cant_be_lower, {
          affectedLimitType: limitTypes[i],
        });
      }
    }
    if (currentLimitNotEqual("monthly")) {
      const i = limitTypes.indexOf(currentLimit) + 1;
      const nextLimitValue = limitInputs[limitTypes[i]].value;
      if (R.lt(nextLimitValue, currentLimitValue)) {
        return interpolate(t.input_validation_cant_be_higher, {
          affectedLimitType: limitTypes[i],
        });
      }
    }
    if (R.lt(currentLimitValue, 10)) {
      return t.input_validation_lowest_limit;
    }
    if (R.gt(currentLimitValue, 20000)) {
      return t.input_validation_highest_limit;
    }
    if (props.lock) {
      const limitBeforeChange = props.limits[currentLimit];
      if (R.gt(currentLimitValue, limitBeforeChange)) {
        return interpolate(t.input_validation_has_to_be_lower_while_locked, {
          currentLimit: formatCurrency({
            locale: props.locale,
            currency: props.limits.currency,
            value: limitBeforeChange,
          }),
        });
      }
    }

    return null;
  }
}
