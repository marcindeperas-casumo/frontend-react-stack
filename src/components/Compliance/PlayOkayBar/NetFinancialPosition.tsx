import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ArrowUpIcon, ArrowDownIcon } from "@casumo/cmp-icons";
import { useSelector } from "react-redux";
import { getCurrencyAndLocaleSelector } from "Models/playOkay/depositLimits";
import { getSymbolForCurrency } from "Utils/utils";
import { TCurrencyCode } from "Src/constants";

type Props = {
  netValue?: number;
};

export const NetFinancialPosition = ({ netValue }: Props) => {
  const { currency } = useSelector(getCurrencyAndLocaleSelector);
  const currencyCode = currency as TCurrencyCode;
  const currencySymbol = getSymbolForCurrency({ currency: currencyCode });

  return (
    <Flex
      direction="horizontal"
      align="center"
      className="u-height--lg u-margin-right"
    >
      {netValue > 0 && <ArrowUpIcon size="xs" className="text-white" />}
      {netValue < 0 && <ArrowDownIcon size="xs" className="text-red" />}
      <Text size="xs">{`${currencySymbol} ${Math.abs(netValue).toFixed(
        2
      )}`}</Text>
    </Flex>
  );
};
