import Flex from "@casumo/cmp-flex";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import React from "react";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import "./PlayOkayBar.scss";
import { useNetFinancialPositionValue } from "Components/GamePage/Hooks/useNetFinancialPositionValue";
import { NetFinancialPosition } from "./NetFinancialPosition";

type Props = {
  className?: string;
};

export const UKGCBar = ({ className = "" }: Props) => {
  const netFinancialPositionValue = useNetFinancialPositionValue();
  return (
    <Flex justify="end" align="center" className={className}>
      <Flex.Item
        className="c-playokay-bar__wideClock u-font-xs text-grey-5 u-display--flex"
        align="center"
      >
        <NetFinancialPosition netValue={netFinancialPositionValue} />
        <TimeLockedIcon size="sm" className="u-margin-right" />
        <CurrentSessionTimer />
      </Flex.Item>
    </Flex>
  );
};
