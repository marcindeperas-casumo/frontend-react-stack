// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { renderBets, formatCurrency } from "Utils";
import DangerousHtml from "Components/DangerousHtml";
import * as A from "Types/apollo";

export const GameRowText = ({
  name,
  bets,
  jackpot,
  locale,
}: {
  name: string,
  locale?: ?string,
  bets?: ?A.GameRow_Game_lobby_bets,
  jackpot?: ?A.Jackpots_Game_jackpot,
}) => (
  <Flex.Block className="t-color-grey-90 u-padding-left--sm">
    <Text
      tag="div"
      size="sm"
      className={classNames({ "u-font-weight-bold": bets })}
    >
      <DangerousHtml html={name} />
    </Text>
    <JackpotAmount {...jackpot} locale={locale} />
    <BetsLevels bets={renderBets(bets)} />
  </Flex.Block>
);

function BetsLevels({ bets }) {
  if (bets) {
    return (
      <Text tag="div" size="sm" className="u-padding-top--sm t-color-grey-20">
        {bets}
      </Text>
    );
  }

  return null;
}

function JackpotAmount({ value, locale }) {
  if (!value || !locale) {
    return null;
  }

  const { currency, amount } = value;

  return (
    <Text
      tag="div"
      size="sm"
      className="u-font-weight-bold t-color-red-30 u-padding-bottom--sm"
    >
      {formatCurrency({ currency, locale, value: amount })}
    </Text>
  );
}
