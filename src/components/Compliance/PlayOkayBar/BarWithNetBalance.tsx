import Flex from "@casumo/cmp-flex";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrentSessionTimer } from "Components/CurrentSessionTimer";
import "./PlayOkayBar.scss";
import { useNetFinancialPositionValue } from "Components/GamePage/Hooks/useNetFinancialPositionValue";
import { GAME_CATEGORIES } from "Src/constants";
import { playerSessionStarted, setSessionTimerStarted } from "Models/player";
import { NetFinancialPosition } from "./NetFinancialPosition";

type Props = {
  className?: string;
  gameCategory: string;
};

export const BarWithNetBalance = ({ className = "", gameCategory }: Props) => {
  const dispatch = useDispatch();
  const sessionStartedTime = useSelector(playerSessionStarted);

  if (sessionStartedTime === null) {
    dispatch(setSessionTimerStarted());
  }

  const netFinancialPositionValue = useNetFinancialPositionValue();

  return (
    <Flex justify="end" align="center" className={className}>
      <Flex.Item
        className="c-playokay-bar__clock--wide u-font-xs text-grey-5 o-flex-align--center"
        align="center"
      >
        {gameCategory === GAME_CATEGORIES.SLOT_MACHINE && (
          <NetFinancialPosition netValue={netFinancialPositionValue} />
        )}
        <TimeLockedIcon size="sm" className="u-margin-right" />
        <CurrentSessionTimer startingTime={sessionStartedTime} />
      </Flex.Item>
    </Flex>
  );
};
