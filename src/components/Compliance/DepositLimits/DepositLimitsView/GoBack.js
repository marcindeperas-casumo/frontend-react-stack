// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ArrowLeftIcon } from "@casumo/cmp-icons";

type Props = {
  t: {
    deposit_limits: string,
  },
  goBack: void => void,
};

export function GoBack({ t, ...props }: Props) {
  return (
    <Flex
      align="center"
      className="u-padding-y--2xlg u-margin-left--lg u-margin-right--2xlg"
      onClick={props.goBack}
    >
      <Flex
        align="center"
        justify="center"
        className="t-border-r--circle t-background-grey-dark-3 u-padding--md u-margin-x--lg"
      >
        <ArrowLeftIcon size="sm" className="t-color-white" />
      </Flex>
      <Text
        size="md"
        className="u-font-weight-black o-flex__block u-text-align-center"
      >
        {t.deposit_limits}
      </Text>
    </Flex>
  );
}
