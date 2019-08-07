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
  ResponsibleGamblingTest,
} from "Models/playOkay/depositLimits";
import { formatCurrency, interpolate, getSymbolForCurrency } from "Utils";
import { Pill } from "Components/Pill";
import { TextInput } from "Components/Compliance/TextInput";
import { useDepositLimitInputs } from "./DepositLimitsForm.hooks";
import { limitTypes } from "..";
import "./styles.scss";

type Props = {
  currency: string,
  locale: string,
  t: {
    daily_short: string,
    daily: string,
    weekly_short: string,
    weekly: string,
    monthly_short: string,
    monthly: string,
    remove_selected: string,
    inputValidation: {
      lock: string,
      lowest_limit: string,
      highest_limit: string,
      cant_be_higher: string,
      cant_be_lower: string,
      has_to_be_lower_while_locked: string,
      has_to_be_lower_after_responsible_gambling_test_failed: string,
    },
  },
  responsibleGamblingTestRequired?: boolean,
  responsibleGamblingTest: ResponsibleGamblingTest,
  limits: AllLimits,
  limitChanges: AllLimitsOnlyValues,
  initiallyVisible: DepositKinds,
  applyLimitsChanges: AllLimitsOnlyValues => void,
  lock: ?LimitLock,
  fetchTranslations: () => void,
};

// eslint-disable-next-line fp/no-mutation
DepositLimitsForm.defaultProps = {
  initiallyVisible: "daily",
  lock: undefined,
  limitChanges: {},
};
export function DepositLimitsForm({ t, ...props }: Props) {
  React.useEffect(() => {
    props.fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [visible, setVisible] = React.useState<DepositKinds>(
    props.initiallyVisible
  );
  const limitInputs = useDepositLimitInputs({
    ...props.limits,
    ...props.limitChanges, // if we are going back from summary screen this will contain some values
  });
  const inputError = validate(visible);

  const handleNextButton = React.useCallback(() => {
    // if any limit is invalid it should be fixed before we can proceed
    const invalid = limitTypes.find(limit => validate(limit));
    if (invalid) {
      setVisible(invalid);
    } else {
      props.applyLimitsChanges(R.pluck("value", limitInputs));
    }
  }, [limitInputs, visible]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex
      direction="vertical"
      className="u-padding--md u-height--1/1 t-background-white"
    >
      <Flex align="center" justify="space-between">
        <Text className="u-font-weight-bold t-color-chrome-dark-3">
          {t[visible]}
        </Text>
      </Flex>
      <TextInput
        currencySign={getSymbolForCurrency({
          locale: props.locale,
          currency: props.currency,
        })}
        {...limitInputs[visible]}
      />
      <Text
        data-test-id="inputValidation"
        size="sm"
        className="t-color-negative"
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
                      currency: props.currency,
                      value: parseInt(limitInputs[limitName].value),
                    })
                  : "+"}
              </Text>
            </Flex>
          </Pill>
        ))}
      </Flex>
      <Flex.Block />
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
        return interpolate(t.input_validation.cant_be_lower, {
          affectedLimitType: t[`${limitTypes[i]}_short`],
        });
      }
    }
    if (currentLimitNotEqual("monthly")) {
      const i = limitTypes.indexOf(currentLimit) + 1;
      const nextLimitValue = limitInputs[limitTypes[i]].value;
      if (R.lt(nextLimitValue, currentLimitValue)) {
        return interpolate(t.input_validation.cant_be_higher, {
          affectedLimitType: t[`${limitTypes[i]}_short`],
        });
      }
    }
    if (R.lt(currentLimitValue, 10)) {
      return t.input_validation.lowest_limit;
    }
    if (R.gt(currentLimitValue, 20000)) {
      return t.input_validation.highest_limit;
    }

    const limitBeforeChange = props.limits[currentLimit];
    if (R.gt(currentLimitValue, limitBeforeChange)) {
      const replacements = {
        currentLimit: formatCurrency({
          locale: props.locale,
          currency: props.currency,
          value: limitBeforeChange,
        }),
      };

      if (props.lock) {
        return interpolate(
          t.input_validation.has_to_be_lower_while_locked,
          replacements
        );
      }
      if (
        props.responsibleGamblingTestRequired &&
        !props.responsibleGamblingTest
          .responsibleGamblingQuestionnaireAttemptAllowed
      ) {
        return interpolate(
          t.input_validation
            .has_to_be_lower_after_responsible_gambling_test_failed,
          replacements
        );
      }
    }

    return null;
  }
}
