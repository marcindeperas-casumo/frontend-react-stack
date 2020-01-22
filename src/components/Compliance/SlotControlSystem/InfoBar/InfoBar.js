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
import { useLocale, useActiveGameSession } from "Utils/hooks";
import Timer from "Components/Timer";

export function InfoBar() {
  const locale = useLocale();
  const activeGameSession = useActiveGameSession();

  if (!activeGameSession) {
    return null;
  }

  const currencyFormatter = (value: number) =>
    formatCurrency({
      currency: activeGameSession.stats.currency,
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
              startTime={activeGameSession.startedTime}
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
            {currencyFormatter(activeGameSession.stats.remainingBalance)}
          </Flex>
          <Flex align="center" className="u-margin-right">
            <CreditCardIcon
              size="sm"
              className="u-margin-right--sm t-color-chrome-dark-1"
            />
            {currencyFormatter(activeGameSession.stats.consumedBalance)}
          </Flex>
          <Flex align="center" className="u-margin-right">
            <ArrowsSpinIcon
              size="sm"
              className="u-margin-right--sm t-color-chrome-dark-1"
            />
            {currencyFormatter(activeGameSession.stats.totalBets)}
          </Flex>
          <Flex align="center" className="u-margin-right">
            <PrizeIcon
              size="sm"
              className="u-margin-right--sm t-color-chrome-dark-1"
            />
            {currencyFormatter(activeGameSession.stats.totalWins)}
          </Flex>
        </Flex>
      </Text>
    </Flex>
  );
}
