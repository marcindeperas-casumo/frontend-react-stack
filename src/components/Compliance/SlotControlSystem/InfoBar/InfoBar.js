// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import {
  TimeLockedIcon,
  VerificationIcon as CreditCardIcon,
  SpinIcon,
  TrophyIcon,
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
            <TimeLockedIcon
              size="sm"
              className="u-margin-right--sm t-color-grey-50"
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
              className="u-margin-right--sm t-color-grey-50"
            />
            {currencyFormatter(activeSession.stats.remainingBalance)}
          </Flex>
          <Flex align="center" className="u-margin-right">
            <CreditCardIcon
              size="sm"
              className="u-margin-right--sm t-color-grey-50"
            />
            {currencyFormatter(activeSession.stats.consumedBalance)}
          </Flex>
          <Flex align="center" className="u-margin-right">
            <SpinIcon
              size="sm"
              className="u-margin-right--sm t-color-grey-50"
            />
            {currencyFormatter(activeSession.stats.totalBets)}
          </Flex>
          <Flex align="center" className="u-margin-right">
            <TrophyIcon
              size="sm"
              className="u-margin-right--sm t-color-grey-50"
            />
            {currencyFormatter(activeSession.stats.totalWins)}
          </Flex>
        </Flex>
      </Text>
    </Flex>
  );
}
