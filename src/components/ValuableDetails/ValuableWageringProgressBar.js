/* @flow */

import React from "react";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";
import { interpolate, formatCurrency } from "Utils";
import { INTL_LOCALES } from "Src/constants";
import { ProgressBar } from "Components/ProgressBar";

type Props = {
  leftToWager: number,
  wageringThreshold: number,
  label: string,
  market: string,
  currency: string,
};

export const ValuableWageringProgressBar = ({
  leftToWager,
  wageringThreshold,
  label,
  market,
  currency,
}: Props) => {
  return (
    <>
      <Text tag="p" className="u-margin--none">
        <DangerousHtml
          data-test="valuable-wagering-progress-text"
          html={formattedAmountLeftToWagerText(
            currency,
            label,
            leftToWager,
            market
          )}
        />
      </Text>
      <div className="u-margin-top--md">
        <ProgressBar
          data-test="valuable-wagering-progress-bar"
          fillerClassNames="t-background-grey-light-2"
          progress={percentageWagered(leftToWager, wageringThreshold)}
          trackClassNames="t-background-green-light-1"
        />
      </div>
    </>
  );
};

function formattedAmountLeftToWagerText(
  currency: string,
  label: string,
  leftToWager: number,
  market: string
): string {
  return interpolate(label, {
    amount: formatCurrency({
      locale: INTL_LOCALES[market],
      currency,
      value: leftToWager,
    }),
  });
}

function percentageWagered(
  leftToWager: number,
  wageringThreshold: number
): number {
  const proportionLeftToWager = leftToWager / wageringThreshold;
  const proportionWagered = 1 - proportionLeftToWager;

  return proportionWagered * 100;
}
