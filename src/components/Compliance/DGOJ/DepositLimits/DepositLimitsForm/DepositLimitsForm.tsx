import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ArrowRightIcon } from "@casumo/cmp-icons";
import * as R from "ramda";
import * as React from "react";
import type { DepositKinds } from "Models/playOkay/dgojDepositLimits";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import { formatCurrency, getSymbolForCurrency } from "Utils";
import { Pill } from "Components/Pill";
import { TextInput } from "Components/Compliance/TextInput";
import { limitTypes } from "..";
import { useDepositLimitInputs } from "./DepositLimitsForm.hooks";
import { validate } from "./DepositLimitsForm.utils";
import type { FormPropsWithTranslations } from "./DepositLimitsForm.types";
import "./styles.scss";

// eslint-disable-next-line fp/no-mutation
DepositLimitsForm.defaultProps = {
  initiallyVisible: "daily",
  lock: undefined,
};
export function DepositLimitsForm({ t, ...props }: FormPropsWithTranslations) {
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
  const inputError = validate(visible, limitInputs, props, t);
  const flexItemWidth = "u-width--1/2@desktop";

  const handleNextButton = React.useCallback(() => {
    // if any limit is invalid it should be fixed before we can proceed
    const invalid = limitTypes.find(limit =>
      validate(limit, limitInputs, props, t)
    );
    if (invalid) {
      setVisible(invalid);
    } else {
      // @ts-expect-error ts-migrate(2559) FIXME: Type 'never[]' has no properties in common with ty... Remove this comment to see the full error message
      props.applyLimitsChanges(R.pluck("value", limitInputs));
    }
  }, [limitInputs, visible]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex
      direction="vertical"
      className="o-flex-align--center@desktop u-padding--2xlg u-margin-x--2xlg@tablet u-margin-x--2xlg@desktop u-height--full bg-white"
    >
      <Text className={`u-font-weight-bold text-grey-90 ${flexItemWidth}`}>
        {t[visible]}
      </Text>
      <TextInput
        className={flexItemWidth}
        currencySign={getSymbolForCurrency({
          currency: props.currency,
        })}
        {...limitInputs[visible]}
      />
      <Text
        data-test-id="inputValidation"
        size="sm"
        className={`text-red-30 ${flexItemWidth}`}
      >
        {inputError}
      </Text>
      <Flex
        align="stretch"
        justify="space-between"
        spacing="none"
        className={`u-padding-y--md ${flexItemWidth}`}
      >
        {limitTypes.map(limitName => (
          <Pill
            key={limitName}
            onClick={() => setVisible(limitName)}
            isActive={visible === limitName}
            inactiveClassNames="o-flex--1 bg-grey-0 c-deposit-limits-form-pill__container"
            activeClassNames="o-flex--1 c-deposit-limits-form-pill__container bg-purple-60 text-white"
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
                      value: limitInputs[limitName].value,
                    })
                  : "+"}
              </Text>
            </Flex>
          </Pill>
        ))}
        <Desktop>
          <MainButton
            disabled={Boolean(inputError)}
            onClick={handleNextButton}
          />
        </Desktop>
      </Flex>
      <Flex.Block />
      <MobileAndTablet>
        <MainButton disabled={Boolean(inputError)} onClick={handleNextButton} />
      </MobileAndTablet>
    </Flex>
  );
}

function MainButton(props: { disabled: boolean; onClick: () => void }) {
  return (
    <ButtonPrimary
      size="md"
      className="u-padding-y u-padding-x@desktop u-margin-left--2xlg@desktop u-margin-top--4xlg u-margin-top--none@desktop"
      isDisabled={props.disabled}
      onClick={props.onClick}
    >
      <ArrowRightIcon size="md" className="text-white" />
    </ButtonPrimary>
  );
}
