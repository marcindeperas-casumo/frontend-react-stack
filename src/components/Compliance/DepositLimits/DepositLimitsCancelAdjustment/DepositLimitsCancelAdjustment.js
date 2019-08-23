// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";

type Props = {
  t: {
    cancel_adjustment_title: string,
    cancel_adjustment_content: string,
    button_yes: string,
    button_no: string,
  },
  handleButtonYes: void => void,
  handleButtonNo: void => void,
};

export function DepositLimitsCancelAdjustment({ t, ...props }: Props) {
  return (
    <Flex
      direction="vertical"
      align="stretch"
      justify="space-between"
      spacing="none"
      className="u-padding--md u-height--1/1 t-background-white c-deposit-limits-container"
    >
      <Text
        size="xlg"
        className="u-font-weight-black t-color-plum-dark-1 u-text-align-center u-margin-bottom--xlg"
        data-test-id="txt"
        tag="span"
      >
        {t.cancel_adjustment_title}
      </Text>
      <Text className="t-color-grey-dark-1 u-text-align-center" tag="span">
        {t.cancel_adjustment_content}
      </Text>
      <Flex className="o-flex--1" />
      <Flex>
        <Button
          variant="primary"
          className="o-flex--1"
          onClick={props.handleButtonYes}
        >
          {t.button_yes}
        </Button>
        <Flex className="u-padding" />
        <Button
          variant="secondary"
          className="o-flex--1"
          onClick={props.handleButtonNo}
        >
          {t.button_no}
        </Button>
      </Flex>
    </Flex>
  );
}
