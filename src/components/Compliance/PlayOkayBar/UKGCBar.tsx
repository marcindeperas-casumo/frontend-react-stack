import Flex from "@casumo/cmp-flex";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import React from "react";
import { useSelector } from "react-redux";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import "./PlayOkayBar.scss";
import { useNetFinancialPositionValue } from "Components/GamePage/Hooks/useNetFinancialPositionValue";
import { winAnimationSelector } from "Models/blueribbonJackpots/jackpots.selectors";
import { GAME_CATEGORIES } from "Src/constants";
import { NetFinancialPosition } from "./NetFinancialPosition";

type Props = {
  className?: string;
  gameCategory: string;
};

export const UKGCBar = ({ className = "", gameCategory }: Props) => {
  const netFinancialPositionValue = useNetFinancialPositionValue();
  const winAnimationRunning = useSelector(winAnimationSelector);

  return (
    <Flex justify="end" align="center" className={className}>
      <Flex.Item
        className="c-playokay-bar__wideClock u-font-xs text-grey-5 o-flex-align--center"
        align="center"
      >
        {!winAnimationRunning &&
          gameCategory === GAME_CATEGORIES.SLOT_MACHINE && (
            <NetFinancialPosition netValue={netFinancialPositionValue} />
          )}
        <TimeLockedIcon size="sm" className="u-margin-right" />
        <CurrentSessionTimer />
      </Flex.Item>
    </Flex>
  );
};
