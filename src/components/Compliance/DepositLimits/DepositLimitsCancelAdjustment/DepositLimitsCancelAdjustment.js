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
      className="u-padding--md u-height--full t-background-white c-deposit-limits-container"
    >
      <Flex.Block className="u-text-align-center">
        <Text
          size="xlg"
          className="u-font-weight-black t-color-purple-80 u-margin-bottom--xlg"
          data-test-id="txt"
          tag="h3"
        >
          {t.cancel_adjustment_title}
        </Text>
        <Text className="t-color-grey-50 u-margin-bottom--none" tag="p">
          {t.cancel_adjustment_content}
        </Text>
      </Flex.Block>
      <Flex.Item>
        <Flex>
          <Flex.Block>
            <ButtonPrimary
              size="sm"
              className="u-width--full"
              onClick={props.handleButtonYes}
            >
              {t.button_yes}
            </ButtonPrimary>
          </Flex.Block>
          <Flex.Block>
            <ButtonSecondary
              size="sm"
              className="u-width--full"
              onClick={props.handleButtonNo}
            >
              {t.button_no}
            </ButtonSecondary>
          </Flex.Block>
        </Flex>
      </Flex.Item>
    </Flex>
  );
}
