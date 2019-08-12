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
      className="u-margin-bottom--2xlg u-margin-left--lg u-margin-top"
      onClick={props.goBack}
    >
      <Flex
        align="center"
        justify="center"
        className="t-border-r--circle u-padding--md t-background-plum-dark-1 u-margin-x--lg"
      >
        <ArrowLeftIcon size="sm" className="t-color-white" />
      </Flex>
      <Text size="md" className="t-color-plum-dark-1 u-font-weight-black">
        {t.deposit_limits}
      </Text>
    </Flex>
  );
}
