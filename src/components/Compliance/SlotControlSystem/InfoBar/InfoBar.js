// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import {
  ClockIcon,
  KycTabIcon as CreditCardIcon,
  ArrowsSpinIcon,
  PrizeIcon,
} from "@casumo/cmp-icons";
import { formatCurrency } from "Utils";
import { useSessionsState } from "Models/slotControlSystem";
import { useLocale } from "Utils/hooks";
import Timer from "Components/Timer";

export function InfoBar() {
  const locale = useLocale();
  const { activeSession } = useSessionsState();

  if (!activeSession) {
    return null;
  }

  const currencyFormatter = (value: number) =>
    formatCurrency({
      currency: activeSession.stats.currency,
      locale,
      value,
    });

  return (
    <Flex
      align="center"
      justify="center"
      className="u-width--full t-background-black u-padding-y--md"
    >
      <Text className="u-font-weight-black t-color-white" size="xs" tag="div">
        <Flex>
          <Flex align="center" className="u-margin-right">
            <ClockIcon
              size="sm"
              className="u-margin-right--sm t-color-chrome-dark-1"
            />
            <Timer
              startTime={activeSession.startedTime}
              render={state =>
                `${state.hours}:${state.minutes}:${state.seconds}`
              }
            />
          </Flex>
          <Flex align="center" className="u-margin-right">
            <CreditCardIcon
              size="sm"
              className="u-margin-right--sm t-color-chrome-dark-1"
            />
            {currencyFormatter(activeSession.stats.remainingBalance)}
          </Flex>
          <Flex align="center" className="u-margin-right">
            <CreditCardIcon
              size="sm"
              className="u-margin-right--sm t-color-chrome-dark-1"
            />
            {currencyFormatter(activeSession.stats.consumedBalance)}
          </Flex>
          <Flex align="center" className="u-margin-right">
            <ArrowsSpinIcon
              size="sm"
              className="u-margin-right--sm t-color-chrome-dark-1"
            />
            {currencyFormatter(activeSession.stats.totalBets)}
          </Flex>
          <Flex align="center" className="u-margin-right">
            <PrizeIcon
              size="sm"
              className="u-margin-right--sm t-color-chrome-dark-1"
            />
            {currencyFormatter(activeSession.stats.totalWins)}
          </Flex>
        </Flex>
      </Text>
    </Flex>
  );
}
