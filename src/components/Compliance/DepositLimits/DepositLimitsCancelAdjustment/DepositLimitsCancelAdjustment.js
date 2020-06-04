// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";

type Props = {
  t: {
    cancel_adjustment_title: string,
    cancel_adjustment_content: string,
    button_yes: string,
    button_no: string,
  },
  handleButtonYes: (event: SyntheticEvent<HTMLElement>) => void,
  handleButtonNo: (event: SyntheticEvent<HTMLElement>) => void,
};

export function DepositLimitsCancelAdjustment({ t, ...props }: Props) {
  return (
    <Flex
      direction="vertical"
      align="stretch"
      justify="space-between"
      spacing="none"
      className="u-padding--md u-height--full t-background-white c-deposit-limits-container"
    >
      <Text
        size="xlg"
        className="u-font-weight-black t-color-purple-80 u-text-align-center u-margin-bottom--xlg"
        data-test-id="txt"
        tag="span"
      >
        {t.cancel_adjustment_title}
      </Text>
      <Text className="t-color-grey-50 u-text-align-center" tag="span">
        {t.cancel_adjustment_content}
      </Text>
      <Flex className="o-flex--1" />
      <Flex>
        <ButtonPrimary className="o-flex--1" onClick={props.handleButtonYes}>
          {t.button_yes}
        </ButtonPrimary>
        <Flex className="u-padding" />
        <ButtonSecondary className="o-flex--1" onClick={props.handleButtonNo}>
          {t.button_no}
        </ButtonSecondary>
      </Flex>
    </Flex>
  );
}
