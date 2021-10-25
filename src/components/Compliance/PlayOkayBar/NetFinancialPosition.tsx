import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ArrowUpIcon, ArrowDownIcon } from "@casumo/cmp-icons";

type Props = {
  netValue?: number;
};

export const NetFinancialPosition = ({ netValue }: Props) => {
  return (
    <Flex
      direction="horizontal"
      align="center"
      className="u-height--lg u-margin-right"
    >
      {netValue > 0 && <ArrowUpIcon size="xs" className="text-white" />}
      {netValue < 0 && <ArrowDownIcon size="xs" className="text-red" />}
      <Text size="xs">{Math.abs(netValue).toFixed(2)}</Text>
    </Flex>
  );
};
